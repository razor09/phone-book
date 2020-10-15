import { Property } from '../models';

class Helpers {

	public isString(property: Property): property is string {
		return typeof property === 'string';
	}
}

export const helpers = new Helpers();