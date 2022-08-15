import { DomainObject } from "@lenotes-ng/shared/model"

/** 
 *  This partial type is used for update requests.
 *  The key is the name of the property to update.
 *  The value is the new value of said property.
 * 
 * 	id is not a valid property to update.
 */
export type UpdateDto<T extends DomainObject> = Partial<Omit<T, 'id'>>;
