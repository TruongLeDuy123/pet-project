import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
	selector: 'app-login',
	imports: [ReactiveFormsModule, CommonModule, RouterLink, NzButtonModule],
	templateUrl: './login.html',
	styleUrl: './login.less'
})
export class Login {
	loginForm: FormGroup
	errorMessage = ''
	constructor(
		readonly fb: FormBuilder,
		readonly auth: AuthService,
		readonly router: Router
	) {
		this.loginForm = this.fb.group({
			email: ['', [Validators.required, Validators.email]],
			password: ['', [Validators.required, Validators.minLength(6)]]
		})
	}

	login() {
		if (this.loginForm.valid) {
			const { email, password } = this.loginForm.value
			if (this.auth.login(email, password)) {
				this.router.navigate(['/todo'])
			}
			else {
				this.errorMessage = 'login failed'
			}
		}
		else return
	}

}
