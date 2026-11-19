import initConfig from '../searchEngineConfig.json';

export const propByPath = (path, dataObj, separator = '.') => {
  const props = Array.isArray(path) ? path : path.split(separator);
  return props.reduce((prev, curr) => prev && prev[curr], dataObj);
};

/** Normalises an engine response into `{ items, hasMore }` using the engine config. */
const prepareDataBeforeStore = (engine, data) => {
  const { itemsPath, hasMorePath, itemProps } = initConfig.engines[engine];
  const itemsList = propByPath(itemsPath, data) || [];
  const items = itemsList.map((item) =>
    itemProps.reduce((simplified, prop) => {
      const [propName, alias] = prop.split(':');
      return { ...simplified, [alias || propName]: item[propName] };
    }, {})
  );
  return { items, hasMore: Boolean(propByPath(hasMorePath, data)) };
};

export default prepareDataBeforeStore;
