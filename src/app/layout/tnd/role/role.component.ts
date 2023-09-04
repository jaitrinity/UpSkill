import { Component, OnInit } from '@angular/core';
import { Constant } from 'src/app/shared/constant/Contant';
import { RoleTableSetting } from './RoleTableSetting';
import { SharedService } from 'src/app/shared/service/SharedService';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {
  ShowLoading = false;
  roleDataList = [];
  roleName : string = "";
  tenentId : string = "";
  alertFadeoutTime : number = 4000;
  submenuName : string = "";
  organizationLogo : string = "";
  organizationName : string = "";
  button : string = "";
  color1 : string = "";
  color2 : string = "";
  roleTableSettings = RoleTableSetting.setting;
  constructor(private router:Router, private sharedService : SharedService,
    private toastr: ToastrService) { 
    this.submenuName = localStorage.getItem("role");
    localStorage.setItem("currentPage","role");
    this.organizationLogo = localStorage.getItem("organizationLogo");
    this.organizationName = localStorage.getItem("organizationName");
    this.tenentId = localStorage.getItem("tenentId");
    this.button = localStorage.getItem("button");
    this.color1 = localStorage.getItem("color1");
    this.color2 = localStorage.getItem("color2");
  }

  ngOnInit() {
    setTimeout(() => {
      $("ng2-smart-table thead").css('background-color',this.color1);
    }, 100);
    this.getAllRoleList();
  }

  reloadPage(){
    let isReloadPage = confirm("Do you want reload this page??");
    if(isReloadPage){
      this.router.navigate(['/layout/dashboard']);
    }
  }

  getAllRoleList(){
    this.ShowLoading = true;
    let jsonData = {
      tenentId:this.tenentId
    }
    this.sharedService.getDataBySelectType(jsonData,'roleDataList')
    .subscribe( (response) =>{
      this.roleDataList = response.roleDataList;
      this.ShowLoading = false;
    },
    (error)=>{
      this.toastr.warning(Constant.returnServerErrorMessage("getAllEmployeeList"),"Alert !",{timeOut : Constant.TOSTER_FADEOUT_TIME});
      this.ShowLoading = false;
    })
  }

  submitRoleData(){
    if(this.roleName == ""){
      this.toastr.warning("please enter role ","Alert !",{timeOut : this.alertFadeoutTime});
      return ;
    }

    let jsonData = {
      roleName : this.roleName,
      tenentId : this.tenentId,
    }
    //console.log(JSON.stringify(jsonData))
    this.ShowLoading = true;
    this.sharedService.submitDataByInsertType(jsonData,"role")
    .subscribe((response) =>{
      //console.log(response);
      if(response.responseCode == Constant.SUCCESSFUL_STATUS_CODE){
        this.toastr.success(response.responseDesc,"Alert !",{timeOut : this.alertFadeoutTime});
        this.roleName = "";
        this.getAllRoleList();
      }
      else{
        this.toastr.warning(response.responseDesc,"Alert !",{timeOut : this.alertFadeoutTime});
      }
      this.ShowLoading = false;
      
    },
    (error)=>{
      this.toastr.warning(Constant.returnServerErrorMessage("submitMappingData"),"Alert !",{timeOut : Constant.TOSTER_FADEOUT_TIME});
    });
  }


}
