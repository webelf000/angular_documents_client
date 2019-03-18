import { getAllWorkflowLevel2s } from '@src/midgard/state/workflow-level2/workflow-level2.selectors';
import { FileExtensionHelper } from '@clients/documents/src/lib/helpers/file-extension.helper';
import { Document } from '@clients/documents/src/lib/state/models/document.model';
import { reselect } from '@src/midgard/modules/store';
import { HttpService } from '@src/midgard/modules/http/http.service';
import { Store } from '@src/midgard/modules/store/store';

const helper = new FileExtensionHelper();


const getDocuments = state => state.documentsReducer;

// TODO: New documents version
// export const getAllDocuments = reselect.createSelector(
//   getDocuments,
//   (documents) => {
//     if (documents && documents.data) {
//       documents.data.results.forEach( document => {
//         if (!document.blobLocalUrl) {
//           imageLoadingService.loadImage(document, fileRequestType.image, true);
//         }
//       });
//       return {
//         data: documents.data.results,
//         loaded: documents.loaded
//       };
//     }
//   }
// );

export const getAllDocuments = reselect.createSelector(
  getDocuments,
  (documents) => {
    if (documents.data) {
      return documents.data;
    }
  }
);

export const getDocumentsLoaded = reselect.createSelector(
  getDocuments,
  (documents) => {
    return documents.dataLoaded;
  }
);

/**
 * @returns {MemoizedSelector<AppState, any>} returning all the documents that are pictures
 */
export const selectPictures = reselect.createSelector(
  getAllDocuments,
  (documents: any) => {
    if (documents && documents.results) {
      const pictures = [];
      documents.results.forEach((element) => {
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
  }
);

/**
 * @returns {MemoizedSelector<AppState, any>} returning the documnets
 */
export const selectDocuments = reselect.createSelector(
  getAllDocuments,
  (documents: any) => {
    if (documents && documents.results) {
      const docs = [];
      documents.results.forEach((element) => {
        if (!helper.getFileType(element.file_type)) {
          docs.push(element);
        }
      });
      docs.sort((a, b) => {
        return getTime(b.create_date) - getTime(a.create_date);
      });
      return docs;
    }
  }
);
/**
 * @returns {MemoizedSelector<AppState, any>} returning the pictures
 * @param {string} projectUuid - current project uuid
 */
export const selectProjectPictures = (projectUuid: string) => reselect.createSelector(
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
    return pictures.filter( document => document.workflowlevel2_uuids.includes(projectUuid));
  }
);

/**
 * @returns {MemoizedSelector<AppState, any>} returning the documnets
 * @param {string} projectUuid - current project uuid
 */
export const selectProjectDocuments = (projectUuid: string) => reselect.createSelector(
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
    return docs.filter( document => document.workflowlevel2_uuids.includes(projectUuid));
  }
);

/***
 * get project names
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
 * get time method
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
export const selectDocument = (id: number) => reselect.createSelector(getDocuments, (documents) => {
  return documents.data.results.find( document => document.id.toString() === id.toString());
});
