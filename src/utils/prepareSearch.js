import initConfig from '../searchEngineConfig.json';

const loadEngineConfig = (engine) => {
  switch (engine) {
    case 'google':
      return {
        ...initConfig.engines[engine],
        queryParams: {
          key: process.env.REACT_APP_GOOGLE_API_KEY,
          cx: process.env.REACT_APP_GOOGLE_CX
        },
        headers: {}
      };
    case 'bing':
      return {
        ...initConfig.engines[engine],
        queryParams: {
          customconfig: process.env.REACT_APP_BING_CUSTOM_CONFIG_ID,
          mkt: 'en-US'
        },
        headers: {
          'Ocp-Apim-Subscription-Key': process.env.REACT_APP_BING_SUBSCRIPTION_KEY
        }
      };
    default:
      return {};
  }
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
