import { Injectable } from '@angular/core';
import { Observable} from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { FileExtensionHelper } from '@libs/documents/src/lib/helpers/file-extension.helper';
import { ImageLoadingService } from '@libs/documents/src/lib/services/image-loading.service';
import { select, Store } from '@libs/midgard-angular/src/lib/modules/store/store';
import { selectDocument } from '@libs/documents/src/lib/state/documents.selectors';

@Injectable()
export class FileSavingService {
  constructor(
    private store: Store<any>,
    private imageLoading: ImageLoadingService,
    private fileExtensionHelper: FileExtensionHelper
  ) {}

  public saveFileAsFakeClick(item) {
    const a = document.createElement('a');
    document.body.appendChild(a);
    a.setAttribute('style', 'display: none');
    a.href = item.blobLocalUrl;
    a.download = item.file_name;
    a.click();
    a.remove();
  }

  /**
   * emits document to download to parent
   * @param {object} document - document object from the table row
   */
  public downloadDocument(doc): Observable<boolean> {
    const result = new Subject<boolean>();
    const documentSubscription = this.store.observable.pipe(select(selectDocument(doc.id)))
      .subscribe(item => {
        if (!item.blobLocalUrl) {
          this.imageLoading.loadImage(doc, this.fileExtensionHelper.getRequestType(doc));
        } else {
          setTimeout(() => { // fixing the change detection on the actions component
            this.saveFileAsFakeClick(item); // run the save as fake click
            documentSubscription.unsubscribe();
            result.next(true);
          }, 10);
        }
      });
    return result.asObservable();
  }
}
