import { NgModule } from '@angular/core';
import { DocumentMainComponent } from './pages/documents-main/document-main.component';
import { DocumentsRoutingModule } from '@libs/documents/src/lib/documents-routing.module';
import { MatDialogModule, MatSnackBarModule } from '@angular/material';
import { MidgardModule } from '@libs/midgard-angular/src/lib/midgard.module';
import { MgSpinnerModule } from '@libs/midgard-angular/src/lib/components/spinner/spinner.module';
import { PictureListItemComponent } from '@libs/documents/src/lib/components/picture-list/picture-list-item/picture-list-item.component';
import { DocumentFormComponent } from '@libs/documents/src/lib/components/document-form/document-form.component';
import { DocumentAddComponent } from '@libs/documents/src/lib/components/document-add/document-add.component';
import { PictureListComponent } from '@libs/documents/src/lib/components/picture-list/picture-list.component';
import { TableModule } from '@libs/midgard-angular/src/lib/components/table/table.module';
import { DocumentListComponent } from '@libs/documents/src/lib/components/document-list/document-list.component';
import { DocumentPreviewComponent } from '@libs/documents/src/lib/components/document-preview/document-preview.component';
import { DocumentPreuploadComponent } from '@libs/documents/src/lib/components/document-preupload/document-preupload.component';
import { BackgroundImageDirective } from '@libs/documents/src/lib/directives/background-image.directive';
import { CommonModule } from '@angular/common';
import { FileExtensionHelper } from '@libs/documents/src/lib/helpers/file-extension.helper';
import { FileSavingService } from '@libs/documents/src/lib/services/file-saving.service';
import { ImageLoadingService } from '@libs/documents/src/lib/services/image-loading.service';
import { MidgardSharedTranslationModule } from '@libs/midgard-angular/src/lib/modules/translation/translation.shared.module';
import { DeleteConfirmationModule } from '@libs/midgard-angular/src/lib/components/delete-confirmation/delete-confirmation.module';
import { DeleteConfirmationComponent } from '@libs/midgard-angular/src/lib/components/delete-confirmation/delete-confirmation.component';
import {
  FjButtonModule,
  FjModalModule,
  FjTextInputModule,
  FjDatePickerModule,
  FjNativeDropdownModule,
  FjDragAndDropModule,
  IconModule
} from 'freyja-ui';
import {MidgardCrudModule} from '../../../midgard-angular/src/lib/modules/crud/crud.module';

@NgModule({
  imports: [
    CommonModule,
    DocumentsRoutingModule,
    MidgardSharedTranslationModule,
    MidgardModule,
    MatSnackBarModule,
    MatDialogModule,
    MgSpinnerModule,
    DeleteConfirmationModule,
    TableModule,
    IconModule,
    FjButtonModule,
    FjModalModule,
    FjTextInputModule,
    FjDatePickerModule,
    FjNativeDropdownModule,
    FjDragAndDropModule,
    MidgardCrudModule,
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
