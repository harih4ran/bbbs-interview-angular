import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { TeamService } from '../_service/team.service';
import { TeamModel } from '../_model/team.model';
import { EmployeeModel } from '../_model/employee';
import { EmployeeService } from '../_service/employee.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {
  teams!: TeamModel[];
  team: TeamModel = new TeamModel();


  employees!: EmployeeModel[];
  employee: EmployeeModel = new EmployeeModel();



  getEmpAll(): void {
    this.employeeService.getAll().subscribe(employees => this.employees = employees);
  }


  isEdit: boolean = false;

  constructor(private http: HttpClient, private teamService: TeamService, private employeeService: EmployeeService) { }

  ngOnInit() {
    this.getAll();
    this.getEmpAll();
  }

  getAll(): void {
    this.teamService.getAll().subscribe(teams => {
      this.teams = teams
      console.log(this.teams)
    });
  }

  edit(data: TeamModel): void {
    this.isEdit = true;
    this.teamService.getById(data.id).subscribe(res => {
      this.team = res;
      this.getAll();
    })
  }


  delete(data: TeamModel) {
    this.teamService.delete(data.id)
      .subscribe(res => {
        this.getAll();
      });
  }


  onSubmit(form: NgForm) {
    console.log(form.value)
    if (this.isEdit) {
      this.teamService.update(form.value.id, form.value).subscribe(res => {
        form.resetForm();
        this.getAll();
        this.isEdit = true;
      });

    }
    else {
      // Submit the form data to the API
      // const data = { fullname: this.team.fullname, email: this.team.email, date_of_birth: this.team.date_of_birth };
      this.teamService.create(form.value).subscribe(res => {
        console.log(res);
        form.resetForm();
        this.getAll();
      });
    }
  }
}
