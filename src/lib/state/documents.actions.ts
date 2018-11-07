// Load All
export const LOAD_ALL_DOCUMENTS = 'LOAD_ALL_DOCUMENTS';
export const LOAD_ALL_DOCUMENTS_COMMIT = 'LOAD_ALL_DOCUMENTS_COMMIT';
export const LOAD_ALL_DOCUMENTS_FAIL = 'LOAD_ALL_DOCUMENTS_FAIL';

// Load One
export const LOAD_ONE_DOCUMENT = 'LOAD_ONE_DOCUMENT';
export const LOAD_ONE_DOCUMENT_COMMIT = 'LOAD_ONE_DOCUMENT_COMMIT';
export const LOAD_ONE_DOCUMENT_FAIL = 'LOAD_ONE_DOCUMENT_FAIL';

// Create
export const CREATE_DOCUMENT = 'CREATE_DOCUMENT';
export const CREATE_DOCUMENT_COMMIT = 'CREATE_DOCUMENT_COMMIT';
export const CREATE_DOCUMENT_FAIL = 'CREATE_DOCUMENT_FAIL';

// Update
export const UPDATE_DOCUMENT = 'UPDATE_DOCUMENT';
export const UPDATE_DOCUMENT_COMMIT = 'UPDATE_DOCUMENT_COMMIT';
export const UPDATE_DOCUMENT_FAIL = 'UPDATE_DOCUMENT_FAIL';

// Delete
export const DELETE_DOCUMENT = 'DELETE_DOCUMENT';
export const DELETE_DOCUMENT_COMMIT = 'DELETE_DOCUMENT_COMMIT';
export const DELETE_DOCUMENT_FAIL = 'DELETE_DOCUMENT_FAIL';

// Save blob URL
export const SAVE_BLOB_URL = 'SAVE_BLOB_URL';

export function loadDocuments() {
  return {
    type: LOAD_ALL_DOCUMENTS,
  };
}

export function loadDocumentsCommit(data) {
  return {
    type: LOAD_ALL_DOCUMENTS_COMMIT,
    data
  };
}

export function loadDocumentsFail(error) {
  return {
    type: LOAD_ALL_DOCUMENTS_FAIL,
    error
  };
}

export function loadOneDocument(id: string) {
  return {
    type: LOAD_ONE_DOCUMENT,
    id
  };
}

export function loadOneDocumentCommit(data) {
  return {
    type: LOAD_ONE_DOCUMENT_COMMIT,
    data
  };
}

export function loadOneDocumentFail(error) {
  return {
    type: LOAD_ONE_DOCUMENT_FAIL,
    error
  };
}

export function createDocument(data) {
  return {
    type: CREATE_DOCUMENT,
    data,
  };
}

export function createDocumentCommit(data, nested) {
  return {
    type: CREATE_DOCUMENT_COMMIT,
    data,
    nested
  };
}

export function createDocumentFail(error) {
  return {
    type: CREATE_DOCUMENT_FAIL,
    error
  };
}

export function updateDocument(data) {
  return {
    type: UPDATE_DOCUMENT,
    data
  };
}

export function updateDocumentCommit(data, nested) {
  return {
    type: UPDATE_DOCUMENT_COMMIT,
    data,
    nested
  };
}

export function updateDocumentFail(error) {
  return {
    type: UPDATE_DOCUMENT_FAIL,
    error
  };
}

export function deleteDocument(id) {
  return {
    type: DELETE_DOCUMENT,
    id
  };
}

export function deleteDocumentCommit(data, nested) {
  return {
    type: DELETE_DOCUMENT_COMMIT,
    data,
    nested
  };
}

export function deleteDocumentFail(error) {
  return {
    type: DELETE_DOCUMENT_FAIL,
    error
  };
}

export function saveBlobUrl(data) {
  return {
    type: SAVE_BLOB_URL,
    data
  };
}
