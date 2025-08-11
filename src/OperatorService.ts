import {environment} from "@/environment.ts";

export interface Operator {
    id: string;
    name: string;
}

export async function getOperators() {
    const response = await fetch(`${environment.api}/operator/`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    });

    const result = await response.json();

    console.log(result);
    return result;
}
