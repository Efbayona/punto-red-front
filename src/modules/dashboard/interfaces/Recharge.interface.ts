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
	operator: string;
	supplierId: string;
	cellPhone: string;
	value: number;
}

export interface VoucherData {
	message: string;
	transactionalID: string;
	cellPhone: string;
	value: number;
	operator: string;
	created_at: string;
}

export interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	onSave: () => void;
}

export interface RechargeResponse {
	cell_phone: string;
	created_at: string;
	message: string;
	supplier_id: string;
	transactional_id: string;
	value: number;
}

export interface RechargeHistoryResponse {
	cell_phone: string;
	message: string;
	value: number;
	transactional_id: string;
	supplierId: string;
	operator: string;
	created_at: string;
}

export interface PageResponse<T> {
	content: T[];
	totalPages: number;
	totalElements: number;
	size: number;
	number: number;
}
