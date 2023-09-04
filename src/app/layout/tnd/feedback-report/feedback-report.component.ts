import { Component, OnInit } from '@angular/core';
import { FeedbackReportTableSetting } from './feedbackReportTableSetting';
import { Router } from '@angular/router';
import { TndSharedService } from 'src/app/shared/service/TndSharedService';
import { ToastrService } from 'ngx-toastr';
declare var $: any;
import * as alasql from 'alasql';
import { Constant } from 'src/app/shared/constant/Contant';
import { CommonFunction } from 'src/app/shared/constant/CommonFunction';

@Component({
  selector: 'app-feedback-report',
  templateUrl: './feedback-report.component.html',
  styleUrls: ['./feedback-report.component.css']
})
export class FeedbackReportComponent implements OnInit {

  ShowLoading = false;
  ticketNumber = "";
  employeeList = [];
  selectedEmployeeList = [];
  trainingName = "";
  trainingNameList = [];
  applyFilterData = [];
  
  tenentId = "";
  loginPage = "";
  button = "";
  color1 = "";
  color2 = "";
  settings = FeedbackReportTableSetting.setting;
  multiSelectropdownSettings = {};
  constructor(private router: Router,
    private tndSharedService : TndSharedService, 
    private toastr: ToastrService) { 
    this.tenentId = localStorage.getItem("tenentId");
    this.loginPage = localStorage.getItem("loginPage");
    this.button = localStorage.getItem("button");
    this.color1 = localStorage.getItem("color1");
    this.color2 = localStorage.getItem("color2");
  }

  ngOnInit(): void {
    this.multiSelectropdownSettings = {
      singleSelection: false,
      idField: 'paramCode',
      textField: 'paramDesc',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 0,
      allowSearchFilter: true
    };
    setTimeout(() => {
      $("ng2-smart-table thead").css('background-color',this.color1);
    }, 100);
    this.getEmployeeList();
    this.getTrainingName();
  }

  getEmployeeList(){
    let jsonData = {
      tenentId:this.tenentId
    }
    this.tndSharedService.getDataBySelectType(jsonData,'employee')
    .subscribe( (response) =>{
      this.employeeList = response.employeeList;
    },
    (error)=>{
      this.toastr.warning(Constant.returnServerErrorMessage("getEmployeeList"),"Alert !",{timeOut : Constant.TOSTER_FADEOUT_TIME});
      this.ShowLoading = false;
    })
  }

  getTrainingName(){
    //this.ShowLoading = true;
    let queryParam = "tenentId="+this.tenentId
    this.tndSharedService.getTrainingName(queryParam)
      .subscribe((response) => {
        if (response.responseCode === Constant.SUCCESSFUL_STATUS_CODE) {
          this.trainingNameList = response.wrappedList;
          //this.ShowLoading = false;
        }
        else if (response.responseCode === Constant.NO_RECORDS_FOUND_CODE) {
          this.toastr.info('No record found', 'Alert',{timeOut : Constant.TOSTER_FADEOUT_TIME});
        }
        else {
          this.toastr.error('Something went wrong', 'Alert',{timeOut : Constant.TOSTER_FADEOUT_TIME});
          //this.ShowLoading = false;
        }
      },
        (error) => {
          this.toastr.warning(Constant.returnServerErrorMessage("getTrainingName"), "Alert !",{timeOut : Constant.TOSTER_FADEOUT_TIME});
          //this.ShowLoading = false;
        })
  }

  getFeedbackData(){
    let employeeId = this.selectedEmployeeList.length == 0 ? "" : CommonFunction.createCommaSeprate(this.selectedEmployeeList);

    let sendJson = {
      tenentId : this.tenentId,
      filterEmployeeId : employeeId,
      filterTicketNum : this.ticketNumber,
      filterTrainingName : this.trainingName
    }

    //console.log(JSON.stringify(sendJson));
    this.ShowLoading = true;
    this.tndSharedService.getFeedbackReport(sendJson)
      .subscribe((response) => {
        //console.log(JSON.stringify(response));
        if (response.responseCode === Constant.SUCCESSFUL_STATUS_CODE) {
          this.applyFilterData = response.wrappedList;
        }
        else if (response.responseCode === Constant.NO_RECORDS_FOUND_CODE) {
          this.applyFilterData = response.wrappedList;
          this.toastr.info('No record found', 'Alert',{timeOut : Constant.TOSTER_FADEOUT_TIME});
        }
        else {
          this.toastr.error('Something went wrong', 'Alert',{timeOut : Constant.TOSTER_FADEOUT_TIME});
        }
        this.ShowLoading = false;
      },
        (error) => {
          this.toastr.warning(Constant.returnServerErrorMessage("getFeedbackData"), "Alert !",{timeOut : Constant.TOSTER_FADEOUT_TIME});
          this.ShowLoading = false;
        })
  }



  exportData(){
    alasql('SELECT * INTO XLSXML("Feedback_Report.xls",{headers:true}) FROM ?',[this.applyFilterData]);
  }

}
