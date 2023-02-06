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
import { FixedLocationTypeModel } from './fixedlocation.type.model';
import { FixedLocationTypeViewComponent } from './fixedlocation.type.view';


@Component({
  selector: 'fixedlocation-type.editor',
  templateUrl: './fixedlocation.type.editor.html',
  styleUrls: ['./fixedlocation.type.editor.less'],
})
export class FixedLocationTypeEditorComponent {

  public static readonly PATH = "logisticConfig/fixedLocationType/editor";


  readonly numberId: string = "FixedLocationTypeEditorComponent_numberId";
  readonly nameId: string = "FixedLocationTypeEditorComponent_nameId";

  idExisting: number = 0;
  model: FixedLocationTypeModel = FixedLocationTypeModel.createEmtpy();


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
        return FixedLocationTypeModel.fillDataById(this.idExisting, this.model, this.httpClient);
      })
      .catch((error) => {
        let errorMessage = "FixedLocationTypeModel could not be loaded: " + error;
        console.log(errorMessage);
        alert(errorMessage);
      });


  }


  public save(): void {

    Promise.resolve()
      .then(() => { return this.checkRequiredFields() })
      .then((value) => { return this.checkNumberUnique() })
      .then((value) => { return this.sendRequest() })
      .then((value) => { return this.returnToMainView() })
      .catch(error => {
        console.log(error)
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

    let request: ApiGetRequest = new ApiGetRequest(this.httpClient);
    request.endpoint("fixedLocation/type/getByNumber/" + currentNumber);
    request = ApiRequestHelper.getInstance().executeRequest(request);
    return request.getResponsePromise()
      .then((value: HttpResponse<any>) => {
        const exisingEmployeeId = value.body["id"];
        if (exisingEmployeeId == this.idExisting) {
          return;
        }
        GuiUtil.setBorderToRed(this.numberId); //TODO: add message for user, that usename is not unique
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
    this.router.navigate([FixedLocationTypeViewComponent.PATH]);
  }

  private doCreate(): Promise<HttpResponse<any>> {
    let request: ApiPostRequest = new ApiPostRequest(this.httpClient);
    request.endpoint("fixedLocation/type");
    request.body(JSON.stringify(this.model.toCreateJson()));
    request = ApiRequestHelper.getInstance().executeRequest(request);
    return request.getResponsePromise();
  }

  private doUpdate(): Promise<HttpResponse<any>> {
    let request: ApiPutRequest = new ApiPutRequest(this.httpClient);
    request.endpoint("fixedLocation/type/updateById/" + this.idExisting);
    request.body(JSON.stringify(this.model.toUpdateJson()));
    request = ApiRequestHelper.getInstance().executeRequest(request);
    return request.getResponsePromise();
  }

}




