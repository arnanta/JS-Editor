import { useReducer } from 'react';

export enum ACTION_TYPES {
  ADD = 'ADD',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
  CLEAR = 'CLEAR',
}

export type MapAction<K, V> =
  | { type: ACTION_TYPES.ADD | ACTION_TYPES.UPDATE; key: K; value: V }
  | { type: ACTION_TYPES.DELETE; key: K }
  | { type: ACTION_TYPES.CLEAR };

/**
 * A custom hook for managing Map data structure in React state
 * @param initialValue - The initial Map to use
 * @returns [map, dispatch] - The current map state and dispatch function
 */
function useMap<K, V>(initialValue: Map<K, V> = new Map()) {
  const reducer = (state: Map<K, V>, action: MapAction<K, V>): Map<K, V> => {
    const newMap = new Map(state);

    switch (action.type) {
      case ACTION_TYPES.ADD:
      case ACTION_TYPES.UPDATE:
        newMap.set(action.key, action.value);
        break;
      case ACTION_TYPES.DELETE:
        newMap.delete(action.key);
        break;
      case ACTION_TYPES.CLEAR:
        newMap.clear();
        break;
    }

    return newMap;
  };

  const [map, dispatch] = useReducer(reducer, initialValue);

  return [map, dispatch] as const;
}

export default useMap;
