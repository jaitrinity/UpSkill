import { Injectable } from '@angular/core';
import { Http , RequestOptions , Response , Headers } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/Rx';
import { Constant } from '../constant/Contant';

@Injectable()
export class PlannedTrainingService{
  
  
    // private serviceEndPoint;
    private phpServicePoint;
    constructor(private http:Http){
        // this.serviceEndPoint = Constant.tndBaseURL;
        this.phpServicePoint = Constant.phpServerURL;
    }

    public getAssignedTask(reqData : any){
        // let headers = new Headers({'Content-Type':'application/json'});
        // headers.append("Access-Control-Allow-Origin", "*");
        // let options = new RequestOptions({ headers:headers });
        // return this.http.post(this.serviceEndPoint+'assign_task',reqData,options)
        //         .map((response:Response) => response.json())
        //         .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
        let jsonData = JSON.stringify(reqData);
        return this.http.post(this.phpServicePoint+'assign_task.php',jsonData)
               .map((response:Response) => response.json())
               .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    public startPlannedTraining(bulkDataReq: any) {
        // let headers = new Headers({'Content-Type':'application/json'});
        // headers.append("Access-Control-Allow-Origin", "*");
        // let options = new RequestOptions({ headers:headers });
        // return this.http.post(this.serviceEndPoint+'startPlannedTraining',bulkDataReq,options)
        //         .map((response:Response) => response.json())
        //         .catch((error:any) => Observable.throw(error.json().error || 'Server error'));

        let jsonData = JSON.stringify(bulkDataReq);
        return this.http.post(this.phpServicePoint+'startPlannedTraining.php',jsonData)
               .map((response:Response) => response.json())
               .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    public saveResult(sendJson : any){
        // let headers = new Headers({'Content-Type':'application/json'});
        // headers.append("Access-Control-Allow-Origin", "*");
        // let options = new RequestOptions({ headers:headers });
        // return this.http.post(this.serviceEndPoint+'save_result',sendJson,options)
        //         .map((response:Response) => response.json())
        //         .catch((error:any) => Observable.throw(error.json().error || 'Server error'));

        let jsonData = JSON.stringify(sendJson);
        return this.http.post(this.phpServicePoint+'save_result.php',jsonData)
               .map((response:Response) => response.json())
               .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }
}