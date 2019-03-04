import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  SimpleChanges,
  Output
} from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

import { Subject } from 'rxjs/Subject';
import { FileExtensionHelper } from '../../helpers/file-extension.helper';
import { Subscription } from 'rxjs/Subscription';
import { select, Store } from '@src/midgard/modules/store/store';
import { ImageLoadingService } from '@clients/documents/src/lib/services/image-loading.service';
import { selectDocument } from '@clients/documents/src/lib/state/documents.selectors';
import { fileRequestType } from '@clients/documents/src/lib/state/models/fileRequestType.model';
import { updateDocument } from '@clients/documents/src/lib/state/documents.actions';
import { MatSnackBar } from '@angular/material';
import { MidgardTranslateService } from '@src/midgard/modules/translation/translation-loader/translate.service';

@Component({
  selector: 'mg-document-preview',
  templateUrl: './document-preview.component.html',
  styleUrls: ['./document-preview.component.scss']
})
export class DocumentPreviewComponent implements OnChanges {
  @Input() currentWorkflowLevel2;
  @Input() document: any;
  @Input() modal: Subject<any> = new Subject();
  @Input() userSelectOptions: any[] = [];
  @Input() projectSelectOptions: any[] = [];
  @Input() currentContactUuuid;
  @Output() documentDelete: EventEmitter<any> = new EventEmitter();
  @Output() documentEdit: EventEmitter<any> = new EventEmitter();
  @Output() download: EventEmitter<any> = new EventEmitter();

  public documentSubscription: Subscription;
  public isImage = false;
  public isPdf = false;
  public isOther = false;
  public isEditForm = true;
  public filePath: SafeStyle;

  constructor(
    private fileExtensionHelper: FileExtensionHelper,
    private sanitizer: DomSanitizer,
    private store: Store<any>,
    private imageLoadingService: ImageLoadingService,
    private translateService: MidgardTranslateService,
    public snackBar: MatSnackBar
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.document) {
      const document = changes.document.currentValue;
      this.filePath = null;
      if (changes.document && document) {
        // clean the file type
        this.isImage = false;
        this.isPdf = false;
        this.isOther = false;
        const fileType = this.fileExtensionHelper.getRequestType(document);
        if (!document.blobLocalUrl) {
          if (this.documentSubscription) {
            this.documentSubscription.unsubscribe();
          }
          this.getFileType(fileType);
          this.subscribeToDoc(this.document);
          // check if the image was already cached
          this.imageLoadingService.loadImage(document, fileType);
        } else {
          this.getFileType(fileType);
          this.getDocumentUrl(document.blobLocalUrl);
        }
      }
    }
  }

  /**
   * subscribing the the document and running a getDocumentUrl if blob exists
   * @param document
   */
  subscribeToDoc(document) {
    this.documentSubscription = this.store.observable.pipe(select(selectDocument(document.id)))
      .subscribe(item => {
        if (!this.filePath && item.blobLocalUrl) {
          this.getDocumentUrl(item.blobLocalUrl);
        }
      });
  }

  /**
   * checks whether a document is an image, pdf or other
   * @param fileType - passed from the file document
   */
  getFileType(fileType: string) {
    switch (fileType) {
      case fileRequestType.image:
        this.isImage = true;
        break;
      case fileRequestType.pdf:
        this.isPdf = true;
        break;
      default:
        this.isOther = true;
    }
  }

  /**
   * sanitize document url
   * @param {string} path - document url
   */
  public getDocumentUrl(path) {
    this.filePath =  this.sanitizer.bypassSecurityTrustResourceUrl(path);
  }

  /**
   * edit document
   * @param document - document form object
   */
  public editDocument(document) {
    const message = this.translateService.instant('DOCUMENTS.NOTIFICATIONS.EDIT_SUCCESS');
    if (document) {
      this.store.dispatch(updateDocument(document));
      this.documentEdit.emit();
      this.snackBar.open(message, 'Ok', {
        duration: 2000,
      });
    }
  }

  /**
   * delete document:- emits document to delete
   * @param {object} document - document object
   */
  public deleteDocument(document) {
    if (document) {
      this.documentDelete.emit(document);
    }
  }

  /**
   * download document:- emits document to download to parent
   * @param {object} document - document object
   */
  public downloadDocument(document) {
    if (document) {
      this.download.emit(document);
    }
  }
}
