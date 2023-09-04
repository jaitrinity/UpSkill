import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { AuthenticateModel } from './model/authenticateModel';
import { SharedService } from '../shared/service/SharedService';
import { Router } from '@angular/router';
import { Constant } from '../shared/constant/Contant';
import { ToastrService } from 'ngx-toastr';
declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  ShowLoading = false;
  //HIDING THE SHOW BUTTON BY DEFAULT.
  hide = true;
  invalid = false;

  public loginModel : AuthenticateModel;
  public loginLogUrl : string;
  public loginTagline : string;
  loginPage = "";
  button = "";
  color1 = "";
  color2 = "";
  constructor(private sharedService : SharedService,
    private router:Router,
    private toastr: ToastrService) { 
    this.loginModel = new AuthenticateModel();
  }

  ngOnInit() {
    this.getAppUrl();
    this.getAllLogo();
  }

  getAppUrl(){
    let jsonData = {
      loginEmpId : ""
    }
    this.sharedService.getPortalColor(jsonData)
    .subscribe( (response) =>{
      // console.log(response);
      let appResponse = response.colorList[0];
      this.loginPage = appResponse.loginPage;
      this.button = appResponse.button;
      this.color1 = appResponse.color1;
      this.color2 = appResponse.color2;
  
      localStorage.setItem("loginPage",this.loginPage);
      localStorage.setItem("button",this.button);
      localStorage.setItem("color1",this.color1);
      localStorage.setItem("color2",this.color2);
  },
    (error)=>{
      
    })
  }

  getAllLogo(){
    this.sharedService.getAllLogo()
    .subscribe( (response) =>{
      let logoList = response.wrappedList;
      for(let i=0;i<logoList.length;i++){
        let logoType = logoList[i].logoType;
        let logoUrl = logoList[i].logoUrl;
        if(logoType == Constant.LOGIN_LOGO){
          localStorage.setItem("loginLogUrl",logoUrl);
          this.loginLogUrl = logoUrl;
        }
        else if(logoType == Constant.NAVBAR_LOGO){
          localStorage.setItem("navbarLogUrl",logoUrl);
        }
        else if(logoType == Constant.TITLE_LOGO){
          localStorage.setItem("titleLogUrl",logoUrl);
        }
        else if(logoType == Constant.TAG_LOGO){
          localStorage.setItem("tagLogUrl",logoUrl);
        }
        else if(logoType == Constant.LOGIN_TAGLINE){
          localStorage.setItem("loginTagline",logoUrl);
          this.loginTagline = logoUrl;
        }
        else if(logoType == Constant.NAVBAR_TAGLINE){
          localStorage.setItem("navbarTagline",logoUrl);
        }
        else if(logoType == Constant.BRILLOCA_LOGO){
          localStorage.setItem("brillocaLogo",logoUrl);
        }
        else if(logoType == Constant.HSIL_LOGO){
          localStorage.setItem("hsilLogo",logoUrl);
        }
        else if(logoType == Constant.SHIL_LOGO){
          localStorage.setItem("shilLogo",logoUrl);
        }
        else if(logoType == Constant.MEDIA_BUTTON_TEXT){
          localStorage.setItem("mediaButtonText",logoUrl);
        }
      }
  },
    (error)=>{
      this.toastr.warning(Constant.returnServerErrorMessage("getAllLogo"),"Alert !",{timeOut : Constant.TOSTER_FADEOUT_TIME});
      this.ShowLoading = false;
    })
  }

  checkAuthenticate(){
    // this.loginModel.appName = this.appName;
    this.ShowLoading = true;
    this.sharedService.authenticate(this.loginModel)
    .subscribe( (response) =>{
      this.ShowLoading = false; 
       //console.log(response);
         if(response.responseCode === Constant.SUCCESSFUL_STATUS_CODE){
          sessionStorage.setItem("username",this.loginModel.username);
          sessionStorage.setItem("password", this.loginModel.password)
          
          localStorage.setItem("empName",response.wrappedList[0].empName);
          localStorage.setItem("empRole",response.wrappedList[0].empRole);
          localStorage.setItem("otherRole",response.wrappedList[0].otherRole); // Admin and Other
          localStorage.setItem("organizationLogo",response.wrappedList[0].organizationLogo);
          localStorage.setItem("organizationName",response.wrappedList[0].organizationName);
          localStorage.setItem("tenentId",response.wrappedList[0].tenentId);
          localStorage.setItem(btoa("isValidToken"),btoa(Constant.TRINITY_PRIVATE_KEY));
          this.router.navigate(['/layout']);
          this.ShowLoading = false;
        }
        else{
          this.toastr.error(response.responseDesc, 'Alert',{timeOut : Constant.TOSTER_FADEOUT_TIME});
          this.ShowLoading = false;
        }
  },
    (error)=>{
      this.toastr.warning(Constant.returnServerErrorMessage("authenticate"),"Alert !",{timeOut : Constant.TOSTER_FADEOUT_TIME});
      this.ShowLoading = false;
    })

  }

  mobileNumber = "";
  otpNumber = "";
  newPassword = "";
  confirmPassword = "";
  validOTPNumber = "";
  isOTP_Validate : boolean = false;
  openForgetPasswordModel(){
    if(this.loginModel.username == ""){
      alert("enter mobile no");
      return;
    }
    this.mobileNumber = this.loginModel.username;
    $("#forgetPasswordModal").modal({
      backdrop : 'static',
      keyboard : false
    });
  }

  sendOTP(){
    if(this.mobileNumber.length != 10){
      alert("please enter 10 digit mobile number");
      return ;
    }
    this.isOTP_Validate = false;
    this.validOTPNumber = "";
    let json = {
      loginEmpId : this.loginModel.username,
      mobileNumber : this.mobileNumber
    }
    this.ShowLoading = true;
    this.sharedService.sendOTP(json)
    .subscribe( (response) =>{
      this.ShowLoading = false; 
       //console.log(response);
         if(response.responseCode === Constant.SUCCESSFUL_STATUS_CODE){
          this.validOTPNumber = response.wrappedList[0];
          this.ShowLoading = false;
        }
        else{
          this.toastr.info('Invalid username or mobile number, please check', 'Alert',{timeOut : Constant.TOSTER_FADEOUT_TIME});
          this.ShowLoading = false;
        }
  },
    (error)=>{
      this.toastr.warning(Constant.returnServerErrorMessage("authenticate"),"Alert !",{timeOut : Constant.TOSTER_FADEOUT_TIME});
      this.ShowLoading = false;
    })
  }

  VerifyOTP(){
    this.isOTP_Validate = false;
    if(this.otpNumber != this.validOTPNumber){
      alert("enter enter valid otp");
      return;
    }
    this.isOTP_Validate = true;

  }

  changePassword(){
    if(this.newPassword == ""){
      alert("enter new password");
      return ;
    }
    else if(this.confirmPassword != this.newPassword){
      alert("password confirmation incorrect please check");
      return;
    }
    this.ShowLoading = true; 
    let json = {
      loginEmpId : this.loginModel.username,
      mobileNumber : this.mobileNumber,
      newPassword : this.newPassword
    }
    this.sharedService.changePassword(json)
    .subscribe( (response) =>{
      this.ShowLoading = false; 
       //console.log(response);
         if(response.responseCode === Constant.SUCCESSFUL_STATUS_CODE){
          this.toastr.success('password change successfully', 'Alert',{timeOut : Constant.TOSTER_FADEOUT_TIME});
          $("#forgetPasswordModal").modal("hide");
          this.otpNumber = "";
          this.mobileNumber = "";
          this.newPassword = "";
          this.confirmPassword = "";
          this.isOTP_Validate = false;
          this.ShowLoading = false;
        }
        else{
          this.toastr.info('Invalid username or mobile number, please check', 'Alert',{timeOut : Constant.TOSTER_FADEOUT_TIME});
          this.ShowLoading = false;
        }
  },
    (error)=>{
      this.toastr.warning(Constant.returnServerErrorMessage("authenticate"),"Alert !",{timeOut : Constant.TOSTER_FADEOUT_TIME});
      this.ShowLoading = false;
    })
  }

  closeModal(){
    if(this.mobileNumber == ""){
      this.mobileNumber = "";
      this.otpNumber = "";
      this.newPassword = "";
      this.confirmPassword = "";
      this.isOTP_Validate = false;
      $("#forgetPasswordModal").modal("hide");
    }
    else{
      let isConfirm = confirm("Do you want to close?");
      if(isConfirm){
        this.mobileNumber = "";
        this.otpNumber = "";
        this.newPassword = "";
        this.confirmPassword = "";
        this.isOTP_Validate = false;
        $("#forgetPasswordModal").modal("hide");
      }
    }
    
  }

}
