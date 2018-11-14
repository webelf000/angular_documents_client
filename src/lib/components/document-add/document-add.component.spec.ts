import { TranslateModule } from '@ngx-translate/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { Store, StoreModule} from '@ngrx/store';
import { AppState } from '@mg/shared/interfaces/appstate';
import { CreateDocument } from './../../state/actions/documents.actions';
import { DocumentPreuploadComponent } from './../document-preupload/document-preupload.component';
import { DocumentAddComponent } from './document-add.component';
import { AuthService } from '@mg/shared/services/auth.service';
import {
  AuthStubService,
  FormValidationStubService,
  FlashMessageStubService
} from 'testing/services.stubs';
import { FormValidationService } from '@mg/shared/services/form-validator.service';
import { FlashMessageService } from '@mg/shared/services/flash-message.service';
import { reducer } from '@mg/modules/documents/state/reducers/documents.reducer';
import { documentCreateMock } from '../../../../../testing/mock.data';
import { Observable } from 'rxjs';
import { DocumentFormComponent } from '@mg/modules/documents/components/document-form/document-form.component';

describe('DocumentAddComponent', () => {
  let component: DocumentAddComponent;
  let fixture: ComponentFixture<DocumentAddComponent>;
  let store: Store<AppState>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DocumentAddComponent, DocumentFormComponent, DocumentPreuploadComponent],
      providers: [
        FormBuilder,
        { provide: AuthService, useClass: AuthStubService },
        { provide: FormValidationService, useClass: FormValidationStubService },
        { provide: FlashMessageService, useClass: FlashMessageStubService }
      ],
      imports: [TranslateModule.forRoot(), FormsModule, ReactiveFormsModule, StoreModule.forRoot(reducer)],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
    fixture = TestBed.createComponent(DocumentAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should recognize a DocumentFormComponent', async(() => {
    fixture.detectChanges();
    const documentForm: DocumentFormComponent = fixture.componentInstance.documentForm;
    expect(documentForm).toBeDefined();
  }));

  it('should dispatch create action with form data on form submit and close modal', () => {
    spyOn(component.modal, 'next').and.callThrough();
    spyOn(store, 'pipe').and.returnValue(Observable.of(false));
    const action = new CreateDocument( documentCreateMock );
    // stub store, spy on store.
    component.fileData = 'img/png:5637818gsbsbjsjjs';
    component.onFormSubmit(documentCreateMock);
    expect(store.dispatch).toHaveBeenCalledWith(action);
    expect(component.modal.next).toHaveBeenCalledWith('close');
  });
});
