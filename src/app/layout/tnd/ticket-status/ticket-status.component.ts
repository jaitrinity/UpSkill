import { Component, OnInit } from '@angular/core';
import { TicketStatusTableSetting } from './ticketStatusTableSetting';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared/service/SharedService';
import { TndSharedService } from 'src/app/shared/service/TndSharedService';
import { TndTicketStatusService } from 'src/app/shared/service/TndTicketStatusService';
import { ToastrService } from 'ngx-toastr';
import { Constant } from 'src/app/shared/constant/Contant';
declare var $: any;
import * as alasql from 'alasql';

@Component({
  selector: 'app-ticket-status',
  templateUrl: './ticket-status.component.html',
  styleUrls: ['./ticket-status.component.css']
})
export class TicketStatusComponent implements OnInit {
  
  ShowLoading = false;
  startDate :any = "";
  endDate : any = "";
  circleNameList = [];
  selectedCircleNameList = [];
  zoneNameList = [];
  selectedZoneNameList = [];
  clusterNameList = [];
  selectedClusterNameList = [];
  roleList = [];
  selectedRoleList = [];
  trainingNameList = [];
  selectedTrainingNameList = [];
  subTrainingNameList = [];
  selectedSubTrainingNameList = [];
  ticketStatusList = [];
  selectedTicketStatusList = [];
  ticketNumber : any = "";
  employeeId : any = "";
  applyFilterData = [];
  loginEmpId: any = "";
  loginEmpRole: any = "";
  otherRole : any = "";
  public organizationLogo : string = "";
  public organizationName : string = "";
  public submenuName : string = "";
  company = "";
  tenentId = "";
  loginPage = "";
  button = "";
  color1 = "";
  color2 = "";
  settings = TicketStatusTableSetting.setting;
  multiSelectropdownSettings = {};
  constructor(
    private router: Router,
    private sharedService : SharedService,
    private tndSharedService : TndSharedService,
    private ticketStatusService: TndTicketStatusService, 
    private toastr: ToastrService) { 
    this.loginEmpId = sessionStorage.getItem("username");
    this.loginEmpRole = localStorage.getItem("empRole");
    this.otherRole = localStorage.getItem("otherRole");
    this.organizationLogo = localStorage.getItem("organizationLogo");
    this.organizationName = localStorage.getItem("organizationName");
    this.submenuName = localStorage.getItem("ticketStatus");
    localStorage.setItem("currentPage","ticketStatus");
    this.tenentId = localStorage.getItem("tenentId");
    this.loginPage = localStorage.getItem("loginPage");
    this.button = localStorage.getItem("button");
    this.color1 = localStorage.getItem("color1");
    this.color2 = localStorage.getItem("color2");
  }

  

  ngOnInit() {
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
    this.ticketStatusList = [
      {"paramCode":"TKTSTAT01","paramDesc":"Created"},
      {"paramCode":"TKTSTAT16","paramDesc":"Pass"},
      {"paramCode":"TKTSTAT15","paramDesc":"Fail"}
    ];

    //this.getOrganizationData(Constant.ORGANIZATION);
    this.getTrainingName();
    this.loadRoleList();
  }

  onSelectCircle(item: any) {
    //console.log(item);
    //this.getUserCircleZoneCluster("ZONE");
    // this.getOrganizationData(Constant.LOCATION);
  }

  onDeSelectCircle(item: any) {
    this.zoneNameList = [];
    this.selectedZoneNameList = [];
    this.clusterNameList = [];
    this.selectedClusterNameList = [];
    //this.getUserCircleZoneCluster("ZONE");
    // this.getOrganizationData(Constant.LOCATION);
  }

  onDeSelectAllCircle(item: any) {
    //console.log(item);
    this.selectedCircleNameList = item;
    this.zoneNameList = [];
    this.selectedZoneNameList = [];
    this.clusterNameList = [];
    this.selectedClusterNameList = [];
  }

  onSelectAllCircle(item: any) {
    //console.log(item);
    this.selectedCircleNameList = item;
    //this.getUserCircleZoneCluster("ZONE");
    // this.getOrganizationData(Constant.LOCATION);
  }


  onSelectTrainingName(item: any) {
    //console.log(item);
    this.getSubTrNameByMultiTrName();
  }

  onSelectAllTrainingName(item: any) {
    //console.log(item);
    this.selectedTrainingNameList = item;
    this.getSubTrNameByMultiTrName();
  }

  onDeSelectTrainingName(item: any) {
    //console.log(item);
    this.getSubTrNameByMultiTrName();
  }

  onDeSelectAllTrainingName(item: any) {
    //console.log(item);
    this.subTrainingNameList = [];
    this.selectedSubTrainingNameList = [];
  }

  onSelectSubTrainingName(item: any) {
    //console.log(item);
  }

  onSelectAllSubTrainingName(item: any) {
    //console.log(item);
  }

  onDeSelectSubTrainingName(item: any) {
    //console.log(item);
  }

  onDeSelectAllSubTrainingName(item: any) {
    //console.log(item);
  }

  reloadPage(){
    let isReloadPage = confirm("Do you want reload this page??");
    if(isReloadPage){
      this.router.navigate(['/layout/dashboard']);
    }
  }

  getOrganizationData(searchType : any){
    let orgLocJson = {
      loginEmpId: this.loginEmpId,
      loginEmpRole: this.loginEmpRole,
      tenentId : this.tenentId,
      orgName: this.selectedCircleNameList,
      locName: this.selectedZoneNameList,
      searchType: searchType
    };
    this.tndSharedService.getOrganizationData(orgLocJson)
      .subscribe((response) => {
        // console.log(response);
        if (response.responseCode === Constant.SUCCESSFUL_STATUS_CODE) {
          if(searchType == 'ORG'){
            this.circleNameList = response.wrappedList;
          }
          else if(searchType == 'LOC'){
            this.zoneNameList = response.wrappedList;
          }
          else if(searchType == 'DEPT'){
            this.clusterNameList = response.wrappedList;
          }
          //this.ShowLoading = false;
        }
        else {
          this.toastr.error('Something went wrong', 'Alert',{timeOut : Constant.TOSTER_FADEOUT_TIME});
          //this.ShowLoading = false;
        }
      },
        (error) => {
          this.toastr.warning(Constant.returnServerErrorMessage("getOrganizationData"), "Alert !",{timeOut : Constant.TOSTER_FADEOUT_TIME});
          //this.ShowLoading = false;
        })
  }

  loadRoleList(){
    this.sharedService.getRoleList(this.tenentId)
    .subscribe( (response) =>{
      //this.ShowLoading = false; 
         if(response.responseCode === Constant.SUCCESSFUL_STATUS_CODE){
          this.roleList = response.wrappedList;
          
          //this.ShowLoading = false;
        }
        else{
          this.toastr.error('Something went wrong', 'Alert',{timeOut : Constant.TOSTER_FADEOUT_TIME});
          //this.ShowLoading = false;
        }
  },
    (error)=>{
      this.toastr.warning(Constant.returnServerErrorMessage("loadRoleList"),"Alert !",{timeOut : Constant.TOSTER_FADEOUT_TIME});
      //this.ShowLoading = false;
    })
  }

  getTrainingName(){
    //this.ShowLoading = true;
    let queryParam = "tenentId="+this.tenentId
    this.ticketStatusService.getTrainingName(queryParam)
      .subscribe((response) => {
        //console.log(JSON.stringify(response));
        if (response.responseCode === Constant.SUCCESSFUL_STATUS_CODE) {
          this.trainingNameList = response.wrappedList;
          //this.ShowLoading = false;
        }
        else if (response.responseCode === Constant.NO_RECORDS_FOUND_CODE) {
          this.toastr.info('No record found', 'Alert',{timeOut : Constant.TOSTER_FADEOUT_TIME});
          //this.ShowLoading = false;
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

  getSubTrNameByMultiTrName(){
    if(this.selectedTrainingNameList.length == 0){
      this.subTrainingNameList = [];
      this.selectedSubTrainingNameList = [];
      return;
    }
    let jsonData = {
      trainingList : this.selectedTrainingNameList,
      tenentId : this.tenentId
    }
    //console.log(JSON.stringify(jsonData));
    //this.ShowLoading = true;
    this.ticketStatusService.getSubTrNameByMultiTrName(jsonData)
      .subscribe((response) => {
        //console.log(JSON.stringify(response));
        if (response.responseCode === Constant.SUCCESSFUL_STATUS_CODE) {
          this.subTrainingNameList = response.wrappedList;
          //this.ShowLoading = false;
        }
        else if (response.responseCode === Constant.NO_RECORDS_FOUND_CODE) {
          this.toastr.info('No record found', 'Alert',{timeOut : Constant.TOSTER_FADEOUT_TIME});
          //this.ShowLoading = false;
        }
        else {
          this.toastr.error('Something went wrong', 'Alert',{timeOut : Constant.TOSTER_FADEOUT_TIME});
          //this.ShowLoading = false;
        }
      },
        (error) => {
          this.toastr.warning(Constant.returnServerErrorMessage("getSubTrNameByMultiTrName"), "Alert !",{timeOut : Constant.TOSTER_FADEOUT_TIME});
          //this.ShowLoading = false;
        })
  }

  
  applyFilter(){
    let sendJson = {
      loginEmpId : this.loginEmpId,
      loginEmpRole : this.loginEmpRole,
      tenentId : this.tenentId,
      startDate : this.startDate,
      endDate : this.endDate,
      employeeId : this.employeeId,
      ticketNum : this.ticketNumber,
      circle : this.selectedCircleNameList,
      zone: this.selectedZoneNameList,
      cluster : this.selectedClusterNameList,
      role : this.selectedRoleList,
      ticketStatus : this.selectedTicketStatusList,
      trainingName : this.selectedTrainingNameList,
      subTrainingName : this.selectedSubTrainingNameList
    }

    //console.log(JSON.stringify(sendJson));
    this.ShowLoading = true;
    this.ticketStatusService.applyFilter(sendJson)
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
          this.toastr.warning(Constant.returnServerErrorMessage("applyFilter"), "Alert !",{timeOut : Constant.TOSTER_FADEOUT_TIME});
          this.ShowLoading = false;
        })
  }

  exportData(){
    alasql('SELECT * INTO XLSXML("TRAINING_STATUS.xls",{headers:true}) FROM ?',[this.applyFilterData]);
  }


}
