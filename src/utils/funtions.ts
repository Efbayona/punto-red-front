export const formatCurrency = (value: string) => {
	const formattedNumber = new Intl.NumberFormat("es-CO", {
		minimumFractionDigits: 0,
	}).format(Number.parseInt(value))
	return `${formattedNumber} COP`
}

export const formatPhone = (phone: string) => {
	return phone.replace(/(\d{3})(\d{3})(\d{4})/, "$1 $2 $3")
}

export const formatDate = (dateString?: string) => {
	if (!dateString) {
		return new Date().toLocaleDateString("es-CO", {
			year: "numeric",
			month: "long",
			day: "numeric",
			hour: "2-digit",
			minute: "2-digit",
		})
	}
	return new Date(dateString).toLocaleDateString("es-CO", {
		year: "numeric",
		month: "long",
		day: "numeric",
		hour: "2-digit",
		minute: "2-digit",
	})
}

