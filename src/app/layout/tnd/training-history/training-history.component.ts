import { Component, OnInit } from '@angular/core';
import { TrainingHistoryTableSetting } from './trainingHistoryTableSetting';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared/service/SharedService';
import { TndSharedService } from 'src/app/shared/service/TndSharedService';
import { TndTrainingHistoryService } from 'src/app/shared/service/TndTrainingHistoryService';
import { ToastrService } from 'ngx-toastr';
import { Constant } from 'src/app/shared/constant/Contant';
declare var $: any;
import * as jspdf from 'jspdf'; 
import html2canvas from 'html2canvas';
import * as alasql from 'alasql';

@Component({
  selector: 'app-training-history',
  templateUrl: './training-history.component.html',
  styleUrls: ['./training-history.component.css']
})
export class TrainingHistoryComponent implements OnInit {

  ShowLoading = false;
  tenentId = "";
  loginPage = "";
  button = "";
  color1 = "";
  color2 = "";
  circleNameList = [];
  selectedCircleNameList = [];
  zoneNameList = [];
  selectedZoneNameList = [];
  clusterNameList = [];
  selectedClusterNameList = [];
  roleList = [];
  selectedRoleList = [];
  applyFilterData = [];
  employeeName: any = "";
  loginEmpId: any = "";
  loginEmpRole: any = "";
  otherRole: any = "";
  multiSelectropdownSettings = {};
  settings = TrainingHistoryTableSetting.setting;

  public organizationLogo: string = "";
  public organizationName: string = "";
  public submenuName: string = "";
  constructor(
    private router: Router,
    private sharedService: SharedService,
    private tndSharedService: TndSharedService,
    private trainingHistoryService: TndTrainingHistoryService,
    private toastr: ToastrService) {
    this.loginEmpId = sessionStorage.getItem("username");
    this.loginEmpRole = localStorage.getItem("empRole");
    this.otherRole = localStorage.getItem("otherRole");
    this.organizationLogo = localStorage.getItem("organizationLogo");
    this.organizationName = localStorage.getItem("organizationName");
    this.submenuName = localStorage.getItem("trainingHistory");
    localStorage.setItem("currentPage", "trainingHistory");
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

    //this.getOrganizationData(Constant.ORGANIZATION);
    this.loadRoleList();

  }

  onSelectCircle(item: any) {
    //console.log(item);
    this.getOrganizationData(Constant.LOCATION);
    //this.getUserCircleZoneCluster("ZONE");
  }

  onDeSelectCircle(item: any) {
    this.zoneNameList = [];
    this.selectedZoneNameList = [];
    this.clusterNameList = [];
    this.selectedClusterNameList = [];
    this.getOrganizationData(Constant.LOCATION);
    //this.getUserCircleZoneCluster("ZONE");
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
    this.getOrganizationData(Constant.LOCATION);
    //this.getUserCircleZoneCluster("ZONE");
  }

  onDeSelectAllZone(item: any) {
    //console.log(item);
    this.selectedZoneNameList = item;
    this.clusterNameList = [];
    this.selectedClusterNameList = [];
  }


  reloadPage() {
    let isReloadPage = confirm("Do you want reload this page??");
    if (isReloadPage) {
      this.router.navigate(['/layout/dashboard']);
    }
  }

  getOrganizationData(searchType: any) {
    let orgLocJson = {
      loginEmpId: this.loginEmpId,
      loginEmpRole: this.loginEmpRole,
      tenentId: this.tenentId,
      orgName: this.selectedCircleNameList,
      locName: this.selectedZoneNameList,
      searchType: searchType
    };
    this.tndSharedService.getOrganizationData(orgLocJson)
      .subscribe((response) => {
        console.log(response);
        if (response.responseCode === Constant.SUCCESSFUL_STATUS_CODE) {
          if (searchType == 'ORG') {
            this.circleNameList = response.wrappedList;
          }
          else if (searchType == 'LOC') {
            this.zoneNameList = response.wrappedList;
          }
          else if (searchType == 'DEPT') {
            this.clusterNameList = response.wrappedList;
          }
          //this.ShowLoading = false;
        }
        else {
          this.toastr.error('Something went wrong', 'Alert', { timeOut: Constant.TOSTER_FADEOUT_TIME });
          //this.ShowLoading = false;
        }
      },
        (error) => {
          this.toastr.warning(Constant.returnServerErrorMessage("getOrganizationData"), "Alert !", { timeOut: Constant.TOSTER_FADEOUT_TIME });
          //this.ShowLoading = false;
        })
  }

  loadRoleList() {
    this.sharedService.getRoleList(this.tenentId)
      .subscribe((response) => {
        //this.ShowLoading = false; 
        if (response.responseCode === Constant.SUCCESSFUL_STATUS_CODE) {
          this.roleList = response.wrappedList;

          //this.ShowLoading = false;
        }
        else {
          this.toastr.error('Something went wrong', 'Alert', { timeOut: Constant.TOSTER_FADEOUT_TIME });
          //this.ShowLoading = false;
        }
      },
        (error) => {
          this.toastr.warning(Constant.returnServerErrorMessage("loadRoleList"), "Alert !", { timeOut: Constant.TOSTER_FADEOUT_TIME });
          //this.ShowLoading = false;
        })
  }


  applyFilter() {
    let sendJson = {
      loginEmpId: this.loginEmpId,
      loginEmpRole: this.loginEmpRole,
      tenentId: this.tenentId,
      empName: this.employeeName,
      circle: this.selectedCircleNameList,
      zone: this.selectedZoneNameList,
      cluster: this.selectedClusterNameList,
      role: this.selectedRoleList
    }

    //console.log(JSON.stringify(sendJson));
    this.ShowLoading = true;
    this.trainingHistoryService.applyFilter(sendJson)
      .subscribe((response) => {
        console.log(JSON.stringify(response));
        if (response.responseCode === Constant.SUCCESSFUL_STATUS_CODE) {
          this.applyFilterData = response.wrappedList;
        }
        else if (response.responseCode === Constant.NO_RECORDS_FOUND_CODE) {
          this.applyFilterData = response.wrappedList;
          this.toastr.info('No record found', 'Alert', { timeOut: Constant.TOSTER_FADEOUT_TIME });
        }
        else {
          this.toastr.error('Something went wrong', 'Alert', { timeOut: Constant.TOSTER_FADEOUT_TIME });
        }
        this.ShowLoading = false;
      },
        (error) => {
          this.toastr.warning(Constant.returnServerErrorMessage("trainingHistroryFilterSearch"), "Alert !", { timeOut: Constant.TOSTER_FADEOUT_TIME });
          this.ShowLoading = false;
        })
  }

  exportData() {
    alasql('SELECT employeeName as Employee_Name,empId as Employee_ID,role as Role,circle as Organization,zone as Location,cluster as Department,assignedTasks as Assigned_Tasks,completedTasks as Completed_Tasks,pendingTasks as Pending_Tasks INTO XLSXML("TRAINING_HISTORY.xls",{headers:true}) FROM ?', [this.applyFilterData]);
  }

  viewDetailsList = [];
  viewedEmpId: any = "";
  viewedEmpName: any = "";
  view(event: any) {
    this.viewedEmpId = event.data.empId;
    this.viewedEmpName = event.data.employeeName;
    this.ShowLoading = true;
    this.trainingHistoryService.getCertiDetails(this.viewedEmpId)
      .subscribe((response) => {
        console.log(JSON.stringify(response));
        if (response.responseCode === Constant.SUCCESSFUL_STATUS_CODE) {
          this.viewDetailsList = response.wrappedList;
          $("#viewDetailsModal").modal({
            backdrop: 'static',
            keyboard: false
          });
        }
        else if (response.responseCode === Constant.NO_RECORDS_FOUND_CODE) {
          this.viewDetailsList = response.wrappedList;
          this.toastr.info('No record found', 'Alert', { timeOut: Constant.TOSTER_FADEOUT_TIME });
        }
        else {
          this.toastr.error('Something went wrong', 'Alert', { timeOut: Constant.TOSTER_FADEOUT_TIME });
        }
        this.ShowLoading = false;
      },
        (error) => {
          this.toastr.warning(Constant.returnServerErrorMessage("trainingHistroryFilterSearch"), "Alert !", { timeOut: Constant.TOSTER_FADEOUT_TIME });
          this.ShowLoading = false;
        })
  }

  viewedTrName: any = "";
  viewedSbDate: any = "";
  viewCertificate(trName, sbDate) {
    this.viewedTrName = trName;
    this.viewedSbDate = sbDate;
    $("#viewCertificateModal").modal({
      backdrop: 'static',
      keyboard: false
    });
  }

  downloadCertificate() {
    //alert("ll");
    var data = document.getElementById('covertToPdf');
    html2canvas(data).then(canvas => {
      // Few necessary setting options
      var imgWidth = 300;
      var pageHeight = 295;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jspdf('l', 'mm', 'a4'); // A4 size page of PDF
      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
      pdf.save('certificate.pdf'); // Generated PDF
    });
  }


}
