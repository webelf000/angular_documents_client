import { redux } from 'midgard-core';
import { getAllWorkflowLevel2s } from '@libs/midgard-angular/src/lib/state/workflow-level2/workflow-level2.selectors';
import { FileExtensionHelper } from '@libs/documents/src/lib/helpers/file-extension.helper';
import { Document } from '@libs/documents/src/lib/state/models/document.model';

const helper = new FileExtensionHelper();

const getDocuments = state => state.documentsReducer;

export const getAllDocuments = redux.createSelector(
  getDocuments,
  (documents) => {
    return documents.data;
  }
);

/**
 * @returns {MemoizedSelector<AppState, any>} returning the pictures
 */
export const selectPictures = redux.createSelector(
  getAllDocuments,
  getAllWorkflowLevel2s,
  (documents: Document[], workflowLevel2s) => {
    const pictures = [];
    documents.forEach((element) => {
      element['projects'] = getProjectName(element.workflowlevel2_uuids, workflowLevel2s);
      if (element.file_type) {
        if (helper.getFileType(element.file_type)) {
          pictures.push(element);
        }
      }
    });
    pictures.sort((a, b) => {
      return getTime(b.create_date) - getTime(a.create_date);
    });
    return pictures;
  }
);

/**
 * @returns {MemoizedSelector<AppState, any>} returning the documnets
 */
export const selectDocuments = redux.createSelector(
  getAllDocuments,
  getAllWorkflowLevel2s,
  (documents: Document[], workflowLevel2s) => {
    const docs = [];
    documents.forEach((element) => {
      element['projects'] = getProjectName(element.workflowlevel2_uuids, workflowLevel2s);
      if (!helper.getFileType(element.file_type)) {
        docs.push(element);
      }
    });
    docs.sort((a, b) => {
      return getTime(b.create_date) - getTime(a.create_date);
    });
    return docs;
  }
);

/***
 * @description -  get project names
 * @param {array} uuids - array of wfl2 uuids
 * @return {string} comma separated names of wfl2
 */
export const getProjectName = (uuids: string[], projects) => {
  let projectList = '';
  if (projects && projects.length > 0) {
    if (uuids && uuids.length > 0) {
      uuids.forEach((element) => {
        const project = projects.find((item) => item.level2_uuid === element);

        if (project) {
          if (projectList === '') {
            projectList = project.name;
          } else {
            projectList = `${projectList}, ${project.name}`;
          }
        }
      });
    }
  }
  return projectList || '';
};

/***
 * @description - get time method
 * @param {string} date - date
 */
export const getTime = (date: string) => {
  return date != null ? new Date(date).getTime() : 0;
};

/**
 * selector that selects one document from the documents reducer
 * @param {number} id - id of the document
 * @returns {MemoizedSelector<any, any>}
 */
export const selectDocument = (id: number) => redux.createSelector(getDocuments, (documents) => {
  return documents.find( document => document.id.toString() === id.toString());
});
