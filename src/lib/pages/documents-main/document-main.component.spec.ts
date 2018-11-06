import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { StoreModule, Store } from '@ngrx/store';
import { of } from 'rxjs/observable/of';

import { DocumentMainComponent } from './document-main.component';
import { reducers } from '@mg/shared/reducers';
import { TranslateStubService } from 'testing/external.stubs';
import { FileExtensionHelper } from '@mg/shared/helpers/file-extension.helper';
import {
  mockTolaUsers,
  mockDocuments,
  mockProjects,
  FlashMessageStubService,
  HttpStubService, GenericStubService
} from 'testing/services.stubs';
import { HttpService } from '@mg/shared/services/http.service';
import { FlashMessageService } from '@mg/shared/services/flash-message.service';
import { TolaUserActions } from '@mg/shared/actions/tolaUser.actions';
import { GlobalFiltersActions } from '@mg/shared/actions/globalFilters.actions';
import { GlobalFilterService } from '@mg/shared/services/globalFilter.service';
import { GlobalFilterStubService } from '../../../../../testing/services.stubs';

describe('DocumentMainComponent', () => {
  let component: DocumentMainComponent;
  let fixture: ComponentFixture<DocumentMainComponent>;
  let store;
  let mappedProjects;
  let httpService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DocumentMainComponent],
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
    }).compileComponents();
  }));

  beforeEach(() => {
    httpService = TestBed.get(HttpService);
    fixture = TestBed.createComponent(DocumentMainComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);
    fixture.detectChanges();
  });

  beforeEach(async(() => {
    mappedProjects = [
      { label: mockProjects[0].name, value: mockProjects[0].level2_uuid },
      { label: mockProjects[1].name, value: mockProjects[1].level2_uuid }
    ];
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /**
   * test getTolaUser method
   */
  it('should return an observable of tolausers', () => {
    expect(component.getTolaUsers).toBeDefined();

    const mappedTolaUsers = [
      { label: mockTolaUsers[0].name, value: mockTolaUsers[0].tola_user_uuid },
      { label: mockTolaUsers[1].name, value: mockTolaUsers[1].tola_user_uuid }
    ];

    spyOn(store, 'select').and.returnValue(of(mockTolaUsers));

    component.getTolaUsers().subscribe((data) => {
      expect(data.length).toBe(mockTolaUsers.length);
      expect(data).toContain(mappedTolaUsers[0]);
    });
  });

  /**
   * test getWorkFlowLevel2()
   */
  it('should return an observable of workflowLevel2', () => {
    expect(component.getWorkFlowLevel2).toBeDefined();

    spyOn(store, 'select').and.returnValue(of(mockProjects));
    component.contactUiid = 'teyuwioqonsbbdb',
    component.getWorkFlowLevel2().subscribe((data) => {
      expect(data.length).toBe(mockProjects.length);
      expect(data).toContain(mappedProjects[0]);
    });
  });
});
