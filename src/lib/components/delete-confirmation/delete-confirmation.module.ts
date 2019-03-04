import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeleteConfirmationComponent } from './delete-confirmation.component';
import { MatDialogModule } from '@angular/material';
import { MidgardTranslationModule } from '@src/midgard/modules/translation/translation.module';
import { MidgardStoreModule } from '@src/midgard/modules/store/store.module';
import {FjButtonModule} from 'freyja-ui';

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    FjButtonModule,
    MidgardTranslationModule,
    MidgardStoreModule,
    FjButtonModule
  ],
  declarations: [
    DeleteConfirmationComponent,
  ],
  exports: [
    DeleteConfirmationComponent,
  ]
})
export class DeleteConfirmationModule { }
