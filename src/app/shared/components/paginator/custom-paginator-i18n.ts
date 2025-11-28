// custom-paginator-i18n.ts
import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';

@Injectable()

export class CustomPaginatorIntl extends MatPaginatorIntl {
  /** * Sobreescribir la etiqueta "Items per page".
  */
  override itemsPerPageLabel: string = 'Registros por página:';

  // Opcional: También puedes personalizar otras etiquetas si lo necesitas
  // nextPageLabel: string = 'Siguiente';
  // previousPageLabel: string = 'Anterior';
  // firstPageLabel: string = 'Primera página';
  // lastPageLabel: string = 'Última página';

  /** * Sobreescribir el texto que muestra el rango de páginas.
   */
  override getRangeLabel = (page: number, pageSize: number, length: number) => {
    if (length === 0 || pageSize === 0) {
      return `0 de ${length}`;
    }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    // If the start index exceeds the list length, do not try to display the range.
    const endIndex = startIndex < length ?
      Math.min(startIndex + pageSize, length) :
      startIndex + pageSize;

    return `${startIndex + 1} - ${endIndex} de ${length}`;
  };
}
