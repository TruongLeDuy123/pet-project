import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { AuthService } from './core/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, NzLayoutModule, NzMenuModule, CommonModule],
    templateUrl: './app.html',
    styleUrl: './app.less'
})
export class App {
    email: string | null = null
    constructor(readonly auth: AuthService) { }

    ngOnInit(): void {
        if (this.auth.isLoggedIn())
        {
            this.email = this.auth.getEmail()
        }
    }

    logout() {
        this.auth.logout()
    }
}
