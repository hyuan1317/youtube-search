import axios from 'axios';
import { AppThunk } from '../store';

interface SearchResult {
  kind: string;
  etag: string;
  nextPageToken: string;
  prevPageToken: string;
  regionCode: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  },
  items: SearchItem[];
  errorMessage: string;
}

export interface SearchItem {
  kind: string;
  etag: string;
  id: {
    kind: string;
    videoId: string;
    channelId: string;
    playlistId: string;
  },
  snippet: {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: {
      [size: string]: {
        url: string;
        width: number;
        height: number;
      }
    },
    channelTitle: string;
    liveBroadcastContent: string;
  }
}

export const UPDATE_IS_FETCHING = 'UPDATE_IS_FETCHING';
export const UPDATE_SEARCH_RESULT = 'UPDATE_SEARCH_RESULT';
export const UPDATE_PAGE = 'UPDATE_PAGE';
export const UPDATE_CACHE = 'UPDATE_CACHE';
export const UPDATE_ERROR_MESSAGE = 'UPDATE_ERROR_MESSAGE';

export const updateIsFetching = (payload: boolean) => ({
  type: UPDATE_IS_FETCHING,
  payload, 
} as const);

export const updateSearchResult = (payload: SearchItem[]) => ({
  type: UPDATE_SEARCH_RESULT,
  payload,
} as const);

export const updatePage = (payload: number) => ({
  type: UPDATE_PAGE,
  payload,
} as const);

export const updateCache = (payload: SearchItem[], searchWord: string) => ({
  type: UPDATE_CACHE,
  payload,
  searchWord,
} as const);

export const updateErrorMessage = (payload: string) => ({
  type: UPDATE_ERROR_MESSAGE,
  payload,
} as const);

export const fetchSearchResult = (
  searchWord: string
): AppThunk => async (dispatch, getState) => {
    const { cache } = getState().search;
    const apiKey = 'YOUR_API_KEY';
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=30&q=${searchWord}&key=${apiKey}`;

    if (cache[searchWord]) {
      dispatch(updateSearchResult(cache[searchWord]));
    }
    else {
      dispatch(updateIsFetching(true));
      try {
        const searchResult = await axios.get<SearchResult>(url);
        const searchItems = searchResult.data.items;
        dispatch(updateSearchResult(searchItems));
        dispatch(updateCache(searchItems, searchWord));
      }
      catch (error) {
        dispatch(updateSearchResult([]));
        dispatch(updateErrorMessage(error.message));
      }
      finally {
        dispatch(updateIsFetching(false));
      }
    }
  }
