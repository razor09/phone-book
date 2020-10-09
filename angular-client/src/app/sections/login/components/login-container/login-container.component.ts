import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { Utils } from '../../../../libs';
import { Auth } from '../../../../models';
import { AuthService } from '../../../../services';
import { Store } from '../../../../store';

@Component({
	selector: 'login-container',
	templateUrl: 'login-container.component.html',
	styleUrls: ['login-container.component.scss'],
})
export class LoginContainer implements OnInit {

	@ViewChild('formRef') private formRef: ElementRef<HTMLFormElement>;

	public loginForm = this.authService.buildForm();

	constructor(
		private router: Router,
		private utils: Utils,
		private authService: AuthService,
		private store: Store,
	) {}

	public ngOnInit(): void {
		this.store.setTitle('Login');
	}

	public login(): void {
		if (this.loginForm.invalid) {
			this.store.notify('Empty Fields', 'darkorange');
			this.utils.resetForm(this.formRef.nativeElement);
		} else {
			const auth = this.utils.removeTags<Auth>(this.loginForm.value);
			this.authService.login(auth).pipe(first()).subscribe((isAuth) => {
				if (!isAuth) {
					this.store.notify('Login Failed', 'darkred');
					this.utils.resetForm(this.formRef.nativeElement);
				} else {
					this.store.notify('Welcome', 'darkgreen');
					this.utils.resetForm(this.formRef.nativeElement);
					this.utils.delay(() => {
						this.router.navigateByUrl('contacts');
					});
				}
			});
		}
	}
}