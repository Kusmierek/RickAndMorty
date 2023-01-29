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
  message: string;
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
  message: '',
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
      state.isLoading = false;
      state.info = action.payload.info;
      state.characters = action.payload.results;
      state.isFailed = false;
    },
    setPage(state: SearchResultsTypes, action: PayloadAction<number>) {
      state.pageCurrent = action.payload;
    },
    setChracters(
      state: SearchResultsTypes,
      action: PayloadAction<Array<Character>>
    ) {
      state.characters = action.payload;
    },
    ActionFailed(state: SearchResultsTypes, action: PayloadAction<string>) {
      state.isFailed = true;
      state.message = action.payload;
    },
    StartLoadingAction(state: SearchResultsTypes) {
      state.isLoading = true;
    },
  },
});

export const {
  GetFetchResults,
  setPage,
  setChracters,
  ActionFailed,
  StartLoadingAction,
} = SearchResult.actions;
