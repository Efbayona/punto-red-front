import {describe, it, expect, vi, beforeEach} from "vitest";
import {toast} from "react-toastify";
import {loginService, registerService} from "@/modules/login/services/AuthService.ts";

vi.mock("react-toastify", () => ({
	toast: {
		success: vi.fn(),
		error: vi.fn(),
	},
}));

describe("Auth services", () => {
	const mockNavigate = vi.fn();
	
	beforeEach(() => {
		vi.clearAllMocks();
		vi.spyOn(console, 'log').mockImplementation(() => {}); // Silencia los logs para tests más limpios
	});
	
	it("loginService success calls navigate and toast.success", async () => {
		// Simula fetch exitoso (ok:true) con un token en la respuesta JSON
		global.fetch = vi.fn(() =>
			Promise.resolve({
				ok: true,
				json: () => Promise.resolve({token: "abc"}),
			} as Response)
		);
		
		// Llama loginService con datos válidos y función mock de navegación
		await loginService({user: "test", password: "123"}, mockNavigate);
		
		// Verifica que fetch fue llamado
		expect(global.fetch).toHaveBeenCalled();
		// Verifica que la navegación se hizo a la ruta esperada tras login exitoso
		expect(mockNavigate).toHaveBeenCalledWith("/recharge-dashboard");
		// Verifica que se mostró el mensaje de éxito con toast
		expect(toast.success).toHaveBeenCalledWith("Login exitoso, bienvenido!");
	});
	
	it("loginService failure shows toast.error with message", async () => {
		// Simula fetch con error (ok:false) y mensaje de error en JSON
		global.fetch = vi.fn(() =>
			Promise.resolve({
				ok: false,
				json: () => Promise.resolve({message: "Credenciales inválidas"}),
			} as Response)
		);
		
		// Llama loginService con credenciales erróneas
		await loginService({user: "test", password: "wrong"}, mockNavigate);
		
		// Verifica que se mostró mensaje de error con toast
		expect(toast.error).toHaveBeenCalledWith("Credenciales inválidas");
		// Verifica que no se hizo navegación porque login falló
		expect(mockNavigate).not.toHaveBeenCalled();
	});
	
	it("loginService fetch error shows toast.error", async () => {
		// Simula que fetch falla lanzando un error de red
		global.fetch = vi.fn(() => Promise.reject(new Error("Network error")));
		
		// Llama loginService y espera que maneje el error correctamente
		await loginService({user: "test", password: "123"}, mockNavigate);
		
		// Verifica que se mostró mensaje genérico de error de conexión
		expect(toast.error).toHaveBeenCalledWith("No se pudo conectar con el servidor");
	});
	
	it("registerService success returns true", async () => {
		// Simula fetch exitoso (ok:true) en registro
		global.fetch = vi.fn(() =>
			Promise.resolve({
				ok: true,
			} as Response)
		);
		
		// Llama registerService con datos de registro correctos
		const result = await registerService({user_name: "test", password: "123", confirm_password: "123"});
		// Verifica que la función retorna true en caso de éxito
		expect(result).toBe(true);
	});
	
	it("registerService failure throws error", async () => {
		// Simula fetch con respuesta fallida (ok:false)
		global.fetch = vi.fn(() =>
			Promise.resolve({
				ok: false,
			} as Response)
		);
		
		// Espera que registerService lance error al recibir respuesta no OK
		await expect(registerService({
			user_name: "test",
			password: "123",
			confirm_password: "123"
		})).rejects.toThrow("Error en registro");
	});
});
