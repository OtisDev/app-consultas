import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appOnlyNumber]',
  standalone: true
})
export class OnlyNumber {

  private readonly digitRegex: RegExp = /\d/;
  private specialKeys: Array<string> = [
    'Backspace', 'Tab', 'End', 'Home', 'ArrowLeft', 'ArrowRight', 'Delete'
  ];

  constructor(private el: ElementRef) {}

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {

    const key = event.key;

    if (this.specialKeys.includes(key)) {
      return;
    }

    if (event.ctrlKey || event.metaKey) {
        return;
    }

    if (!this.digitRegex.test(key)) {
      event.preventDefault(); // Bloquea la entrada
    }

    //Bloquear si la tecla es el espacio
    if (key === ' ') {
        event.preventDefault();
    }
  }

}
