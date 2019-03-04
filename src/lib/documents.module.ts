import { NgModule } from '@angular/core';
import { DocumentMainComponent } from './pages/documents-main/document-main.component';
import { DocumentsRoutingModule } from '@clients/documents/src/lib/documents-routing.module';
import { MatDialogModule, MatSnackBarModule } from '@angular/material';
import { PictureListItemComponent } from '@clients/documents/src/lib/components/picture-list/picture-list-item/picture-list-item.component';
import { DocumentFormComponent } from '@clients/documents/src/lib/components/document-form/document-form.component';
import { DocumentAddComponent } from '@clients/documents/src/lib/components/document-add/document-add.component';
import { PictureListComponent } from '@clients/documents/src/lib/components/picture-list/picture-list.component';
import { DocumentListComponent } from '@clients/documents/src/lib/components/document-list/document-list.component';
import { DocumentPreviewComponent } from '@clients/documents/src/lib/components/document-preview/document-preview.component';
import { DocumentPreuploadComponent } from '@clients/documents/src/lib/components/document-preupload/document-preupload.component';
import { BackgroundImageDirective } from '@clients/documents/src/lib/directives/background-image.directive';
import { CommonModule } from '@angular/common';
import { FileExtensionHelper } from '@clients/documents/src/lib/helpers/file-extension.helper';
import { FileSavingService } from '@clients/documents/src/lib/services/file-saving.service';
import { ImageLoadingService } from '@clients/documents/src/lib/services/image-loading.service';
import { MidgardSharedTranslationModule } from '@src/midgard/modules/translation/translation.shared.module';
import { DeleteConfirmationModule } from '@clients/documents/src/lib/components/delete-confirmation/delete-confirmation.module';
import { DeleteConfirmationComponent } from '@clients/documents/src/lib/components/delete-confirmation/delete-confirmation.component';
import {
  FjButtonModule,
  FjModalModule,
  FjTextInputModule,
  FjDatePickerModule,
  FjNativeDropdownModule,
  FjDragAndDropModule,
  IconModule, FjTableModule, FjSpinnerModule, FjCardModule
} from 'freyja-ui';
import {MidgardCrudModule} from '@src/midgard/modules/crud/crud.module';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    DocumentsRoutingModule,
    MidgardSharedTranslationModule,
    MatSnackBarModule,
    MatDialogModule,
    FjSpinnerModule,
    DeleteConfirmationModule,
    FjTableModule,
    IconModule,
    FjButtonModule,
    FjModalModule,
    FjCardModule,
    FjTextInputModule,
    FjDatePickerModule,
    FjNativeDropdownModule,
    FjDragAndDropModule,
    MidgardCrudModule,
    ReactiveFormsModule,
    IconModule
  ],
  declarations: [
    DocumentMainComponent,
    DocumentListComponent,
    PictureListComponent,
    DocumentAddComponent,
    DocumentPreviewComponent,
    DocumentPreuploadComponent,
    DocumentFormComponent,
    BackgroundImageDirective,
    PictureListItemComponent
  ],
  providers: [
    FileExtensionHelper,
    FileSavingService,
    ImageLoadingService
  ],
  entryComponents: [
    DeleteConfirmationComponent
  ],
  exports: [DocumentMainComponent]
})
export class DocumentsModule {}
