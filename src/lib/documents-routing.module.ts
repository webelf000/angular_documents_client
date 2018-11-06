import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuard } from '@libs/midgard-angular/src/lib/modules/oauth/auth.guard';
import { DocumentMainComponent } from '@libs/documents/src/lib/pages/documents-main/document-main.component';

const documentsRoutes: Routes = [
  { path: '', component: DocumentMainComponent, outlet: 'documents', canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(documentsRoutes)],
  exports: [RouterModule]
})
export class DocumentsRoutingModule {}
