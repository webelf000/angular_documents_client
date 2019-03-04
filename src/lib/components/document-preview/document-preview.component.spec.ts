import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentPreviewComponent } from './document-preview.component';
import { ImageLoadingService } from '@clients/documents/src/lib/services/image-loading.service';
import { FileExtensionHelper } from '@clients/documents/src/lib/helpers/file-extension.helper';
import { MatSnackBarStub, StubService } from '@src/midgard/testing-utilities/stubs';
import { Store } from '@src/midgard/modules/store/store';
import { MidgardStoreModule } from '@src/midgard/modules/store/store.module';
import { documentsMock } from '@src/midgard/testing-utilities/mock.data';
import { of } from 'rxjs';
import { updateDocument } from '@clients/documents/src/lib/state/documents.actions';
import { MidgardTranslationTestModule } from '@src/midgard/testing-utilities/translation-testing.module';
import { MatSnackBar } from '@angular/material';

describe('DocumentPreviewComponent', () => {
  let component: DocumentPreviewComponent;
  let fixture: ComponentFixture<DocumentPreviewComponent>;
  let store: Store<any>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DocumentPreviewComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        FileExtensionHelper,
        { provide: ImageLoadingService, useClass: StubService },
        { provide: MatSnackBar, useClass: MatSnackBarStub },
      ],
      imports: [MidgardStoreModule.forRoot(), MidgardTranslationTestModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
    fixture = TestBed.createComponent(DocumentPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should run subscription and envoke the getDocumentUrl method',  () => {
    spyOn(store.observable, 'pipe').and.returnValue(of(documentsMock[0]));
    spyOn(component, 'getDocumentUrl').and.callThrough();

    component.subscribeToDoc(documentsMock[0]);
    expect(component.getDocumentUrl).toHaveBeenCalledWith(documentsMock[0].blobLocalUrl);
  });

  it('should return correct file type', () => {
    component.getFileType('image/png');
    expect(component.isImage).toBeTruthy();

    component.getFileType('application/pdf');
    expect(component.isPdf).toBeTruthy();
  });

  it('download should dispatch action with the updated document', () => {
    const action = updateDocument(documentsMock[0]);
    component.editDocument(documentsMock[0]);
    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  it('should call the delete method and emit the document', () => {
    spyOn(component.documentDelete, 'emit').and.callThrough();
    component.deleteDocument(documentsMock[0]);
    expect(component.documentDelete.emit).toHaveBeenCalled();
  });

  it('should call the download method and emit the document', () => {
    spyOn(component.download, 'emit').and.callThrough();
    component.downloadDocument(documentsMock[0]);
    expect(component.download.emit).toHaveBeenCalled();
  });
});
