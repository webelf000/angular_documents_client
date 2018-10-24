import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { DocumentsComponent } from '@libs/documents/src/lib/documents.component';

const documentsRoutes: Routes = [
  {
    path: '', component: DocumentsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(documentsRoutes)],
  exports: [RouterModule]
})
export class DocumentsRoutingModule {}
