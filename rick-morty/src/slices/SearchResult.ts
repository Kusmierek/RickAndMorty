import { useSearchParams } from 'react-router-dom';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Character } from '../libs/types/Character';
import { Info } from '../libs/types/info';
// import { useParams } from '../components/hooks/UseParamsURL';

export interface SearchResultsTypes {
  info: Info;
  characters: Character[];
  isFailed: boolean;
  isLoading: boolean;
  pageCurrent: number;
}

const initialState: SearchResultsTypes = {
  info: {
    count: 0,
    pages: 0,
    next: null,
    prev: null,
  },
  characters: [],
  isFailed: false,
  isLoading: false,
  pageCurrent: 0,
};

export const SearchResult = createSlice({
  name: 'SearchResults',
  initialState,
  reducers: {
    GetFetchResults(
      state: SearchResultsTypes,
      action: PayloadAction<{ info: Info; results: Character[] }>
    ) {
      state.info = action.payload.info;
      state.characters = action.payload.results;
    },
    setPage(state: SearchResultsTypes, action: PayloadAction<number>) {
      state.pageCurrent = action.payload;
    },

    // Previous(state: SearchResultsTypes) {
    //   console.log('klik');
    //   if (state.info.prev !== null) {
    //     console.log('klik');
    // const url = new URLSearchParams(new URL(state.info.prev).search);
    // const getUrl = url.get('page')
    //     //@ts-ignore
    // const { setParams } = useParams();
    // setParams(getUrl);
    //     console.log(url);
    //     console.log(getUrl);
    //     // setSearchParams({ page: `${getUrl}` });
    //   }
    // },
  },
});

export const { GetFetchResults, setPage } = SearchResult.actions;
