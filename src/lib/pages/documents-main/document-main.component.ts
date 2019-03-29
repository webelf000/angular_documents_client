import { Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { map } from 'rxjs/operators/map';
import { Observable } from 'rxjs/Observable';
import { loadWorkflowLevel2 } from '@src/midgard/state/workflow-level2/workflow-level2.actions';
import { loadCoreuserData } from '@src/midgard/state/coreuser/coreuser.actions';
import { select, Store } from '@src/midgard/modules/store/store';
import { MatDialog, MatSnackBar } from '@angular/material';
import { HttpService } from '@src/midgard/modules/http/http.service';
import {
  getAllDocuments,
  getDocumentsLoaded, selectDocuments, selectPictures,
  selectProjectDocuments,
  selectProjectPictures
} from '@clients/documents/src/lib/state/documents.selectors';
import { loadDocuments } from '@clients/documents/src/lib/state/documents.actions';
import { getAllWorkflowLevel2s, selectWorkflowLevel2 } from '@src/midgard/state/workflow-level2/workflow-level2.selectors';
import { getAllCoreUsers } from '@src/midgard/state/coreuser/coreuser.selectors';
import { MidgardTranslateService } from '@src/midgard/modules/translation/translation-loader/translate.service';
import { ActivatedRoute } from '@angular/router';
import { DeleteConfirmationComponent } from '@clients/documents/src/lib/components/delete-confirmation/delete-confirmation.component';
import { ModalComponent} from 'freyja-ui';
import {setTopBarOptions} from '@src/midgard/state/top-bar/top-bar.actions';
import {CardItemOptions} from '@src/midgard/components/card-item/card-item-options';
import {getTopBarSelectedOption} from '@src/midgard/state/top-bar/top-bar.selectors';

@Component({
  selector: 'lib-documents-main',
  templateUrl: './document-main.component.html',
  styleUrls: ['./document-main.component.scss']
})
export class DocumentMainComponent implements OnInit, OnDestroy {
  @ViewChild('documentUploadModal') documentUploadModal: ModalComponent;
  @ViewChild('documentPreviewModal') documentPreviewModal: ModalComponent;

  public workflowLevel2List: Observable<any>;
  public currentWorkflowLevel2: Observable<any>;
  public currentDocument: any;
  public workflowLevel2Subscription: any;
  public pictureList: Observable<any>;
  public documentList: Observable<any>;
  // public projects = [];
  public documentsLoaded: Observable<any>;
  // public showHeader = false;
  public tableOptions;
  public cardItemOptions: CardItemOptions;
  public topBarOptions = [
    {
      label: 'All',
      value: 'all'
    },
    {
      label: 'Documents',
      value: 'documents'
    },
    {
      label: 'Pictures',
      value: 'pictures'
    }
  ];
  public showDocumentsSection = true;
  public showPicturesSection = true;
  public selector = getAllDocuments;

  constructor(
    public dialog: MatDialog,
    private store: Store<any>,
    private httpService: HttpService,
    private translateService: MidgardTranslateService,
    private snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.store.dispatch(setTopBarOptions(this.topBarOptions));
    this.store.observable.pipe(select(getTopBarSelectedOption)).subscribe(data => {
      if (data) {
        switch (data.value) {
          case 'documents' :
            this.showPicturesSection = false;
            this.showDocumentsSection = true;
            break;
          case 'pictures' :
            this.showPicturesSection = true;
            this.showDocumentsSection = false;
            break;
          default:
            this.showPicturesSection = true;
            this.showDocumentsSection = true;
            break;
        }
      } else {
        this.showPicturesSection = true;
        this.showDocumentsSection = true;
      }
    });
    // this.defineCardItemOptions();
    // this.defineTableOptions();
    this.workflowLevel2List = this.getWorkFlowLevel2();
    this.getDocuments();
    /**
     * dispatch LOAD actions
     */
    this.store.dispatch(loadWorkflowLevel2());
    this.store.dispatch(loadDocuments());
  }
  /**
   * Gets the current workflowlevel2 from the store
   */
  getDocuments() {
    const workflowLevel2Id = this.activatedRoute.parent.parent.snapshot.paramMap.get('id');
    if (workflowLevel2Id) {
      this.currentWorkflowLevel2 = this.store.observable.pipe(select(selectWorkflowLevel2(workflowLevel2Id)));
      this.workflowLevel2Subscription = this.currentWorkflowLevel2.subscribe( workflowLevel2 => {
        if (workflowLevel2) {
          // load pictures
          this.pictureList = this.store.observable.pipe(select(selectProjectPictures(workflowLevel2.level2_uuid)));
          // load documents(pdfs)
          this.documentList = this.store.observable.pipe(select(selectProjectDocuments(workflowLevel2.level2_uuid)));
          // check if the documents are loaded
          this.documentsLoaded = this.store.observable.pipe(select(getDocumentsLoaded));
        }
      });
    } else {
      // load pictures
      this.pictureList = this.store.observable.pipe(select(selectPictures));
      // load documents(pdfs)
      this.documentList = this.store.observable.pipe(select(selectDocuments));
      // check if the documents are loaded
      this.documentsLoaded = this.store.observable.pipe(select(getDocumentsLoaded));
    }

  }

  /**
   * open upload document/picture form modal
   */
  public openDocumentFormModal() {
    this.documentUploadModal.showModal = true;
    }

  /**
   * closes upload document/picture form modal
   */
  public closeModal() {
    this.documentUploadModal.showModal = false;
  }

  /**
   * gets the doc to be preview
   * @param {object} document - document form object
   */
  public setPreviwedDoc(document) {
    this.currentDocument = document;
    this.documentPreviewModal.showModal = true;
  }

  /**
   * Load WorkflowLevel2
   * @return {Observable} - of WorkflowLevel2 Array
   */
  public getWorkFlowLevel2(): Observable<any> {
    return this.store.observable.pipe(
      select(getAllWorkflowLevel2s),
      map((projects) => {
        const projectOptions: any[] = [];
        projects.data.forEach((project) => {
          projectOptions.push({
            label: project.name,
            value: project.level2_uuid
          });
        });
        return projectOptions;
      })
    );
  }

  /***
   * get time method
   * @param {string} date - date
   */
  private getTime(date) {
    return date != null ? new Date(date).getTime() : 0;
  }

  /**
   * open delete confirmation modal & sets the docToDelete to this document
   * @param {object} document - document object to be deleted
   */
  public openDeleteConfirmModal(document) {
    const message = this.translateService.instant('DOCUMENTS.DELETE_MODAL.DELETE_PROMPT');
    const title = this.translateService.instant('DOCUMENTS.DELETE_MODAL.CONFIRM_DELETE');
    this.dialog.open(DeleteConfirmationComponent, {
      data: {
        deleteAction: 'DELETE_DOCUMENT',
        elementToDelete: document,
        message: `${message} ${document.file_name}?`,
        title: title
      }
    });
  }

  ngOnDestroy() {
    if (this.workflowLevel2Subscription) {
      this.workflowLevel2Subscription.unsubscribe();
    }
  }
}
