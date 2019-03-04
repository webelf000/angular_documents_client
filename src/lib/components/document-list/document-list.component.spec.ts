import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {Component, NO_ERRORS_SCHEMA} from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { DocumentListComponent } from './document-list.component';
// import {TableMockComponent} from '../../../../../testing/mock.data';
import {Subscription} from 'rxjs/Subscription';
import { MidgardStoreModule } from '@src/midgard/modules/store/store.module';
import { FileSavingService } from '@clients/documents/src/lib/services/file-saving.service';
import { FileSavingStubService } from '@src/midgard/testing-utilities/stubs';
import { of } from 'rxjs';

describe('DocumentListComponent', () => {
  let component: DocumentListComponent;
  let fixture: ComponentFixture<DocumentListComponent>;
  let fileSaving;
  const mockDocument = {
    id: 123,
    create_date: '12. Novemebr 2017',
    file_name: 'Test Document 1.pdf',
    file_type: 'pdf',
    file: '',
    user_uuid: 'ehdjjdjsahkaiwwooq',
    organization_uuid: '',
    workflowlevel1_uuids: ['ebbdnsjhhaj']
  };

  @Component(
    {
      selector: 'mg-ui-table',
      template: ''
    }
  )
  class TableMockComponent {
    public stopDownloadSpinner(str: any): void {}
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DocumentListComponent,
        TableMockComponent
      ],
      imports: [
        TranslateModule.forRoot(),
        MidgardStoreModule.forRoot()
      ],
      providers: [
        {provide: FileSavingService, useClass: FileSavingStubService}
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentListComponent);
    fileSaving = TestBed.get(FileSavingService);
    component = fixture.componentInstance;
    component.table = new TableMockComponent();
    component.fileSavingSubscription = new Subscription();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /**
   * test download method
   * @todo - To be updated once the backend structure is known the method
   * implementation is complete
   */
  it('should call the fileSaving download service', () => {
    const table: TableMockComponent = fixture.componentInstance.table;
    const doc = {
      index: 2
    };
    spyOn(fileSaving, 'downloadDocument').and.returnValue(of(true));
    spyOn(table, 'stopDownloadSpinner').and.callThrough();
    component.downloadDocument(doc);
    expect(table.stopDownloadSpinner).toHaveBeenCalledWith(doc.index);
  });

  /**
   * test delete method
   */
  it('should call the delete method and emit the document', () => {
    expect(component.deleteDocument).toBeDefined();
    spyOn(component.delete, 'emit').and.callThrough();
    component.deleteDocument({index: 0, item: mockDocument});
    expect(component.delete.emit).toHaveBeenCalledWith(mockDocument);
  });
});
