import { Injectable } from '@angular/core';
import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    UrlTree,
    Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './order-list/services/user.service';


@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private userService: UserService,
    ) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ):
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {
        if (localStorage.getItem('jwtToken') || '{}' !== null) {
            const role = route.data['roles'] as Array<string>;
            console.log(role);

            if (role) {
                console.log("inside");
                const match = this.userService.roleMatch(role);

                if (match) {
                    return true;
                } else {
                    this.router.navigate(['Forbidden']);
                    return false;
                }
            }
        }

        this.router.navigate(['login']);
        return false;
    }
}