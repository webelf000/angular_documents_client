import { Injectable } from '@angular/core';
import { fileRequestType } from '@libs/documents/src/lib/state/models/fileRequestType.model';
import { Document } from '@libs/documents/src/lib/state/models/document.model';

@Injectable()
export class FileExtensionHelper {
  private imageExtensions: string[] = ['PNG', 'JPEG', 'JPG', 'TIFF', 'GIF'];

  /**
   * returns true if a file is an image & false otherwise
   * @param {string} fileType - uploaded file type
   */
  public getFileType(fileType) {
    if (this.imageExtensions.includes(fileType.toUpperCase())) {
      return true;
    }
    return false;
  }

  /**
   * returns true if a file is an pdf & false otherwise
   * @param {string} fileType - uploaded file type
   */
  public getIsFilePdf(fileType) {
    if (fileType.toUpperCase() === 'PDF') {
      return true;
    }
    return false;
  }

  /**
   * returns file extensions
   * @param fileName
   */
  public getFileExtension(fileName) {
    const lastDotIndex = fileName.lastIndexOf('.');
    if (lastDotIndex < 1) {
      return '';
    }
    return fileName.substr(lastDotIndex + 1).toUpperCase();
  }

  /**
   * returning requestType depending on the document.file_type
   * @param {Document} document
   * @returns {any} requestType
   */
  getRequestType(document: Document) {
    if (this.getFileType(document.file_type)) {
      return fileRequestType.image;
    } else if (this.getIsFilePdf(document.file_type)) {
      return fileRequestType.pdf;
    } else {
      return fileRequestType.pdf;
    }
  }
}
