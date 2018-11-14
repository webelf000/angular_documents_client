import { Component, OnInit, Input, EventEmitter, Output, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { TableEmitObject } from  '@libs/midgard-angular/src/lib/components/table/table.model';
import { FileSavingService } from '@libs/documents/src/lib/services/file-saving.service';

@Component({
  selector: 'mg-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.scss']
})
export class DocumentListComponent implements OnInit {
  @Input() projects = [];
  @Input() documentList = [];

  @Output() docToPreview: EventEmitter<any> = new EventEmitter();
  @Output() delete: EventEmitter<any> = new EventEmitter();

  @ViewChild('table') table: any;

  public documents: Document[] = [];
  public columns: any[] = [];
  public rows: any[] = [];
  public fileSavingSubscription: Subscription;


  constructor(
    private fileSavingService: FileSavingService
  ) {}

  ngOnInit() {
    this.columns = [
      {
        name: 'DOCUMENTS.DOCUMENTS_LIST.DOCUMENT_NAME',
        prop: 'file_name',
        flex: 2,
        sortable: false
      },
      {
        name: 'DOCUMENTS.DOCUMENTS_LIST.DATE',
        prop: 'create_date',
        flex: '120px',
        cellTemplate: 'date',
        sortable: false
      },
      {
        name: 'DOCUMENTS.DOCUMENTS_LIST.PROJECT_NAME',
        prop: 'projects',
        flex: 2,
        sortable: false
      },
      {
        cellTemplate: 'actions',
        actions: ['download', 'delete'],
        flex: '150px',
        sortable: false
      },
    ];
  }

  /**
   * Preview document
   * @param {object} document - document object from the table row
   */
  public previewDocument(document) {
    this.docToPreview.emit(document);
  }

  /**
   * @description - emits document to download to parent
   * @param {object} document - document object from the table row
   */
  public downloadDocument(row) {
    this.fileSavingSubscription = this.fileSavingService.downloadDocument(row.item).subscribe(() => {
      this.table.stopDownloadSpinner(row.index);
      this.fileSavingSubscription.unsubscribe();
    });
  }

  /**
   * @description - emits document to delete to parent
   * @param {row} document - document object from the table row
   */
  public deleteDocument(row: TableEmitObject) {
    this.delete.emit(row.item);
  }
}
