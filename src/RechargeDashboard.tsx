import { useState } from "react";
import { Download, Filter, Plus, Search, Smartphone, LayoutDashboard, History, Users, Settings } from "lucide-react";
import NewRechargeModal from "./NewRechargeModal";

interface Recharge {
    id: string;
    number: string;
    operator: string;
    amount: string;
    status: "completado" | "pendiente" | "fallido";
    date: string;
    time: string;
}

export default function RechargeDashboard() {
    const [modalOpen, setModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [recharges, setRecharges] = useState<Recharge[]>([
        { id: "RC001", number: "0987654321", operator: "Movistar", amount: "50.00", status: "completado", date: "2024-01-15", time: "14:30" },
        { id: "RC002", number: "0976543210", operator: "Claro", amount: "30.00", status: "completado", date: "2024-01-15", time: "13:15" },
        { id: "RC003", number: "0965432109", operator: "Tigo", amount: "100.00", status: "pendiente", date: "2024-01-15", time: "12:45" },
    ]);

    const operatorColors = {
        Movistar: "bg-green-500",
        Claro: "bg-red-600",
        Tigo: "bg-blue-600",
        Personal: "bg-yellow-500",
    };

    const handleNewRecharge = (newRecharge: { operator: string; number: string; amount: string }) => {
        const recharge: Recharge = {
            id: `RC${String(recharges.length + 1).padStart(3, "0")}`,
            number: newRecharge.number,
            operator: newRecharge.operator,
            amount: newRecharge.amount,
            status: "completado",
            date: new Date().toISOString().split("T")[0],
            time: new Date().toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" }),
        };
        setRecharges([recharge, ...recharges]);
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
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                            <Smartphone className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="font-bold text-lg">RecargasApp</h1>
                            <p className="text-sm text-gray-500">Panel de Administración</p>
                        </div>
                    </div>

                    <nav className="space-y-2">
                        {sidebarItems.map((item, index) => (
                            <button
                                key={index}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl ${
                                    item.active ? "bg-blue-50 text-blue-600 font-medium" : "text-gray-600 hover:bg-gray-50"
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
                                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-xl flex items-center"
                            >
                                <Plus className="w-4 h-4 mr-2" /> Nueva Recarga
                            </button>
                        </div>
                    </header>

                    {/* Table */}
                    <main className="flex-1 p-8">
                        <div className="bg-white/80 rounded-2xl border overflow-hidden">
                            <div className="p-6 border-b flex justify-between items-center">
                                <h2 className="text-lg font-semibold">Recargas Recientes ({filteredRecharges.length})</h2>
                                <div className="flex gap-2">
                                    <button className="border px-4 py-1 rounded-lg flex items-center gap-2">
                                        <Filter className="w-4 h-4" /> Filtrar
                                    </button>
                                    <button className="border px-4 py-1 rounded-lg flex items-center gap-2">
                                        <Download className="w-4 h-4" /> Exportar
                                    </button>
                                </div>
                            </div>
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left">ID</th>
                                    <th className="px-6 py-3 text-left">Número</th>
                                    <th className="px-6 py-3 text-left">Operador</th>
                                    <th className="px-6 py-3 text-left">Monto</th>
                                    <th className="px-6 py-3 text-left">Estado</th>
                                    <th className="px-6 py-3 text-left">Fecha</th>
                                    <th className="px-6 py-3 text-left">Hora</th>
                                </tr>
                                </thead>
                                <tbody>
                                {filteredRecharges.map((recharge) => (
                                    <tr key={recharge.id} className="border-t hover:bg-gray-50">
                                        <td className="px-6 py-3">{recharge.id}</td>
                                        <td className="px-6 py-3">{recharge.number}</td>
                                        <td className="px-6 py-3 flex items-center gap-2">
                                            <div className={`w-3 h-3 rounded-full ${operatorColors[recharge.operator as keyof typeof operatorColors]}`} />
                                            {recharge.operator}
                                        </td>
                                        <td className="px-6 py-3 font-bold">${recharge.amount}</td>
                                        <td className="px-6 py-3">{recharge.status}</td>
                                        <td className="px-6 py-3">{recharge.date}</td>
                                        <td className="px-6 py-3">{recharge.time}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </main>
                </div>
            </div>

            {/* Modal */}
            <NewRechargeModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                onSave={handleNewRecharge}
            />
        </div>
    );
}
