import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddStudentComponent } from '../add-student/add-student.component';

@Component({
  selector: 'app-student-page',
  templateUrl: './student-page.component.html',
  styleUrls: ['./student-page.component.css'],
})
export class StudentPageComponent {
  constructor(private _dialog: MatDialog) {}
  openAddEditStudentForm() {
    this._dialog.open(AddStudentComponent);
  }
}
