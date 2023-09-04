import { Injectable } from '@angular/core';
import { Http , RequestOptions , Response , Headers } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/Rx';
import { Constant } from '../constant/Contant';

@Injectable()
export class TndOffineTrainingService{
    // private serviceEndPoint;
    private phpServicePoint;
    constructor(private http:Http){
        // this.serviceEndPoint = Constant.tndBaseURL;
        this.phpServicePoint = Constant.phpServerURL;
    }

    submitOfflineTraining(jsonData: any) {
        return this.http.post(this.phpServicePoint+'saveOfflineTrainingData.php',jsonData)
               .map((response:Response) => response.json())
               .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
               
        // let headers = new Headers({'Content-Type':'application/json'});
        // headers.append("Access-Control-Allow-Origin", "*");
        // let options = new RequestOptions({ headers:headers });
        // return this.http.post(this.serviceEndPoint+'saveOfflineTrainingData',jsonData,options)
        //        .map((response:Response) => response.json())
        //        .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    getOfflineTrainingReport(jsonData: any) {
        return this.http.post(this.phpServicePoint+'getOfflineTrainingReport.php',jsonData)
               .map((response:Response) => response.json())
               .catch((error:any) => Observable.throw(error.json().error || 'Server error'));

        // let headers = new Headers({'Content-Type':'application/json'});
        // headers.append("Access-Control-Allow-Origin", "*");
        // let options = new RequestOptions({ headers:headers });
        // return this.http.post(this.serviceEndPoint+'getOfflineTrainingReport',jsonData,options)
        //        .map((response:Response) => response.json())
        //        .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

}