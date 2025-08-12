import {environment} from "@/environment.ts";
import type {LoginData, RegisterUserData} from "@/modules/login/interfaces/Auth.interfaces.ts";
import {toast} from "react-toastify";

export async function loginService(data: LoginData, navigate: (path: string) => void) {
    try {
        const response = await fetch(`${environment.api}/auth/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            toast.error(errorData.message || "Credenciales inválidas");
            return;
        }
        
        const result = await response.json();
        console.log(result);
        navigate("/recharge-dashboard");
        toast.success("Login exitoso, bienvenido!");
    } catch (error) {
        console.log(error);
        toast.error("No se pudo conectar con el servidor");
    }
}

export async function registerService(dataUser: RegisterUserData) {
	const response = await fetch(`${environment.api}/auth/register`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(dataUser),
	});
	
	if (!response.ok) {
		throw new Error("Error en registro");
	}
	
	return true;
}


