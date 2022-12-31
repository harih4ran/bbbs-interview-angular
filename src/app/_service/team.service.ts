import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { TeamModel } from '../_model/team.model';

const baseUrl = `http://kevinpeter.pythonanywhere.com`;

@Injectable({ providedIn: 'root' })
export class TeamService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<TeamModel[]>(`${baseUrl}/teams`);
    }

    getById(id: string) {
        console.log(id)
        return this.http.get<TeamModel>(`${baseUrl}/team/${id}`);
    }

    create(params: any) {
        return this.http.post(`${baseUrl}/team`, params);
    }

    update(id: string, params: any) {
        return this.http.put(`${baseUrl}/team/${id}`, params);
    }

    delete(id: string) {
        return this.http.delete(`${baseUrl}/team/${id}`);
    }
}