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

export interface VoucherData {
	message: string;
	transactionalID: string;
	cellPhone: string;
	value: string;
	operator?: string;
	transactionDate?: string;
}

export interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	onSave: (newRecharge: {
		operator: string;
		number: string;
		amount: string;
		transactionalID?: string;
	}) => void;
}