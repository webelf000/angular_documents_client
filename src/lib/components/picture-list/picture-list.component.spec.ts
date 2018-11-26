import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { PictureListComponent } from './picture-list.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MatDialogStub, MatSnackBarStub, StubService } from '@libs/midgard-angular/src/lib/testing-utilities/stubs';
import { MatDialog, MatSnackBar } from '@angular/material';
import { HttpService } from '@libs/midgard-angular/src/lib/modules/http/http.service';
import { FileExtensionHelper } from '@libs/documents/src/lib/helpers/file-extension.helper';
import { MidgardStoreModule } from '@libs/midgard-angular/src/lib/modules/store/store.module';
import { MidgardTranslationTestModule } from '@libs/midgard-angular/src/lib/testing-utilities/translation-testing.module';
import { Store } from '@libs/midgard-angular/src/lib/modules/store/store';

describe('PictureListComponent', () => {
  let component: PictureListComponent;
  let fixture: ComponentFixture<PictureListComponent>;
  let store: Store<any>;
  let httpService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PictureListComponent ],
      imports: [MidgardTranslationTestModule, MidgardStoreModule.forRoot()],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        FileExtensionHelper,
        { provide: HttpService, useClass: StubService },
        { provide: MatSnackBar, useClass: MatSnackBarStub },
        { provide: MatDialog, useClass: MatDialogStub},
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    httpService = TestBed.get(HttpService);
    fixture = TestBed.createComponent(PictureListComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);
    fixture.detectChanges();


    fixture = TestBed.createComponent(PictureListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
