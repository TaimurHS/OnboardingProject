import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  constructor(private _http: HttpClient) {}

  addStudent(data: any): Observable<any> {
    return this._http.post('http://localhost:8080/api/students/', {
      name: data.studentName,
      email: data.email,
      cell_number: data.cell_number,
      age: data.age,
      address: data.address,
      courses: data.courses,
    });
  }
}
