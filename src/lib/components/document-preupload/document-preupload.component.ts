import { Component, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { SafeStyle, DomSanitizer } from '@angular/platform-browser';
import { FileExtensionHelper } from '@libs/documents/src/lib/helpers/file-extension.helper';
@Component({
  selector: 'mg-document-preupload',
  templateUrl: './document-preupload.component.html',
  styleUrls: ['./document-preupload.component.scss']
})
export class DocumentPreuploadComponent implements OnChanges {
  public isImage = false;
  public isPdf = false;
  public isOther = false;
  public filePath: SafeStyle;
  @Input() fileLocalPath: any;
  @Input() fileUploaded: any;
  @Output() cancelDocument: EventEmitter<any> = new EventEmitter();

  constructor(
    private fileExtensionHelper: FileExtensionHelper,
    private sanitizer: DomSanitizer
  ) { }

  ngOnChanges() {
    if (this.fileUploaded) {
      const fileFormat = this.fileExtensionHelper.getFileExtension(this.fileUploaded.name);
      this.isPdf = this.fileExtensionHelper.getIsFilePdf(fileFormat);
      this.isImage = this.fileExtensionHelper.getFileType(fileFormat);
      if ( !this.isImage && !this.isPdf ) {
        this.isOther = true;
      }
      this.getDocumentUrl(this.fileLocalPath);
    }
  }

   /**
   * @description - sanitize document url
   * @param {string} path - document url
   */
  public getDocumentUrl(path) {
    this.filePath =  this.sanitizer.bypassSecurityTrustResourceUrl(path);
  }

   /**
   * @description - emits event with the file to delete from the preupload
   * @param {object} fileUploaded - file object to delete
   */
  public cancelUpload() {
    this.cancelDocument.emit(this.fileUploaded);
  }

}
