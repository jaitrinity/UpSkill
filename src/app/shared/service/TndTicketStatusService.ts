import { Injectable } from '@angular/core';
import { Http , RequestOptions , Response , Headers } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/Rx';
import { Constant } from '../constant/Contant';

@Injectable()
export class TndTicketStatusService{

    // private serviceEndPoint;
    private phpServicePoint;
    constructor(private http:Http){
        // this.serviceEndPoint = Constant.tndBaseURL;
        this.phpServicePoint = Constant.phpServerURL;
    }

    getTrainingName(queryParam : any) {
        // let headers = new Headers({'Content-Type':'application/json'});
        // headers.append("Access-Control-Allow-Origin", "*");
        // let options = new RequestOptions({ headers:headers });
        // return this.http.get(this.serviceEndPoint+'getTrainingName',options)
        //         .map((response:Response) => response.json())
        //         .catch((error:any) => Observable.throw(error.json().error || 'Server error'));

        return this.http.get(this.phpServicePoint+'getTrainingName.php?'+queryParam)
               .map((response:Response) => response.json())
               .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    getSubTrNameByMultiTrName(jsonStr: any) {
        // let headers = new Headers({'Content-Type':'application/json'});
        // headers.append("Access-Control-Allow-Origin", "*");
        // let options = new RequestOptions({ headers:headers });
        // return this.http.post(this.serviceEndPoint+"getSubTrNameByMultiTrName",jsonData,options)
        //         .map((response:Response) => response.json())
        //         .catch((error:any) => Observable.throw(error.json().error || 'Server error'));

        let jsonData = JSON.stringify(jsonStr);
        return this.http.post(this.phpServicePoint+'getSubTrNameByMultiTrName.php',jsonData)
               .map((response:Response) => response.json())
               .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    applyFilter(sendJson: any) {
        // let headers = new Headers({'Content-Type':'application/json'});
        // headers.append("Access-Control-Allow-Origin", "*");
        // let options = new RequestOptions({ headers:headers });
        // return this.http.post(this.serviceEndPoint+"ticketStatus",sendJson,options)
        //         .map((response:Response) => response.json())
        //         .catch((error:any) => Observable.throw(error.json().error || 'Server error'));

        let jsonData = JSON.stringify(sendJson);
        return this.http.post(this.phpServicePoint+'ticketStatus.php',jsonData)
               .map((response:Response) => response.json())
               .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }
}