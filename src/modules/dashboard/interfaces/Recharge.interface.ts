export interface Recharge {
	id: string;
	number: string;
	operator: string;
	amount: string;
	status: "completado" | "pendiente" | "fallido";
	date: string;
}

export interface RechargeApi {
	transactional_id:string;
	supplier_id: string;
	cell_phone: string;
	message: string;
	value: number;
	created_at: string;
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
	operator: string;
	created_at: string;
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

export interface RechargeResponse {
	cell_phone: string;
	created_at: string;
	message: string;
	supplier_id: string;
	transactional_id: string;
	value: number;
}
