import { CoursePageComponent } from './Courses/course-page/course-page.component';
import { StudentPageComponent } from './Students/student-page/student-page.component';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'home', component: AppComponent },
  { path: 'students', component: StudentPageComponent },
  { path: 'courses', component: CoursePageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
