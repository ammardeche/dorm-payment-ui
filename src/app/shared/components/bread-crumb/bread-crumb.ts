import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-bread-crumb',
  imports: [RouterLink],
  templateUrl: './bread-crumb.html',
  styleUrl: './bread-crumb.css',
})
export class BreadCrumb {



  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  private readonly navigation = toSignal(
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
    ),
  );

  readonly items = computed<BreadcrumbItem[]>(() => {
    // Rebuild whenever navigation finishes.
    this.navigation();

    const breadcrumbs: BreadcrumbItem[] = [
      { label: 'Management' },
    ];

    let current = this.route.root;
    let url = '';

    while (current.firstChild) {
      current = current.firstChild;

      const segment = current.snapshot.url
        .map((part) => part.path)
        .join('/');

      if (segment) {
        url += `/${segment}`;
      }

      const label = current.snapshot.data['breadcrumb'];

      if (typeof label === 'string' && label) {
        breadcrumbs.push({ label, url });
      }
    }

    return breadcrumbs;
  });

}
