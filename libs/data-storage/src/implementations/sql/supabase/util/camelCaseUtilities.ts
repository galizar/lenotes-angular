/** Transforms an array of snake_case strings to camelCase strings */
export const camelCasify = (str: string) => {
	return str.replace(/_./gi, s => s.replace(/_/, '').toUpperCase());
}

export const snakeCasify = (str: string) => {
	return str.replace(/[A-Z]/g, s => '_' + s.toLowerCase());
}

/** Transforms the snake_case properties of on object to camelCase */
export const propsCamelCasify = (obj: Object) => {

	const newObj = Object.create(null);

	for (let [prop, value] of Object.entries(obj)) {

		prop = camelCasify(prop); 
		newObj[prop] = value;
	}

	return newObj;
}

/** Transforms the camelCase properties of on object to snake_case */
export const propsSnakeCasify = (obj: Object) => {

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
	'a_snake_case_string': 'lel'
};

const propsSnakeCasifyTestObj = {
	'oneTwoThree': 123,
	'holaHelloHallo': 'foo',
	'aCamelCaseString': 'lel'
};
