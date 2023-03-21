import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddCourseComponent } from '../add-course/add-course.component';

@Component({
  selector: 'app-course-page',
  templateUrl: './course-page.component.html',
  styleUrls: ['./course-page.component.css'],
})
export class CoursePageComponent {
  constructor(private _dialog: MatDialog) {}
  openAddEditCourseForm() {
    this._dialog.open(AddCourseComponent);
  }
}
