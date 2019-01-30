import {
  CREATE_DOCUMENT_COMMIT,
  DELETE_DOCUMENT_COMMIT,
  LOAD_ALL_DOCUMENTS_COMMIT, LOAD_ONE_DOCUMENT_COMMIT, SAVE_BLOB_URL, UPDATE_DOCUMENT_COMMIT
} from './documents.actions';
import { addAll, deleteOne, upsertOne } from '@libs/midgard-angular/src/lib/state/reducer.utils';
import { Action } from '@libs/midgard-angular/src/lib/state/action.type';

const initialState = {
  data: null,
  loaded: false,
  created: false,
  updated: false,
  deleted: false
};
// should be refactored to use reducer.utils, and refactor the function
// in reducers.utils to handle the case when there is another object under data in this case 'results'
export function documentsReducer(state = initialState, action: Action) {
  switch (action.type) {
    case LOAD_ALL_DOCUMENTS_COMMIT:
      return addAll(state, action);
    case LOAD_ONE_DOCUMENT_COMMIT:
      return upsertOne(state, action);
    case CREATE_DOCUMENT_COMMIT:
      return state = {...state, data: { results: [...state.data.results, action.data]}, loaded: true, created: true};
    case UPDATE_DOCUMENT_COMMIT:
      return upsertOne(state, action);
    case DELETE_DOCUMENT_COMMIT:
      return {...state, data: { results: state.data.results.filter (item => item.id !== action.data.id)}, deleted: true};
    case SAVE_BLOB_URL:
      if (state.data['results']) {
        return {...state, data: { results: state.data['results'].map (item => {
          if (item.id === action.data.id) {
            return action.data;
          } else {
            return item;
          }
        })}, loaded: true, updated: true};
      } else {
        return state;
      }
    default:
      return state;
  }
}
