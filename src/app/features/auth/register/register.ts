import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'app-register',
	standalone: true,
	imports: [ReactiveFormsModule, CommonModule, RouterLink],
	templateUrl: './register.html',
	styleUrl: './register.less'
})
export class Register {
	registerForm: FormGroup
	constructor(readonly fb: FormBuilder, readonly auth: AuthService, readonly router: Router) {
		this.registerForm = this.fb.group({
			email: ['', [Validators.required, Validators.email]],
			password: ['', [Validators.required, Validators.minLength(6)]]
		})
	}

	register() {
		if (this.registerForm.invalid) return;
		const { email, password } = this.registerForm.value;
		if (this.auth.register(email, password)) {
			alert('Đăng ký thành công! Mời bạn đăng nhập.');
			this.router.navigate(['/login']);
		}
	}
}
