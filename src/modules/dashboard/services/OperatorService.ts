import {environment} from "@/environment.ts";

export async function getOperators() {
    const response = await fetch(`${environment.api}/operator/`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    });

    const result = await response.json();
    
    return result;
}
