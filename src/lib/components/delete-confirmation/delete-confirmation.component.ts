import { Component, Inject } from '@angular/core';
import { Store } from '../../../../../midgard-angular/src/lib/modules/store/store';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'mg-delete-confirmation',
  templateUrl: './delete-confirmation.component.html',
  styleUrls: ['./delete-confirmation.component.scss']
})
export class DeleteConfirmationComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteConfirmationComponent>,
    private store: Store<any>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  /**
   * @description - delete a document: dispatches an action to delete a document
   */
  public deleteElement() {
    if (this.data.elementToDelete && this.data.deleteAction) {
      this.store.dispatch({
        type: this.data.deleteAction,
        data: this.data.elementToDelete
      });
    }
    this.closeDialog();
  }

  /**
   * closes the dialog window
   */
  public closeDialog() {
    this.dialogRef.close();
  }

}
