import {environment} from "@/environment.ts";
import type {RechargePayload, RechargeResponse} from "@/modules/dashboard/interfaces/Recharge.interface.ts";

export async function createRecharge(payload: RechargePayload): Promise<RechargeResponse> {
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
