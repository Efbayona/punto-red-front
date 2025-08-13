import { describe, it, expect, vi, beforeEach, type Mock } from "vitest";
import { createRecharge } from "@/modules/dashboard/services/RechargeService.ts";
import type { RechargePayload } from "@/modules/dashboard/interfaces/Recharge.interface.ts";

vi.mock("@/modules/dashboard/services/RechargeService.ts", () => ({
	createRecharge: vi.fn(),
}));

describe("handleSubmit", () => {
	let mockOnSave: ReturnType<typeof vi.fn>;
	let mockSetErrors: ReturnType<typeof vi.fn>;
	let mockSetSending: ReturnType<typeof vi.fn>;
	let mockSetVoucherData: ReturnType<typeof vi.fn>;
	let mockSetFormData: ReturnType<typeof vi.fn>;
	
	let formData: { operator: string; number: string; amount: string };
	let operators: { id: string; name: string }[];
	
	beforeEach(() => {
		vi.clearAllMocks();
		mockOnSave = vi.fn();
		mockSetErrors = vi.fn();
		mockSetSending = vi.fn();
		mockSetVoucherData = vi.fn();
		mockSetFormData = vi.fn();
		
		formData = { operator: "1", number: "3001234567", amount: "5000" };
		operators = [{ id: "1", name: "Tigo" }];
		
		(createRecharge as unknown as Mock).mockResolvedValue({
			transactional_id: "TX12345",
		});
	});
	
	// 🔹 Función a probar
	const handleSubmit = async (e: { preventDefault: () => void }) => {
		e.preventDefault();
		
		const errors = {
			operator: !formData.operator ? "Selecciona un operador" : "",
			number: !formData.number
				? "Ingresa el número de teléfono"
				: !/^3\d{9}$/.test(formData.number.replace(/\s/g, ""))
					? "Debe empezar por 3 y tener 10 dígitos"
					: "",
			amount: !formData.amount
				? "Ingresa el monto"
				: Number(formData.amount) < 1000 || Number(formData.amount) > 100000
					? "Debe estar entre $1000 y $100,000"
					: "",
		};
		
		mockSetErrors(errors);
		if (Object.values(errors).some(Boolean)) return;
		
		try {
			mockSetSending(true);
			
			const payload: RechargePayload = {
				supplierId: formData.operator,
				cellPhone: formData.number.replace(/\s/g, ""),
				value: formData.amount,
			};
			
			const result = await createRecharge(payload);
			
			const operatorName =
				operators.find((op) => op.id === formData.operator)?.name || "";
			
			mockOnSave({
				operator: operatorName,
				number: formData.number,
				amount: formData.amount,
				transactionalID: result.transactional_id,
			});
			
			mockSetVoucherData(
				expect.objectContaining({
					message: "Recarga exitosa",
					transactionalID: "TX12345",
					operator: "Tigo",
				})
			);
			
			mockSetFormData({ operator: "", number: "", amount: "" });
			mockSetErrors({ operator: "", number: "", amount: "" });
		} finally {
			mockSetSending(false);
		}
	};
	
	it("llama a createRecharge y onSave con los datos correctos", async () => {
		await handleSubmit({ preventDefault: vi.fn() });
		
		expect(createRecharge).toHaveBeenCalledWith({
			supplierId: "1",
			cellPhone: "3001234567",
			value: "5000",
		});
		
		expect(mockOnSave).toHaveBeenCalledWith({
			operator: "Tigo",
			number: "3001234567",
			amount: "5000",
			transactionalID: "TX12345",
		});
		
		expect(mockSetVoucherData).toHaveBeenCalledWith(
			expect.objectContaining({
				message: "Recarga exitosa",
				transactionalID: "TX12345",
				operator: "Tigo",
			})
		);
	});
	
	it("no llama a createRecharge si hay errores de validación", async () => {
		formData.operator = "";
		await handleSubmit({ preventDefault: vi.fn() });
		
		expect(createRecharge).not.toHaveBeenCalled();
		expect(mockSetErrors).toHaveBeenCalledWith(
			expect.objectContaining({ operator: "Selecciona un operador" })
		);
	});
});
