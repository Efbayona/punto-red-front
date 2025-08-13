import {CreditCard, Smartphone, X, Banknote} from "lucide-react";
import {useState, useEffect, type FormEvent} from "react";
import {getOperators} from "@/modules/dashboard/services/OperatorService.ts";
import {createRecharge} from "@/modules/dashboard/services/RechargeService.ts";
import type {ModalProps, RechargePayload, VoucherData} from "@/modules/dashboard/interfaces/Recharge.interface.ts";
import RechargeVoucher from "@/modules/dashboard/modal/RechargeVoucher.tsx";

const quickAmounts = [1000, 5000, 10000, 20000, 50000, 100000];

export default function RechargeModal({isOpen, onClose, onSave}: ModalProps) {
	const [loading, setLoading] = useState(false);
	const [sending, setSending] = useState(false);
	const [formData, setFormData] = useState({operator: "", number: "", amount: ""});
	const [operators, setOperators] = useState<{ id: string; name: string }[]>([]);
	const [errors, setErrors] = useState({operator: "", number: "", amount: ""});
	const [voucherData, setVoucherData] = useState<VoucherData | null>(null);
	const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
	
	useEffect(() => {
		if (!isOpen) return;
		setLoading(true);
		setVoucherData(null);
		setSelectedAmount(null);
		
		getOperators()
		.then((data) => {
			console.log("Operadores recibidos:", data);
			setOperators(data);
		})
		.catch((err) => {
			console.error("Error obteniendo operadores:", err);
		})
		.finally(() => {
			console.log("Finalizó carga de operadores");
			setLoading(false);
		});
	}, [isOpen]);
	
	const handleQuickAmountClick = (amount: number) => {
		setSelectedAmount(amount);
		setFormData((prev) => ({...prev, amount: amount.toString()}));
		if (errors.amount) setErrors((prev) => ({...prev, amount: ""}));
	};
	
	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		
		const numberClean = formData.number.replace(/\s/g, "");
		const valueNum = Number(formData.amount);
		
		const newErrors = {
			operator: !formData.operator ? "Selecciona un operador" : "",
			number: !formData.number
				? "Ingresa el número de teléfono"
				: !/^3\d{9}$/.test(numberClean)
					? "Debe empezar por 3 y tener 10 dígitos"
					: "",
			amount: !formData.amount
				? "Ingresa el monto"
				: valueNum < 1000 || valueNum > 100000
					? "Debe estar entre $1000 y $100,000"
					: "",
		};
		
		setErrors(newErrors);
		if (Object.values(newErrors).some(Boolean)) return;
		
		try {
			setSending(true);
			
			const operatorName = operators.find(op => op.id === formData.operator)?.name ?? "";
			
			const payload: RechargePayload = {
				operator: operatorName,
				supplierId: formData.operator,
				cellPhone: numberClean,
				value: valueNum,
			};
			
			const result = await createRecharge(payload);
			console.log("Respuesta createRecharge:", result);
			
			setVoucherData({
				message: "Recarga exitosa",
				transactionalID: result.transactional_id,
				cellPhone: numberClean,
				value: valueNum,
				operator: operatorName,
				created_at: new Date().toISOString(),
			});
			
			onSave?.();
			
			setFormData({operator: "", number: "", amount: ""});
			setErrors({operator: "", number: "", amount: ""});
		} catch (error) {
			console.error("Error al enviar recarga:", error);
		} finally {
			setSending(false);
		}
	};
	
	const formatCurrency = (value: number) =>
		new Intl.NumberFormat("es-CO", {minimumFractionDigits: 0}).format(value);
	
	if (!isOpen) return null;
	
	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center">
			<div className="absolute inset-0 bg-black/50" onClick={onClose}></div>
			
			{!voucherData ? (
				<div className="relative bg-white rounded-xl p-6 shadow-lg w-full max-w-md z-10">
					<button
						className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
						onClick={onClose}
					>
						<X className="w-5 h-5"/>
					</button>
					
					{/* Header */}
					<div className="text-center mb-6">
						<div
							className="mx-auto w-16 h-16 bg-gradient-to-r from-pink-600 to-purple-500 rounded-full flex items-center justify-center mb-4">
							<Smartphone className="w-8 h-8 text-white"/>
						</div>
						<h2 className="text-2xl font-bold">Nueva Recarga</h2>
						<p className="text-gray-600">Recarga tu celular rápido y seguro</p>
					</div>
					
					<form onSubmit={handleSubmit} className="space-y-4">
						{/* Operator */}
						<div>
							<label className="block font-bold text-[14px] mb-[6px]">Operador</label>
							<select
								value={formData.operator}
								onChange={(e) =>
									setFormData({...formData, operator: e.target.value})
								}
								className={`mt-1 w-full border rounded-lg px-3 py-2 ${
									errors.operator ? "border-red-500" : "border-gray-300"
								}`}
								disabled={loading}
								style={{
									appearance: "none",
									backgroundImage:
										"url(\"data:image/svg+xml;utf8,<svg fill='gray' height='20' viewBox='0 0 24 24' width='20' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/></svg>\")",
									backgroundRepeat: "no-repeat",
									backgroundPosition: "right 0.75rem center",
									backgroundSize: "20px 20px",
								}}
							>
								<option value="">
									{loading ? "Cargando..." : "Selecciona tu operador"}
								</option>
								{operators.map((op) => (
									<option key={op.id} value={op.id}>
										{op.name}
									</option>
								))}
							</select>
							
							{errors.operator && (
								<p className="text-sm text-red-500">{errors.operator}</p>
							)}
						</div>
						
						{/* Número */}
						<div>
							<label className="block font-bold text-[14px] mb-[6px]">
								Número de celular
							</label>
							<div className="relative">
								<Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4"/>
								<input
									type="text"
									value={formData.number}
									onChange={(e) => {
										const value = e.target.value;
										setFormData({...formData, number: value});
										setErrors({
											...errors,
											number: !/^3\d{9}$/.test(value) ? "Debe empezar por 3 y tener 10 dígitos" : "",
										});
									}}
									maxLength={12}
									placeholder="Ej: 315 281 5255"
									className={`pl-10 w-full border rounded-lg px-3 py-2 ${
										errors.number ? "border-red-500" : "border-gray-300"
									}`}
								/>
							</div>
							{errors.number && (
								<p className="mt-1 text-sm text-red-500">{errors.number}</p>
							)}
						</div>
						
						{/* Amount */}
						<div>
							<label className="block font-bold text-[14px] mb-[6px]">
								Monto de recarga
							</label>
							
							{/* Quick Amount Buttons */}
							<div className="grid grid-cols-3 gap-3 mb-3">
								{quickAmounts.map((amount) => (
									<button
										type="button"
										key={amount}
										className={`h-14 rounded-lg text-sm font-medium flex flex-col items-center justify-center gap-1 border ${
											selectedAmount === amount
												? "bg-gradient-to-r from-pink-600 to-purple-500 text-white border-0"
												: "border-gray-300 text-gray-700 hover:bg-gray-50"
										}`}
										onClick={() => handleQuickAmountClick(amount)}
									>
                                        <span className="font-bold">
                                            ${formatCurrency(amount)}
                                        </span>
										<span className="text-xs opacity-75">COP</span>
									</button>
								))}
							</div>
							
							{/* Manual Amount Input */}
							<div className="relative mt-[6px]">
								<Banknote className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4"/>
								<input
									type="text"
									value={formData.amount ? Number(formData.amount).toLocaleString("es-CO") : ""}
									onChange={(e) => {
										const rawValue = e.target.value.replace(/\D/g, "");
										const num = Number(rawValue);
										
										setFormData({...formData, amount: rawValue});
										setSelectedAmount(null);
										setErrors({
											...errors,
											amount: num < 1000 || num > 100000 ? "Debe estar entre 1,000 y 100,000" : "",
										});
									}}
									placeholder="10.000"
									className={`pl-10 pr-12 w-full border rounded-lg px-3 py-2 ${
										errors.amount ? "border-red-500" : "border-gray-300"
									}`}
								/>
								<span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
                                    COP
                                </span>
							</div>
							{errors.amount && (
								<p className="text-sm text-red-500">{errors.amount}</p>
							)}
						</div>
						
						{/* Buttons */}
						<div className="flex gap-3 pt-2">
							<button type="button" onClick={onClose}
							        className="flex-1 h-12 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
								Cancelar
							</button>
							<button type="submit"
							        disabled={sending}
							        className="flex-1 h-12 bg-gradient-to-r from-pink-600 to-purple-500 text-white rounded-lg flex items-center justify-center gap-2"
							>
								{sending ? (
									<div className="flex items-center gap-2">
										<div
											className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"/>
										Procesando...
									</div>
								) : (
									<>
										<CreditCard className="w-5 h-5"/>
										Recargar
									</>
								)}
							</button>
						</div>
					</form>
				</div>
			) : (
				<RechargeVoucher data={voucherData}/>
			)}
		</div>
	);
}
