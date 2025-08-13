import {environment} from "@/environment.ts";
import type {PageResponse, RechargeHistoryResponse} from "@/modules/dashboard/interfaces/Recharge.interface.ts";

export async function rechargeHistoryService(page: number): Promise<PageResponse<RechargeHistoryResponse>> {
	const response = await fetch(
		`${environment.api}/recharge/history?page=${page}`,
		{
			method: "GET",
			headers: { "Content-Type": "application/json" },
		}
	);
	
	if (!response.ok) {
		throw new Error("Error en la petición");
	}
	
	return await response.json();
}
