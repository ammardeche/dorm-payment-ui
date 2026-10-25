import { Component, computed, input } from '@angular/core';
import { StudentStatsModel } from '../../../models/student-stats.model';

@Component({
  selector: 'app-metric-student-card',
  imports: [],
  templateUrl: './metric-student-card.html',
  styleUrl: './metric-student-card.css',
})
export class MetricStudentCard {

  stats = input<StudentStatsModel | null>(null);


    cards = computed(() => {
    const stats = this.stats();

    return [
      {
        id: 'total',
        label: 'Total students',
        value: stats?.total,
        description: 'All registered students',
        color: 'bg-blue-500',
      },
      {
        id: 'active',
        label: 'Active students',
        value: stats?.active,
        description: 'Currently active',
        color: 'bg-emerald-500',
      },
      {
        id: 'inactive',
        label: 'Inactive students',
        value: stats?.inactive,
        description: 'Currently inactive',
        color: 'bg-slate-400',
      },
      {
        id: 'new',
        label: 'New this month',
        value: stats?.newThisMonth,
        description: 'Registered this month',
        color: 'bg-violet-500',
      },
    ];
  });

}
