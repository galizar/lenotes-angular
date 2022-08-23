import { Observable, combineLatest, map } from 'rxjs';

/**
 * This utility function unwraps source observables and maps them to their latest values.
 * 
 * @param obj - An object that maps view model property names to their
 * source observables.
 * @returns An observable of an object that maps view model property names to
 * their values
 */
export function buildViewModel<VM extends object>(obj: { [P in keyof VM]: Observable<VM[P]> }): Observable<VM> {

	return combineLatest(
		Object.values(obj)
	).pipe(
		map(values => {
			let vm = Object.create(null);
			const props = Object.keys(obj);
			for (let i = 0; i < values.length; i++) {
				vm[props[i]] = values[i];
			}
			return vm;
		})
	);
}