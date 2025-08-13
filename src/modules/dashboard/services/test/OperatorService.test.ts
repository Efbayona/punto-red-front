import { describe, it, expect, vi, beforeEach } from "vitest";
import { getOperators } from "@/modules/dashboard/services/OperatorService";
import { environment } from "@/environment";

describe("getOperators", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});
	
	it("returns operators data on successful fetch", async () => {
		const mockOperators = [
			{ id: 1, name: "Operator A" },
			{ id: 2, name: "Operator B" },
		];
		
		global.fetch = vi.fn(() =>
			Promise.resolve({
				ok: true,
				json: () => Promise.resolve(mockOperators),
			} as Response)
		);
		
		const result = await getOperators();
		
		expect(global.fetch).toHaveBeenCalledWith(
			`${environment.api}/operator/`,
			{
				method: "GET",
				headers: { "Content-Type": "application/json" },
			}
		);
		expect(result).toEqual(mockOperators);
	});
	
	it("throws if fetch fails", async () => {
		global.fetch = vi.fn(() => Promise.reject(new Error("Network error")));
		
		await expect(getOperators()).rejects.toThrow("Network error");
	});
});
