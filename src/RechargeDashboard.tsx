import { useState } from "react";
import { Download, Filter, Plus, Search, Smartphone, LayoutDashboard, History, Users, Settings } from "lucide-react";
import NewRechargeModal from "./NewRechargeModal";

interface Recharge {
    id: string;
    number: string;
    operator: string;
    amount: string;
    status: "completed" | "pending" | "failed";
    date: string;
    time: string;
}

export default function RechargeDashboard() {
    const [modalOpen, setModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [recharges, setRecharges] = useState<Recharge[]>([
        { id: "RC001", number: "0987654321", operator: "Movistar", amount: "50.00", status: "completed", date: "2024-01-15", time: "14:30" },
        { id: "RC002", number: "0976543210", operator: "Claro", amount: "30.00", status: "completed", date: "2024-01-15", time: "13:15" },
        { id: "RC003", number: "0965432109", operator: "Tigo", amount: "100.00", status: "pending", date: "2024-01-15", time: "12:45" },
    ]);

    const operatorColors = {
        Movistar: "bg-red-500",
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
            status: "completed",
            date: new Date().toISOString().split("T")[0],
            time: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
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
        { icon: LayoutDashboard, label: "Dashboard", active: true },
        { icon: Smartphone, label: "Recharges", active: false },
        { icon: History, label: "History", active: false },
        { icon: Users, label: "Users", active: false },
        { icon: Settings, label: "Settings", active: false },
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
                            <h1 className="font-bold text-lg">RechargeApp</h1>
                            <p className="text-sm text-gray-500">Admin Panel</p>
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
                            <h1 className="text-2xl font-bold">Recharge History</h1>
                            <p className="text-gray-500">Manage and monitor all recharges</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="relative">
                                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    placeholder="Search recharges..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10 w-80 border rounded-xl px-3 py-2"
                                />
                            </div>
                            <button
                                onClick={() => setModalOpen(true)}
                                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-xl flex items-center"
                            >
                                <Plus className="w-4 h-4 mr-2" /> New Recharge
                            </button>
                        </div>
                    </header>

                    {/* Table */}
                    <main className="flex-1 p-8">
                        <div className="bg-white/80 rounded-2xl border overflow-hidden">
                            <div className="p-6 border-b flex justify-between items-center">
                                <h2 className="text-lg font-semibold">Recent Recharges ({filteredRecharges.length})</h2>
                                <div className="flex gap-2">
                                    <button className="border px-4 py-1 rounded-lg flex items-center gap-2">
                                        <Filter className="w-4 h-4" /> Filter
                                    </button>
                                    <button className="border px-4 py-1 rounded-lg flex items-center gap-2">
                                        <Download className="w-4 h-4" /> Export
                                    </button>
                                </div>
                            </div>
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left">ID</th>
                                    <th className="px-6 py-3 text-left">Number</th>
                                    <th className="px-6 py-3 text-left">Operator</th>
                                    <th className="px-6 py-3 text-left">Amount</th>
                                    <th className="px-6 py-3 text-left">Status</th>
                                    <th className="px-6 py-3 text-left">Date</th>
                                    <th className="px-6 py-3 text-left">Time</th>
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
