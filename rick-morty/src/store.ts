import { configureStore } from '@reduxjs/toolkit';
import { SearchResult, SearchResultsTypes } from './slices/SearchResult';

export const store = configureStore({
  reducer: {
    searchResult: SearchResult.reducer,
  },
});

export interface StateType {
  searchResult: SearchResultsTypes;
}
