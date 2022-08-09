import { basicDatabase } from './basic-database';

describe('basicDatabase', () => {
    it('should work', () => {
        expect(basicDatabase()).toEqual('basic-database');
    })
})