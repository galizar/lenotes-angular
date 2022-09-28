/** Transforms an array of snake_case strings to camelCase strings */
export const camelCasify = (str: string) => {
	return str.replace(/_./gi, s => s.replace(/_/, '').toUpperCase());
}

export const snakeCasify = (str: string) => {
	return str.replace(/[A-Z]/g, s => '_' + s.toLowerCase());
}

/** Transforms an object with snake_case properties to camelCase 
 * @returns the transformed object
*/
export function propsCamelCasify(obj: {[P: string]: any}) {

	const newObj = Object.create(null);

	for (let prop of Object.keys(obj)) {

		prop = camelCasify(prop); 
		newObj[prop] = obj[prop];
	}

	return newObj;
}

/** 
 * Transforms an object with camelCase properties to snake_case 
 * @returns the transformed object
 * */
export function propsSnakeCasify(obj: {[P: string]: any}) {

	const newObj = Object.create(null);

	for (let [prop, value] of Object.entries(obj)) {

		prop = snakeCasify(prop);
		newObj[prop] = value;
	}

	return newObj;
}

const propsCamelCasifyTestObj = {
	'one_two_three': 123,
	'hola_hello_hallo': 'foo',
	'a_snake_case_string': 'bar',
	'a_5nake_case_string': 'xD'
};

const propsSnakeCasifyTestObj = {
	'oneTwoThree': 123,
	'holaHelloHallo': 'foo',
	'aCamelCaseString': 'bar'
};
