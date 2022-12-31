import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { EmployeeModel } from '../_model/employee';

const baseUrl = `http://kevinpeter.pythonanywhere.com`;

@Injectable({ providedIn: 'root' })
export class EmployeeService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<EmployeeModel[]>(`${baseUrl}/employees`);
    }

    getById(id: string) {
        console.log(id)
        return this.http.get<EmployeeModel>(`${baseUrl}/employee/${id}`);
    }

    create(params: any) {
        console.log(params)
        return this.http.post(`${baseUrl}/employee`, params);
    }

    update(id: string, params: any) {
        return this.http.put(`${baseUrl}/employee/${id}`, params);
    }

    delete(id: string) {
        return this.http.delete(`${baseUrl}/employee/${id}`);
    }
}