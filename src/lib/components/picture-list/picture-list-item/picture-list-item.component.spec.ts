import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PictureListItemComponent } from './picture-list-item.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import { FileSavingService } from '@libs/documents/src/lib/services/file-saving.service';
import { FileSavingStubService, ImageLoadingStubService } from '@libs/midgard-angular/src/lib/testing-utilities/stubs';
import { ImageLoadingService } from '@libs/documents/src/lib/services/image-loading.service';
import { documentsMock } from '@libs/midgard-angular/src/lib/testing-utilities/mock.data';
import { of } from 'rxjs';

describe('PictureListItemComponent', () => {
  let component: PictureListItemComponent;
  let fixture: ComponentFixture<PictureListItemComponent>;
  let imageLoading;
  let fileSaving;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PictureListItemComponent ],
      providers: [
        {provide: ImageLoadingService, useClass: ImageLoadingStubService},
        {provide: FileSavingService, useClass: FileSavingStubService}
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PictureListItemComponent);
    imageLoading = TestBed.get(ImageLoadingService);
    fileSaving = TestBed.get(FileSavingService);
    component = fixture.componentInstance;
    component.picture = documentsMock[0];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call the imageloading Service if the thumbnail blob does not exist', () => {
    spyOn(imageLoading, 'loadImage').and.callThrough();
    component.ngOnInit();
    expect(imageLoading.loadImage).toHaveBeenCalled();
  });

  it('should call the fileSavingService when called', () => {
    spyOn(fileSaving, 'downloadDocument').and.returnValue(of(true));
    component.downloadPicture(new Event('MouseEvent'));
    expect(component.showSpinner).toBeFalsy();
  });
});
