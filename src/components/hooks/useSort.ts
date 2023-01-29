import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Character } from '../../libs/types/Character';
import { setChracters } from '../../slices/SearchResult';
import { StateType } from '../../store';

export interface StateSort {
  characters: Character[];
}

const useSort = () => {
  const dispatch = useDispatch();

  const sortByKey = useCallback(
    (key: keyof Character, objects: Character[], value: boolean) => {
      if (value) {
        objects = objects.slice().sort((a, b) => (a[key] > b[key] ? 1 : -1));
      } else {
        objects = objects.slice().sort((a, b) => (a[key] < b[key] ? 1 : -1));
      }

      dispatch(setChracters(objects));
    },
    []
  );
  return { sortByKey };
};

export default useSort;
