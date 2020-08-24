export type TJson = null | Record<string, unknown>;

export const createStore = () => {
  return {
    json: null as TJson,
    jsonPath: '' as string,
  };
};

export type TStore = ReturnType<typeof createStore>;