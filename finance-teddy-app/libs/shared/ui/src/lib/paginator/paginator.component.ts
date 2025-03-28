import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-paginator',
  imports: [CommonModule],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.scss',
})
export class PaginatorComponent {
  @Input() currentPage = 1;
  @Input() totalPages = 1;
  @Output() pageChange = new EventEmitter<number>();

  get pageNumbers(): number[] {
    const range = 5; // Number of page buttons to show
    const start = Math.max(1, this.currentPage - Math.floor(range / 2));
    const end = Math.min(this.totalPages, start + range - 1);

    return Array.from(
      { length: end - start + 1 }, 
      (_, i) => start + i
    );
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.pageChange.emit(page);
    }
  }
}
