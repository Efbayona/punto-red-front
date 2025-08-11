import {environment} from "@/environment.ts";

export async function getOperators() {
    const response = await fetch(`${environment.api}/operator/`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    });

    return await response.json();
}
