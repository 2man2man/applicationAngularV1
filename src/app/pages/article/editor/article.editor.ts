import { HttpClient, HttpResponse } from '@angular/common/http';
import { Component, Injector, NgModule } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomainClazzEnum } from 'src/app/core/DomainClazzEnum';
import { ApiGetRequest } from 'src/app/core/services/Requests/ApiGetRequest';
import { ApiPostRequest } from 'src/app/core/services/Requests/ApiPostRequest';
import { ApiPutRequest } from 'src/app/core/services/Requests/ApiPutRequest';
import { ApiRequestHelper } from 'src/app/core/services/Requests/ApiRequestHelper';
import { GuiUtil } from 'src/app/util/GuiUtil';
import { StringUtil } from 'src/app/util/StringUtil';
import { ArticleViewComponent } from '../view/article.view';
import { ArticleModel } from './article.model';


@Component({
  selector: 'article.editor',
  templateUrl: './article.editor.html',
  styleUrls: ['./article.editor.less'],
})
export class ArticleEditorComponent {

  public static readonly PATH = "article/editor";

  readonly tenantDomainClazz = DomainClazzEnum.Tenant;

  readonly numberId: string = StringUtil.getRandom();
  readonly nameId: string = StringUtil.getRandom();
  readonly tenantGuiId: string = StringUtil.getRandom();

  idExisting: number = 0;
  model: ArticleModel = ArticleModel.createEmtpy();


  constructor(
    private httpClient: HttpClient,
    private router: Router,
  ) {
    this.idExisting = this.router.getCurrentNavigation()?.extras.state?.existingId;
  }

  public ngOnInit() {
    if (this.idExisting > 0) {
      this.loadExisting();
    }
  }

  private loadExisting() {

    Promise.resolve()
      .then(() => {
        return ArticleModel.fillDataById(this.idExisting, this.model, this.httpClient);
      })
      .catch((error) => {
        let errorMessage = "ArticleModel could not be loaded: " + error;
        console.log(errorMessage);
        alert(errorMessage);
      });
  }

  handleTenantSelection(data: any): void {
    this.model.tenant = data;
  }


  public save(): void {

    Promise.resolve()

      .then(() => { return this.checkRequiredFields() })
      .then((value) => { return this.checkNumberUnique() })
      .then((value) => { return this.sendRequest() })
      .then((value) => { return this.returnToMainView() })
      .catch(error => {
        console.log(error) //TODO add Error handling
      });
  }


  private sendRequest(): Promise<any> {
    if (this.isUpdate()) {
      return this.doUpdate();
    }
    else {
      return this.doCreate();
    }
  }

  private checkRequiredFields(): boolean {

    let missingFields: string[] = [];
    if (StringUtil.isEmpty(this.model.number)) {
      missingFields.push("number");
      GuiUtil.setBorderToRed(this.numberId);
    }
    if (StringUtil.isEmpty(this.model.name)) {
      missingFields.push("name");
      GuiUtil.setBorderToRed(this.nameId);
    }
    if (!this.model.tenant) {
      missingFields.push("tenant");
      GuiUtil.setBorderToRed(this.tenantGuiId);
    }

    if (missingFields.length == 0) {
      return true;
    }
    throw new Error("Some required fields are missing: " + StringUtil.combineWithSeparator(", ", missingFields));
  }

  private checkNumberUnique(): Promise<any> {

    const currentNumber = this.model.number;
    if (StringUtil.isEmpty(currentNumber)) {
      return Promise.resolve();
    }
    if (!this.model.tenant) {
      return Promise.resolve();
    }

    let request: ApiPostRequest = new ApiPostRequest(this.httpClient);
    request.endpoint("article/search");
    request.body(JSON.stringify({
      filters: { articleNumber: currentNumber, tenantId: this.model.tenant.id }
    }));
    request = ApiRequestHelper.getInstance().executeRequest(request);
    return request.getResponsePromise()
      .then((value: HttpResponse<any>) => {
        const existingArticles: any[] = value.body["results"];
        if (existingArticles.length == 0) {
          return;
        }
        GuiUtil.setBorderToRed(this.numberId); //TODO: add message for user, that number is not unique for this tenant
        throw new Error("Number is not unique");
      },
        (reason) => {
          console.log(reason);
        });
  }




  private isUpdate(): boolean {
    if (!this.idExisting) {
      return false;
    }
    else if (this.idExisting <= 0) {
      return false;
    }
    return true;
  }

  public returnToMainView(): void {
    this.router.navigate([ArticleViewComponent.PATH]);
  }

  private doCreate(): Promise<HttpResponse<any>> {
    let request: ApiPostRequest = new ApiPostRequest(this.httpClient);
    request.endpoint("article");
    request.body(JSON.stringify(this.model.toCreateJson()));
    request = ApiRequestHelper.getInstance().executeRequest(request);
    return request.getResponsePromise();
  }

  private doUpdate(): Promise<HttpResponse<any>> {
    let request: ApiPutRequest = new ApiPutRequest(this.httpClient);
    request.endpoint("article/updateById/" + this.idExisting);
    request.body(JSON.stringify(this.model.toUpdateJson()));
    request = ApiRequestHelper.getInstance().executeRequest(request);
    return request.getResponsePromise();
  }

}




