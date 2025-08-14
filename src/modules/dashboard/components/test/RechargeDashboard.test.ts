import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { useState, useEffect, useCallback, useMemo } from "react";
import { rechargeHistoryService } from "@/modules/dashboard/services/RechargeHistoryService";
import type {PageResponse, RechargeHistoryResponse} from "@/modules/dashboard/interfaces/Recharge.interface";

vi.mock("@/modules/dashboard/services/RechargeHistoryService", () => ({
	rechargeHistoryService: vi.fn(),
}));

const useRechargeHistory = () => {
	const [recharges, setRecharges] = useState<PageResponse<RechargeHistoryResponse> | null>(null);
	const [page, setPage] = useState(0);
	const [searchTerm, setSearchTerm] = useState("");
	
	const fetchRecharges = useCallback(() => {
		rechargeHistoryService(page)
		.then((data) => {
			setRecharges(data);
		})
		.catch((err) => {
			console.error("Error al cargar recargas:", err);
		});
	}, [page]);
	
	useEffect(() => {
		fetchRecharges();
	}, [fetchRecharges]);
	
	const handleNewRecharge = fetchRecharges;
	
	const filteredRecharges = useMemo(() => {
		if (!recharges) return [];
		const term = searchTerm.toLowerCase();
		return recharges.content.filter((r) => {
			const operatorName = r.supplierId ?? "";
			const cellPhone = r.cell_phone ?? "";
			const transactionalId = r.transactional_id ?? "";
			return (
				cellPhone.toLowerCase().includes(term) ||
				operatorName.toLowerCase().includes(term) ||
				transactionalId.toLowerCase().includes(term)
			);
		});
	}, [recharges, searchTerm]);
	
	return { recharges, page, setPage, setSearchTerm, filteredRecharges, handleNewRecharge };
};

describe("useRechargeHistory hook", () => {
	const mockData: PageResponse<RechargeHistoryResponse> = {
		content: [
			{
				cell_phone: "3001234567",
				message: "Recarga exitosa",
				value: 5000,
				transactional_id: "TX123",
				supplierId: "Claro",
				operator: "Claro",
				created_at: "2025-08-14",
			},
			{
				cell_phone: "3017654321",
				message: "Recarga fallida",
				value: 10000,
				transactional_id: "TX999",
				supplierId: "Tigo",
				operator: "Tigo",
				created_at: "2025-08-13",
			},
		],
		totalPages: 1,
		totalElements: 2,
		number: 0,
		size: 10,
	};
	
	beforeEach(() => {
		vi.clearAllMocks();
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-expect-error
		(rechargeHistoryService as vi.Mock).mockResolvedValue(mockData);
	});
	
	it("debe llamar a fetchRecharges y establecer recargas", async () => {
		const { result } = renderHook(() => useRechargeHistory());
		
		// Esperar a que el hook haga la llamada inicial
		await vi.waitFor(() => {
			expect(rechargeHistoryService).toHaveBeenCalledWith(0);
			expect(result.current.recharges).toEqual(mockData);
		});
	});
	
	it("debe llamar a handleNewRecharge y actualizar recargas", async () => {
		const { result } = renderHook(() => useRechargeHistory());
		
		await vi.waitFor(() => {
			expect(result.current.recharges).toEqual(mockData);
		});
		
		await act(async () => {
			await result.current.handleNewRecharge();
		});
		
		expect(rechargeHistoryService).toHaveBeenCalledTimes(2);
	});
	
	it("debe filtrar recargas por número de celular", async () => {
		const { result } = renderHook(() => useRechargeHistory());
		
		await vi.waitFor(() => {
			expect(result.current.recharges).toEqual(mockData);
		});
		
		act(() => {
			result.current.setSearchTerm("300123");
		});
		
		expect(result.current.filteredRecharges).toHaveLength(1);
		expect(result.current.filteredRecharges[0].cell_phone).toBe("3001234567");
	});
	
	it("debe filtrar recargas por operador", async () => {
		const { result } = renderHook(() => useRechargeHistory());
		
		await vi.waitFor(() => {
			expect(result.current.recharges).toEqual(mockData);
		});
		
		act(() => {
			result.current.setSearchTerm("Tigo");
		});
		
		expect(result.current.filteredRecharges).toHaveLength(1);
		expect(result.current.filteredRecharges[0].supplierId).toBe("Tigo");
	});
	
	it("debe devolver todas las recargas si searchTerm está vacío", async () => {
		const { result } = renderHook(() => useRechargeHistory());
		
		await vi.waitFor(() => {
			expect(result.current.recharges).toEqual(mockData);
		});
		
		act(() => {
			result.current.setSearchTerm("");
		});
		
		expect(result.current.filteredRecharges).toHaveLength(2);
	});
});
