import { NgModule } from '@angular/core';
import { DocumentMainComponent } from './pages/documents-main/document-main.component';
import { DocumentsRoutingModule } from '@libs/documents/src/lib/documents-routing.module';
import { MatDialogModule, MatSnackBarModule } from '@angular/material';
import { MidgardModule } from '@libs/midgard-angular/src/lib/midgard.module';
import { ButtonModule } from '@libs/midgard-angular/src/lib/components/button/button.module';
import { TopBarModule } from '@libs/midgard-angular/src/lib/components/top-bar-actions/top-bar.module';
import { MgSpinnerModule } from '@libs/midgard-angular/src/lib/components/spinner/spinner.module';
import { MgModalModule } from '@libs/midgard-angular/src/lib/components/modal/modal.module';
import { MgModalConfirmModule } from '@libs/midgard-angular/src/lib/components/modal-confirm/modal-confirm.module';
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

@NgModule({
  imports: [
    CommonModule,
    DocumentsRoutingModule,
    MidgardModule,
    MatSnackBarModule,
    MatDialogModule,
    ButtonModule,
    TopBarModule,
    MgSpinnerModule,
    MgModalModule,
    MgModalConfirmModule,
    TableModule,
    MgDragAndDropModule,
    LoaderModule,
    CardModule
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
  exports: [DocumentMainComponent]
})
export class DocumentsModule { }
