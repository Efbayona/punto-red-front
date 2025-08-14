import {useCallback, useEffect, useMemo, useState} from "react";
import {
    ChevronLeft,
    ChevronRight,
    History,
    LayoutDashboard,
    Plus,
    Search,
    Settings,
    Smartphone,
    Users
} from "lucide-react";
import {rechargeHistoryService} from "@/modules/dashboard/services/RechargeHistoryService.ts";
import type {PageResponse, RechargeHistoryResponse} from "../interfaces/Recharge.interface.ts";
import RechargeModal from "@/modules/dashboard/modal/RechargeModal.tsx";
import {formatCurrency, formatDateTime} from "@/utils/funtions.ts";
import {Button} from "@/components/ui/button.tsx";

export default function RechargeDashboard() {
    const [modalOpen, setModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [recharges, setRecharges] = useState<PageResponse<RechargeHistoryResponse> | null>(null);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

// Función memoizada para evitar recreaciones en cada render
    const fetchRecharges = useCallback(() => {
        rechargeHistoryService(page)
            .then((data) => {
                setRecharges(data);
                setTotalPages(data.totalPages);
            })
            .catch((err) => {
                console.error("Error al cargar recargas:", err);
            });
    }, [page]);

    useEffect(() => {
        fetchRecharges();
    }, [fetchRecharges]);


    const handleNewRecharge = fetchRecharges;

    const filteredRecharges = useMemo(() => {
        if (!recharges) return [];

        const term = searchTerm.toLowerCase();

        console.log("Recharges para filtrar:", recharges.content);
        console.log("Término de búsqueda:", term);

        return recharges.content.filter((r) => {
            const operatorName = r.supplierId ?? "";
            const cellPhone = r.cell_phone ?? "";
            const transactionalId = r.transactional_id ?? "";

            const match =
                cellPhone.toLowerCase().includes(term) ||
                operatorName.toLowerCase().includes(term) ||
                transactionalId.toLowerCase().includes(term);

            if (!match) {
                console.log("No coincide:", { cellPhone, operatorName, transactionalId });
            }

            return match;
        });
    }, [recharges, searchTerm]);


    const sidebarItems = [
        {icon: History, label: "Historial", active: true},
        {icon: LayoutDashboard, label: "Panel", active: false},
        {icon: Smartphone, label: "Recargas", active: false},
        {icon: Users, label: "Usuarios", active: false},
        {icon: Settings, label: "Configuración", active: false},
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            <div className="flex h-screen">
                {/* Sidebar */}
                <div className="w-64 bg-white/80 border-r p-6">
                    <div className="flex items-center gap-3 mb-8">
                        <div
                            className="w-10 h-10 bg-gradient-to-br from-pink-600 to-purple-500 rounded-xl flex items-center justify-center">
                            <Smartphone className="w-6 h-6 text-white"/>
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
                                <item.icon className="w-5 h-5"/>
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
                                <Search
                                    className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"/>
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
                                <Plus className="w-4 h-4 mr-2"/> Nueva Recarga
                            </button>
                        </div>
                    </header>

                    {/* Table */}
                    <main className="flex-1 p-8 ">
                        <div
                            className="relative bg-white/80 rounded-2xl border overflow-hidden backdrop-blur-sm min-h-[730px] max-h-[730px]">
                            <div className="p-6 border-b flex justify-between items-center">
                                <h2 className="text-lg font-semibold text-slate-900">
                                    Recargas Recientes ({filteredRecharges.length})
                                </h2>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                    <tr className="border-b border-slate-200 bg-gray-50">
                                        <th className="px-6 py-3 text-left font-semibold text-slate-700">Número</th>
                                        <th className="px-6 py-3 text-left font-semibold text-slate-700">Operador</th>
                                        <th className="px-6 py-3 text-left font-semibold text-slate-700">Monto</th>
                                        <th className="px-6 py-3 text-left font-semibold text-slate-700">Estado</th>
                                        <th className="px-6 py-3 text-left font-semibold text-slate-700">Fecha</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {filteredRecharges.map((recharge) => {
                                        return (
                                            <tr key={recharge.transactional_id}
                                                className="border-t hover:bg-slate-50/50 transition-colors">
                                                <td className="px-6 py-3 font-mono text-slate-900">{recharge.cell_phone}</td>
                                                <td
                                                    className={`px-6 py-3 flex items-center gap-2 font-semibold ${
                                                        {
                                                            Claro: "text-red-500",
                                                            Tigo: "text-blue-500",
                                                            Movistar: "text-green-500",
                                                            wom: "text-purple-500",
                                                        }[recharge.operator] || "text-gray-500"
                                                    }`}
                                                >
                                                    {recharge.operator}
                                                </td>
                                                <td className="px-6 py-3 font-medium text-slate-900">{formatCurrency(recharge.value)}</td>
                                                <td className="px-6 py-3">
                                                <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-green-100
                                                text-green-800 border border-green-200">{recharge.message}</span>
                                                </td>
                                                <td className="px-6 py-3 text-slate-600 text-sm">
                                                    {formatDateTime(recharge.created_at)}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                    </tbody>
                                </table>
                            </div>
                            <div
                                className="w-full absolute bottom-0 flex items-center justify-between mt-3 p-6 border-t border-slate-200">
                                {/* Información de resultados */}
                                <div className="flex items-center gap-2 text-sm text-slate-600">
                                    <span>Mostrando</span>
                                    <span className="font-medium text-slate-900">
                                       {page * 10 + 1}-{page * 10 + (recharges?.content.length ?? 0)}
									 </span>
                                    <span>de</span>
                                    <span
                                        className="font-medium text-slate-900"> {(recharges?.totalPages ?? 0) * 10}</span>
                                    <span>resultados</span>
                                </div>

                                {/* Botones de paginación */}
                                <div className="flex items-center gap-1">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="border-slate-200 bg-white hover:bg-slate-50 text-slate-600 hover:text-slate-900"
                                        disabled={page === 0}
                                        onClick={() => setPage(page - 1)}
                                    >
                                        <ChevronLeft className="w-4 h-4"/>
                                    </Button>

                                    {Array.from({length: totalPages}).map((_, idx) => (
                                        <Button
                                            key={idx}
                                            size="sm"
                                            className={`min-w-[2.5rem] shadow-sm ${
                                                page === idx
                                                    ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white"
                                                    : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                                            }`}
                                            onClick={() => setPage(idx)}
                                        >
                                            {idx + 1}
                                        </Button>
                                    ))}

                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="border-slate-200 bg-white hover:bg-slate-50 text-slate-600 hover:text-slate-900"
                                        disabled={page === totalPages - 1}
                                        onClick={() => setPage(page + 1)}
                                    >
                                        <ChevronRight className="w-4 h-4"/>
                                    </Button>
                                </div>
                            </div>
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
