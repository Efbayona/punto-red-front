import {environment} from "@/environment.ts";

export async function rechargeHistoryService() {
	const response = await fetch(`${environment.api}/recharge/history`, {
		method: "GET",
		headers: { "Content-Type": "application/json" },
	});

	return await response.json();
}