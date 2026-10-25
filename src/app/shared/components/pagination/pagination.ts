import { Component, computed, input, output } from '@angular/core';
import { PaginationModel } from '../../models/pagination.model';

@Component({
  selector: 'app-pagination',
  imports: [],
  templateUrl: './pagination.html',
  styleUrl: './pagination.css',
})
export class Pagination {


   pagination = input.required<PaginationModel>();
  pageChanged = output<number>();

  totalPages = computed(() => {
    const { totalCount, pageSize } = this.pagination();
    return Math.max(1, Math.ceil(totalCount / pageSize));
  });

  from = computed(() => {
    const { totalCount, pageIndex, pageSize } = this.pagination();
    return totalCount === 0 ? 0 : (pageIndex - 1) * pageSize + 1;
  });

  to = computed(() => {
    const { totalCount, pageIndex, pageSize } = this.pagination();
    return Math.min(pageIndex * pageSize, totalCount);
  });

  // [1, '…', 4, 5, 6, '…', 20]
  pages = computed<(number | '…')[]>(() => {
    const total = this.totalPages();
    const current = this.pagination().pageIndex;

    if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

    const result: (number | '…')[] = [1];
    const start = Math.max(2, current - 1);
    const end = Math.min(total - 1, current + 1);

    if (start > 2) result.push('…');
    for (let i = start; i <= end; i++) result.push(i);
    if (end < total - 1) result.push('…');
    result.push(total);
    return result;
  });

  goTo(page: number): void {
    if (page < 1 || page > this.totalPages() || page === this.pagination().pageIndex) return;
    this.pageChanged.emit(page);
  }

}
