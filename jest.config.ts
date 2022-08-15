import apiConfig from './apps/api/jest.config';
import apiE2EConfig from './apps/api/test/jest-e2e';

export default {
  projects: [apiConfig, apiE2EConfig]
}
