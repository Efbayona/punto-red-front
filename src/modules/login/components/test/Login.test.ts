import { describe, it, vi, beforeEach, expect } from "vitest";
import { loginService, registerService } from "@/modules/login/services/AuthService.ts";

vi.mock("@/modules/login/services/AuthService.ts", () => ({
	loginService: vi.fn(),
	registerService: vi.fn(),
}));

describe("AuthService", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});
	
	it("llama a loginService con los datos correctos", async () => {
		(loginService as any).mockResolvedValueOnce({ token: "fake-token" });
		
		const payload = { user: "testuser", password: "123456" };
		const result = await loginService(payload, vi.fn());
		
		expect(loginService).toHaveBeenCalledWith(payload, expect.any(Function));
		expect(result).toEqual({ token: "fake-token" });
	});
	
	it("llama a registerService con los datos correctos", async () => {
		(registerService as any).mockResolvedValueOnce({ success: true });
		
		const payload = {
			user_name: "newuser",
			password: "123456",
			confirm_password: "123456",
		};
		const result = await registerService(payload);
		
		expect(registerService).toHaveBeenCalledWith(payload);
		expect(result).toEqual({ success: true });
	});
});
