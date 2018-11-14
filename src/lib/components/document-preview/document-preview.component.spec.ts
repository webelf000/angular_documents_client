import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentPreviewComponent } from './document-preview.component';
import { FileExtensionHelper } from '@mg/shared/helpers/file-extension.helper';
import { Store, StoreModule} from '@ngrx/store';
import { reducer } from '@mg/modules/documents/state/reducers/documents.reducer';
import { ImageLoadingStubService } from '../../../../../testing/services.stubs';
import { ImageLoadingService } from '@mg/shared/services/image-loading.service';
import { AppState } from '@mg/shared/interfaces/appstate';
import { documentsMock } from '../../../../../testing/mock.data';
import { of } from 'rxjs/observable/of';
import { EditDocument } from '@mg/modules/documents/state/actions/documents.actions';

describe('DocumentPreviewComponent', () => {
  let component: DocumentPreviewComponent;
  let fixture: ComponentFixture<DocumentPreviewComponent>;
  let store: Store<AppState>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DocumentPreviewComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        FileExtensionHelper,
        {provide: ImageLoadingService, useClass: ImageLoadingStubService}
      ],
      imports: [StoreModule.forRoot(reducer)]
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
    spyOn(store, 'pipe').and.returnValue(of(documentsMock[0]));
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
    const updatedDocument = {id: documentsMock[0].id, changes: documentsMock[0]};
    const action = new EditDocument(updatedDocument);
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
