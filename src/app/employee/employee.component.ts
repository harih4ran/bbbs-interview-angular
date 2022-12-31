import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { EmployeeService } from '../_service/employee.service';
import { EmployeeModel } from '../_model/employee';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})

export class EmployeeComponent implements OnInit {
  employees!: EmployeeModel[];
  employee: EmployeeModel = new EmployeeModel();

  isEdit: boolean = false;

  constructor(private http: HttpClient, private employeeService: EmployeeService) { }

  ngOnInit() {
    this.getAll();
  }

  getAll(): void {
    this.employeeService.getAll().subscribe(employees => this.employees = employees);
  }

  edit(data: EmployeeModel): void {
    this.isEdit = true;
    this.employeeService.getById(data.id).subscribe(res => {
      this.employee = res;
      this.getAll();
    })
  }


  delete(data: EmployeeModel) {
    this.employeeService.delete(data.id)
      .subscribe(res => {
        this.getAll();
      });
  }


  onSubmit(form: NgForm) {
    if (this.isEdit) {
      this.employeeService.update(form.value.id,form.value).subscribe(res => {
        form.resetForm();
        this.getAll();
        this.isEdit = true;
      });

    }
    else {
      // Submit the form data to the API
      // const data = { fullname: this.employee.fullname, email: this.employee.email, date_of_birth: this.employee.date_of_birth };
      this.employeeService.create(form.value).subscribe(res => {
        form.resetForm();
        this.getAll();
      });
    }
  }
}
