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
      name: data.name,
      email: data.email,
      cell_number: data.cell_number,
      age: data.age,
      address: data.address,
      courses: data.courses,
    });
  }

  getStudents(): Observable<any> {
    return this._http.get('http://localhost:8080/api/students/');
  }

  deleteStudent(name: String): Observable<any> {
    return this._http.delete(`http://localhost:8080/api/students/${name}`);
  }

  updateStudent(name: String, data: any): Observable<any> {
    return this._http.put(`http://localhost:8080/api/students/${name}`, data);
  }
}
