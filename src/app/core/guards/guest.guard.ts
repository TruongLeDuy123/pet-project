import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";

@Injectable({ providedIn: 'root' })
export class GuestGuard implements CanActivate {
    constructor(readonly auth: AuthService, readonly router: Router) { }

    canActivate(): boolean {
        if (this.auth.isLoggedIn()) {
            this.router.navigate(['/todo']);
            return false;
        }
        return true;
    }
}
