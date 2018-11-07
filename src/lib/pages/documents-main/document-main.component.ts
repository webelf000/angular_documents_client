import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators/map';
import { Observable } from 'rxjs/Observable';
import { loadWorkflowLevel2 } from '@libs/midgard-angular/src/lib/state/workflow-level2/workflow-level2.actions';
import { loadCoreuserData } from '@libs/midgard-angular/src/lib/state/coreuser/coreuser.actions';
import { select, Store } from '@libs/midgard-angular/src/lib/modules/store/store';
import { MidgardTranslateService } from '@libs/midgard-angular/src/lib/modules/translation/translation-loader/translate.service';
import { MatSnackBar } from '@angular/material';
import { HttpService } from '@libs/midgard-angular/src/lib/modules/http/http.service';
import { coreuserReducer } from '@libs/midgard-angular/src/lib/state/coreuser/coreuser.reducer';
import { workflowlevel2Reducer } from '@libs/midgard-angular/src/lib/state/workflow-level2/workflow-level2.reducer';
import { selectDocuments, selectPictures } from '@libs/documents/src/lib/state/documents.selectors';
import { loadDocuments } from '@libs/documents/src/lib/state/documents.actions';


@Component({
  selector: 'lib-documents-main',
  templateUrl: './document-main.component.html',
  styleUrls: ['./document-main.component.scss']
})
export class DocumentMainComponent implements OnInit {
  public documentFormModal: Subject<any> = new Subject();
  public deleteTube: Subject<any> = new Subject();
  public tolaUserList$: Observable<any>;
  public projectList$: Observable<any>;
  public oauthUser$: Observable<any>;
  public pictureList$: Observable<any>;
  public documentList$: Observable<any>;
  public isLoading$: Observable<any>;
  public isEditing$: Observable<any>;
  public isCreating$: Observable<any>;
  public projects = [];
  public currentDoc;
  public currentContact$;
  public docToDelete;
  public contactUiid: string | undefined;
  public showHeader = false;
  public isEdit = false;
  public translatedDeleteMessage: string;
  constructor(
    private store: Store<any>,
    private httpService: HttpService,
    private translateService: MidgardTranslateService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    /**
     * dispatch LOAD actions
     */
    this.store.dispatch(loadWorkflowLevel2());
    this.store.dispatch(loadCoreuserData());
    this.store.dispatch(loadDocuments());
    // load TolaUsers
    this.tolaUserList$ = this.getCoreUsers();
    // // load pictures
    this.pictureList$ = this.store.observable.pipe(select(selectPictures));
    console.log(this.pictureList$)
    // // load documents(pdfs)
    this.documentList$ = this.store.observable.pipe(select(selectDocuments));
  }

  /**
   * @description - open upload document/picture form modal
   */
  public openDocumentFormModal() {
    this.isEdit = false;
    this.documentFormModal.next('open');
  }

  /**
   * @description - open upload document/picture form modal
   */
  public closeDocumentFormModal() {
    this.documentFormModal.next('close');
  }

  /**
   * @description - delete a document: dispatches an action to delete a document
   */
  public deleteDocument() {
    if (this.docToDelete) {
      // this.store.dispatch(new DeleteDocument({ document: this.docToDelete }));
    }
    this.closeDeleteConfirmModal();
    this.closeDocumentFormModal();
  }

  /**
   * gets the doc to be preview
   * @param {object} document - document form object
   */
  public setPreviwedDoc(document) {
    this.currentDoc = document;
    this.isEdit = true;
    this.documentFormModal.next('open');
  }

  /**
   * load CoreUsers
   * @return {Observable} - of type Coreuser Array
   */
  public getCoreUsers(): Observable<any> {

    return this.store.observable.pipe(
      select('coreuserReducer', 'data'),
      map((users) => {
        const projectOptions: any[] = [];
        users.forEach((user) => {
          projectOptions.push({
            label: user.name,
            value: user.tola_user_uuid
          });
        });
        return projectOptions;
      })
    );
  }

  /**
   * @description - Load WorkflowLevel2
   * @return {Observable} - of WorkflowLevel2 Array
   */
  public getWorkFlowLevel2(): Observable<any> {
    return this.store.observable.pipe(
      select('workflowlevel2Reducer', 'data'),
      map((projects) => {
        const projectOptions: any[] = [];
        projects.forEach((project) => {
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
    this.docToDelete = document;
    const translateParams = {
      projectName: this.docToDelete.file_name
    };
    this.translatedDeleteMessage = this.translateService.instant(`DOCUMENTS.DELETE_MODAL.DELETE_PROMPT`, translateParams);
    this.deleteTube.next('open');
  }
  /**
   * close delete confirmation modal
   */
  public closeDeleteConfirmModal() {
    this.deleteTube.next('close');
  }
}
