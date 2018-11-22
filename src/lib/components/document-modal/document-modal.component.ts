import { Component, Inject, OnChanges } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';
import { DeleteConfirmationComponent } from '@libs/midgard-angular/src/lib/components/delete-confirmation/delete-confirmation.component';
import { MidgardTranslateService } from '@libs/midgard-angular/src/lib/modules/translation/translation-loader/translate.service';

@Component({
  selector: 'lib-document-modal',
  templateUrl: './document-modal.component.html',
  styleUrls: ['./document-modal.component.scss']
})
export class DocumentModalComponent {
  constructor(
    public dialogRef: MatDialogRef<DocumentModalComponent>,
    public dialog: MatDialog,
    public translateService: MidgardTranslateService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  /**
   * @description - open delete confirmation modal & sets the docToDelete to this document
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

  closeModal() {
    this.dialogRef.close();
  }

}
