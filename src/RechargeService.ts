import { environment } from "@/environment.ts";

interface RechargePayload {
    supplierId: string;
    cellPhone: string;
    value: string;
}

export async function createRecharge(payload: RechargePayload) {
    console.log(payload);
    const response = await fetch(`${environment.api}/recharge/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        throw new Error("Error al crear la recarga");
    }

    return await response.json();
}
