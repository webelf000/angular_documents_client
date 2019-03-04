import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Store } from '@src/midgard/modules/store/store';
import { DeleteConfirmationComponent } from '@clients/documents/src/lib/components/delete-confirmation/delete-confirmation.component';
import { MidgardTranslateService } from '@src/midgard/modules/translation/translation-loader/translate.service';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'mg-picture-list',
  templateUrl: './picture-list.component.html',
  styleUrls: ['./picture-list.component.scss']
})
export class PictureListComponent implements OnInit {
  @Input() pictureList = [];
  @Output() delete = new EventEmitter();
  @Output() download = new EventEmitter();
  @Output() docToPreview = new EventEmitter();
  public maxItems = 8;
  public moreLink = true;

  constructor(
    private store: Store<any>,
    private translateService: MidgardTranslateService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {}

  /**
   * Invokes when the download event is triggered, sends the event to parent
   * @param picture - the file object to be downloaded
   * @param event - click event
   */
  public downloadPicture(event, picture) {
    event.stopPropagation();
    this.download.emit(picture);
  }

  /**
   * Preview document
   * @param {object} document - document object from the table row
   */
  public previewDocument(document) {
    this.docToPreview.next(document);
  }

  /**
   * display the rest of the images
   */
  public showMore() {
    this.maxItems = this.pictureList.length;
    this.moreLink = false;
  }
  /**
   * display the rest of the images
   */
  public showLess() {
    this.maxItems = 5;
    this.moreLink = true;
  }
  /**
   * open delete confirmation modal & sets the docToDelete to this document
   * @param {object} document - document object to be deleted
   */
  public openDeleteConfirmModal(document) {
    const message = this.translateService.instant('DOCUMENTS.DELETE_MODAL.DELETE_PROMPT');
    const title = this.translateService.instant('DOCUMENTS.DELETE_MODAL.CONFIRM_DELETE');
    this.dialog.open(DeleteConfirmationComponent, {
      data: {
        deleteAction: 'DELETE_DOCUMENT',
        elementToDelete: document,
        message: `${message} ${document.file_name}?`,
        title: title
      }
    });
  }
}
