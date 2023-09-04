import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WorkInProgressComponent } from './work-in-progress/work-in-progress.component';
import { LoginComponent } from './login/login.component';
import { LayoutComponent } from './layout/layout.component';
import { AssignTrainingComponent } from './layout/tnd/assign-training/assign-training.component';
import { CreateTrainingComponent } from './layout/tnd/create-training/create-training.component';
import { EmployeeComponent } from './layout/tnd/employee/employee.component';
import { IncidentTrainingComponent } from './layout/tnd/incident-training/incident-training.component';
import { NotificationComponent } from './layout/tnd/notification/notification.component';
import { OfflineTrainingComponent } from './layout/tnd/offline-training/offline-training.component';
import { PlannedTrainingComponent } from './layout/tnd/planned-training/planned-training.component';
import { RoleComponent } from './layout/tnd/role/role.component';
import { TicketStatusComponent } from './layout/tnd/ticket-status/ticket-status.component';
import { TrainingHistoryComponent } from './layout/tnd/training-history/training-history.component';
import { DashboardComponent } from './layout/dashboard/dashboard.component';
import { OnlyNumber } from './shared/validations/OnlyNumber';
import { LengthValidater } from './shared/validations/LengthValidater';
import { AuthGuard } from './shared/guard/auth.guard';
import { SharedService } from './shared/service/SharedService';
import { TndSharedService } from './shared/service/TndSharedService';
import { IncidentTrainingService } from './shared/service/IncidentTrainingService';
import { PlannedTrainingService } from './shared/service/PlannedTrainingService';
import { TndTicketStatusService } from './shared/service/TndTicketStatusService';
import { TndTrainingHistoryService } from './shared/service/TndTrainingHistoryService';
import { TndNotificationService } from './shared/service/TndNotificationService';
import { TndOffineTrainingService } from './shared/service/TndOfflineTrainingService';
import { DatePipe } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { HttpModule } from '@angular/http';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatRippleModule} from '@angular/material/core';
import {MatSliderModule} from '@angular/material/slider';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatDialogModule} from '@angular/material/dialog';
import {MatExpansionModule} from '@angular/material/expansion';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { FeedbackReportComponent } from './layout/tnd/feedback-report/feedback-report.component';

@NgModule({
  declarations: [
    AppComponent,
    WorkInProgressComponent,
    LoginComponent,
    LayoutComponent,
    AssignTrainingComponent,
    CreateTrainingComponent,
    EmployeeComponent,
    IncidentTrainingComponent,
    NotificationComponent,
    OfflineTrainingComponent,
    PlannedTrainingComponent,
    RoleComponent,
    TicketStatusComponent,
    TrainingHistoryComponent,
    DashboardComponent,
    OnlyNumber,
    LengthValidater,
    FeedbackReportComponent,
  ],
  imports: [
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatRippleModule,
    MatSliderModule,
    MatProgressBarModule,
    MatDialogModule,
    MatExpansionModule,
    ToastrModule.forRoot(),
    Ng2SmartTableModule,
    NgMultiSelectDropDownModule.forRoot(),
  ],
  providers: [AuthGuard, SharedService, TndSharedService,IncidentTrainingService,
    PlannedTrainingService,TndTicketStatusService, TndTrainingHistoryService,
    TndNotificationService,TndOffineTrainingService,
    DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
