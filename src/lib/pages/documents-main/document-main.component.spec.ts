import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DocumentMainComponent } from './document-main.component';
import { MidgardStoreModule } from '@libs/midgard-angular/src/lib/modules/store/store.module';
import { MidgardTranslationTestModule } from '@libs/midgard-angular/src/lib/testing-utilities/translation-testing.module';
import { ActivatedRouteStub, MatDialogStub, StubService } from '@libs/midgard-angular/src/lib/testing-utilities/stubs';
import { HttpService } from '@libs/midgard-angular/src/lib/modules/http/http.service';
import { FileExtensionHelper } from '@libs/documents/src/lib/helpers/file-extension.helper';
import { MatDialog, MatSnackBar } from '@angular/material';
import { select, Store } from '@libs/midgard-angular/src/lib/modules/store/store';
import { ActivatedRoute } from '@angular/router';
import { DocumentModalComponent } from '@libs/documents/src/lib/components/document-modal/document-modal.component';


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

  it('should open upload modal', () => {
    spyOn(dialog, 'open').and.callThrough();
    const mockConfig = {
      data: {
        coreUsers: component.coreUserList,
        workflowLevel2s: component.workflowLevel2List,
        currentWorkflowLevel2: component.currentWorkflowLevel2,
        isEdit: false
      }
    }
    component.openDocumentFormModal();
    expect(dialog.open).toHaveBeenCalledWith(DocumentModalComponent, mockConfig);
  });
});

