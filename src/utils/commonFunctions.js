export function changeTempFromKelvinToCelsiusOrFahrenheit(
	tmpInKelvin,
	changeOn = 'celsius',
	toFixed = 1,
) {
	let result = 0;
	if (changeOn === 'fahrenheit') {
		result = ((Number(tmpInKelvin) - 273.15) * 9) / 5 + 32;
	} else {
		result = Number(tmpInKelvin) - 273.15;
	}
	return result.toFixed(toFixed);
}
export function capitalizeFirstLetter(string = '') {
	return string.charAt(0).toUpperCase() + string.slice(1);
}
export function formatAMPM(date) {
	let hours = twoDigits(date.getUTCHours());
	let minutes = twoDigits(date.getUTCMinutes());
	const ampm = hours >= 12 ? 'pm' : 'am';
	hours = hours % 12;
	hours = hours ? hours : 12; // the hour '0' should be '12'
	minutes = minutes < 10 ? `0${minutes}` : minutes;
	const strTime = hours + `:${minutes} ${ampm}`;
	console.log(strTime, 'pant');
	return strTime;
}

export function isValidUsZipCode(zipCode = '') {
	return /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(zipCode);
}
export function twoDigits(val) {
	return ('0' + val).slice(-2);
}
