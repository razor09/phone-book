import { ChangeDetectionStrategy, Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { Utils } from '../../libs';
import { Auth } from '../../models';
import { AuthService } from '../../services';
import { Store } from '../../store';

@Component({
  selector: 'login-container',
  templateUrl: 'login-container.component.html',
  styleUrls: ['login-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginContainer {

  @ViewChild('formRef') private formRef: ElementRef<HTMLFormElement>;

  public loginForm = this.$auth.buildForm();

  constructor(
    private router: Router,
    private utils: Utils,
    private $auth: AuthService,
    private store: Store,
  ) {}

  public login(): void {
    if (this.loginForm.invalid) {
      this.store.notify('Empty Fields', 'darkorange');
      this.utils.resetForm(this.formRef.nativeElement);
    } else {
      const auth = this.utils.removeTags<Auth>(this.loginForm.value);
      this.$auth.login(auth).pipe(first()).subscribe((isAuth) => {
        if (isAuth) {
          this.store.notify('Welcome', 'darkgreen');
          this.utils.resetForm(this.formRef.nativeElement);
          this.utils.delay(() => {
            this.router.navigateByUrl('contacts');
          });
        } else {
          this.store.notify('Login Failed', 'darkred');
          this.utils.resetForm(this.formRef.nativeElement);
        }
      });
    }
  }
}
