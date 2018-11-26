import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DocumentAddComponent } from './document-add.component';
import { Store } from '@libs/midgard-angular/src/lib/modules/store/store';
import { MatSnackBarStub, OAuthStubService, StubService } from '@libs/midgard-angular/src/lib/testing-utilities/stubs';
import { OAuthService } from '@libs/midgard-angular/src/lib/modules/oauth/oauth.service';
import { MidgardStoreModule } from '@libs/midgard-angular/src/lib/modules/store/store.module';
import { MatSnackBar } from '@angular/material';
import { HttpService } from '@libs/midgard-angular/src/lib/modules/http/http.service';
import { MidgardTranslationTestModule } from '@libs/midgard-angular/src/lib/testing-utilities/translation-testing.module';
import { of } from 'rxjs';
import { createDocument } from '@libs/documents/src/lib/state/documents.actions';
import { documentCreateMock } from '@libs/midgard-angular/src/lib/testing-utilities/mock.data';

describe('DocumentAddComponent', () => {
  let component: DocumentAddComponent;
  let fixture: ComponentFixture<DocumentAddComponent>;
  let store: Store<any>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DocumentAddComponent],
      providers: [
        FormBuilder,
        { provide: OAuthService, useClass: OAuthStubService },
        { provide: HttpService, useClass: StubService },
        { provide: MatSnackBar, useClass: MatSnackBarStub },
      ],
      imports: [FormsModule, ReactiveFormsModule, MidgardStoreModule.forRoot(), MidgardTranslationTestModule],
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

  it('should dispatch create action with form data on form submit and close modal', () => {
    spyOn(store.observable, 'pipe').and.returnValue(of(false));
    // stub store, spy on store.
    component.fileData = 'img/png:5637818gsbsbjsjjs';
    component.onFormSubmit(documentCreateMock);
    expect(store.dispatch).toHaveBeenCalledWith(createDocument(documentCreateMock));
  });
});
