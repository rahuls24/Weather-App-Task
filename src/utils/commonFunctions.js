export function changeTempFromKelvinToCelsiusOrFahrenheit(
	tmpInKelvin,
	changeOn = 'celsius',
) {
	let result = 0;
	if (changeOn === 'fahrenheit') {
		result = ((Number(tmpInKelvin) - 273.15) * 9) / 5 + 32;
	} else {
		result = Number(tmpInKelvin) - 273.15;
	}
	return result.toFixed(1);
}
export function capitalizeFirstLetter(string = '') {
	return string.charAt(0).toUpperCase() + string.slice(1);
}
