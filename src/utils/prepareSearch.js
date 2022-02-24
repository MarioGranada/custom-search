import initConfig from '../searchEngineConfig.json';
import enginesData from './loadEngines';

const loadEngineConfig = (engine) => {
  return {
    ...initConfig.engines[engine],
    ...enginesData.engines[engine]
  };
};

const prepareSearch = (engine, query, offsetValue) => {
  const {
    baseURL,
    method,
    queryParams,
    headers,
    defaultOffset,
    offsetParam,
    maxResults,
    itemsPerPage
  } = loadEngineConfig(engine);
  let searchURL = baseURL;
  Object.keys(queryParams).forEach((item) => {
    searchURL += `${item}=${queryParams[item]}&`;
  });
  console.log('in here offsetvalue', offsetValue);
  // searchURL += `q=${query}`;
  const calculatedOffset = offsetValue ? offsetValue : parseInt(defaultOffset); // Checks both null or undefined. offsetValue can be zero (0).
  const maxOffset = parseInt(maxResults) - parseInt(itemsPerPage);
  const validatedOffset = calculatedOffset > maxOffset ? maxOffset : calculatedOffset;

  searchURL += `q=${query}&${offsetParam}=${validatedOffset}`;

  return {
    searchURL,
    method,
    headers
  };
};

export default prepareSearch;
