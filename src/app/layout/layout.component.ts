import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { TndSharedService } from '../shared/service/TndSharedService';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from '../shared/service/SharedService';
import { Constant } from '../shared/constant/Contant';
declare var $: any;

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
  animations: [
    trigger(
      'enterAnimation', [
        transition(':enter', [
          style({transform: 'translateX(100%)', opacity: 0}),
          animate('100ms', style({transform: 'translateX(0)', opacity: 1}))
        ]),
        transition(':leave', [
          style({transform: 'translateX(0)', opacity: 1}),
          animate('100ms', style({transform: 'translateX(100%)', opacity: 0}))
        ])
      ]
    )
  ],
})
export class LayoutComponent implements OnInit {
  //Toogle Variable for the sidenav.
  ToggleVariable = true;
  //Toogle variable for searchbar.
  ToggledSearch = false;
  empName : string;
  userRole : string;
  tenentId : string;
  otherRole : string ;
  //public loginLogUrl : string;
  public navbarLogUrl : string;
  //public titleLogUrl : string;
  public tagLogUrl : string;
  public menuList = [];
  public tndMenuList = [];
  currentDate : any;
  currentPage : string = "";
  loginPage = "";
  button = "";
  color1 = "";
  color2 = "";
  constructor(private router:Router, 
    private datePipe : DatePipe, 
    private tndSharedService: TndSharedService,  
    private toastr: ToastrService,
    private sharedService : SharedService) { 
    this.empName = localStorage.getItem("empName");
    this.userRole = localStorage.getItem("empRole");
    this.tenentId = localStorage.getItem("tenentId");
    this.otherRole = localStorage.getItem("otherRole");
    //this.loginLogUrl = localStorage.getItem("loginLogUrl");
    this.navbarLogUrl = localStorage.getItem("navbarLogUrl");
    //this.titleLogUrl = localStorage.getItem("titleLogUrl");
    this.tagLogUrl = localStorage.getItem("tagLogUrl");
    this.currentPage = localStorage.getItem("currentPage");
    this.currentDate = this.datePipe.transform(new Date(),'dd_MMM_yyyy');

    this.loginPage = localStorage.getItem("loginPage");
    this.button = localStorage.getItem("button");
    this.color1 = localStorage.getItem("color1");
    this.color2 = localStorage.getItem("color2");
  }

  ngOnInit() {
    //this.router.navigate(['/layout/dashboard']);
    this.loadMenuList();
    if(this.otherRole == 'Admin'){
      if(this.currentPage == 'createTraining'){
        this.router.navigate(['/layout/tnd-create-training']);
      }
      else if(this.currentPage == 'assignTraining'){
        this.router.navigate(['/layout/tnd-assign-training']);
      }
      else if(this.currentPage == 'ticketStatus'){
        this.router.navigate(['/layout/tnd-ticket-status']);
      }
      else if(this.currentPage == 'trainingHistory'){
        this.router.navigate(['/layout/tnd-training-history']);
      }
      else if(this.currentPage == 'trainingHistory'){
        this.router.navigate(['/layout/tnd-assign-training']);
      }
      else if(this.currentPage == 'groupTraining'){
        this.router.navigate(['/layout/tnd-group-training']);
      }
      else if(this.currentPage == 'assignGroupTraining'){
        this.router.navigate(['/layout/tnd-assign-group-training']);
      }
      else if(this.currentPage == 'tndNofication'){
        this.router.navigate(['/layout/tnd-notification']);
      }
      // else if(this.currentPage == 'employee'){
      //   this.router.navigate(['/layout/tnd-employee']);
      // }
      else if(this.currentPage == 'role'){
        this.router.navigate(['/layout/tnd-role']);
      }
      else{
        // this.router.navigate(['/layout/tnd-assign-training']);
        this.router.navigate(['/layout/tnd-employee']);
      }
    }
    else{
      if(this.currentPage == 'ticketStatus'){
        this.router.navigate(['/layout/tnd-ticket-status']);
      }
      else if(this.currentPage == 'trainingHistory'){
        this.router.navigate(['/layout/tnd-training-history']);
      }
      else if(this.currentPage == 'plannedTraining'){
        this.router.navigate(['/layout/tnd-planned-training']);
      }
      // else if(this.currentPage == 'incidentTraining'){
      //   this.router.navigate(['/layout/tnd-incident-training']);
      // }
      else if(this.currentPage == 'groupPlannedTraining'){
        this.router.navigate(['/layout/tnd-group-planned-training']);
      }
      else if(this.currentPage == 'groupIncidentTraining'){
        this.router.navigate(['/layout/tnd-group-incident-training']);
      }
      else{
        this.router.navigate(['/layout/tnd-incident-training']);
      }
    }
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  loadMenuList(){
    var jsonStr = {
      userRole:this.userRole,
      // tenentId:this.tenentId
    }
    this.menuList = [];
    this.sharedService.getMenuListByRoleName(jsonStr)
    .subscribe( (response) =>{
        if(response.responseCode === Constant.SUCCESSFUL_STATUS_CODE){
          this.menuList = response.wrappedList;
          //console.log(JSON.stringify(this.menuList));
          setTimeout(() => {
            for(let i=0;i<this.menuList.length;i++){
              let menuName = this.menuList[i].menuName;
              if(menuName == 'TnD'){
                let submenuList = this.menuList[i].submenuList;
                this.tndMenuList = submenuList;
                for(let j=0;j<submenuList.length;j++){
                  let routerLink = submenuList[j].routerLink;
                  if(routerLink == 'tnd-create-training'){
                      localStorage.setItem("createTraining",submenuList[j].submenuName);
                  }
                  else if(routerLink == 'tnd-assign-training'){
                      localStorage.setItem("assignTraining",submenuList[j].submenuName);  
                  }
                  else if(routerLink == 'tnd-ticket-status'){
                      localStorage.setItem("ticketStatus",submenuList[j].submenuName);
                  }
                  else if(routerLink == 'tnd-training-history'){
                      localStorage.setItem("trainingHistory",submenuList[j].submenuName);
                  }
                  else if(routerLink == 'tnd-incident-training'){
                      localStorage.setItem("incidentTraining",submenuList[j].submenuName);
                  }
                  else if(routerLink == 'tnd-planned-training'){
                      localStorage.setItem("plannedTraining",submenuList[j].submenuName);
                  }
                  else if(routerLink == 'tnd-group-training'){
                      localStorage.setItem("groupTraining",submenuList[j].submenuName);
                  }
                  else if(routerLink == 'tnd-notification'){
                      localStorage.setItem("tndNotification",submenuList[j].submenuName);
                  }
                  else if(routerLink == 'tnd-assign-group-training'){
                    localStorage.setItem("assignGroupTraining",submenuList[j].submenuName);
                  }
                  else if(routerLink == 'tnd-group-incident-training'){
                    localStorage.setItem("groupIncidentTraining",submenuList[j].submenuName);
                  }
                  else if(routerLink == 'tnd-group-planned-training'){
                      localStorage.setItem("groupPlannedTraining",submenuList[j].submenuName);
                  }
                  else if(routerLink == 'tnd-offline-training'){
                      localStorage.setItem("offlineTraining",submenuList[j].submenuName);
                  }
                  else if(routerLink == 'tnd-employee'){
                      localStorage.setItem("employee",submenuList[j].submenuName);
                  }
                  else if(routerLink == 'tnd-role'){
                      localStorage.setItem("role",submenuList[j].submenuName);
                  }
                }
              }
            }
          }, 500);
          
        }
        else{
         
        }
  },
    (error)=>{
      
    })

  }

  // exportSubmittedFeedbackData(){
  //   this.spinner.show();
  //   this.tndSharedService.exportSubmittedFeedbackData()
  //   .subscribe((response) => {
  //     if (response.responseCode === Constant.SUCCESSFUL_STATUS_CODE) {
  //       let fileName = "Feedback_Output_"+this.currentDate;
  //       let exportedList = response.wrappedList;
  //       alasql('SELECT empId as EMP_ID, empName as EMP_NAME, ticketNumber as TICKET_NUMBER, organization as ORGANIZATION, date as SUBMITTED_DATE, trainingName as TRAINING_NAME, '+
  //       'f1 as F_1_Offline, f2 as F_2_Offline, f3 as F_3_Offline, f4 as F_4_Offline, f5 as F_5_Offline, f6 as F_6_Offline, f7 as F_7_Offline, f8 as F_8_Offline, f9 as F_9_Offline, f10 as F_10_Offline, f11 as F_11_Offline, f12 as F_12_Offline, f13 as F_13_Offline, '+ 
  //       'f14 as F_14_Online, f15 as F_15_Online, f16 as F_16_Online, f17 as F_17_Online, f18 as F_18_Online, f19 as F_19_Online, f20 as F_20_Online, f21 as F_21_Online, f22 as F_22_Online '+
  //       //', f23 as F_23, f24 as F_24, f25 as F_25, f26 as F_26, f27 as F_27 '+
  //       'INTO XLSXML("'+fileName+'.xls",{headers:true}) FROM ?',[exportedList]);
  //     }
  //     else {
  //       this.toastr.error('Something went wrong', 'Alert',{timeOut : Constant.TOSTER_FADEOUT_TIME});
  //     }
  //     this.spinner.hide();
  //   },
  //     (error) => {
  //       this.toastr.warning(Constant.returnServerErrorMessage("exportSubmittedFeedbackData"), "Alert !",{timeOut : Constant.TOSTER_FADEOUT_TIME});
  //       this.spinner.hide();
  //     })
  // }

  // exportInstallmentReport(){
  //   this.spinner.show();
  //   this.exportAppInstallmentReport();
  //   this.exportAppNotInstallmentReport();
  //   this.spinner.hide();
  // }

  // exportAppInstallmentReport(){
  //   this.spinner.show();
  //   let json = {
  //     searchType : "Installment"
  //   }
  //   this.tndSharedService.exportAppInstallmentReport(json)
  //   .subscribe((response) => {

  //     let fileName = "HSIL_TND_installed_"+this.currentDate;
  //     let exportedList = response.wrappedList;
  //     alasql('SELECT empId as EMPLOYEE_ID, empName as EMPLOYEE_NAME, registeredOnDate as REGISTERED_ON '+
  //     'INTO XLSXML("'+fileName+'.xls",{headers:true}) FROM ?',[exportedList]);
  //     this.spinner.hide();
  //   },
  //   (error) => {
  //     this.toastr.warning(Constant.returnServerErrorMessage("exportAppInstallmentReport"), "Alert !",{timeOut : Constant.TOSTER_FADEOUT_TIME});
  //     this.spinner.hide();
  //   })
  // }

  // exportAppNotInstallmentReport(){
  //   this.spinner.show();
  //   let json = {
  //     searchType : "NotInstallment"
  //   }
  //   this.tndSharedService.exportAppInstallmentReport(json)
  //   .subscribe((response) => {
  //     let fileName = "HSIL_TND_not_installed_"+this.currentDate;
  //     let exportedList = response.wrappedList;
  //     alasql('SELECT empId as EMPLOYEE_ID, empName as EMPLOYEE_NAME '+
  //     'INTO XLSXML("'+fileName+'.xls",{headers:true}) FROM ?',[exportedList]);
  //     this.spinner.hide();
  //   },
  //   (error) => {
  //     this.toastr.warning(Constant.returnServerErrorMessage("exportAppInstallmentReport"), "Alert !",{timeOut : Constant.TOSTER_FADEOUT_TIME});
  //     this.spinner.hide();
  //   })
  // }

  // exportPoshMuduleReport(){
  //   this.spinner.show();
  //   this.tndSharedService.exportPoshMuduleReport()
  //   .subscribe((response) => {

  //     let fileName = "POSH_Module_Report_"+this.currentDate;
  //     let exportedList = response.wrappedList;
  //     //alasql('SELECT ticketNumber as TICKET_NUM, empId as EMPLOYEE_ID, date as SUBMIT_DATE, quesId as QUESTION_ID, question as QUESTION, optionType as OPTIONS_TYPE, option as OPTION_VALUE, answer as ANSWER, masterId as MASTER_ID, trainingName as TRAINING_NAME '+
  //     alasql('SELECT trainingName as TRAINING_NAME, empId as EMPLOYEE_ID, date as SUBMIT_DATE, ticketNumber as TICKET_NUM, question as QUESTION, option as OPTION_VALUE, answer as ANSWER '+
  //     'INTO XLSXML("'+fileName+'.xls",{headers:true}) FROM ?',[exportedList]);
  //     this.spinner.hide();
  //   },
  //   (error) => {
  //     this.toastr.warning(Constant.returnServerErrorMessage("exportAppInstallmentReport"), "Alert !",{timeOut : Constant.TOSTER_FADEOUT_TIME});
  //     this.spinner.hide();
  //   })
  // }

  // exportBehavioralModuleReport(){
  //   this.spinner.show();
  //   this.tndSharedService.exportBehavioralModuleReport()
  //   .subscribe((response) => {

  //     let fileName = "Behavioral_Module_Report_"+this.currentDate;
  //     let exportedList = response.wrappedList;
  //     alasql('SELECT empId as EMPLOYEE_ID, empName as EMPLOYEE_NAME, ticketNumber as TICKET_NUM, date as SUBMIT_DATE, trainingName as TRAINING_NAME, subTrainingName as SUB_TRAINING_NAME   '+
  //     'INTO XLSXML("'+fileName+'.xls",{headers:true}) FROM ?',[exportedList]);
  //     this.spinner.hide();
  //   },
  //   (error) => {
  //     this.toastr.warning(Constant.returnServerErrorMessage("exportBehavioralModuleReport"), "Alert !",{timeOut : Constant.TOSTER_FADEOUT_TIME});
  //     this.spinner.hide();
  //   })
  // }

  // downloadDailyReport(reportType){
  //   window.open(Constant.ftpReportURL+"downloadReport?reportType="+reportType,"_black")
  // }

  // openMobileUpdateModal(){
  //   $("#mobileUpdateModal").modal({
  //     backdrop : 'static',
  //     keyboard : false
  //   });
  // }

  // rowNumber : number = 1;
  // addColumn(){
  //   this.rowNumber++;
  //   let addColumnStr = "<tr id = '"+this.rowNumber+"' > "+
  //     "<td>"+this.rowNumber+"</td>" + 
  //     "<td><input type=\"text\" class=\"form-control\"/ id='empId_"+this.rowNumber+"' ></td> "+
  //     "<td><input type=\"number\" class=\"form-control\" id='mobileNo_"+this.rowNumber+"' /></td> "+
  //   "</tr>"

  //   $(".mytable").append(addColumnStr);

  // }

  // removeColumn(){
  //   if(this.rowNumber != 1){
  //     $(".mytable #"+this.rowNumber).remove();
  //     this.rowNumber--;
  //   }
  //   else{
  //     alert("must be one row exist");
  //   }
  // }

  // wrappedList = [];
  // saveChanges(){
  //   let jsonArr = [];
  //   for(let i=1;i<=this.rowNumber;i++){
  //     let empId = $("#empId_"+i).val();
  //     let mobileNo = $("#mobileNo_"+i).val();
  //     if(empId.trim() == ''){
  //       alert("please fill empId of "+i+" row");
  //       return false;
  //     }
  //     else if(mobileNo.trim() == ''){
  //       alert("please fill mobileNo of "+i+" row");
  //       return false;
  //     }
  //     else{
  //       let jsonData = {
  //         "empId" : empId,
  //         "mobileNo" : mobileNo
  //       }
  //       jsonArr.push(jsonData);
  //     }
  //   }
  //   this.spinner.show();
  //   this.tndSharedService.saveChanges(jsonArr)
  //   .subscribe((response) => {
  //     if(response.responseCode === Constant.SUCCESSFUL_STATUS_CODE){
  //       this.wrappedList = response.wrappedList;
  //       this.toastr.success('Successfully change', 'Alert',{timeOut : Constant.TOSTER_FADEOUT_TIME});
  //       this.resetMobileTable();
  //     }
  //     else{
  //       this.toastr.error('Something went wrong', 'Alert',{timeOut : Constant.TOSTER_FADEOUT_TIME});
  //     }
  //     this.spinner.hide();
  //   },
  //   (error) => {
  //     this.toastr.warning(Constant.returnServerErrorMessage("saveChanges"), "Alert !",{timeOut : Constant.TOSTER_FADEOUT_TIME});
  //     this.spinner.hide();
  //   })
  // }

  // resetMobileTable(){
  //   $("#empId_1").val("");
  //   $("#mobileNo_1").val("");
  //   for(let i=this.rowNumber;i>1;i--){
  //     $(".mytable #"+i).remove();
  //     if(i==2){
  //       this.rowNumber = 1;
  //     }
  //   }
  // }

  // closeModal(){
  //   let c = confirm("Are u soor want to close this window");
  //   if(c){
  //     $("#mobileUpdateModal").modal("hide");
  //     if(this.rowNumber == 1){
  //       $("#empId_"+this.rowNumber).val("");
  //       $("#mobileNo_"+this.rowNumber).val("");
  //     }else{
  //       this.resetMobileTable();
  //     }
  //   }
  // }

}
