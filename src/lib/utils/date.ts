/* FORMAT */
export function formatDateTime(datetime: Date) {
	const diasSemana = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SÁB"]

	const diaSemana = diasSemana[datetime.getDay()]
	const dia = String(datetime.getDate()).padStart(2, "0")
	const mes = String(datetime.getMonth() + 1).padStart(2, "0")
	const ano = datetime.getFullYear()

	const horas = String(datetime.getHours()).padStart(2, "0")
	const minutos = String(datetime.getMinutes()).padStart(2, "0")

	return `${diaSemana}, ${dia}/${mes}/${ano} - ${horas}:${minutos}`
}

export function formatDate(datetime: Date) {
	const diasSemana = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SÁB"]

	const diaSemana = diasSemana[datetime.getDay()]
	const dia = String(datetime.getDate()).padStart(2, "0")
	const mes = String(datetime.getMonth() + 1).padStart(2, "0")
	const ano = datetime.getFullYear()

	return `${diaSemana}, ${dia}/${mes}/${ano}`
}
