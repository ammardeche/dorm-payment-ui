import { Component, computed, input } from '@angular/core';

type MetricCardColor = 'blue' | 'green' | 'amber' | 'purple';

const ICON_COLORS: Record<MetricCardColor, string> = {
  blue: 'bg-blue-50 text-blue-600',
  green: 'bg-emerald-50 text-emerald-600',
  amber: 'bg-amber-50 text-amber-600',
  purple: 'bg-violet-50 text-violet-600',
};

@Component({
  selector: 'app-metric-card',
  imports: [],
  templateUrl: './metric-card.html',
  styleUrl: './metric-card.css',
})


export class MetricCard {

   readonly label = input.required<string>();
  readonly value = input.required<number | string>();
  readonly description = input('');
  readonly color = input<MetricCardColor>('blue');

  readonly iconClasses = computed(
    () => ICON_COLORS[this.color()],
  );

}
