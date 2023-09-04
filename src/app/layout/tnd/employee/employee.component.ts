import { Component, OnInit } from '@angular/core';
import { Constant } from 'src/app/shared/constant/Contant';
import { EmployeeTableSetting } from './EmployeeTableSetting';
import { SharedService } from 'src/app/shared/service/SharedService';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonFunction } from 'src/app/shared/constant/CommonFunction';
declare var $: any;

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  ShowLoading = false;
  alertFadeoutTime : number = 4000;
  employeeList = [];
  employeeName : string = "";
  mobile : string = "";
  emailId : string = "";
  roleList = [];
  selectedRoleList = [];
  submenuName : string = "";
  organizationLogo : string = "";
  organizationName : string = "";
  tenentId : string = "";
  button : string = "";
  color1 : string = "";
  color2 : string = "";
  singleSelectdropdownSettings = {};
  employeeTableSettings = EmployeeTableSetting.setting;
  constructor(private router:Router, private sharedService : SharedService,
    private toastr: ToastrService) { 
    this.submenuName = localStorage.getItem("employee");
    localStorage.setItem("currentPage","employee");
    if(this.submenuName == null) this.submenuName = "Employee";
    this.organizationLogo = localStorage.getItem("organizationLogo");
    this.organizationName = localStorage.getItem("organizationName");
    this.tenentId = localStorage.getItem("tenentId");
    this.button = localStorage.getItem("button");
    this.color1 = localStorage.getItem("color1");
    this.color2 = localStorage.getItem("color2");
  }

  ngOnInit() {
    this.singleSelectdropdownSettings = {
      singleSelection: true,
      idField: 'paramCode',
      textField: 'paramDesc',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: true
    };
    setTimeout(() => {
      $("ng2-smart-table thead").css('background-color',this.color1);
    }, 100);
    this.loadRoleList();
    this.getAllEmployeeList();
  }

  reloadPage(){
    let isReloadPage = confirm("Do you want reload this page??");
    if(isReloadPage){
      this.router.navigate(['/layout/dashboard']);
    }
  }

  loadRoleList(){
    this.sharedService.getRoleList(this.tenentId)
    .subscribe( (response) =>{
         if(response.responseCode === Constant.SUCCESSFUL_STATUS_CODE){
          this.roleList = response.wrappedList;
        }
        else{
          this.toastr.error('Something went wrong', 'Alert',{timeOut : Constant.TOSTER_FADEOUT_TIME});
          // this.ShowLoading = false;
        }
  },
    (error)=>{
      this.toastr.warning(Constant.returnServerErrorMessage("loadRoleList"),"Alert !",{timeOut : Constant.TOSTER_FADEOUT_TIME});
      this.ShowLoading = false;
    })
  }

  getAllEmployeeList(){
    this.ShowLoading = true;
    let jsonData = {
      tenentId:this.tenentId
    }
    this.sharedService.getDataBySelectType(jsonData,'employeeList')
    .subscribe( (response) =>{
      this.employeeList = response.employeeDataList;
      this.ShowLoading = false;
    },
    (error)=>{
      this.toastr.warning(Constant.returnServerErrorMessage("getAllEmployeeList"),"Alert !",{timeOut : Constant.TOSTER_FADEOUT_TIME});
      this.ShowLoading = false;
    })
  }

  submitEmployeeData(){
    if(this.employeeName == ""){
      this.toastr.warning("please enter employeeName value","Alert !",{timeOut : this.alertFadeoutTime});
      return ;
    }
    
    else if(this.mobile == ""){
      this.toastr.warning("please enter mobile value","Alert !",{timeOut : this.alertFadeoutTime});
      return ;
    }
    else if(this.emailId == ""){
      this.toastr.warning("please enter email","Alert !",{timeOut : this.alertFadeoutTime});
      return ;
    }
    else if(this.mobile.length != 10){
      this.toastr.warning("mobile length should be 10 digit","Alert !",{timeOut : this.alertFadeoutTime});
      return ;
    }

    else if(this.selectedRoleList.length == 0){
      this.toastr.warning("please select one role","Alert !",{timeOut : this.alertFadeoutTime});
      return ;
    }
    

    let role = CommonFunction.createCommaSeprate(this.selectedRoleList);

    let jsonData = {
      employeeName : this.employeeName,
      role : role,
      mobile : this.mobile,
      emailId : this.emailId,
      tenentId : this.tenentId
    }
    //console.log(JSON.stringify(jsonData));
    this.ShowLoading = true;
    this.sharedService.submitDataByInsertType(jsonData,'employee')
    .subscribe((response) =>{
      //console.log(response);
      if(response.responseCode == Constant.SUCCESSFUL_STATUS_CODE){
        this.toastr.success(response.responseDesc,"Alert !",{timeOut : this.alertFadeoutTime});
        this.setDefaultAllField();
        this.getAllEmployeeList();
      }
      else{
        this.toastr.warning(response.responseDesc,"Alert !",{timeOut : this.alertFadeoutTime});
      }
      this.ShowLoading = false;
      
    },
    (error)=>{
      this.toastr.warning(Constant.returnServerErrorMessage("submitEmployeeData"),"Alert !",{timeOut : Constant.TOSTER_FADEOUT_TIME});
    });
  }

  setDefaultAllField(){
    this.employeeName = ""
    this.selectedRoleList = [];
    this.mobile = "";
    this.emailId = "";
  }


}
