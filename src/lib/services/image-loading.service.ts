import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { saveBlobUrl } from '@libs/documents/src/lib/state/documents.actions';
import { Store } from '@libs/midgard-angular/src/lib/modules/store/store';
import { HttpService } from '@libs/midgard-angular/src/lib/modules/http/http.service';
import { Document } from '@libs/documents/src/lib/state/models/document.model';
import {environment} from '@env/environment';

@Injectable()
export class ImageLoadingService {
  constructor(private httpService: HttpService,
              private store: Store<any>) {
  }

  /**
   * send the url parameter for http request and bypass the url in safe way
   * @param {Document} image - image that will be processed
   * @param {string} fileType - file type string for the httpService
   * @param {boolean} thumbnail - defines if the file or thumbnail will be used
   */
  public loadImage(image: Document, fileType: string = 'image/png', thumbnail: boolean = false) {
    this.httpService.makeRequest('get', thumbnail ? `${environment.API_URL}${image.thumbnail}` : `${environment.API_URL}${image.file}`, {}, true, fileType, 'blob').pipe(
      map(response => {
        return URL.createObjectURL(new Blob([response.data], {type: fileType}));
      })).subscribe(imageBlob => {
      const document = thumbnail ? {...image, blobThumbnailLocalUrl: imageBlob} : {...image, blobLocalUrl: imageBlob};
      this.store.dispatch(saveBlobUrl(document));
    });
  }

  public loadDocumentRequest(doc: Document, fileType: string = 'image/png'): Observable<any> {
    return  this.httpService.makeRequest('get', doc.file, {}, true, fileType, 'blob').pipe(
      map(response => {
        return URL.createObjectURL(new Blob([response.data], {type: fileType}));
      })
    );
  }
}
