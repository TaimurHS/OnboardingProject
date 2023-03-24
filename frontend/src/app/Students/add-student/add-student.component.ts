import { Component, OnInit } from '@angular/core';
import { StudentService } from './../../services/student.service';
import { CourseService } from './../../services/course.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DialogRef } from '@angular/cdk/dialog';
import { FormControl } from '@angular/forms';

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
    private _dialogRef: DialogRef<AddStudentComponent>
  ) {
    this.studentForm = this._fb.group({
      studentName: '',
      email: '',
      cell_number: 0,
      age: 0,
      address: '',
      courses: [],
    });
  }

  ngOnInit(): void {
    this.getCourseOptions();
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
      this._studentService.addStudent(this.studentForm.value).subscribe({
        next: (val: any) => {
          alert('Student Added Successfully!');
          this._dialogRef.close();
        },
        error: (err: any) => {
          console.log(err);
        },
      });
    }
  }
}
