import {useCallback, useEffect, useMemo, useState} from "react";
import {History, LayoutDashboard, Plus, Search, Settings, Smartphone, Users} from "lucide-react";
import {rechargeHistoryService} from "@/modules/dashboard/services/RechargeHistoryService.ts";
import type {PageResponse, RechargeHistoryResponse} from "../interfaces/Recharge.interface.ts";
import RechargeModal from "@/modules/dashboard/modal/RechargeModal.tsx";
import {formatCurrency, formatDateTime} from "@/utils/funtions.ts";

export default function RechargeDashboard() {
	const [modalOpen, setModalOpen] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");
	const [recharges, setRecharges] = useState<PageResponse<RechargeHistoryResponse> | null>(null);
	const [page, setPage] = useState(0);
	const [totalPages, setTotalPages] = useState(0);
	
	const operatorColors: Record<string, string> = {
		Movistar: "bg-green-500",
		Claro: "bg-red-600",
		Tigo: "bg-blue-600",
		Wom: "bg-purple-500",
	};

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
			const operatorName = r.supplierId;
			const cellPhone = r.cell_phone;
			const transactionalId = r.transactional_id;
			
			const match =
				cellPhone.toLowerCase().includes(term) ||
				operatorName.includes(term) ||
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
					<main className="flex-1 p-8">
						<div className="bg-white/80 rounded-2xl border overflow-hidden">
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
								{filteredRecharges.map(({transactional_id, cell_phone, operator, value, message, createdAt}) => {
									const colorClass = operatorColors[operator as keyof typeof operatorColors] ?? "bg-gray-400";
									return (
										<tr key={transactional_id} className="border-t hover:bg-gray-50">
											<td className="px-6 py-3">{cell_phone}</td>
											<td className="px-6 py-3 flex items-center gap-2">
												<span className={`w-3 h-3 rounded-full ${colorClass}`}/>
												{operator}
											</td>
											<td className="px-6 py-3 font-bold">{formatCurrency(value)}</td>
											<td className="px-6 py-3">{message}</td>
											<td className="px-6 py-3">{formatDateTime(createdAt)}</td>
										</tr>
									);
								})}
								</tbody>
							</table>
							<div className="flex justify-center gap-2 p-4">
								<button
									disabled={page === 0}
									onClick={() => setPage((p) => p - 1)}
									className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50">
									Anterior
								</button>
								<span>Página {page + 1} de {totalPages}</span>
								<button
									disabled={page === totalPages - 1}
									onClick={() => setPage((p) => p + 1)}
									className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50">
									Siguiente
								</button>
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
