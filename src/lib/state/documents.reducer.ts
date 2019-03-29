import {
  CREATE_DOCUMENT_COMMIT,
  DELETE_DOCUMENT_COMMIT,
  LOAD_ALL_DOCUMENTS_COMMIT, LOAD_ONE_DOCUMENT_COMMIT, SAVE_BLOB_URL, UPDATE_DOCUMENT_COMMIT
} from './documents.actions';
import { Action } from '@src/midgard/state/action.type';
import {deleteOne, upsertOne, addAll} from '@src/midgard/modules/store/reducer.utils';

const initialState = {
  data: null,
  loaded: false,
  created: false,
  updated: false,
  deleted: false
};

export function documentsReducer(state = initialState, action: Action) {
  switch (action.type) {
    case LOAD_ALL_DOCUMENTS_COMMIT:
      return addAll(state, action);
    case LOAD_ONE_DOCUMENT_COMMIT:
      return upsertOne(state, action, 'id');
    case CREATE_DOCUMENT_COMMIT:
      return upsertOne(state, action, 'id', 'results');
    case UPDATE_DOCUMENT_COMMIT:
      return upsertOne(state, action, 'id', 'results');
    case DELETE_DOCUMENT_COMMIT:
      return deleteOne(state, action, 'id', 'results');
    case SAVE_BLOB_URL:
      return upsertOne(state, action, 'id', 'results');
    default:
      return state;
  }
}
