import { HttpStatus, INestApplication } from "@nestjs/common";
import request from 'supertest';

/**
 * Used for testing PATCH requests on domain object controllers.
 * 
 * @param domainObjectId - ID of object to update
 * @param dto - Type is object to allow passing of incorrect DTOs. A correct
 * DTO is the respective Update DTO of the domain object. 
 * @param status - The expected status code of the response.
 * @param apiRoot - Api root of the domain object controller. Must start with /.
 * @returns
 */
export const updateDomainObjectTestRequest =
	(
		domainObjectId: number, 
		dto: object,
		status: HttpStatus,
		app: INestApplication,
		apiRoot: string
	) => {

		return request(app.getHttpServer())
			.patch(`${apiRoot}/${domainObjectId}`)
			.send(dto)
			.expect(status);
	};
