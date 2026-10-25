import { Component, effect, inject, signal } from '@angular/core';
import { form } from '@angular/forms/signals';
import { Router } from '@angular/router';
import { StudentService } from '../../service/student.service';
import { StudentFilterModel } from '../../models/student-filter.model';
import { StudentResponseModel } from '../../models/student-response.model';
import { StudentTable } from '../../components/student-table/student-table';
import { PaginationModel } from '../../../../shared/models/pagination.model';
import { FilterComponent } from '../../components/filter-component/filter-component';
import { RoomResponseModel } from '../../../rooms/models/room-response.model';
import { RoomService } from '../../../rooms/service/room.service';
import { map } from 'rxjs';
import { RoomOption } from '../../../rooms/models/room-option-model';
import { StudentStatsModel } from '../../models/student-stats.model';
import { MetricStudentCard } from '../../components/student-statistics/metric-student-card/metric-student-card';
const DEFAULT_PAGINATION: PaginationModel = {
  pageIndex: 1,
  pageSize: 10,
  totalCount: 0,
};

const DEFAULT_FILTER: StudentFilterModel = {
  studentNumber: '',
  roomId: undefined,
  isActive: undefined,
  pageIndex: 1,
  pageSize: 10,
};
@Component({
  selector: 'app-student-component',
  imports: [StudentTable, FilterComponent , MetricStudentCard],
  templateUrl: './student-component.html',
  styleUrl: './student-component.css',
})
export class StudentComponent {
  private readonly studentService = inject(StudentService);
  private readonly roomService = inject(RoomService);
  private readonly router = inject(Router);
  // private readonly roomService = inject(RoomService); // TODO

  students = signal<StudentResponseModel[]>([]);
  pagination = signal<PaginationModel>({ ...DEFAULT_PAGINATION });
rooms = signal<RoomOption[]>([]);
studentStats = signal<StudentStatsModel | null>(null);

  // Remembers the last applied filters so pagination can reuse them
  // without the filter bar needing to know about paging.
  private currentFilters: StudentFilterModel = { ...DEFAULT_FILTER };

  ngOnInit(): void {
    this.loadRooms();

    this.getStudentStats();
    this.fetchStudents();
  }

 
  onFilterChanged(filters: StudentFilterModel): void {
    // A new filter submission always resets back to page 1.
    this.currentFilters = { ...filters, pageIndex: 1 };
    this.fetchStudents();
  }

  onPageChanged(pageIndex: number): void {
    this.currentFilters = { ...this.currentFilters, pageIndex };
    this.fetchStudents();
  }

  onView(studentId: number): void {
    this.router.navigate(['/students', studentId]);
  }

  onEdit(studentId: number): void {
    this.router.navigate(['/students', studentId, 'edit']);
  }

  onDelete(studentId: number): void {
    // TODO: open a confirm dialog and call studentService.deactivateStudent(...)
    console.log('delete requested for', studentId);
  }

  private fetchStudents(): void {
    this.studentService.getStudents(this.currentFilters).subscribe((response) => {
      this.students.set(response.payload);

      // ASSUMPTION: ApiResponse<T> also carries pagination info alongside `payload`.
      // If your ApiResponse shape is different, adjust this block accordingly.
      const responsePagination = (response as any).pagination as PaginationModel | undefined;
      if (responsePagination) {
        this.pagination.set(responsePagination);
      } else {
        this.pagination.update((p) => ({ ...p, pageIndex: this.currentFilters.pageIndex }));
      }
    });
  }

  getStudentStats() {
    this.studentService.getStudentStats().subscribe((response) => {
      console.log('Student Stats:', response.payload);
      this.studentStats.set(response.payload);
    });
  }

  private loadRooms(): void {
   this.roomService.getAllRooms({pageSize: 100}).pipe(map((response) =>response.payload.map((r)=> ({id : r.id , roomNumber : r.roomNumber})))).subscribe((rooms) => {
      this.rooms.set(rooms);
    });
  }
}
