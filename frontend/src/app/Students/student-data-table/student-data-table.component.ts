import { StudentService } from './../../services/student.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SharedStudentService } from 'src/app/services/shared-student.service';
import { Subscription } from 'rxjs';
import { AddStudentComponent } from '../add-student/add-student.component';

@Component({
  selector: 'app-student-data-table',
  templateUrl: './student-data-table.component.html',
  styleUrls: ['./student-data-table.component.scss'],
})
export class StudentDataTableComponent implements OnInit {
  clickEventsubscription: Subscription;
  displayedColumns: string[] = [
    'name',
    'email',
    'address',
    'age',
    'cell_number',
    'courses',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _studentService: StudentService,
    private _sharedStudentService: SharedStudentService,
    private _dialog: MatDialog
  ) {
    this.clickEventsubscription = this._sharedStudentService
      .getClickEvent()
      .subscribe((res) => {
        this.getStudentsList();
      });
  }
  ngOnInit(): void {
    this.getStudentsList();
  }

  getStudentsList() {
    this._studentService.getStudents().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteStudent(name: String) {
    this._studentService.deleteStudent(name).subscribe({
      next: (res) => {
        alert('Student Deleted!');
        this.getStudentsList();
      },
      error: (err) => {},
    });
  }

  openEditForm(data: any) {
    console.log('\ndata: ', data);
    this._dialog.open(AddStudentComponent, {
      data: data,
    });
  }
}
