import { transform as _transform, isObject as _isObject, mapKeys as _mapKeys, assign as _assign } from 'lodash';
import { JSONPath } from 'jsonpath-plus';

import { TJson } from './store';

// eslint-disable-next-line
export const toType = (obj: any): string => {
  let type = getType(obj);
  if (type === 'number') {
    if (isNaN(obj)) {
      type = 'nan';
    } else if ((obj | 0) != obj) {
      //bitwise OR produces integers
      type = 'float';
    } else {
      type = 'integer';
    }
  }
  return type;
};

//source: http://stackoverflow.com/questions/7390426/better-way-to-get-type-of-a-javascript-variable/7390612#7390612
const getType = (obj: any): string => {
  return {}.toString
    .call(obj)
    .match(/\s([a-zA-Z]+)/)[1]
    .toLowerCase();
};

// eslint-disable-next-line
export const objectPaths = (obj: any): Record<string, unknown> => {
  return _transform(
    obj,
    (result: Record<string, unknown>, value: unknown, key: string) => {
      if (_isObject(value)) {
        const flatMap = _mapKeys(objectPaths(value), function (_mvalue, mkey) {
          return `${key}.${mkey}`;
        });

        _assign(result, flatMap);
      } else {
        result[String(key)] = false;
      }

      return result;
    },
    {},
  );
};

export const matchPaths = (json: TJson, path: string): string[] => {
  const paths = JSONPath({
    path,
    json,
    resultType: 'pointer',
  }).map((pointer: string) => pointer.replace(/\//g, '.').substring(1));

  if (paths.includes('')) {
    return [''];
  }

  return paths.reduce((matchedPaths: string[], path: string) => {
    for (const matchedPath in matchedPaths) {
      if (path.includes(matchedPath)) {
        return matchedPaths;
      }
    }

    return [...matchedPaths, path];
  }, []);
};
