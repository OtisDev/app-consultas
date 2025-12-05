import { HttpContextToken } from '@angular/common/http';

export const SKIP_AUTH_HEADER = new HttpContextToken<boolean>(() => false);
