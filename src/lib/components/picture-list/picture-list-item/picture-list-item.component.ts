import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { ImageLoadingService } from '@clients/documents/src/lib/services/image-loading.service';
import { FileSavingService } from '@clients/documents/src/lib/services/file-saving.service';
import { fileRequestType } from '@clients/documents/src/lib/state/models/fileRequestType.model';
import { Document } from '@clients/documents/src/lib/state/models/document.model';

@Component({
  selector: 'mg-picture-list-item',
  templateUrl: './picture-list-item.component.html',
  styleUrls: ['./picture-list-item.component.scss']
})
export class PictureListItemComponent implements OnInit {
  @Input() picture: Document;
  @Output() delete = new EventEmitter();
  @Output() download = new EventEmitter();
  @Output() docToPreview = new EventEmitter();
  public imageUrl: SafeStyle;
  public showSpinner = false;
  constructor(
    private imageLoadingService: ImageLoadingService,
    private domSanitizer: DomSanitizer,
    private fileSavingService: FileSavingService
    ) { }

  ngOnInit() {
    if (!this.picture.blobThumbnailLocalUrl) {
      this.imageLoadingService.loadImage(this.picture, fileRequestType.image, true);
    } else if (!this.imageUrl) {
      this.generateSafeUrl();
    }
  }

  /**
   * Creating a safe image url for the view
   */
  private generateSafeUrl() {
    this.imageUrl = this.domSanitizer.bypassSecurityTrustStyle(`url('${this.picture.blobThumbnailLocalUrl}')`);
  }

  /**
   * Invokes when the delete event is triggered, sends the event to parent
   * @param picture - the file object to be deleted
   * @param event - click event
   */
  public deletePicture(event, picture) {
    event.stopPropagation();
    this.delete.emit(picture);
  }

  /**
   * Invokes when the download event is triggered, sends the event to parent
   * @param picture - the file object to be downloaded
   * @param event - click event
   */
  public downloadPicture(event) {
    event.stopPropagation();
    this.showSpinner = true;
    this.fileSavingService.downloadDocument(this.picture).subscribe(() => {
      this.showSpinner = false;
    });
  }

  /**
   * Preview document
   * @param {object} document - document object from the table row
   */
  public previewDocument(document) {
    this.docToPreview.next(document);
  }

}
