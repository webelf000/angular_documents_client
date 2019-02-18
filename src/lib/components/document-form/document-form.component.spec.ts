import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { DocumentFormComponent } from './document-form.component';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Document } from '../../state/models/document.model';
import * as moment from 'moment';
import { MatSnackBarStub, OAuthStubService, StubService } from '@libs/midgard-angular/src/lib/testing-utilities/stubs';
import { OAuthService } from '@libs/midgard-angular/src/lib/modules/oauth/oauth.service';
import { MatSnackBar } from '@angular/material';
import { mockProjects } from '@libs/midgard-angular/src/lib/testing-utilities/mock.data';

describe('DocumentFormComponent', () => {
  let component: DocumentFormComponent;
  let fixture: ComponentFixture<DocumentFormComponent>;
  const documentObjectMock: Document = {
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

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DocumentFormComponent],
      providers: [
        FormBuilder,
        { provide: OAuthService, useClass: OAuthStubService },
        { provide: MatSnackBar, useClass: MatSnackBarStub },
      ],
      imports: [FormsModule, ReactiveFormsModule, TranslateModule.forRoot()],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentFormComponent);
    component = fixture.componentInstance;
    component.documentObject = documentObjectMock;
    component.currentWorkflowLevel2 = mockProjects[0];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  /**
   * Form should be invalid when empty when required fields not filled
   */
  it('should be invalid when not filled', () => {
    expect(component.documentForm.valid).toBeFalsy();
  });

  /**
   * test fields validity
   */
  it('project and document_name fields validity', () => {
    const project = component.documentForm.controls['workflowlevel2_uuids'];
    const name = component.documentForm.controls['file_name'];
    expect(name.valid).toBeFalsy();

    // errors
    let nameErrors = name.errors || {};
    expect(nameErrors['required']).toBeTruthy();

    // set Values project
    project.setValue('73ff9094-11f6-410a-af96-7e481e');
    name.setValue('Test Document');

    nameErrors = name.errors || {};
    expect(nameErrors['required']).toBeFalsy();
  });

  /**
   * Submit a valid form and the form should be emitted
   */
  it('should emit form value on form submit', fakeAsync(() => {
    // set Values project
    const project = component.documentForm.controls['workflowlevel2_uuids'];
    const name = component.documentForm.controls['file_name'];
    const description = component.documentForm.controls['file_description'];
    const added_by = component.documentForm.controls['user_uuid'];
    const date = component.documentForm.controls['create_date'];
    const file = component.documentForm.controls['file'];

    project.setValue(['73ff9094-11f6-410a-af96-7e481e']);
    name.setValue('Test Document');
    description.setValue('Test this form');
    added_by.setValue('73ff9094-11f6-410a-af96-7e481e');
    date.setValue('12.02.2017');
    file.setValue('tehdjjsbbejjebjsjjs');

    spyOn(component.uploadDocument, 'next');
    expect(component.documentForm.valid).toBeTruthy();
    const form = component.documentForm.value;
    component.onFormSubmit(component.documentForm.value);
    expect(component.uploadDocument).toBeDefined();
    expect(component.uploadDocument.next).toHaveBeenCalledWith(form);
  }));
});
