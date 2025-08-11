import { CreditCard } from "lucide-react";
import { useState, useEffect, type FormEvent } from "react";
import { getOperators } from "@/OperatorService.ts";
import { createRecharge } from "@/RechargeService.ts";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (newRecharge: { operator: string; number: string; amount: string }) => void;
}

interface RechargePayload {
    supplierId: string;
    cellPhone: string;
    value: string;
}

export default function NewRechargeModal({ isOpen, onClose, onSave }: ModalProps) {
    const [loading, setLoading] = useState(false);
    const [sending, setSending] = useState(false);
    const [formData, setFormData] = useState({ operator: "", number: "", amount: "" });
    const [operators, setOperators] = useState<{ id: string; name: string }[]>([]);
    // const [successData, setSuccessData] = useState<string | null>(null);

    useEffect(() => {
        if (!isOpen) return;
        setLoading(true);
        getOperators()
            .then((data) => {
                console.log("📡 Operadores recibidos:", data);
                setOperators(data);
            })
            .catch((err) => {
                console.error("Error al cargar operadores:", err);
            })
            .finally(() => setLoading(false));
    }, [isOpen]);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!formData.operator || !formData.number || !formData.amount) return;

        try {
            setSending(true);

            const payload: RechargePayload = {
                supplierId: formData.operator,
                cellPhone: formData.number,
                value: formData.amount,
            };

            console.log(payload);

            const result = await createRecharge(payload);
            console.log("✅ Recarga creada:", result);

            // setSuccessData({
            //     message: "Recarga Exitosa",
            //     value: formData.amount,
            //     cellPhone: formData.number,
            //     currentDate: new Date().toLocaleString("es-CO"),
            //     operator: operators.find(op => op.id === formData.operator)?.name || "",
            //     paymentMethod: result.paymentMethod || "No especificado",
            //     status: result.status || "Aprobada",
            //     commission: result.commission || "0",
            //     transactionalID: result.transactionalID || "N/A"
            // });

            onSave({
                operator: operators.find(op => op.id === formData.operator)?.name || "",
                number: formData.number,
                amount: formData.amount
            });

            setFormData({ operator: "", number: "", amount: "" });
            onClose();
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

            <div className="relative bg-white rounded-xl p-6 shadow-lg w-full max-w-md z-10">
                <h2 className="text-xl font-bold mb-4">Nueva Recarga</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Operador */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Operador</label>
                        <select
                            value={formData.operator}
                            onChange={(e) => setFormData({ ...formData, operator: e.target.value })}
                            className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2"
                            disabled={loading}
                        >
                            <option value="">
                                {loading ? "Cargando operadores..." : "Selecciona tu operador"}
                            </option>
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
                            onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                            className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2"
                            placeholder="Ingresa el número"
                        />
                    </div>

                    {/* Monto */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Monto</label>
                        <input
                            type="number"
                            value={formData.amount}
                            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                            className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2"
                            placeholder="Ingresa el monto"
                        />
                    </div>

                    {/* Botones */}
                    <div className="flex justify-end gap-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-100"
                            disabled={sending}
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 disabled:opacity-50"
                            disabled={sending}
                        >
                            <CreditCard className="w-5 h-5" />
                            {sending ? "Enviando..." : "Guardar"}
                        </button>
                    </div>
                </form>

                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                >
                    ✕
                </button>
            </div>
        </div>
    );
}



