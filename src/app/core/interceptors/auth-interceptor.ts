import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth/auth-service';
import { catchError, switchMap, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { SKIP_AUTH_HEADER } from '../../config/http-context-keys';

function addHeaderAuthorization(token: string | null) {
  const headersConfig: { [key: string]: string } = {
    Authorization: token ? `Bearer ${token}` : ''
  };
  return headersConfig;
}

type config = { [key: string]: string };

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const authService = inject(AuthService);
  const token = authService.getToken();
  const skipAuth = req.context.get(SKIP_AUTH_HEADER);

  if (skipAuth) {
    return next(req);
  }

  let headersConfig: config = addHeaderAuthorization(token);

  const clonedReq = req.clone({ setHeaders: headersConfig });

  return next(clonedReq).pipe(
    //Token has expired
    catchError(error => {
      //console.log('Error en el interceptor:', error);
      if (error instanceof HttpErrorResponse && error.status === 401) {
        return authService.refreshToken().pipe(
          switchMap(() => {
            // Si el token se refrescó con éxito, reenvía la petición original
            const newAccessToken = authService.getToken();
            headersConfig = addHeaderAuthorization(newAccessToken);
            if (newAccessToken) {
              const newReq = req.clone({
                setHeaders: headersConfig
              });
              return next(newReq);
            }
            return throwError(() => new Error('Nuevo token no disponible'));
          }),
          catchError((refreshError) => {
            authService.logout();
            return throwError(() => refreshError);
          })
        );
      }

      if(error instanceof HttpErrorResponse && error.status === 500){
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ocurrió un error en el servidor. Por favor, inténtelo de nuevo más tarde.'
        });
      }

      return throwError(() => error);
    })
  );
};
