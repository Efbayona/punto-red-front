import { describe, it, expect } from 'vitest'
import { formatCurrency, formatPhone, formatDate, formatDateTime } from '@/utils/funtions.ts'

describe('Utils Functions', () => {
	
	it('formatCurrency formats number string correctly', () => {
		expect(formatCurrency("123456")).toBe("123.456 COP")
		expect(formatCurrency("0")).toBe("0 COP")
		expect(formatCurrency("abc")).toBe("NaN COP") // porque parseInt("abc") = NaN, cuidado con este caso
	})
	
	it('formatPhone formats a 10 digit phone correctly', () => {
		expect(formatPhone("1234567890")).toBe("123 456 7890")
		expect(formatPhone("9876543210")).toBe("987 654 3210")
		// caso con menos o más dígitos no cambiará la cadena
		expect(formatPhone("12345")).toBe("12345")
	})
	
	it('formatDate returns formatted date string', () => {
		const testDate = "2023-08-12T15:30:00Z"
		const result = formatDate(testDate)
		expect(typeof result).toBe("string")
		expect(result.length).toBeGreaterThan(0)
		
		// Si no se pasa fecha, debería retornar algo (fecha actual)
		const noDateResult = formatDate()
		expect(typeof noDateResult).toBe("string")
		expect(noDateResult.length).toBeGreaterThan(0)
	})
	
	it('formatDateTime formats ISO date string correctly', () => {
		const isoDate = "2023-08-12T15:30:00Z"
		const formatted = formatDateTime(isoDate)

		// Formato esperado "dd/mm/yy hh:mm AM/PM"
		expect(formatted).toMatch(/\d{2}\/\d{2}\/\d{2} \d{2}:\d{2}/)
	})
})
