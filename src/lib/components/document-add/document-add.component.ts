import { Component, OnInit, Input, ViewChild, OnDestroy, OnChanges, EventEmitter, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { Subscription } from 'rxjs';
import * as moment from 'moment';
import { DocumentFormComponent } from './../document-form/document-form.component';
import { OAuthService } from '@src/midgard/modules/oauth/oauth.service';
import { select, Store } from '@src/midgard/modules/store/store';
import { MatSnackBar } from '@angular/material';
import { createDocument } from '@clients/documents/src/lib/state/documents.actions';
import { getDocumentsLoaded } from '@clients/documents/src/lib/state/documents.selectors';
import { MidgardTranslateService } from '@src/midgard/modules/translation/translation-loader/translate.service';

@Component({
  selector: 'mg-document-add',
  templateUrl: './document-add.component.html',
  styleUrls: ['./document-add.component.scss']
})
export class DocumentAddComponent implements OnInit, OnDestroy {

  @ViewChild(DocumentFormComponent) documentForm: DocumentFormComponent;
  @Input() currentWorkflowLevel2;
  @Input() userSelectOptions;
  @Input() projectSelectOptions;
  @Input() selectedContact = {};
  @Input() currentContactUuuid;
  @Input() currentDocument;
  @Input() contactUiid;
  @Output() documentAdded: EventEmitter<any> = new EventEmitter();

  public showButtonSpinner = false;
  public selectedOauthUser: any = {};
  public isFileSelected = false;
  public file: any;
  public fileData: any;
  public removeFile;
  public noFileSelected = false;
  public createDocumentAdded;
  private createDocumentSubscription: Subscription;

  constructor(
    private authService: OAuthService,
    private store: Store<any>,
    private snackBar: MatSnackBar,
    private translateService: MidgardTranslateService
  ) {}

  ngOnInit() {
    const oauthUser = this.authService.getOauthUser();
    this.selectedOauthUser = {
      label: oauthUser.name,
      value: oauthUser.core_user_uuid
    };
  }

  /**
   * Submit form data
   */
  public onFormSubmit(documentFormObject) {
    if (!this.fileData) {
      this.noFileSelected = true;
      this.snackBar.open('Select or Drag a file to upload', 'close', {
        duration: 2000,
      });
    } else {
      this.showButtonSpinner = true;
      // documentFormObject.file = this.fileData;
      documentFormObject.file = this.file;
      documentFormObject.file_type = documentFormObject.file_name.split('.').pop(); // set the file extension
      documentFormObject.create_date = moment(documentFormObject.create_date, 'DD.MM.YYYY').format(
        'YYYY-MM-DDThh:mm:ssZ'
      );
      documentFormObject.create_date = new Date();

      this.store.dispatch(createDocument(documentFormObject));
      this.createDocumentAdded = this.store.observable.pipe(select(getDocumentsLoaded));
      this.createDocumentSubscription = this.createDocumentAdded.subscribe((uploaded: boolean) => {
        this.documentAdded.emit();
        // const message = this.translateService.instant('DOCUMENTS.NOTIFICATIONS.UPLOAD_SUCCESS');
        // this.snackBar.open(message, 'Ok', {
        //   duration: 2000,
        // });
        if (!uploaded) {
          this.clearFile(documentFormObject);
        }
      });
    }
  }

  /**
   * sets remove file to the value passed
   * @param {boolean} remove - remove file
   */
  public clearFile(remove) {
    this.removeFile = remove;
    this.cancelUploaded();
    this.showButtonSpinner = false;
    // this.documentForm.formSubmited = false;
  }

  /**
   * set the uploaded file name
   * @param {object} file - file object
   */
  public setFileName(file) {
    if (file) {
      this.file = file;
    }
  }

  /**
   * set File data to upload
   * @param {string} data - file local base64 path
   */
  public setFileData(data) {
    if (this.file) {
      this.fileData = data;
      this.isFileSelected = true;
    }
  }

  /**
   * cancel upload reset file variables
   * reset the form
   * toggles variable for hidding preview block
   */
  public cancelUploaded() {
    this.showButtonSpinner = false;
    this.isFileSelected = false;
    this.fileData = '';
    this.file = '';
    if (this.documentForm) {
      this.documentForm.resetForm();
    }
  }

  /**
   * Unsubscribe used subscriptions on destroying the component
   */
  ngOnDestroy() {
    if (this.createDocumentSubscription) {
      this.createDocumentSubscription.unsubscribe();
    }
  }

}
