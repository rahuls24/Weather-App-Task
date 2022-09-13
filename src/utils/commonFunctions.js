/**
 *
 * @param {string | number} tmpInKelvin temperature value of which you want to convert
 * @param {'celsius' | 'fahrenheit' } changeOn temperature unit on which you want to convert
 * @param {number} toFixed Maximum unit after decimal
 * @returns {string} temperature after conversion
 */
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

/**
 *
 * @param {Date} date
 * @returns {string} formatted time in 12 hr format
 */
export function formatAMPM(date) {
	let hours = twoDigits(date.getUTCHours());
	const minutes = twoDigits(date.getUTCMinutes());
	const ampm = hours >= 12 ? 'pm' : 'am';
	hours = hours % 12;
	hours = hours ? hours : 12; // the hour '0' should be '12'
	const strTime = hours + `:${minutes} ${ampm}`;
	return strTime;
}

export function isValidUsZipCode(zipCode = '') {
	return /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(zipCode);
}
export function twoDigits(val) {
	return ('0' + val).slice(-2);
}
