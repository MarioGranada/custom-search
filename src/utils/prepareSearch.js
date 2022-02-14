import initConfig from '../searchEngineConfig.json';
import enginesData from './loadEngines';

const loadEngineConfig = (engine) => {
  return {
    ...initConfig.engines[engine],
    ...enginesData.engines[engine]
  };
};

const prepareSearch = (engine, query) => {
  const { baseURL, method, queryParams, headers } = loadEngineConfig(engine);
  let searchURL = baseURL;
  Object.keys(queryParams).forEach((item) => {
    searchURL += `${item}=${queryParams[item]}&`;
  });
  searchURL += `q=${query}`;

  return {
    searchURL,
    method,
    headers
  };
};

export default prepareSearch;
