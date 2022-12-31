import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { NoteModel } from '../_model/note.model';

const baseUrl = `http://kevinpeter.pythonanywhere.com`;

@Injectable({ providedIn: 'root' })
export class NoteService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<NoteModel[]>(`${baseUrl}/notes`);
    }

    getById(id: string) {
        return this.http.get<NoteModel>(`${baseUrl}/note/${id}`);
    }

    create(params: any) {
        return this.http.post(`${baseUrl}/note`, params);
    }

    update(id: string, params: any) {
        return this.http.put(`${baseUrl}/note/${id}`, params);
    }

    delete(id: string) {
        return this.http.delete(`${baseUrl}/note/${id}`);
    }
}