import { CreditCard } from "lucide-react";
import { useState, type FormEvent } from "react";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (newRecharge: { operator: string; number: string; amount: string }) => void;
}

const operators = [
    { value: "Movistar", label: "Movistar" },
    { value: "Claro", label: "Claro" },
    { value: "Tigo", label: "Tigo" },
    { value: "Personal", label: "Personal" },
];

export default function NewRechargeModal({ isOpen, onClose, onSave }: ModalProps) {
    const [formData, setFormData] = useState({ operator: "", number: "", amount: "" });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (!formData.operator || !formData.number || !formData.amount) return;
        onSave(formData);
        setFormData({ operator: "", number: "", amount: "" });
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Background */}
            <div className="absolute inset-0 bg-black/50" onClick={onClose}></div>

            {/* Content */}
            <div className="relative bg-white rounded-xl p-6 shadow-lg w-full max-w-md z-10">
                <h2 className="text-xl font-bold mb-4">New Recharge</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Operator */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Operator</label>
                        <select
                            value={formData.operator}
                            onChange={(e) => setFormData({ ...formData, operator: e.target.value })}
                            className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2"
                        >
                            <option value="">Select an operator</option>
                            {operators.map((op) => (
                                <option key={op.value} value={op.value}>
                                    {op.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Number */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Number</label>
                        <input
                            type="text"
                            value={formData.number}
                            onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                            className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2"
                            placeholder="Enter number"
                        />
                    </div>

                    {/* Amount */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Amount</label>
                        <input
                            type="number"
                            value={formData.amount}
                            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                            className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2"
                            placeholder="Enter amount"
                        />
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end gap-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-100"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                        >
                            <CreditCard className="w-5 h-5" />
                            Save
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
