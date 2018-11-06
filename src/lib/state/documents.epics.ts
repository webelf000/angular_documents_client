
import { HttpService } from '@libs/midgard-angular/src/lib/modules/http/http.service';
import { combineEpics, ofType } from 'redux-observable';
import { switchMap, catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { environment } from '@env/environment';
import {
  loadDocumentCommit, loadDocumentFail, loadOneDocumentCommit, loadOneDocumentFail,
  updateDocumentCommit, updateDocumentFail, deleteDocumentCommit, deleteDocumentFail, createDocumentCommit, createDocumentFail,
  CREATE_DOCUMENT, DELETE_DOCUMENT, UPDATE_DOCUMENT, LOAD_ALL_DOCUMENT, LOAD_ONE_DOCUMENT
} from './documents.actions';
import { Action } from '@libs/midgard-angular/src/lib/state/action.type';

const httpService = new HttpService();

/**
 * this is here to handle asynchronous actions and will be triggered when LOAD_ALL_DOCUMENT action is dispatched
 * @param {Observable} action$ - the current action
 */
export const loadAllDocumentEpic = action$ => {
  return action$.pipe(
    ofType(LOAD_ALL_DOCUMENT),
    switchMap((action: Action) => {
      return httpService.makeRequest('get', `${environment.API_URL}/workflowlevel2/`).pipe(
        // If successful, dispatch success action with result
        map(res => loadDocumentCommit(res.data)),
        // If request fails, dispatch failed action
        catchError((error) => of(loadDocumentFail(error)))
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
    ofType(LOAD_ONE_DOCUMENT),
    switchMap((action: Action) => {
      return httpService.makeRequest('get', `${environment.API_URL}/workflowlevel2/${action.id}/`).pipe(
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
    ofType(CREATE_DOCUMENT),
    switchMap((action: Action) => {
      return httpService.makeRequest('post', `${environment.API_URL}/workflowlevel2/`, action.data).pipe(
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
    ofType(UPDATE_DOCUMENT),
    switchMap((action: Action) => {
      return httpService.makeRequest('put', `${environment.API_URL}/workflowlevel2/${action.data.id}/`, action.data).pipe(
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
    ofType(DELETE_DOCUMENT),
    switchMap((action: Action) => {
      return httpService.makeRequest('delete', `${environment.API_URL}/workflowlevel2/${action.data.id}`).pipe(
        // If successful, dispatch success action with result
        map(res => deleteDocumentCommit(action.data, action.nested)),
        // If request fails, dispatch failed action
        catchError((error) => of(deleteDocumentFail(error)))
      );
    })
  );
};
// combine the modules epics into one
export const documentsEpics  = combineEpics(
  loadAllDocumentEpic,
  loadOneDocumentEpic,
  updateDocumentEpic,
  deleteDocumentEpic,
  createDocumentEpic,
);
