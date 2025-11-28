import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ComunicationService {

  trigger = signal(0);

  notificarClick() {
    this.trigger.update(v => v + 1); // incrementar el contador fuerza cambio
  }

}
