import { Check, Phone, Hash, DollarSign, Building2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {formatCurrency, formatDate, formatPhone} from "@/utils/funtions.ts";
import type {VoucherData} from "@/modules/dashboard/interfaces/Recharge.interface.ts";

interface VoucherRechargeProps {
	data: VoucherData;
}

export default function RechargeVoucher({ data }: VoucherRechargeProps) {

	console.log(data)
	
	return (
		<Card className="w-full max-w-md mx-auto bg-white border border-gray-200 shadow-lg z-10">
			<CardContent className="p-8 space-y-6">
				{/* Header con estado */}
				<div className="text-center space-y-3">
					<div className="inline-flex items-center justify-center w-16 h-16 bg-green-50 rounded-full">
						<Check className="w-8 h-8 text-green-600" />
					</div>
					<h2 className="text-xl font-semibold text-gray-900">{data.message}</h2>
					<p className="text-sm text-gray-500">{formatDate(data.transactionDate)}</p>
				</div>

				{/* Divider */}
				<div className="border-t border-gray-200"></div>

				{/* Detalles de la transacción */}
				<div className="space-y-5">
					<div className="flex items-center justify-between">
						<div className="flex items-center space-x-3 text-gray-600">
							<Building2 className="w-5 h-5" />
							<span className="text-sm font-medium">Operador</span>
						</div>
						<span className="text-sm font-semibold text-gray-900">{data.cellPhone}</span>
					</div>

					<div className="flex items-center justify-between">
						<div className="flex items-center space-x-3 text-gray-600">
							<Phone className="w-5 h-5" />
							<span className="text-sm font-medium">Teléfono</span>
						</div>
						<span className="text-sm font-mono text-gray-900">{formatPhone(data.cellPhone)}</span>
					</div>

					<div className="flex items-center justify-between">
						<div className="flex items-center space-x-3 text-gray-600">
							<DollarSign className="w-5 h-5" />
							<span className="text-sm font-medium">Valor</span>
						</div>
						<span className="text-lg font-bold text-gray-900">{formatCurrency(data.value)}</span>
					</div>

					<div className="flex items-start justify-between">
						<div className="flex items-center space-x-3 text-gray-600">
							<Hash className="w-5 h-5 mt-0.5" />
							<span className="text-sm font-medium">ID Transacción</span>
						</div>
						<span className="text-xs font-mono text-gray-700 text-right max-w-[180px] break-all leading-relaxed">
              {data.transactionalID}
            </span>
					</div>
				</div>

				{/* Footer */}
				<div className="pt-6 border-t border-gray-200">
					<p className="text-xs text-gray-500 text-center leading-relaxed">
						Conserve este comprobante para sus registros
					</p>
				</div>
			</CardContent>
		</Card>
	);
}
