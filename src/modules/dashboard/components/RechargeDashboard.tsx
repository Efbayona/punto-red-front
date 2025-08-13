import {useEffect, useState} from "react";
import { Plus, Search, Smartphone, LayoutDashboard, History, Users, Settings } from "lucide-react";
import {rechargeHistoryService} from "@/modules/dashboard/services/RechargeHistoryService.ts";
import {OPERATORS} from "@/constants/operators.ts";
import type {Recharge, RechargeApi} from "../interfaces/Recharge.interface.ts";
import RechargeModal from "@/modules/dashboard/modal/RechargeModal.tsx";
import {formatCurrency, formatDateTime} from "@/utils/funtions.ts";

export default function RechargeDashboard() {
    const [modalOpen, setModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [recharges, setRecharges] = useState<Recharge[]>([]);

    const operatorColors = { Movistar: "bg-green-500", Claro: "bg-red-600", Tigo: "bg-blue-600", Wom: "bg-purple-500" };
    
    const fetchRecharges = () => {
        rechargeHistoryService()
        .then((data) => {
            
            const mapped = data.map((r: RechargeApi) => {
                const operator = OPERATORS.find(op => op.id === r.supplier_id);
                const operatorName = operator?.name ?? "Desconocido";
                
                return {
                    id: r.transactional_id,
                    number: r.cell_phone,
                    operator: operatorName,
                    amount: r.value,
                    status: r.message,
                    date: r.created_at
                };
            });
            
            setRecharges(mapped);
        })
        .catch((err) => {
            console.error("Error al cargar recargas:", err);
        });
    };
    
    useEffect(() => {
        fetchRecharges();
    }, []);
    
    const handleNewRecharge = () => {
        fetchRecharges();
    };
    
    const filteredRecharges = recharges.filter(
        (r) =>
            r.number.includes(searchTerm) ||
            r.operator.toLowerCase().includes(searchTerm.toLowerCase()) ||
            r.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const sidebarItems = [
        { icon: History, label: "Historial", active: true },
        { icon: LayoutDashboard, label: "Panel", active: false },
        { icon: Smartphone, label: "Recargas", active: false },
        { icon: Users, label: "Usuarios", active: false },
        { icon: Settings, label: "Configuración", active: false },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            <div className="flex h-screen">
                {/* Sidebar */}
                <div className="w-64 bg-white/80 border-r p-6">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-10 h-10 bg-gradient-to-br from-pink-600 to-purple-500 rounded-xl flex items-center justify-center">
                            <Smartphone className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="font-bold text-lg">Punto Red</h1>
                            <p className="text-sm text-gray-500">Panel de Administración</p>
                        </div>
                    </div>

                    <nav className="space-y-2">
                        {sidebarItems.map((item, index) => (
                            <button
                                key={index}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl ${
                                    item.active ? "bg-blue-50 from-pink-600 font-medium" : "text-gray-600 hover:bg-gray-50"
                                }`}
                            >
                                <item.icon className="w-5 h-5" />
                                {item.label}
                            </button>
                        ))}
                    </nav>
                </div>

                {/* Main */}
                <div className="flex-1 flex flex-col">
                    {/* Header */}
                    <header className="bg-white/80 border-b px-8 py-4 flex justify-between items-center">
                        <div>
                            <h1 className="text-2xl font-bold">Historial de Recargas</h1>
                            <p className="text-gray-500">Administra y monitorea todas las recargas</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="relative">
                                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    placeholder="Buscar recargas..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10 w-80 border rounded-xl px-3 py-2"
                                />
                            </div>
                            <button
                                onClick={() => setModalOpen(true)}
                                className="bg-gradient-to-r from-pink-600 to-purple-500 text-white px-6 py-2 rounded-xl flex items-center"
                            >
                                <Plus className="w-4 h-4 mr-2" /> Nueva Recarga
                            </button>
                        </div>
                    </header>

                    {/* Table */}
                    <main className="flex-1 p-8">
                        <div className="bg-white/80 rounded-2xl border overflow-hidden">
                            {/*<div className="p-6 border-b flex justify-between items-center">*/}
                            {/*    <h2 className="text-lg font-semibold">Recargas Recientes ({filteredRecharges.length})</h2>*/}
                            {/*</div>*/}
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left">Número</th>
                                    <th className="px-6 py-3 text-left">Operador</th>
                                    <th className="px-6 py-3 text-left">Monto</th>
                                    <th className="px-6 py-3 text-left">Estado</th>
                                    <th className="px-6 py-3 text-left">Fecha</th>
                                </tr>
                                </thead>
                                <tbody>
                                {filteredRecharges.map((recharge) => (
                                    <tr key={recharge.id} className="border-t hover:bg-gray-50">
                                        <td className="px-6 py-3">{recharge.number}</td>
                                        <td className="px-6 py-3 flex items-center gap-2">
                                            <div className={`w-3 h-3 rounded-full ${operatorColors[recharge.operator as keyof typeof operatorColors]}`} />
                                            {recharge.operator}
                                        </td>
                                        <td className="px-6 py-3 font-bold">{formatCurrency(recharge.amount)}</td>
                                        <td className="px-6 py-3">{recharge.status}</td>
                                        <td className="px-6 py-3">{formatDateTime(recharge.date) }</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </main>
                </div>
            </div>

            {/* Modal */}
            <RechargeModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                onSave={handleNewRecharge}
            />
            
        </div>
    );
}
