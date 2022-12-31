import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EmployeeComponent } from './employee/employee.component';
import { NoteComponent } from './note/note.component';
import { TeamComponent } from './team/team.component';

const routes: Routes = [
  // { path: '', component: EmployeeComponent },
  { path: 'employee', component: EmployeeComponent },
  { path: 'team', component: TeamComponent },
  { path: 'note', component: NoteComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes),],
  exports: [RouterModule]
})
export class AppRoutingModule { }
