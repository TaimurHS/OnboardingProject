import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  constructor(private _http: HttpClient) {}

  addCourse(data: any): Observable<any> {
    console.log('*****DATA*****');
    console.log(data);
    return this._http.post('http://localhost:8080/api/courses/', {
      name: data.courseName,
      field: data.courseField,
      lab: data.lab,
      credit_hours: data.creditHours,
    });
  }
}
