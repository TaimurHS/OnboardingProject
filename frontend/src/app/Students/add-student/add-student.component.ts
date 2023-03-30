import { Component, Inject, OnInit } from '@angular/core';
import { StudentService } from './../../services/student.service';
import { CourseService } from './../../services/course.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DialogRef } from '@angular/cdk/dialog';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SharedStudentService } from 'src/app/services/shared-student.service';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.scss'],
})
export class AddStudentComponent implements OnInit {
  courses = new FormControl('');
  studentForm: FormGroup;
  courseNames: string[] = [];
  constructor(
    private _fb: FormBuilder,
    private _studentService: StudentService,
    private _courseService: CourseService,
    private _dialogRef: MatDialogRef<AddStudentComponent>,
    private _sharedStudentService: SharedStudentService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.studentForm = this._fb.group({
      name: '',
      email: '',
      cell_number: 0,
      age: 0,
      address: '',
      courses: [],
    });
  }

  ngOnInit(): void {
    this.getCourseOptions();
    this.studentForm.patchValue(this.data);
  }

  getCourseOptions() {
    this._courseService.getCourses().subscribe({
      next: (res) => {
        let courses = res;
        console.log(courses);
        for (let i = 0; i < courses.length; i = i + 1) {
          this.courseNames.push(courses[i].name);
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  onFormSubmit() {
    if (this.studentForm.valid) {
      if (this.data) {
        this._studentService
          .updateStudent(this.data.name, this.studentForm.value)
          .subscribe({
            next: (val: any) => {
              alert('Student Updated!');
              this._dialogRef.close();
              this._sharedStudentService.sendClickEvent();
            },
            error: (err: any) => {
              console.log(err);
            },
          });
      } else {
        this._studentService.addStudent(this.studentForm.value).subscribe({
          next: (val: any) => {
            alert('Student Added Successfully!');
            this._dialogRef.close();
            this._sharedStudentService.sendClickEvent();
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

  // studentAdded() {
  //   this._sharedStudentService.sendClickEvent();
  // }
}
