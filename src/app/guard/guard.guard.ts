import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { LoginService } from '../services/login.service';
import { inject } from '@angular/core';


/*export const guardGuard: CanActivateFn = (route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const lService = inject(LoginService);
  const router = inject(Router);
  const rolUSer = lService.showRole();
  // Verifica si el usuario está autenticado
  const autenticado = lService.verificar();

  if (!autenticado) {
    router.navigate(['/login']);
    return false;
  }

  // Verifica roles si se definen en data
  const rolesPermitidos:string[] = route.data['rol'] /*as string[]*/ /*|| [];*//*undefined;---------
  if (rolesPermitidos.length > 0 && !rolesPermitidos.includes(rolUSer)) {
      router.navigate(['/inicio']); // o una página que tú definas
      return false;
  }
  return true;
};*/
export const guardGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const lService = inject(LoginService);
  const router = inject(Router);

  const autenticado = lService.verificar();
  const rolUser = lService.showRole();
  const rolesPermitidos: string[] = route.data['rol'] || [];

  if (!autenticado) {
    router.navigate(['/login']);
    return false;
  }

  if (rolesPermitidos.length > 0 && !rolesPermitidos.includes(rolUser)) {
    router.navigate(['/unauthorized']); // evita redirigir a inicio, para no renderizarlo a la fuerza
    return false;
  }

  return true;
};
