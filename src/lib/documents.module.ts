import { NgModule } from '@angular/core';
import { DocumentsComponent } from './documents.component';
import { DocumentsRoutingModule } from '@libs/documents/src/lib/documents-routing.module';

@NgModule({
  imports: [
    DocumentsRoutingModule
  ],
  declarations: [DocumentsComponent],
  exports: [DocumentsComponent]
})
export class DocumentsModule { }
