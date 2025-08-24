import { Routes } from '@angular/router';
import { Login } from './features/auth/login/login';
import { Register } from './features/auth/register/register';
import { Todo } from './todo/todo';
import { GuestGuard } from './core/guards/guest.guard';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: '/welcome' },
    { path: 'welcome', loadChildren: () => import('./pages/welcome/welcome.routes').then(m => m.WELCOME_ROUTES) },
    { path: 'login', component: Login, canActivate: [GuestGuard] },
    { path: 'register', component: Register, canActivate: [GuestGuard] },
    { path: 'todo', component: Todo, canActivate: [AuthGuard] }
];
