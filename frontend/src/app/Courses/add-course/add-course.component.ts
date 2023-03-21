import { CourseService } from './../../services/course.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss'],
})
export class AddCourseComponent {
  courseForm: FormGroup;
  fields: string[] = ['Science', 'Arts', 'History'];

  constructor(
    private _fb: FormBuilder,
    private _courseService: CourseService,
    private _dialogRef: DialogRef<AddCourseComponent>
  ) {
    this.courseForm = this._fb.group({
      courseName: '',
      courseField: '',
      creditHours: '',
      lab: '',
    });
  }

  onFormSubmit() {
    if (this.courseForm.valid) {
      console.log(this.courseForm.value);
      this._courseService.addCourse(this.courseForm.value).subscribe({
        next: (val: any) => {
          alert('Course Added Successfully!');
          this._dialogRef.close();
        },
        error: (err: any) => {
          console.log(err);
        },
      });
    }
  }
}
