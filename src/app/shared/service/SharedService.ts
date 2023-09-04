import { Injectable } from '@angular/core';
import { Http , RequestOptions , Response , Headers } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/Rx';
import { Constant } from '../constant/Contant';
import { AuthenticateModel } from 'src/app/login/model/authenticateModel';

@Injectable()
export class SharedService{

    private phpServicePoint;
    constructor(private http:Http){
        this.phpServicePoint = Constant.phpServerURL;
    }

    public getPortalColor(jsonData: any) {
        return this.http.post(this.phpServicePoint+'getAllList.php?selectType=portal_color',jsonData)
               .map((response:Response) => response.json())
               .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    public authenticate(authModel:AuthenticateModel){
        let bodyString = JSON.stringify(authModel);
        return this.http.post(this.phpServicePoint+'authenticate.php',bodyString)
               .map((response:Response) => response.json())
               .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    public getMenuListByRoleName(jsonData : any){
        let bodyString = JSON.stringify(jsonData);
        return this.http.post(this.phpServicePoint+'getMenuListByRoleName.php',bodyString)
               .map((response:Response) => response.json())
               .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    public getAllLogo() {

        return this.http.get(this.phpServicePoint+'getAllLogo.php')
               .map((response:Response) => response.json())
               .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    public getRoleList(tenentId : string) {

        return this.http.get(this.phpServicePoint+'getRoleList.php?tenentId='+tenentId)
               .map((response:Response) => response.json())
               .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    public sendOTP(json: any) {

        return this.http.post(this.phpServicePoint+'sendOTPtoMobile.php',json)
               .map((response:Response) => response.json())
               .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    public changePassword(json: any) {

        return this.http.post(this.phpServicePoint+'changePassword.php',json)
               .map((response:Response) => response.json())
               .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    public submitDataByInsertType(jsonData: any,insertType : string) {
        return this.http.post(this.phpServicePoint+'insertInTable.php?insertType='+insertType,jsonData)
               .map((response:Response) => response.json())
               .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    public getDataBySelectType(jsonData: any, selectType : string) {
        return this.http.post(this.phpServicePoint+'getAllList.php?selectType='+selectType,jsonData)
               .map((response:Response) => response.json())
               .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }
}