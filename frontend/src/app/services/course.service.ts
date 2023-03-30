import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  constructor(private _http: HttpClient) {}

  getCourses(): Observable<any> {
    console.log('\nGetting courses\n');
    return this._http.get('http://localhost:8080/api/courses');
  }

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

  deleteCourse(name: String): Observable<any> {
    return this._http.delete(`http://localhost:8080/api/courses/${name}`);
  }

  updateCourse(name: String, data: any): Observable<any> {
    return this._http.put(`http://localhost:8080/api/courses/${name}`, data);
  }
}
