import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CourseService } from './../../services/course.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DialogRef } from '@angular/cdk/dialog';
import { SharedCourseService } from 'src/app/services/shared-course.service';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss'],
})
export class AddCourseComponent implements OnInit {
  courseForm: FormGroup;
  fields: string[] = ['Science', 'Arts', 'History'];

  constructor(
    private _fb: FormBuilder,
    private _courseService: CourseService,
    private _dialogRef: MatDialogRef<AddCourseComponent>,
    private _sharedCourseService: SharedCourseService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.courseForm = this._fb.group({
      name: '',
      field: '',
      credit_hours: '',
      lab: '',
      courses: [],
    });
  }

  ngOnInit(): void {
    this.courseForm.patchValue(this.data);
  }

  onFormSubmit() {
    if (this.courseForm.valid) {
      if (this.data) {
        this._courseService
          .updateCourse(this.data.name, this.courseForm.value)
          .subscribe({
            next: (val: any) => {
              alert('Course Updated!');
              this._dialogRef.close();
              this._sharedCourseService.sendClickEvent();
            },
            error: (err: any) => {
              console.log(err);
            },
          });
      } else {
        console.log('\nHEEEEEEEEEEEEEEERRRRRRRRRRRRRRREEEEEEEEEEEEEE\n');
        this._courseService.addCourse(this.courseForm.value).subscribe({
          next: (val: any) => {
            alert('Course Added Successfully!');
            this._dialogRef.close();
            this._sharedCourseService.sendClickEvent();
          },
          error: (err: any) => {
            console.log(err);
          },
        });
      }
    }
  }

  cancelForm() {
    this._dialogRef.close();
  }
}
