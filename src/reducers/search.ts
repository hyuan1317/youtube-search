import { 
  SearchItem,
  UPDATE_IS_FETCHING,
  UPDATE_SEARCH_RESULT,
  UPDATE_PAGE,
  UPDATE_CACHE,
  UPDATE_ERROR_MESSAGE,
  updatePage,
  updateCache,
  updateErrorMessage,
  updateIsFetching,
  updateSearchResult,
} from '../actions/search';

interface SearchState {
  cache: {
    [key: string]: SearchItem[];
  };
  items: SearchItem[];
  isFetching: boolean;
  page: number;
  errorMessage: string;
}

const initialState: SearchState = {
  cache: {},
  items: [],
  isFetching: false,
  page: 1,
  errorMessage: '',
}

type Actions = 
  ReturnType<typeof updateIsFetching> |
  ReturnType<typeof updateSearchResult> |
  ReturnType<typeof updatePage> |
  ReturnType<typeof updateCache> |
  ReturnType<typeof updateErrorMessage>;

export const searchReducer = (state = initialState, action: Actions) => {
  switch (action.type) {
    case UPDATE_IS_FETCHING:
      return {
        ...state,
        isFetching: action.payload,
      };
    case UPDATE_SEARCH_RESULT:
      return {
        ...state,
        items: action.payload,
        page: 1,
        errorMessage: '',
      }
    case UPDATE_PAGE:
      return {
        ...state,
        page: action.payload,
      };
    case UPDATE_CACHE:
      return {
        ...state,
        cache: {
          ...state.cache,
          [action.searchWord]: action.payload,
        },
      }
      case UPDATE_ERROR_MESSAGE:
        return {
          ...state,
          errorMessage: action.payload,
        };
    default:
      return state;
  }
}