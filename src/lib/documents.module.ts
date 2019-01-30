import { NgModule } from '@angular/core';
import { DocumentMainComponent } from './pages/documents-main/document-main.component';
import { DocumentsRoutingModule } from '@libs/documents/src/lib/documents-routing.module';
import { MatDialogModule, MatSnackBarModule } from '@angular/material';
import { MidgardModule } from '@libs/midgard-angular/src/lib/midgard.module';
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
import { GridFormsModule } from '@libs/midgard-angular/src/lib/components/form-elements/grid-forms/grid-forms.module';
import { FileExtensionHelper } from '@libs/documents/src/lib/helpers/file-extension.helper';
import { FileSavingService } from '@libs/documents/src/lib/services/file-saving.service';
import { ImageLoadingService } from '@libs/documents/src/lib/services/image-loading.service';
import { MidgardSharedTranslationModule } from '@libs/midgard-angular/src/lib/modules/translation/translation.shared.module';
import { DeleteConfirmationModule } from '@libs/midgard-angular/src/lib/components/delete-confirmation/delete-confirmation.module';
import { DeleteConfirmationComponent } from '@libs/midgard-angular/src/lib/components/delete-confirmation/delete-confirmation.component';
import {FjButtonModule} from 'freyja-ui';
import {FjModalModule} from 'freyja-ui';
import {FjTextInputModule} from 'freyja-ui';
import {FjDatePickerModule} from 'freyja-ui';
import {FjNativeDropdownModule} from 'freyja-ui';
import {FjDragAndDropModule} from 'freyja-ui';
import {IconModule} from 'freyja-ui';

@NgModule({
  imports: [
    CommonModule,
    DocumentsRoutingModule,
    MidgardSharedTranslationModule,
    MidgardModule,
    MatSnackBarModule,
    MatDialogModule,
    TopBarModule,
    MgSpinnerModule,
    DeleteConfirmationModule,
    TableModule,
    MgDragAndDropModule,
    LoaderModule,
    IconModule,
    CardModule,
    GridFormsModule,
    FjButtonModule,
    FjModalModule,
    FjTextInputModule,
    FjDatePickerModule,
    FjNativeDropdownModule,
    FjDragAndDropModule,
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
