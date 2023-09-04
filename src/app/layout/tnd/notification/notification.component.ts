import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TndSharedService } from 'src/app/shared/service/TndSharedService';
import { SharedService } from 'src/app/shared/service/SharedService';
import { TndNotificationService } from 'src/app/shared/service/TndNotificationService';
import { ToastrService } from 'ngx-toastr';
import { Constant } from 'src/app/shared/constant/Contant';
import { CommonFunction } from 'src/app/shared/constant/CommonFunction';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  ShowLoading = false;
  isOR: boolean = false;
  employeeList = [];
  selectedEmployeeList = [];
  employeeId: any = "";
  title: any = "";
  description: any = "";
  roleList = [];
  selectedRoleList = [];
  circleNameList = [];
  selectedCircleNameList = [];
  zoneNameList = [];
  selectedZoneNameList = [];
  clusterNameList = [];
  selectedClusterNameList = [];
  loginEmpId: any = "";
  loginEmpRole: any = "";

  multiSelectropdownSettings = {};
  public organizationName : string = "";
  public organizationLogo : string = "";
  public submenuName : string = "";
  tenentId = "";
  loginPage = "";
	button = "";
	color1 = "";
	color2 = "";
  constructor(private router: Router,private tndSharedService: TndSharedService, 
    private sharedService : SharedService,
    private notificationService : TndNotificationService, 
    private toastr: ToastrService) { 
    this.loginEmpId = sessionStorage.getItem("username");
    this.loginEmpRole = localStorage.getItem("empRole");
    this.organizationLogo = localStorage.getItem("organizationLogo");
    this.organizationName = localStorage.getItem("organizationName");
    this.submenuName = localStorage.getItem("tndNotification");
    localStorage.setItem("currentPage","tndNofication");
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
    this.loadRoleList();
    this.getEmployeeList();
    
  }

  
  reloadPage(){
    let isReloadPage = confirm("Do you want reload this page??");
    if(isReloadPage){
      this.refreshPage();
    }
  }

  refreshPage(){
    this.router.navigateByUrl('/layout', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/layout/tnd-notification']);
    }); 
  }

  loadRoleList(){
    this.sharedService.getRoleList(this.tenentId)
    .subscribe( (response) =>{
         if(response.responseCode === Constant.SUCCESSFUL_STATUS_CODE){
          this.roleList = response.wrappedList;
        }
        else{
          this.toastr.error('Something went wrong', 'Alert',{timeOut : Constant.TOSTER_FADEOUT_TIME});
        }
  },
    (error)=>{
      this.toastr.warning(Constant.returnServerErrorMessage("loadRoleList"),"Alert !",{timeOut : Constant.TOSTER_FADEOUT_TIME});
      this.ShowLoading = false;;
    })
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

  changeVideoListener($event): void {
    this.readVideoThis($event.target);
  }

  imageBase64String: any = "";
  readVideoThis(inputValue: any): void {
    var file: File = inputValue.files[0];
    var myReader: FileReader = new FileReader();

    myReader.onloadend = (e) => {
      this.imageBase64String = myReader.result;
      //console.log(this.imageBase64String)
    }
    myReader.readAsDataURL(file);
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
        //console.log(response);
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

  //

  validateNotificationData(): any {
    if(this.isOR){
     
      if(this.selectedEmployeeList.length == 0){
        alert("please select one employee");
        return false;
      }
      else if(this.title.trim() == ''){
        alert("please enter heading");
        return false;
      }
      else if(this.description.trim() == ''){
        alert("please enter description");
        return false;
      }
      
      else{
        return true;
      }
    }else{
      if(this.selectedRoleList.length == 0){
        alert("please select role");
        return false;
      }
      // else if(this.selectedCircleNameList.length == 0){
      //   alert("please select organization");
      //   return false;
      // }
      // else if(this.selectedClusterNameList.length == 0){
      //   alert("please select department");
      //   return false;
      // }else if(this.title.trim() == ''){
      //   alert("please enter heading");
      //   return false;
      // }else if(this.description.trim() == ''){
      //   alert("please enter description");
      //   return false;
      // }
      
      else{
        return true;
      }

    }
  }

  submitNotification(){
    if (!this.validateNotificationData()) {
      return false;
    }

    let role = "";
    if(this.isOR)
      this.employeeId = CommonFunction.createCommaSeprate(this.selectedEmployeeList);
    else
      role = CommonFunction.createCommaSeprate(this.selectedRoleList);

    let jsonData = {
      empId : this.employeeId,
      title : this.title,
      description : this.description,
      image : this.imageBase64String,
      // role : this.selectedRoleList,
      role : role,
      circle : this.selectedCircleNameList,
      zone : this.selectedZoneNameList,
      cluster : this.selectedClusterNameList,
      tenentId : this.tenentId
    }
    this.ShowLoading = true;
    this.notificationService.submitNotification(jsonData)
    .subscribe((response) =>{
      // console.log(response);
      if(response.responseCode === Constant.SUCCESSFUL_STATUS_CODE){
        this.toastr.success('Notification successfully save', 'Alert',{timeOut : Constant.TOSTER_FADEOUT_TIME});
        this.ShowLoading = false;
        // location.reload();
        this.refreshPage();
      }
      else{
        this.toastr.error('Something went wrong', 'Alert',{timeOut : Constant.TOSTER_FADEOUT_TIME});
        this.ShowLoading = false;
      }
    },
    (error) => {
      this.toastr.warning(Constant.returnServerErrorMessage("submitNotification"),"Alert !",{timeOut : Constant.TOSTER_FADEOUT_TIME});
      this.ShowLoading = false;
    });
  }


}
