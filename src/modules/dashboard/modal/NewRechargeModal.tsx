import { CreditCard } from "lucide-react";
import { useState, useEffect, type FormEvent } from "react";
import { getOperators } from "@/modules/dashboard/services/OperatorService.ts";
import { createRecharge } from "@/modules/dashboard/services/RechargeService.ts";
import RechargeVoucher from "@/modules/dashboard/modal/RechargeVoucher.tsx";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (newRecharge: {
        operator: string;
        number: string;
        amount: string;
        transactionalID?: string;
    }) => void;
}

interface RechargePayload {
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

export default function NewRechargeModal({ isOpen, onClose, onSave }: ModalProps) {
    const [loading, setLoading] = useState(false);
    const [sending, setSending] = useState(false);
    const [formData, setFormData] = useState({ operator: "", number: "", amount: "" });
    const [operators, setOperators] = useState<{ id: string; name: string }[]>([]);
    const [errors, setErrors] = useState({ number: "", amount: "" });
    const [voucherData, setVoucherData] = useState<VoucherData | null>(null);
    
    useEffect(() => {
        if (!isOpen) return;
        setLoading(true);
        setVoucherData(null);
        getOperators()
        .then((data) => setOperators(data))
        .catch(console.error)
        .finally(() => setLoading(false));
    }, [isOpen]);
    
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (errors.number || errors.amount) return;
        if (!formData.operator || !formData.number || !formData.amount) return;
        
        try {
            setSending(true);
            
            const payload: RechargePayload = {
                supplierId: formData.operator,
                cellPhone: formData.number,
                value: formData.amount,
            };
            
            const result = await createRecharge(payload);
            
            onSave({
                operator: operators.find((op) => op.id === formData.operator)?.name || "",
                number: formData.number,
                amount: formData.amount,
                transactionalID: result.transactionalID || "N/A",
            });
            
            setVoucherData({
                message: "Recarga exitosa",
                transactionalID: result.transactionalID || "N/A",
                cellPhone: formData.number,
                value: formData.amount,
                operator: operators.find((op) => op.id === formData.operator)?.name,
                transactionDate: new Date().toISOString(),
            });
        } catch (error) {
            console.error("❌ Error al enviar recarga:", error);
        } finally {
            setSending(false);
        }
    };
    
    if (!isOpen) return null;
    
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/50" onClick={onClose}></div>
                {!voucherData ? (
            <div className="relative bg-white rounded-xl p-6 shadow-lg w-full max-w-md z-10">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <h2 className="text-xl font-bold mb-4">Nueva Recarga</h2>
                        {/* Operador */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Operador</label>
                            <select
                                value={formData.operator}
                                onChange={(e) => setFormData({ ...formData, operator: e.target.value })}
                                className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2"
                                disabled={loading}
                            >
                                <option value="">{loading ? "Cargando operadores..." : "Selecciona tu operador"}</option>
                                {operators.map((op) => (
                                    <option key={op.id} value={op.id}>
                                        {op.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        
                        {/* Número */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Número</label>
                            <input
                                type="text"
                                value={formData.number}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    setFormData({ ...formData, number: value });
                                    setErrors({
                                        ...errors,
                                        number: !/^3\d{9}$/.test(value) ? "Debe empezar por 3 y tener 10 dígitos" : "",
                                    });
                                }}
                                maxLength={10}
                                className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2"
                                placeholder="Ingresa el número"
                            />
                            {errors.number && <p className="text-red-500 text-sm mt-1">{errors.number}</p>}
                        </div>
                        
                        {/* Monto */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Monto</label>
                            <input
                                type="number"
                                value={formData.amount}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    const num = Number(value);
                                    setFormData({ ...formData, amount: value });
                                    setErrors({
                                        ...errors,
                                        amount: num < 1000 || num > 100000 ? "Debe estar entre 1,000 y 100,000" : "",
                                    });
                                }}
                                className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2"
                                placeholder="Ingresa el monto"
                            />
                            {errors.amount && <p className="text-red-500 text-sm mt-1">{errors.amount}</p>}
                        </div>
                        
                        {/* Botón */}
                        <div className="flex justify-end gap-2">
                            <button
                                type="submit"
                                disabled={sending}
                                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 disabled:opacity-50"
                            >
                                <CreditCard className="w-5 h-5" />
                                {sending ? "Recargando..." : "Recargar"}
                            </button>
                        </div>
                    </form>
            </div>
                ) : (
                    <>
                        <RechargeVoucher data={voucherData!} />
                    </>
                )}
        </div>
    );
}
