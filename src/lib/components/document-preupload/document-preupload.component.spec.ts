/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FileExtensionHelper } from '@mg/shared/helpers/file-extension.helper';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DocumentPreuploadComponent } from './document-preupload.component';

describe('DocumentPreuploadComponent', () => {
  let component: DocumentPreuploadComponent;
  let fixture: ComponentFixture<DocumentPreuploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentPreuploadComponent ],
      schemas: [ NO_ERRORS_SCHEMA ],
      providers: [
        FileExtensionHelper
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentPreuploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
