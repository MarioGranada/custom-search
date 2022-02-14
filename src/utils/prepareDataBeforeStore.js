import initConfig from '../searchEngineConfig.json';

const propByPath = (path, dataObj, separator = '.') => {
  const props = Array.isArray(path) ? path : path.split(separator);
  return props.reduce((prev, curr) => prev && prev[curr], dataObj);
};

const prepareDataBeforeStore = (engine, data) => {
  const { totalResults: totalSearchResults, itemsPath, itemProps } = initConfig.engines[engine];
  console.log(totalSearchResults, itemsPath, itemProps);
  const totalResults = propByPath(totalSearchResults, data);
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
  return { totalResults, items: simplifiedItemsList };
};

export default prepareDataBeforeStore;
