import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuard } from '@src/midgard/modules/oauth/auth.guard';
import { DocumentMainComponent } from '@clients/documents/src/lib/pages/documents-main/document-main.component';

const documentsRoutes: Routes = [
  { path: '', component: DocumentMainComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(documentsRoutes)],
  exports: [RouterModule]
})
export class DocumentsRoutingModule {}
