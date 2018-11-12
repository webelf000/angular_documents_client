import { NgModule } from '@angular/core';
import { DocumentMainComponent } from './pages/documents-main/document-main.component';
import { DocumentsRoutingModule } from '@libs/documents/src/lib/documents-routing.module';
import { MatDialogModule, MatSnackBarModule } from '@angular/material';
import { MidgardModule } from '@libs/midgard-angular/src/lib/midgard.module';
import { ButtonModule } from '@libs/midgard-angular/src/lib/components/button/button.module';
import { TopBarModule } from '@libs/midgard-angular/src/lib/components/top-bar-actions/top-bar.module';
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
import { MgDragAndDropModule } from '@libs/midgard-angular/src/lib/components/drag-and-drop/drag-and-drop.module';
import { LoaderModule } from '@libs/midgard-angular/src/lib/components/loader/loader.module';
import { CardModule } from '@libs/midgard-angular/src/lib/components/card/card.module';
import { IconModule } from '@libs/midgard-angular/src/lib/components/icon/icon.module';
import { GridFormsModule } from '@libs/midgard-angular/src/lib/components/form-elements/grid-forms/grid-forms.module';
import { FileExtensionHelper } from '@libs/documents/src/lib/helpers/file-extension.helper';
import { FileSavingService } from '@libs/documents/src/lib/services/file-saving.service';
import { ImageLoadingService } from '@libs/documents/src/lib/services/image-loading.service';
import { MidgardSharedTranslationModule } from '@libs/midgard-angular/src/lib/modules/translation/translation.shared.module';
import { MidgardStoreModule } from '@libs/midgard-angular/src/lib/modules/store/store.module';
import { DocumentModalComponent } from './components/document-modal/document-modal.component';
import { DeleteConfirmationModule } from '@libs/midgard-angular/src/lib/components/delete-confirmation/delete-confirmation.module';

@NgModule({
  imports: [
    CommonModule,
    DocumentsRoutingModule,
    MidgardSharedTranslationModule,
    MidgardStoreModule,
    MidgardModule,
    MatSnackBarModule,
    MatDialogModule,
    ButtonModule,
    TopBarModule,
    MgSpinnerModule,
    DeleteConfirmationModule,
    TableModule,
    MgDragAndDropModule,
    LoaderModule,
    IconModule,
    CardModule,
    GridFormsModule
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
    PictureListItemComponent,
    DocumentModalComponent
  ],
  providers: [
    FileExtensionHelper,
    FileSavingService,
    ImageLoadingService
  ],
  entryComponents: [
    DocumentModalComponent
  ],
  exports: [DocumentMainComponent]
})
export class DocumentsModule {}