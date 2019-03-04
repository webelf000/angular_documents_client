import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DocumentMainComponent } from './document-main.component';
import { MidgardStoreModule } from '@src/midgard/modules/store/store.module';
import { MidgardTranslationTestModule } from '@src/midgard/testing-utilities/translation-testing.module';
import { ActivatedRouteStub, MatDialogStub, StubService } from '@src/midgard/testing-utilities/stubs';
import { HttpService } from '@src/midgard/modules/http/http.service';
import { FileExtensionHelper } from '@clients/documents/src/lib/helpers/file-extension.helper';
import { MatDialog, MatSnackBar } from '@angular/material';
import { select, Store } from '@src/midgard/modules/store/store';
import { ActivatedRoute } from '@angular/router';


describe('DocumentMainComponent', () => {
  let component: DocumentMainComponent;
  let fixture: ComponentFixture<DocumentMainComponent>;
  let store;
  let dialog;
  let httpService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DocumentMainComponent],
      imports: [MidgardTranslationTestModule, MidgardStoreModule.forRoot()],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        FileExtensionHelper,
        {provide: ActivatedRoute, useClass: ActivatedRouteStub},
        {provide: HttpService, useClass: StubService},
        {provide: MatSnackBar, useClass: StubService},
        {provide: MatDialog, useClass: MatDialogStub},
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    httpService = TestBed.get(HttpService);
    fixture = TestBed.createComponent(DocumentMainComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);
    dialog = TestBed.get(MatDialog);
    fixture.detectChanges();
  });
});

