import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  AfterViewInit,
  SimpleChanges, OnInit,
} from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { Subject } from 'rxjs/Subject';
import * as moment from 'moment';

import { Document } from '../../state/models/document.model';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'mg-document-form',
  templateUrl: './document-form.component.html',
  styleUrls: ['./document-form.component.scss']
})
export class DocumentFormComponent implements AfterViewInit, OnChanges {
  public documentForm: FormGroup;
  public valueChanged = false;
  public formSubmited = false;
  public currentDate: any;

  @Input() currentWorkflowLevel2;
  @Input() showButtonSpinner = false;
  @Input() selectedOauthUser;
  @Input() modal: Subject<any> = new Subject();
  @Input() userSelectOptions: any[] = [];
  @Input() projectSelectOptions: any[] = [];
  @Output() uploadDocument: EventEmitter<any> = new EventEmitter();
  @Output() deleteDocument: EventEmitter<any> = new EventEmitter();
  @Output() removeFile: EventEmitter<any> = new EventEmitter();
  @Output() download: EventEmitter<any> = new EventEmitter();
  @Input() fileToUpload: any;
  @Input() fileToPreview: any;
  @Input() isEditForm = false;
  @Input() filePath: string;

  public formErrors = {
    file_description: '',
    user_uuid: '',
    create_date: ''
  };

  public formValidationMessages = {
    file_description: {
      required: 'a description is required'
    },
    user_uuid: {
      required: 'you must select a user'
    },
    create_date: {
      required: 'date is required'
    }
  };

  public documentObject: Document = {
    id: null,
    create_date: moment(),
    file_name: '',
    file_description: '',
    file_type: '',
    file: null,
    user_uuid: '',
    organization_uuid: '',
    workflowlevel1_uuids: [],
    workflowlevel2_uuids: []
  };

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.initForm(this.documentObject);
  }

  ngAfterViewInit() {
    if (this.selectedOauthUser) {
      this.documentObject.user_uuid = this.selectedOauthUser.value;
    }
    if (!this.isEditForm) {
      this.fillForm(this.documentObject);
    }
  }

  ngOnChanges(changes) {
    if (changes.fileToUpload && changes.fileToUpload.currentValue) {
      this.autoFillNameAndDate(changes.fileToUpload.currentValue.name);
    }
    if (changes.fileToPreview && changes.fileToPreview.currentValue) {
      this.fillForm(changes.fileToPreview.currentValue);
      setTimeout(() => {
        this.setFormValues(changes.fileToPreview.currentValue);
      }, 500);
    }
  }

  /**
   * initialiseForm document form with passed values
   * @param {object} document - document
   */
  private initForm (document) {
    this.documentForm = this.fb.group({
      workflowlevel2_uuids: [],
      file_name: [document.file_name || '', Validators.required],
      file_description: [document.file_description || '', Validators.required],
      user_uuid: [document.user_uuid || '', Validators.required],
      create_date: [document.create_date ? document.create_date : new Date(), Validators.required],
      file: [{}]
    });
  }

  /**
   * Autofill Name Field and date on image select/drag
   * @param {object} file - the uploaded image name
   */
  public autoFillNameAndDate(file) {
    this.documentForm.patchValue({
      file_name: file,
      file_description: file
    });
  }

  /**
   * fill document form with passed values
   * @param {object} document - document
   */
  private fillForm(document) {
    this.documentForm.patchValue({
      workflowlevel2_uuids: document.workflowlevel2_uuids ? document.workflowlevel2_uuids : [''],
      file_name: document.file_name,
      file_description: document.file_description,
      user_uuid: document.user_uuid,
      file: [{}]
    });
  }

  /**
   * patch form values for preview
   * @param {object} document - document to preview
   */
  private setFormValues(document) {
    this.documentForm.patchValue({
      workflowlevel2_uuids: document.workflowlevel2_uuids ? document.workflowlevel2_uuids : [''],
      file_name: document.file_name,
      file_description: document.file_description,
      user_uuid: document.user_uuid,
    });
    this.currentDate = moment(document.create_date, 'YYYY-MM-DDThh:mm:ssZ').format(
      'DD.MM.YYYY'
    );
    this.formSubmited = false;
  }

  /**
   * Upload Document
   * @param {object} document - document form object
   */
  public onFormSubmit(document) {

    if ( !this.formSubmited ) {
      this.formSubmited = true;

      if (this.documentForm.valid) {
        // add current workflowlevel2 to the document workflowlevel2_uuids array
        if (this.currentWorkflowLevel2) {
          if (this.documentObject.workflowlevel2_uuids.length > 0) {
            document.workflowlevel2_uuids = document.workflowlevel2_uuids.push(this.currentWorkflowLevel2.level2_uuid);
          } else {
            document.workflowlevel2_uuids = [this.currentWorkflowLevel2.level2_uuid];
          }
        }

        if (this.fileToPreview) {
          if (moment(document.create_date, 'DD.MM.YYYY').isValid()) {
            document.create_date = moment(document.create_date, 'DD.MM.YYYY').format(
              'YYYY-MM-DDThh:mm:ssZ'
            );
          } else {
            document.create_date = this.fileToPreview.create_date;
          }
          const editFile = {
            id: this.fileToPreview.id,
            file_name: document.file_name,
            file_description: document.file_description,
            user_uuid: document.user_uuid,
            workflowlevel2_uuids: document.workflowlevel2_uuids,
          };
          this.uploadDocument.emit(editFile);
          this.valueChanged = false;
        } else {
          this.uploadDocument.next(document);
        }
      } else {
        this.formSubmited = false;
        window.scrollTo(0, 0);
      }
    }
  }

  /**
   *  emit document to be deleted to parent
   */
  public documentDelete() {
    if (this.fileToPreview) {
      this.deleteDocument.emit(this.fileToPreview);
    }
  }

  /**
   * reset form with default object
   */
  public resetForm() {
    this.formSubmited = false;
    this.documentForm.reset(this.documentObject);
  }


  /**
   * check if a date has been selected
   * @param {boolean} event - emitted from date-picker component
   */
  public onDateChanges(): void {
    this.documentForm.markAsDirty();
    this.valueChanged = true;
  }
}
