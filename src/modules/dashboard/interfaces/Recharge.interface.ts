export interface Recharge {
	id: string;
	number: string;
	operator: string;
	amount: string;
	status: "completado" | "pendiente" | "fallido";
	date: string;
	time: string;
}

export interface RechargeApi {
	supplier_id: string;
	cell_phone: string;
	message: string;
	value: number;
	created_at: string;
	updated_at: string;
}

export interface RechargePayload {
	supplierId: string;
	cellPhone: string;
	value: string;
}