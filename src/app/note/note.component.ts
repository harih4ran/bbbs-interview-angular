import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { NoteService } from '../_service/note.service';
import { NoteModel } from '../_model/note.model';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {
  notes!: NoteModel[];
  note: NoteModel = new NoteModel();

  isEdit: boolean = false;

  constructor(private http: HttpClient, private noteService: NoteService) { }

  ngOnInit() {
    this.getAll();
  }

  getAll(): void {
    this.noteService.getAll().subscribe(notes => this.notes = notes);
  }

  edit(data: NoteModel): void {
    this.isEdit = true;
    this.noteService.getById(data.id).subscribe(res => {
      this.note = res;
      this.getAll();
    })
  }


  delete(data: NoteModel) {
    this.noteService.delete(data.id)
      .subscribe(res => {
        this.getAll();
      });
  }


  onSubmit(form: NgForm) {
    
    if (this.isEdit) {
      this.noteService.update(form.value.id,form.value).subscribe(res => {
        form.resetForm();
        this.getAll();
        this.isEdit = true;
      });

    }
    else {
      // Submit the form data to the API
      this.noteService.create(form.value).subscribe(res => {
        form.resetForm();
        this.getAll();
      });
    }
  }
}
