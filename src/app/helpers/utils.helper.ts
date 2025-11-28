import { HttpParams } from '@angular/common/http';
import { AbstractControl, FormGroup } from '@angular/forms';

export function toHttpParams<T extends object>(request: T): HttpParams {
  let params = new HttpParams();

  Object.keys(request).forEach((key) => {
    const typedKey = key as keyof T;
    const value = request[typedKey];
    if (value !== null && value !== undefined && value !== '') {
      params = params.set(key, value as any);
    }
  });

  return params;
}

export async function getBase64From(path: string): Promise<string> {
  const response = await fetch(path);
  const blob = await response.blob();

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

export function formatDate(fechaStr: string): string {

  if(fechaStr == null || fechaStr.trim() === '') return '';

  const fecha = new Date(fechaStr);

  const pad = (n: number) => n.toString().padStart(2, '0');

  const dia = pad(fecha.getDate());
  const mes = pad(fecha.getMonth() + 1); // meses van de 0 a 11
  const anio = fecha.getFullYear();

  const horas = pad(fecha.getHours());
  const minutos = pad(fecha.getMinutes());
  const segundos = pad(fecha.getSeconds());

  return `${dia}/${mes}/${anio} ${horas}:${minutos}:${segundos}`;
}

export function markAllControlsAsTouched(formGroup: FormGroup | AbstractControl): void {
    if (formGroup instanceof FormGroup) {
        Object.keys(formGroup.controls).forEach(field => {
            const control = formGroup.get(field);
            if (control instanceof FormGroup) {
                // Llama a sí misma para manejar FormGroups anidados
                markAllControlsAsTouched(control);
            } else {
                // Marcar el control como tocado
                control?.markAsTouched({ onlySelf: true });
            }
        });
    }
}
