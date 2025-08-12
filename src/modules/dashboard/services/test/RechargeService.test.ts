import { describe, it, expect, vi, beforeEach } from "vitest";
import {createRecharge} from "@/modules/dashboard/services/RechargeService.ts";

describe("createRecharge", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});
	
	it("returns JSON data on successful POST", async () => {
		const mockPayload = {
			supplierId: "123",
			cellPhone: "3001234567",
			value: "10000",
		};
		const mockResponseData = { id: 1, status: "success" };
		
		global.fetch = vi.fn(() =>
			Promise.resolve({
				ok: true,
				json: () => Promise.resolve(mockResponseData),
			} as Response)
		);
		
		const result = await createRecharge(mockPayload);
		
		expect(global.fetch).toHaveBeenCalledWith(
			`${process.env.API_URL || "http://localhost"}/recharge/`,
			{
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(mockPayload),
			}
		);
		expect(result).toEqual(mockResponseData);
	});
	
	it("throws error when response is not ok", async () => {
		const mockPayload = {
			supplierId: "123",
			cellPhone: "3001234567",
			value: "10000",
		};
		
		global.fetch = vi.fn(() =>
			Promise.resolve({
				ok: false,
			} as Response)
		);
		
		await expect(createRecharge(mockPayload)).rejects.toThrow("Error al crear la recarga");
	});
	
	it("throws error on fetch failure", async () => {
		const mockPayload = {
			supplierId: "123",
			cellPhone: "3001234567",
			value: "10000",
		};
		
		global.fetch = vi.fn(() => Promise.reject(new Error("Network error")));
		
		await expect(createRecharge(mockPayload)).rejects.toThrow("Network error");
	});
});
