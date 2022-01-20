import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router } from "@angular/router";
import { Observable } from "rxjs";
import { TokenStorageService } from "../core/services/Requests/token.service";

@Injectable()
export class LoginAccessGuard implements CanActivate {

    constructor(private tokenService: TokenStorageService, private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        const requiresLogin = route.data.requiresLogin || false;
        if (requiresLogin) {
            if (!this.tokenService.getToken()) {
                this.router.navigate(['login']);
                return false;
            }
        }
        return true;
    }
}