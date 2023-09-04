import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LayoutComponent } from './layout/layout.component';
import { DashboardComponent } from './layout/dashboard/dashboard.component';
import { CreateTrainingComponent } from './layout/tnd/create-training/create-training.component';
import { AssignTrainingComponent } from './layout/tnd/assign-training/assign-training.component';
import { TicketStatusComponent } from './layout/tnd/ticket-status/ticket-status.component';
import { IncidentTrainingComponent } from './layout/tnd/incident-training/incident-training.component';
import { PlannedTrainingComponent } from './layout/tnd/planned-training/planned-training.component';
import { TrainingHistoryComponent } from './layout/tnd/training-history/training-history.component';
import { NotificationComponent } from './layout/tnd/notification/notification.component';
import { OfflineTrainingComponent } from './layout/tnd/offline-training/offline-training.component';
import { EmployeeComponent } from './layout/tnd/employee/employee.component';
import { RoleComponent } from './layout/tnd/role/role.component';
import { WorkInProgressComponent } from './work-in-progress/work-in-progress.component';
import { AuthGuard } from './shared/guard/auth.guard';
import { FeedbackReportComponent } from './layout/tnd/feedback-report/feedback-report.component';


const routes: Routes = [
  {path : '' ,  redirectTo: '/login', pathMatch: 'full'},
  {path : 'login', component :LoginComponent},
  {path : 'layout', component :LayoutComponent,  canActivate: [AuthGuard],
  children: [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'tnd-create-training', component: CreateTrainingComponent },
    { path: 'tnd-assign-training', component: AssignTrainingComponent },
    { path: 'tnd-ticket-status', component: TicketStatusComponent },
    { path: 'tnd-incident-training', component: IncidentTrainingComponent },
    { path: 'tnd-planned-training', component: PlannedTrainingComponent },
    { path: 'tnd-training-history', component: TrainingHistoryComponent },
    { path: 'tnd-notification', component: NotificationComponent },
    { path: 'tnd-offline-training', component: OfflineTrainingComponent },
    { path: 'tnd-employee', component: EmployeeComponent },
    { path: 'tnd-role', component: RoleComponent },
    { path: 'tnd-feedback-report', component: FeedbackReportComponent },
    { path: '**', component: WorkInProgressComponent }
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
