import { describe, it, expect, vi, beforeEach } from "vitest";
import type { RechargeApi } from "@/modules/dashboard/interfaces/Recharge.interface.ts";
import { OPERATORS } from "@/constants/operators";
import { rechargeHistoryService } from "@/modules/dashboard/services/RechargeHistoryService.ts";
vi.mock("@/modules/dashboard/services/RechargeHistoryService.ts", () => ({
	rechargeHistoryService: vi.fn(),
}));

describe("fetchRecharges", () => {
	let mockSetRecharges: ReturnType<typeof vi.fn>;
	
	const mockData: RechargeApi[] = [
		{
			transactional_id: "TX001",
			cell_phone: "3001234567",
			supplier_id: "8753",
			value: 5000,
			message: "Exitosa",
			created_at: "2025-08-13T10:00:00Z",
		},
	];
	
	beforeEach(() => {
		vi.clearAllMocks();
		mockSetRecharges = vi.fn();
	});
	
	const fetchRecharges = async () => {
		try {
			const data = await rechargeHistoryService();
			const mapped = data.map((r: RechargeApi) => {
				const operator = OPERATORS.find((op) => op.id === r.supplier_id);
				const operatorName = operator?.name ?? "Desconocido";
				
				return {
					id: r.transactional_id,
					number: r.cell_phone,
					operator: operatorName,
					amount: r.value,
					status: r.message,
					date: r.created_at,
				};
			});
			mockSetRecharges(mapped);
		} catch (err) {
			console.error("Error al cargar recargas:", err);
		}
	};
	
	it("mapea y guarda los datos correctamente", async () => {
		(rechargeHistoryService as vi.Mock).mockResolvedValue(mockData);
		
		await fetchRecharges();
		
		expect(mockSetRecharges).toHaveBeenCalledWith([
			{
				id: "TX001",
				number: "3001234567",
				operator: "Claro",
				amount: 5000,
				status: "Exitosa",
				date: "2025-08-13T10:00:00Z",
			},
		]);
	});
	
	it("muestra un error si la petición falla", async () => {
		const mockError = new Error("Fallo de red");
		(rechargeHistoryService as vi.Mock).mockRejectedValue(mockError);
		const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
		
		await fetchRecharges();
		
		expect(consoleSpy).toHaveBeenCalledWith(
			"Error al cargar recargas:",
			mockError
		);
		
		consoleSpy.mockRestore();
	});
});
