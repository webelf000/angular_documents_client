import { HttpService } from '@libs/midgard-angular/src/lib/modules/http/http.service';
import { switchMap, catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { environment } from '@env/environment';
import {
  loadOneDocumentCommit, loadOneDocumentFail,
  updateDocumentCommit, updateDocumentFail, deleteDocumentCommit, deleteDocumentFail, createDocumentCommit, createDocumentFail,
  CREATE_DOCUMENT, DELETE_DOCUMENT, UPDATE_DOCUMENT, LOAD_ALL_DOCUMENTS, LOAD_ONE_DOCUMENT, loadDocumentsCommit, loadDocumentsFail
} from './documents.actions';
import { Action } from '@libs/midgard-angular/src/lib/state/action.type';
import { reduxObservable } from '@libs/midgard-angular/src/lib/modules/store';

const httpService = new HttpService();

/**
 * this is here to handle asynchronous actions and will be triggered when LOAD_ALL_DOCUMENT action is dispatched
 * @param {Observable} action$ - the current action
 */
export const loadAllDocumentEpic =  action$ => {
  return action$.pipe(
    reduxObservable.ofType(LOAD_ALL_DOCUMENTS),
    switchMap((action: Action) => {
      return httpService.makeRequest('get', `${environment.API_URL}/documents/documents/`, {}, true).pipe(
        // If successful, dispatch success action with result
        map(res => loadDocumentsCommit(res.data)),
        // If request fails, dispatch failed action
        catchError((error) => of(loadDocumentsFail(error)))
      );
    })
  );
};

/**
 * this is here to handle asynchronous actions and will be triggered when LOAD_ONE_DOCUMENT action is dispatched
 * @param {Observable} action$ - the current action
 */
const loadOneDocumentEpic = action$ => {
  return action$.pipe(
    reduxObservable.ofType(LOAD_ONE_DOCUMENT),
    switchMap((action: Action) => {
      return httpService.makeRequest('get', `${environment.API_URL}/documents/documents/${action.id}/`, true).pipe(
        // If successful, dispatch success action with result
        map((res: Action) => loadOneDocumentCommit(res.data)),
        // If request fails, dispatch failed action
        catchError((error) => of(loadOneDocumentFail(error)))
      );
    })
  );
};

/**
 * this is here to handle asynchronous actions and will be triggered when CREATE_DOCUMENT action is dispatched
 * @param {Observable} action$ - the current action
 */
const createDocumentEpic = action$ => {
  return action$.pipe(
    reduxObservable.ofType(CREATE_DOCUMENT),
    switchMap((action: Action) => {
      // It needs to transform the document object into FormData multipart format for the upload.
      const documentMultipartFormated = makeFormDataFile(action.data);
      return httpService.makeRequest('post', `${environment.API_URL}/documents/documents/`, documentMultipartFormated, true).pipe(
        // If successful, dispatch success action with result
        map((res: Action) => createDocumentCommit(res.data, action.nested)),
        // If request fails, dispatch failed action
        catchError((error) => of(createDocumentFail(error)))
      );
    })
  );
};

/**
 * this is here to handle asynchronous actions and will be triggered when UPDATE_DOCUMENT action is dispatched
 * @param {Observable} action$ - the current action
 */
const updateDocumentEpic = action$ => {
  return action$.pipe(
    reduxObservable.ofType(UPDATE_DOCUMENT),
    switchMap((action: Action) => {
      return httpService.makeRequest('put', `${environment.API_URL}/documents/documents/${action.data.id}/`, action.data, true).pipe(
        // If successful, dispatch success action with result
        map((res: Action) => updateDocumentCommit(res.data, action.nested)),
        // If request fails, dispatch failed action
        catchError((error) => of(updateDocumentFail(error)))
      );
    })
  );
};

/**
 * this is here to handle asynchronous actions and will be triggered when DELETE_DOCUMENT action is dispatched
 * @param {Observable} action$ - the current action
 */
const deleteDocumentEpic = action$ => {
  return action$.pipe(
    reduxObservable.ofType(DELETE_DOCUMENT),
    switchMap((action: Action) => {
      return httpService.makeRequest('delete', `${environment.API_URL}/documents/documents/${action.data.id}/`, {}, true).pipe(
        // If successful, dispatch success action with result
        map(res => deleteDocumentCommit(action.data, null)),
        // If request fails, dispatch failed action
        catchError((error) => of(deleteDocumentFail(error)))
      );
    })
  );
};

/**
 * Transform the document object with the payload into valid FormData multipart
 * @param {object} document - document object from the table row
 */
 const makeFormDataFile = (docObject) => {
  // Transform the document object with the payload into valid FormData multipart
  const formData = new FormData();
  formData.append('file', docObject.file);
  formData.append('file_name', docObject.file_name);
  formData.append('file_type', docObject.file_type);
  formData.append('file_description', docObject.file_description);
  formData.append('create_date', docObject.create_date.toISOString());
  formData.append('user_uuid', docObject.user_uuid);
  formData.append('workflowlevel2_uuids', docObject.workflowlevel2_uuids[0]);

  return formData;
}
// combine the modules epics into one
export const documentsEpics = reduxObservable.combineEpics(
  loadAllDocumentEpic,
  loadOneDocumentEpic,
  updateDocumentEpic,
  deleteDocumentEpic,
  createDocumentEpic,
);
