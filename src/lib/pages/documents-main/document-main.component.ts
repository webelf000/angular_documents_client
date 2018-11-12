import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators/map';
import { Observable } from 'rxjs/Observable';
import { loadWorkflowLevel2 } from '@libs/midgard-angular/src/lib/state/workflow-level2/workflow-level2.actions';
import { loadCoreuserData } from '@libs/midgard-angular/src/lib/state/coreuser/coreuser.actions';
import { select, Store } from '@libs/midgard-angular/src/lib/modules/store/store';
import { MatDialog, MatSnackBar } from '@angular/material';
import { HttpService } from '@libs/midgard-angular/src/lib/modules/http/http.service';
import { getDocumentsLoaded, selectDocuments, selectPictures } from '@libs/documents/src/lib/state/documents.selectors';
import { loadDocuments } from '@libs/documents/src/lib/state/documents.actions';
import { DocumentModalComponent } from '@libs/documents/src/lib/components/document-modal/document-modal.component';
import { getAllWorkflowLevel2s, selectWorkflowLevel2 } from '@libs/midgard-angular/src/lib/state/workflow-level2/workflow-level2.selectors';
import { getAllCoreUsers } from '@libs/midgard-angular/src/lib/state/coreuser/coreuser.selectors';
import { MidgardTranslateService } from '@libs/midgard-angular/src/lib/modules/translation/translation-loader/translate.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'lib-documents-main',
  templateUrl: './document-main.component.html',
  styleUrls: ['./document-main.component.scss']
})
export class DocumentMainComponent implements OnInit {
  public coreUserList: Observable<any>;
  public workflowLevel2List: Observable<any>;
  public currentWorkflowLevel2: Observable<any>;
  public oauthUser$: Observable<any>;
  public pictureList: Observable<any>;
  public documentList: Observable<any>;
  public currentDoc;
  // public projects = [];
  public documentsLoaded: Observable<any>;
  // public showHeader = false;
  // public translatedDeleteMessage: string;
  constructor(
    public dialog: MatDialog,
    private store: Store<any>,
    private httpService: HttpService,
    private translateService: MidgardTranslateService,
    private snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getCurrentWorkflowLevel2();
    // load pictures
    this.pictureList = this.store.observable.pipe(select(selectPictures));
    // load documents(pdfs)
    this.documentList = this.store.observable.pipe(select(selectDocuments));
    this.documentsLoaded = this.store.observable.pipe(select(getDocumentsLoaded));
    /**
     * dispatch LOAD actions
     */
    this.store.dispatch(loadWorkflowLevel2());
    this.store.dispatch(loadCoreuserData());
    this.store.dispatch(loadDocuments());
    this.coreUserList = this.getCoreUsers();
    this.workflowLevel2List = this.getWorkFlowLevel2();
  }

  /**
   * Gets the current workflowlevel2 from the store
   */
  getCurrentWorkflowLevel2() {
    const workflowLevel2Id = this.activatedRoute.parent.parent.snapshot.paramMap.get('id');
    this.currentWorkflowLevel2 = this.store.observable.pipe(select(selectWorkflowLevel2(workflowLevel2Id)));
  }

  /**
   * @description - open upload document/picture form modal
   */
  public openDocumentFormModal() {
    const dialogRef = this.dialog.open(DocumentModalComponent, {
      data: {
        coreUsers: this.coreUserList,
        workflowLevel2s: this.workflowLevel2List,
        currentWorkflowLevel2: this.currentWorkflowLevel2,
        isEdit: false
      }
    });

    dialogRef.afterClosed().subscribe(result => {});
  }

  /**
   * gets the doc to be preview
   * @param {object} document - document form object
   */
  public setPreviwedDoc(document) {
    const dialogRef = this.dialog.open(DocumentModalComponent, {
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
   * @description - Load WorkflowLevel2
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
  //
  /**
   * @description - open delete confirmation modal & sets the docToDelete to this document
   * @param {object} document - document object to be deleted
   */
  public openDeleteConfirmModal(document) {
    const translateParams = {
      projectName: document.file_name
    };
  }
}