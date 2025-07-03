import { inject } from '@angular/core';
import { Auth, authState } from '@angular/fire/auth';
import { CanActivateFn, Router } from '@angular/router';
import { map, take, tap } from 'rxjs';

export const authGuard: CanActivateFn = () => {
  
  const auth = inject(Auth);
  const router = inject(Router)

  return authState(auth).pipe(
    take(1),
    map(user => !!user),
    tap(isLoggedIn => {
      if(!isLoggedIn) {
        router.navigate(['/login']);
      }
    })
  );
};
