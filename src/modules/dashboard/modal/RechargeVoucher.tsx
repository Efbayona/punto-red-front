import React, {useState, useEffect} from "react"
import {CheckCircle, Phone, CreditCard, Hash, Calendar, HelpCircle, Building2} from "lucide-react"
import {Card, CardContent} from "@/components/ui/card"
import {Button} from "@/components/ui/button"
import type {VoucherData} from "@/modules/dashboard/interfaces/Recharge.interface.ts"
import {formatCurrency, formatDateTime} from "@/utils/funtions.ts";

interface VoucherRechargeProps {
	data: VoucherData
}

export default function RechargeVoucher({data}: VoucherRechargeProps) {
	const [isVisible, setIsVisible] = useState(false)
	
	useEffect(() => {
		const timer = setTimeout(() => setIsVisible(true), 100)
		return () => clearTimeout(timer)
	}, [])
	
	return (
		<div className="w-[460px] h-[640px] bg-gradient-to-br from-blue-50 to-slate-100 flex items-center justify-center">
			<Card
				className={`w-[460px] h-[680px] max-w-xl mx-auto shadow-xl border-0 transition-all duration-700 transform ${
					isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
				}`}
			>
				<CardContent className="p-8">
					{/* Ícono de éxito */}
					<div className="flex justify-center mb-4">
						<div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
							<CheckCircle className="w-6 h-6 text-emerald-600"/>
						</div>
					</div>
					
					{/* Encabezado */}
					<div className="text-center mb-6">
						<h1 className="font-heading font-bold text-xl text-slate-800 mb-1">Recarga Exitosa</h1>
						<p className="text-slate-600 font-sans text-sm">Gracias por utilizar nuestro servicio</p>
					</div>
					
					{/* Detalles de la transacción */}
					<div className="space-y-4 mb-6">
						
						{/* ID Transacción */}
						<div className="flex items-start gap-3 py-2">
							<div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center mt-1">
								<Hash className="w-4 h-4 text-slate-600"/>
							</div>
							<div className="flex-1">
								<p className="font-sans text-xs text-slate-500 mb-1">ID Transacción</p>
								<p className="font-mono text-xs text-slate-700 break-all leading-relaxed">
									{data.transactionalID}
								</p>
							</div>
						</div>
						
						<DetailRow
							icon={<Building2 className="w-4 h-4 text-blue-600"/>}
							bgColor="bg-blue-100"
							label="Operador"
							value={data.operator || "Desconocido"}
						/>
						
						<DetailRow
							icon={<Phone className="w-4 h-4 text-blue-600"/>}
							bgColor="bg-blue-100"
							label="Teléfono"
							value={data.cellPhone}
						/>
						
						<DetailRow
							icon={<CreditCard className="w-4 h-4 text-emerald-600"/>}
							bgColor="bg-emerald-100"
							label="Monto Recargado"
							value={formatCurrency(data.value)}
							valueClass="font-heading font-bold text-lg text-emerald-600"
						/>
						
						<DetailRow
							icon={<Calendar className="w-4 h-4 text-slate-600"/>}
							bgColor="bg-slate-100"
							label="Fecha y Hora"
							value={formatDateTime(data.created_at)}
						/>
						
					</div>
					
					{/* Botón de acción */}
					<div className="space-y-3">
						<Button
							className="w-full from-pink-600 to-purple-500 hover:bg-purple-700 text-white font-sans font-medium py-2 rounded-xl transition-colors duration-200">
							<HelpCircle className="w-4 h-4 mr-2"/>
							¿Necesitas ayuda? Contáctanos
						</Button>
						
						<p className="text-center text-xs text-slate-500 font-sans mt-3">
							Conserve este comprobante para sus registros
						</p>
					</div>
				</CardContent>
			</Card>
		</div>
	)
}

function DetailRow({icon, bgColor, label, value, valueClass = "font-sans font-medium text-sm text-slate-800",}: {
	icon: React.ReactNode
	bgColor: string
	label: string
	value: string
	valueClass?: string
}) {
	return (
		<div className="flex items-center justify-between py-2 border-b border-slate-100">
			<div className="flex items-center gap-3">
				<div className={`w-8 h-8 ${bgColor} rounded-lg flex items-center justify-center`}>{icon}</div>
				<div>
					<p className="font-sans text-xs text-slate-500">{label}</p>
					<p className={valueClass}>{value}</p>
				</div>
			</div>
		</div>
	)
}
