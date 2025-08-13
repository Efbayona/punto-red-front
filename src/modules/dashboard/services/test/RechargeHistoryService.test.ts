import { describe, it, expect, vi, beforeEach } from "vitest";
import { rechargeHistoryService } from "@/modules/dashboard/services/RechargeHistoryService";
import { environment } from "@/environment";

describe("rechargeHistoryService", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});
	
	it("returns recharge history data on successful fetch", async () => {
		const mockHistory = [
			{ id: 1, amount: 100, date: "2023-08-01" },
			{ id: 2, amount: 50, date: "2023-08-05" },
		];
		
		global.fetch = vi.fn(() =>
			Promise.resolve({
				ok: true,
				json: () => Promise.resolve(mockHistory),
			} as Response)
		);
		
		const result = await rechargeHistoryService();
		
		expect(global.fetch).toHaveBeenCalledWith(
			`${environment.api}/recharge/history`,
			{
				method: "GET",
				headers: { "Content-Type": "application/json" },
			}
		);
		expect(result).toEqual(mockHistory);
	});
	
	it("throws if fetch fails", async () => {
		global.fetch = vi.fn(() => Promise.reject(new Error("Network error")));
		
		await expect(rechargeHistoryService()).rejects.toThrow("Network error");
	});
});
