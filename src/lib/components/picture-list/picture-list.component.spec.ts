import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { StoreModule, Store } from '@ngrx/store';
import { reducers } from '@mg/shared/reducers';
import { HttpService } from '@mg/shared/services/http.service';

import { PictureListComponent } from './picture-list.component';
import { FileExtensionHelper } from '@mg/shared/helpers/file-extension.helper';
import { FlashMessageService } from '@mg/shared/services/flash-message.service';
import { TranslateStubService } from 'testing/external.stubs';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { GlobalFilterService } from '@mg/shared/services/globalFilter.service';
import { GlobalFilterStubService } from '../../../../../testing/services.stubs';
import { TolaUserActions } from '@mg/shared/actions/tolaUser.actions';
import {
  FlashMessageStubService,
  HttpStubService
} from 'testing/services.stubs';

describe('PictureListComponent', () => {
  let component: PictureListComponent;
  let fixture: ComponentFixture<PictureListComponent>;
  let store;
  let httpService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PictureListComponent ],
      imports: [TranslateModule.forRoot(), StoreModule.forRoot(reducers)],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        FileExtensionHelper,
        {
          provide: HttpService,
          useClass: HttpStubService
        },
        { provide: FlashMessageService, useClass: FlashMessageStubService },
        { provide: TranslateService, useClass: TranslateStubService },
        { provide: GlobalFilterService, useClass: GlobalFilterStubService },
        TolaUserActions
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
