import { Injectable, Inject, PLATFORM_ID } from "@angular/core";
import { Router } from "@angular/router";
import { isPlatformBrowser } from "@angular/common";

@Injectable({ providedIn: 'root' })
export class AuthService {
    private readonly TOKEN_KEY = 'auth_token';
    private readonly USERS_KEY = 'users';

    constructor(
        readonly router: Router,
        @Inject(PLATFORM_ID) readonly platformId: Object
    ) { }

    private isBrowser(): boolean {
        return isPlatformBrowser(this.platformId);
    }

    login(email: string, password: string): boolean {
        if (this.isBrowser()) {
            const users = JSON.parse(localStorage.getItem(this.USERS_KEY) || '[]');

            const foundUser = users.find(
                (u: any) => u.email === email && u.password === password
            );

            if (foundUser) {
                localStorage.setItem(this.TOKEN_KEY, 'true');
                return true;
            }
        }
        return false;
    }

    register(email: string, password: string): boolean {
        if (this.isBrowser()) {
            const users = JSON.parse(localStorage.getItem(this.USERS_KEY) || '[]');

            const exists = users.some((u: any) => u.email === email);
            if (exists) {
                return false;
            }

            users.push({ email, password });
            localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
            return true;
        }
        return false;
    }

    logout() {
        if (this.isBrowser()) {
            localStorage.removeItem(this.TOKEN_KEY);
        }
        this.router.navigate(['/login']);
    }

    isLoggedIn(): boolean {
        if (this.isBrowser()) {
            return !!localStorage.getItem(this.TOKEN_KEY);
        }
        return false;
    }
}
