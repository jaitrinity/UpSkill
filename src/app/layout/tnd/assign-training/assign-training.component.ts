import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared/service/SharedService';
import { TndSharedService } from 'src/app/shared/service/TndSharedService';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { Constant } from 'src/app/shared/constant/Contant';
import { CommonFunction } from 'src/app/shared/constant/CommonFunction';

@Component({
  selector: 'app-assign-training',
  templateUrl: './assign-training.component.html',
  styleUrls: ['./assign-training.component.css']
})
export class AssignTrainingComponent implements OnInit {
  
  ShowLoading = false
  roleList = [];
  selectedRoleList = [];
  // circleNameList = [];
  // selectedCircleNameList = [];
  zoneNameList = [];
  selectedZoneNameList = [];
  clusterNameList = [];
  selectedClusterNameList = [];
  trainingNameList = [];
  subTrainingNameList = [];
  startDate: any = "";
  endDate: any = "";
  employeeId: any = "";
  employeeList = [];
  selectedEmployeeList = [];

  trainingName: any = "";
  subTrainingName: any = "";

  multiSelectropdownSettings = {};
  singleSelectropdownSettings = {};

  loginEmpId: any = "";
  loginEmpRole: any = "";
  public organizationLogo : string = "";
  public organizationName : string = "";
  public submenuName : string = "";
  minStartDate = "";
  tenentId = "";
  loginPage = "";
  button = "";
  color1 = "";
  color2 = "";
  constructor(private router: Router, 
    private sharedService : SharedService,
    private tndSharedService: TndSharedService, 
    private toastr: ToastrService,
    private datePipe: DatePipe) {
    this.loginEmpId = sessionStorage.getItem("username");
    this.loginEmpRole = localStorage.getItem("empRole");
    this.organizationLogo = localStorage.getItem("organizationLogo");
    this.organizationName = localStorage.getItem("organizationName");
    this.submenuName = localStorage.getItem("assignTraining");
    if(this.submenuName == null) this.submenuName = "Assign Training";
    localStorage.setItem("currentPage","assignTraining");
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

    this.singleSelectropdownSettings = {
      singleSelection: true,
      idField: 'paramCode',
      textField: 'paramDesc',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 0,
      allowSearchFilter: true
    };
    this.minStartDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
   
    this.getEmployeeList();
    this.trainingNameByCircleAbbr();
    // this.getOrganizationData(Constant.ORGANIZATION);
  }

  onSelectCircle(item: any) {
    //this.getUserCircleZoneCluster("ZONE");
    // this.getOrganizationData(Constant.LOCATION);
    this.trainingNameByCircleAbbr();
    this.subTrainingNameList = [];
    this.roleList = [];
    this.selectedRoleList = [];
  }
  onDeSelectCircle(item: any) {
    this.trainingName = "";
    this.trainingNameList = [];
    this.subTrainingName = "";
    this.subTrainingNameList = [];
    this.roleList = [];
    this.selectedRoleList = [];
    this.zoneNameList = [];
    this.selectedZoneNameList = [];
    this.clusterNameList = [];
    this.selectedClusterNameList = [];
  }

  onSelectZone(item: any) {
    //console.log(item);
    //this.getUserCircleZoneCluster("CLUSTER");
    // this.getOrganizationData(Constant.DEPARTMENT);
  }

  onSelectAllZone(item: any) {
    //console.log(item);
    // this.selectedZoneNameList = item;
    // this.getUserCircleZoneCluster("CLUSTER");

    this.selectedZoneNameList = item;
    // this.getOrganizationData(Constant.DEPARTMENT);
  }

  onDeSelectZone(item: any) {
    //console.log(item);
    //this.getUserCircleZoneCluster("CLUSTER");
    // this.getOrganizationData(Constant.DEPARTMENT);
  }

  onDeSelectAllZone(item: any) {
    //console.log(item);
    // this.selectedZoneNameList = item;
    // this.clusterNameList = [];
    // this.selectedClusterNameList = [];
    //this.getUserCircleZoneCluster("CLUSTER");

    this.selectedZoneNameList = item;
    this.clusterNameList = [];
    this.selectedClusterNameList = [];
    // this.getOrganizationData(Constant.DEPARTMENT);
  }

  reloadPage(){
    let isReloadPage = confirm("Do you want reload this page??");
    if(isReloadPage){
      this.refreshPage();
    }
  }

  refreshPage(){
    this.router.navigateByUrl('/layout', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/layout/tnd-assign-training']);
    }); 
  }

  getEmployeeList(){
    let jsonData = {
      tenentId:this.tenentId
    }
    this.sharedService.getDataBySelectType(jsonData,'employee')
    .subscribe( (response) =>{
      this.employeeList = response.employeeList;
    },
    (error)=>{
      this.toastr.warning(Constant.returnServerErrorMessage("getEmployeeList"),"Alert !",{timeOut : Constant.TOSTER_FADEOUT_TIME});
      this.ShowLoading = false;
    })
  }

  loadRoleList(){
    this.sharedService.getRoleList(this.tenentId)
    .subscribe( (response) =>{
      this.ShowLoading = false; 
         if(response.responseCode === Constant.SUCCESSFUL_STATUS_CODE){
          this.roleList = response.wrappedList;
          this.ShowLoading = false;
        }
        else{
          this.toastr.error('Something went wrong', 'Alert',{timeOut : Constant.TOSTER_FADEOUT_TIME});
          this.ShowLoading = false;
        }
  },
    (error)=>{
      this.toastr.warning(Constant.returnServerErrorMessage("loadRoleList"),"Alert !",{timeOut : Constant.TOSTER_FADEOUT_TIME});
      this.ShowLoading = false;
    })
  }

  // getOrganizationData(searchType : any){
  //   let orgLocJson = {
  //     loginEmpId: this.loginEmpId,
  //     loginEmpRole: this.loginEmpRole,
  //     tenentId : this.tenentId,
  //     orgName: this.selectedCircleNameList,
  //     locName: this.selectedZoneNameList,
  //     searchType: searchType
  //   };
  //   this.tndSharedService.getOrganizationData(orgLocJson)
  //     .subscribe((response) => {
  //       if (response.responseCode === Constant.SUCCESSFUL_STATUS_CODE) {
  //         if(searchType == 'ORG'){
  //           this.circleNameList = response.wrappedList;
  //         }
  //         else if(searchType == 'LOC'){
  //           this.zoneNameList = response.wrappedList;
  //         }
  //         else if(searchType == 'DEPT'){
  //           this.clusterNameList = response.wrappedList;
  //         }
  //       }
  //       else {
  //         this.toastr.error('Something went wrong', 'Alert',{timeOut : Constant.TOSTER_FADEOUT_TIME});
  //       }
  //     },
  //       (error) => {
  //         this.toastr.warning(Constant.returnServerErrorMessage("getOrganizationData"), "Alert !",{timeOut : Constant.TOSTER_FADEOUT_TIME});
  //       })
  // }

  // getUserCircleZoneCluster(searchType: any) {
  //   let circleZoneClusterJson = {
  //     loginEmpId: this.loginEmpId,
  //     loginEmpRole: this.loginEmpRole,
  //     circleName: this.selectedCircleNameList,
  //     zoneName: this.selectedZoneNameList,
  //     clusterName: this.selectedClusterNameList,
  //     searchType: searchType
  //   };

  //   this.ShowLoading = true;
  //   this.tndSharedService.getUserCircleZoneCluster(circleZoneClusterJson)
  //     .subscribe((response) => {
  //       //console.log(JSON.stringify(response));
  //       if (response.responseCode === Constant.SUCCESSFUL_STATUS_CODE) {
  //         if (searchType == "CIRCLE") {
  //           this.circleNameList = response.wrappedList;
  //         }
  //         else if (searchType == "ZONE") {
  //           this.zoneNameList = response.wrappedList;
  //         }
  //         else if (searchType == "CLUSTER") {
  //           this.clusterNameList = response.wrappedList;
  //         }
  //         this.ShowLoading = false;
  //       }
  //       else {
  //         this.toastr.error('Something went wrong', 'Alert',{timeOut : Constant.TOSTER_FADEOUT_TIME});
  //         this.ShowLoading = false;
  //       }
  //     },
  //       (error) => {
  //         this.toastr.warning(Constant.returnServerErrorMessage("getUserCircleZoneCluster"), "Alert !",{timeOut : Constant.TOSTER_FADEOUT_TIME});
  //         this.ShowLoading = false;
  //       })
  // }

  trainingNameByCircleAbbr() {
    this.trainingNameList = [];
    this.subTrainingNameList = [];
    this.ShowLoading = true;
    // let queryParam = "circleName="+this.selectedCircleNameList[0].paramCode+"&tenentId="+this.tenentId;
    let queryParam = "circleName=Trinity"+"&tenentId="+this.tenentId;
    this.tndSharedService.trainingNameByCircleAbbr(queryParam)
      .subscribe((response) => {
        //console.log(response);
        if (response.responseCode === Constant.SUCCESSFUL_STATUS_CODE) {
          this.trainingNameList = response.wrappedList;
        }
        else if(response.responseCode === Constant.NO_RECORDS_FOUND_CODE) {
          this.toastr.warning('No data found', 'Alert',{timeOut : Constant.TOSTER_FADEOUT_TIME});
        }
        else {
          this.toastr.error('Something went wrong', 'Alert',{timeOut : Constant.TOSTER_FADEOUT_TIME});
        }
        this.ShowLoading = false;
      },
        (error) => {
          this.toastr.warning(Constant.returnServerErrorMessage("trainingNameByCircleAbbr"), "Alert !",{timeOut : Constant.TOSTER_FADEOUT_TIME});
          this.ShowLoading = false;
        })
  }

  loadRoleForGroupTraining(){
    // let circleAbbr = this.selectedCircleNameList[0].paramCode;
    let circleAbbr = 'Trinity';
    let sendJson = {
      "trainingName": this.trainingName,
      "circleAbbr": circleAbbr,
      "tenentId": this.tenentId,
      "searchType" : "ROLE"
    };

    this.ShowLoading = true;
    this.tndSharedService.getDistinctSubTrainingName(sendJson)
      .subscribe((response) => {
        if (response.responseCode === Constant.SUCCESSFUL_STATUS_CODE) {
          this.roleList = response.wrappedList;
          this.ShowLoading = false;
        }
        else {
          this.toastr.error('Something went wrong', 'Alert',{timeOut : Constant.TOSTER_FADEOUT_TIME});
          this.ShowLoading = false;
        }
      },
        (error) => {
          this.toastr.warning(Constant.returnServerErrorMessage("getDistinctSubTrainingName"), "Alert !",{timeOut : Constant.TOSTER_FADEOUT_TIME});
          this.ShowLoading = false;
        })
  }

  isGroup : boolean = false;
  selectTrainingName(searchType) {
    
    if(searchType == "SUB" && this.trainingName.indexOf("G-") >= 0){
      this.isGroup = true;
      this.loadRoleForGroupTraining();
      return false;
    }
    this.isGroup = false;
    
    // let circleAbbr = this.selectedCircleNameList[0].paramCode;
    let circleAbbr = 'Trinity';
    let sendJson = {
      "trainingName": this.trainingName,
      "subTrainingName" : this.subTrainingName,
      "circleAbbr": circleAbbr,
      "tenentId": this.tenentId,
      "searchType" : searchType
    };

    this.ShowLoading = true;
    this.tndSharedService.getDistinctSubTrainingName(sendJson)
      .subscribe((response) => {
        if (response.responseCode === Constant.SUCCESSFUL_STATUS_CODE) {
          if(searchType == 'SUB'){
            this.roleList = [];
            this.selectedRoleList = [];
            this.subTrainingNameList = response.wrappedList;
          }
          else{
            this.roleList = response.wrappedList;
          }
          
          this.ShowLoading = false;
        }


        else {
          this.toastr.error('Something went wrong', 'Alert',{timeOut : Constant.TOSTER_FADEOUT_TIME});
          this.ShowLoading = false;
        }
      },
        (error) => {
          this.toastr.warning(Constant.returnServerErrorMessage("getDistinctSubTrainingName"), "Alert !",{timeOut : Constant.TOSTER_FADEOUT_TIME});
          this.ShowLoading = false;
        })
  }

  validateAssignData(): any {
    let start = new Date(this.startDate);
    let end = new Date(this.endDate);
    if (this.isOR) {
      this.employeeId = CommonFunction.createCommaSeprate(this.selectedEmployeeList);
      // if(this.selectedCircleNameList.length === 0){
      //   this.toastr.warning("please select organization", "Alert !",{timeOut : Constant.TOSTER_FADEOUT_TIME});
      //   return false;
      // }
      if (this.trainingName === "") {
        this.toastr.warning("please select training name", "Alert !",{timeOut : Constant.TOSTER_FADEOUT_TIME})
        return false;
      }

      else if (this.subTrainingName === "" && this.trainingName.indexOf("G-") < 0) {
        this.toastr.warning("please select sub training name", "Alert !",{timeOut : Constant.TOSTER_FADEOUT_TIME})
        return false;
      }

      else if (this.startDate === "") {
        this.toastr.warning("please select start date", "Alert !",{timeOut : Constant.TOSTER_FADEOUT_TIME})
        return false;
      }
      else if (this.endDate === "") {
        this.toastr.warning("please select end date", "Alert !",{timeOut : Constant.TOSTER_FADEOUT_TIME})
        return false;
      }
      else if (start >= end) {
        this.toastr.warning("End Date should be greater than or equal to start date", "Alert !",{timeOut : Constant.TOSTER_FADEOUT_TIME});
        return false
      }
      else if (this.employeeId === "") {
        this.toastr.warning("please select emplyee", "Alert !",{timeOut : Constant.TOSTER_FADEOUT_TIME})
        return false;
      }
      else {
        return true;
      }
    }
    else {
      // if(this.selectedCircleNameList.length === 0){
      //   this.toastr.warning("please select organization", "Alert !",{timeOut : Constant.TOSTER_FADEOUT_TIME});
      //   return false;
      // }
      if (this.trainingName === "") {
        this.toastr.warning("please select training name", "Alert !",{timeOut : Constant.TOSTER_FADEOUT_TIME})
        return false;
      }

      else if (this.subTrainingName === "" && this.trainingName.indexOf("G-") < 0) {
        this.toastr.warning("please select sub training name", "Alert !",{timeOut : Constant.TOSTER_FADEOUT_TIME})
        return false;
      }
      else if (this.selectedRoleList.length === 0) {
        this.toastr.warning("please select role", "Alert !",{timeOut : Constant.TOSTER_FADEOUT_TIME})
        return false;
      }
      else if (this.startDate === "") {
        this.toastr.warning("please select start date", "Alert !",{timeOut : Constant.TOSTER_FADEOUT_TIME})
        return false;
      }
      else if (this.endDate === "") {
        this.toastr.warning("please select end date", "Alert !",{timeOut : Constant.TOSTER_FADEOUT_TIME})
        return false;
      }
      else if (start >= end) {
        this.toastr.warning("End Date should be greater than or equal to start date", "Alert !",{timeOut : Constant.TOSTER_FADEOUT_TIME});
        return false
      }
      // else if (this.selectedZoneNameList.length === 0) {
      //   this.toastr.warning("select zone", "Alert !",{timeOut : Constant.TOSTER_FADEOUT_TIME});
      //   return false;
      // }
      // else if (this.selectedClusterNameList.length === 0) {
      //   this.toastr.warning("select cluster", "Alert !",{timeOut : Constant.TOSTER_FADEOUT_TIME});
      //   return false;
      // }
      else {
        return true;
      }
    }

  }

  

  isOR: boolean = false;
  assignTraining() {
    if (!this.validateAssignData()) {
      return false;
    }

    // var circleAbbr = this.selectedCircleNameList[0].paramCode;
    var circleAbbr = 'Trinity';

    let jsonString = {
      trainingName: this.trainingName,
      tndMasterId: this.subTrainingName,
      tenentId : this.tenentId,
      role: this.selectedRoleList,
      circleAbbr: circleAbbr,
      zone: this.selectedZoneNameList,
      cluster: this.selectedClusterNameList,
      startDate: this.startDate,
      endDate: this.endDate,
      empId: this.employeeId,
      isSelectedFlag: this.isOR
    }

    //console.log(JSON.stringify(jsonString));
    this.ShowLoading = true;
    this.tndSharedService.assignTraining(jsonString)
      .subscribe((response) => {
        // console.log(response);
        if (response.responseCode === Constant.SUCCESSFUL_STATUS_CODE) {
          this.toastr.success('Successfully assign', 'Alert',{timeOut : Constant.TOSTER_FADEOUT_TIME});
          alert("ticket created : "+response.wrappedList[0].NO_OF_TKT_CREATED)
          this.ShowLoading = false;
          // location.reload();
          this.refreshPage();
        }

        else {
          this.toastr.error('Something went wrong', 'Alert',{timeOut : Constant.TOSTER_FADEOUT_TIME});
          this.ShowLoading = false;
        }
      },
        (error) => {
          this.toastr.warning(Constant.returnServerErrorMessage("assignTraining"), "Alert !",{timeOut : Constant.TOSTER_FADEOUT_TIME});
          this.ShowLoading = false;
        })
  }

  // exportSubmittedFeedbackData(){
  //   this.ShowLoading = true;
  //   this.tndSharedService.exportSubmittedFeedbackData()
  //   .subscribe((response) => {
  //     if (response.responseCode === Constant.SUCCESSFUL_STATUS_CODE) {
  //       let exportedList = response.wrappedList;
  //       alasql('SELECT empId as EMP_ID, empName as EMP_NAME, ticketNumber as TICKET_NUMBER, organization as ORGANIZATION, date as SUBMITTED_DATE, trainingName as TRAINING_NAME, '+
  //       'f1 as F_1, f2 as F_2, f3 as F_3, f4 as F_4, f5 as F_5, f6 as F_6, f7 as F_7, f8 as F_8, f9 as F_9, f10 as F_10, '+
  //       'f11 as F_11, f12 as F_12, f13 as F_13, f14 as F_14, f15 as F_15, f16 as F_16, f17 as F_17, f18 as F_18, f19 as F_19, f20 as F_20, '+
  //       'f21 as F_21, f22 as F_22, f23 as F_23, f24 as F_24, f25 as F_25, f26 as F_26, f27 as F_27 '+
  //       'INTO XLSXML("Feedback_Output.xls",{headers:true}) FROM ?',[exportedList]);
  //     }
  //     else {
  //       this.toastr.error('Something went wrong', 'Alert',{timeOut : Constant.TOSTER_FADEOUT_TIME});
  //     }
  //     this.ShowLoading = false;
  //   },
  //     (error) => {
  //       this.toastr.warning(Constant.returnServerErrorMessage("exportSubmittedFeedbackData"), "Alert !",{timeOut : Constant.TOSTER_FADEOUT_TIME});
  //       this.ShowLoading = false;
  //     })
  //   //
  // }


}
