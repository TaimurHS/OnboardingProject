import { AddCourseComponent } from './../add-course/add-course.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CourseService } from './../../services/course.service';
import { Subscription } from 'rxjs';
import { SharedCourseService } from 'src/app/services/shared-course.service';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
})
export class DataTableComponent implements OnInit {
  clickEventsubscription: Subscription;
  displayedColumns: string[] = [
    'name',
    'field',
    'credit_hours',
    'lab',
    'students',
    'action',
  ];

  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _courseService: CourseService,
    private _dialog: MatDialog,
    private _sharedCourseService: SharedCourseService
  ) {
    this.clickEventsubscription = this._sharedCourseService
      .getClickEvent()
      .subscribe((res) => {
        this.getCoursesList();
      });
  }

  ngOnInit(): void {
    this.getCoursesList();
  }

  getCoursesList() {
    this._courseService.getCourses().subscribe({
      next: (res) => {
        console.log(res);
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

  deleteCourse(name: String) {
    this._courseService.deleteCourse(name).subscribe({
      next: (res) => {
        alert('Course Deleted!');
        this.getCoursesList();
      },
      error: (err) => {},
    });
  }

  openEditForm(data: any) {
    console.log('\ndata: ', data);
    this._dialog.open(AddCourseComponent, {
      data: data,
    });
  }
}
