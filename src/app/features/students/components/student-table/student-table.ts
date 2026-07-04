import { Component, input, output } from '@angular/core';
import { StudentResponseModel } from '../../models/student-response.model';
import { PaginationModel } from '../../../../shared/models/pagination.model';

@Component({
  selector: 'app-student-table',
  imports: [],
  templateUrl: './student-table.html',
  styleUrl: './student-table.css',
})
export class StudentTable {
  students = input.required<StudentResponseModel[]>();
  pagination = input.required<PaginationModel>();

  view = output<number>();
  edit = output<number>();
  delete = output<number>();
  pageChanged = output<number>();

  getInitials(firstName: string, lastName: string): string {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  }
}
