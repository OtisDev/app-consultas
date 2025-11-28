import { Directive , HostListener, ElementRef} from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appUppercase]'
})
export class Uppercase {

  constructor(
    private el: ElementRef,
    private control: NgControl // Inyecta NgControl para trabajar con formularios
  ) { }

  @HostListener('input', ['$event']) onInput(event: any) {
    const start = this.el.nativeElement.selectionStart;
    const end = this.el.nativeElement.selectionEnd;

    // Obtener el valor actual
    const originalValue = this.el.nativeElement.value;

    // Convertir el valor a mayúsculas
    const uppercaseValue = originalValue.toUpperCase();

    // 2. Si el valor ha cambiado, actualizar el FormControl
    if (originalValue !== uppercaseValue) {
      // Usar setValue para actualizar el FormControl o NgModel
      if (this.control && this.control.control) {
        this.control.control.setValue(uppercaseValue, { emitEvent: false });
      } else {
        // Para formularios basados en plantillas (ngModel) sin ControlValueAccessor
        this.el.nativeElement.value = uppercaseValue;
      }

      // Restaurar la posición del cursor después de la actualización
      this.el.nativeElement.setSelectionRange(start, end);
    }
  }

}
