export const formatCurrency = (value: number) => {
	const formattedNumber = new Intl.NumberFormat("es-CO", {
		minimumFractionDigits: 0,
	}).format(value);
	
	return `${formattedNumber} COP`;
};


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
export const formatDateTime = (isoString: string): string => {
	const dateObj = new Date(isoString);
	
	const formattedDate = dateObj.toLocaleDateString("es-ES", {
		day: "2-digit",
		month: "2-digit",
		year: "2-digit"
	});
	
	const formattedTime = dateObj.toLocaleTimeString("es-ES", {
		hour: "2-digit",
		minute: "2-digit",
		hour12: true
	});
	
	return `${formattedDate} ${formattedTime}`;
};

