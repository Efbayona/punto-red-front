import { describe, it, expect, vi, beforeEach } from "vitest";
import { rechargeHistoryService } from "@/modules/dashboard/services/RechargeHistoryService";
import { environment } from "@/environment";
import type { PageResponse, RechargeHistoryResponse } from "@/modules/dashboard/interfaces/Recharge.interface";

describe("rechargeHistoryService", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});
	
	it("returns recharge history data on successful fetch", async () => {
		const mockHistory: PageResponse<RechargeHistoryResponse> = {
			content: [
				{
					cell_phone: "3001234567",
					message: "Recarga exitosa",
					value: 100,
					transactional_id: "trx_001",
					supplierId: "sup_001",
					operator: "Claro",
					created_at: "2023-08-01"
				},
				{
					cell_phone: "3009876543",
					message: "Recarga exitosa",
					value: 50,
					transactional_id: "trx_002",
					supplierId: "sup_002",
					operator: "Tigo",
					created_at: "2023-08-05"
				}
			],
			totalPages: 1,
			totalElements: 2,
			number: 0,
			size: 2
		};
		
		
		global.fetch = vi.fn(() =>
			Promise.resolve({
				ok: true,
				json: () => Promise.resolve(mockHistory),
			} as Response)
		);
		
		const page = 0;
		const result = await rechargeHistoryService(page);
		
		expect(global.fetch).toHaveBeenCalledWith(
			`${environment.api}/recharge/history?page=${page}`,
			{
				method: "GET",
				headers: { "Content-Type": "application/json" },
			}
		);
		expect(result).toEqual(mockHistory);
	});
	
	it("throws if fetch fails", async () => {
		global.fetch = vi.fn(() => Promise.reject(new Error("Network error")));
		
		await expect(rechargeHistoryService(0)).rejects.toThrow("Network error");
	});
});
