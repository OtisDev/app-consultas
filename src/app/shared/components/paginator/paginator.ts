import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { MatPaginatorIntl, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { Paginate } from '../../../models/response.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomPaginatorIntl } from './custom-paginator-i18n';

@Component({
  selector: 'app-paginator',
  imports: [MatPaginatorModule, CommonModule, FormsModule],
  templateUrl: './paginator.html',
  styleUrl: './paginator.css',
  providers: [
    {
      // Provee tu clase customizada
      provide: MatPaginatorIntl,
      useClass: CustomPaginatorIntl
    }
  ]
})
export class Paginator {

  @Input() paginate !: Paginate;
  @Output() pageChange = new EventEmitter<Paginate>();

  length = 0;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [10, 25, 50, 100];
  last_page = 0;

  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;
  customPage: number = 1;

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['paginate'] && changes['paginate'].currentValue) {
      this.paginate = changes['paginate'].currentValue as Paginate;
      this.pageSize = this.paginate.per_page;
      this.length = this.paginate.total;
      this.pageIndex = this.paginate.current_page - 1;
      this.last_page = this.paginate.last_page;
      this.customPage = this.paginate.current_page;
      //
      //console.log('paginator onChanges', this.paginate);
    }
  }

  handlePageEvent(e: PageEvent) {

    const paginator: Paginate = {
      total: e.length,
      per_page: e.pageSize,
      current_page: e.pageIndex + 1,
      last_page: this.last_page
    }

    this.customPage = paginator.current_page;
    this.paginate = paginator;

    this.pageChange.emit(paginator);

  }

  goToCustomPage() {
    //console.log("last_page", this.last_page);
    if (this.customPage >= 1 && this.customPage <= this.last_page) {
      this.pageIndex = this.customPage - 1;
      // Forzar emisión manual del evento
      this.pageChange.emit({
        total: this.paginate.total,
        per_page: this.paginate.per_page,
        current_page: this.customPage,
        last_page: this.last_page
      });
    }
  }

}
