import {
  CREATE_DOCUMENT_COMMIT,
  DELETE_DOCUMENT_COMMIT,
  LOAD_ALL_DOCUMENTS_COMMIT, LOAD_ONE_DOCUMENT_COMMIT, SAVE_BLOB_URL, UPDATE_DOCUMENT_COMMIT
} from './documents.actions';
import { addAll, upsertOne } from '@libs/midgard-angular/src/lib/state/reducer.utils';
import { Action } from '@libs/midgard-angular/src/lib/state/action.type';
import {deleteOne, upsertOne} from '../../../../midgard-angular/src/lib/state/reducer.utils';

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
      return upsertOne(state, action);
    case CREATE_DOCUMENT_COMMIT:
      return upsertOne(state, action, 'results');
    case UPDATE_DOCUMENT_COMMIT:
      return upsertOne(state, action, 'results');
    case DELETE_DOCUMENT_COMMIT:
      return deleteOne(state, action, 'results')
    case SAVE_BLOB_URL:
      return upsertOne(state, action, 'results');
    default:
      return state;
  }
}
