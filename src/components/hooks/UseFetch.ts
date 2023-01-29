import { useDispatch } from 'react-redux';
import { useCallback, useState } from 'react';
import axios from 'axios';
import {
  ActionFailed,
  GetFetchResults,
  setPage,
  StartLoadingAction,
} from '../../slices/SearchResult';
import { useSearchParams } from 'react-router-dom';

export function useFetch() {
  const dispatch = useDispatch();
  const URL = 'https://rickandmortyapi.com/api/character';
  const [searchParams, setSearchParams] = useSearchParams();

  const fetchData = useCallback(async () => {
    const newPage = searchParams.get('page');
    const name = searchParams.get('name');

    try {
      dispatch(StartLoadingAction());
      const response = await axios.get(URL, {
        params: { page: newPage, name: name },
      });
      const { info, results } = response.data;
      dispatch(GetFetchResults({ info, results }));

      if (newPage) dispatch(setPage(parseInt(newPage)));
    } catch (error: any) {
      dispatch(ActionFailed(error.message));
    }
  }, [searchParams]);

  return { fetchData };
}
