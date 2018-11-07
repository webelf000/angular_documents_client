import {
  CREATE_DOCUMENT_COMMIT,
  DELETE_DOCUMENT_COMMIT,
  LOAD_ALL_DOCUMENTS_COMMIT, LOAD_ONE_DOCUMENT_COMMIT, SAVE_BLOB_URL, UPDATE_DOCUMENT_COMMIT
} from './documents.actions';
import { addAll, deleteOne, upsertOne } from '@libs/midgard-angular/src/lib/state/reducer.utils';
import { Action } from '@libs/midgard-angular/src/lib/state/action.type';

const initialState = {
  data: [],
  dataLoaded: false
};

export function documentsReducer(state = initialState, action: Action) {
  switch (action.type) {
    case LOAD_ALL_DOCUMENTS_COMMIT:
      return addAll(state, action);
    case LOAD_ONE_DOCUMENT_COMMIT:
      return upsertOne(state, action);
    case CREATE_DOCUMENT_COMMIT:
      return upsertOne(state, action);
    case UPDATE_DOCUMENT_COMMIT:
      return upsertOne(state, action);
    case DELETE_DOCUMENT_COMMIT:
      return deleteOne(state, action);
    case SAVE_BLOB_URL:
      return upsertOne(state, action);
    default:
      return state;
  }
}
