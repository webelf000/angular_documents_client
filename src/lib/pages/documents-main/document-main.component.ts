import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { map } from 'rxjs/operators/map';
import { Observable } from 'rxjs/Observable';
import { loadWorkflowLevel2 } from '@libs/midgard-angular/src/lib/state/workflow-level2/workflow-level2.actions';
import { loadCoreuserData } from '@libs/midgard-angular/src/lib/state/coreuser/coreuser.actions';
import { select, Store } from '@libs/midgard-angular/src/lib/modules/store/store';
import { MatDialog, MatSnackBar } from '@angular/material';
import { HttpService } from '@libs/midgard-angular/src/lib/modules/http/http.service';
import {
  getAllDocuments,
  getDocumentsLoaded,
  selectProjectDocuments,
  selectProjectPictures
} from '@libs/documents/src/lib/state/documents.selectors';
import { loadDocuments } from '@libs/documents/src/lib/state/documents.actions';
import { DocumentModalComponent } from '@libs/documents/src/lib/components/document-modal/document-modal.component';
import { getAllWorkflowLevel2s, selectWorkflowLevel2 } from '@libs/midgard-angular/src/lib/state/workflow-level2/workflow-level2.selectors';
import { getAllCoreUsers } from '@libs/midgard-angular/src/lib/state/coreuser/coreuser.selectors';
import { MidgardTranslateService } from '@libs/midgard-angular/src/lib/modules/translation/translation-loader/translate.service';
import { ActivatedRoute } from '@angular/router';
import { DeleteConfirmationComponent } from '@libs/midgard-angular/src/lib/components/delete-confirmation/delete-confirmation.component';
import { Subscription } from 'rxjs';


@Component({
  selector: 'lib-documents-main',
  templateUrl: './document-main.component.html',
  styleUrls: ['./document-main.component.scss']
})
export class DocumentMainComponent implements OnInit, OnDestroy {
  public coreUserList: Observable<any>;
  public workflowLevel2List: Observable<any>;
  public currentWorkflowLevel2: Observable<any>;
  public workflowLevel2Subscription: Subscription;
  public pictureList: Observable<any>;
  public documentList: Observable<any>;
  // public projects = [];
  public documentsLoaded: Observable<any>;
  // public showHeader = false;
  constructor(
    public dialog: MatDialog,
    private store: Store<any>,
    private httpService: HttpService,
    private translateService: MidgardTranslateService,
    private snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.coreUserList = this.getCoreUsers();
    this.workflowLevel2List = this.getWorkFlowLevel2();
    this.getDocuments();
    /**
     * dispatch LOAD actions
     */
    this.store.dispatch(loadWorkflowLevel2());
    this.store.dispatch(loadCoreuserData());
    this.store.dispatch(loadDocuments());
  }

  /**
   * Gets the current workflowlevel2 from the store
   */
  getDocuments() {
    const workflowLevel2Id = this.activatedRoute.parent.parent.snapshot.paramMap.get('id');
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
  }

  /**
   * open upload document/picture form modal
   */
  public openDocumentFormModal() {
    this.dialog.open(DocumentModalComponent, {
      data: {
        coreUsers: this.coreUserList,
        workflowLevel2s: this.workflowLevel2List,
        currentWorkflowLevel2: this.currentWorkflowLevel2,
        isEdit: false
      }
    });
    }

  /**
   * gets the doc to be preview
   * @param {object} document - document form object
   */
  public setPreviwedDoc(document) {
    this.dialog.open(DocumentModalComponent, {
      data: {
        coreUsers: this.coreUserList,
        workflowLevel2s: this.workflowLevel2List,
        currentWorkflowLevel2: this.currentWorkflowLevel2,
        isEdit: true,
        document
      }
    });
  }
  //
  /**
   * load CoreUsers
   * @return {Observable} - of type Coreuser Array
   */
  public getCoreUsers(): Observable<any> {

    return this.store.observable.pipe(
      select(getAllCoreUsers),
      map((users) => {
        const usersOptions: any[] = [];
        users.forEach((user) => {
          usersOptions.push({
            label: user.name,
            value: user.core_user_uuid
          });
        });
        return usersOptions;
      })
    );
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
   * @description - get time method
   * @param {string} date - date
   */
  private getTime(date) {
    return date != null ? new Date(date).getTime() : 0;
  }

  /**
   * @description - open delete confirmation modal & sets the docToDelete to this document
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
    this.workflowLevel2Subscription.unsubscribe();
  }
}
