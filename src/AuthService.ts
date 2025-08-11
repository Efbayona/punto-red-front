import {environment} from './environment'

interface LoginData {
    user: string;
    password: string;
}

export async function loginService(data: LoginData) {
    const response = await fetch(`${environment.api}/auth/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!result?.token) {
        throw new Error("Token inválido o no recibido");
    }

    return result;
}


export async function registerService(name: string, username: string, password: string) {
    const response = await fetch(`${environment.api}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, username, password }),
    })

    if (!response.ok) {
        throw new Error("Error en registro")
    }

    return await response.json()
}
