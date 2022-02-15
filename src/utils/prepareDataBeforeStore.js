import initConfig from '../searchEngineConfig.json';

const propByPath = (path, dataObj, separator = '.') => {
  const props = Array.isArray(path) ? path : path.split(separator);
  return props.reduce((prev, curr) => prev && prev[curr], dataObj);
};

const prepareDataBeforeStore = (engine, data) => {
  const { totalResults: totalSearchResultsPath, itemsPath, itemProps } = initConfig.engines[engine];
  const totalResults = propByPath(totalSearchResultsPath, data);
  const itemsList = propByPath(itemsPath, data);
  let simplifiedItemsList = [];
  if (itemsList && itemsList.length > 0) {
    simplifiedItemsList = itemsList.map((item) => {
      const simplifiedItem = {};
      itemProps.map((prop) => {
        const [propName, alias] = prop.split(':');
        simplifiedItem[alias || propName] = item[propName];
      });
      return simplifiedItem;
    });
  }
  return { totalResults: parseInt(totalResults, 10), items: simplifiedItemsList };
};

export default prepareDataBeforeStore;
