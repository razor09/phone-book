import * as React from 'react';
import { connect, DispatchProp } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { utils } from '../../libs';
import { Auth } from '../../models';
import { $auth, $notifications } from '../../services';
import { SetAuthStatusAction } from '../../store/auth/actions/set-auth-status.action';
import './login-form.style';

type State = Auth;

type Props = RouteComponentProps & DispatchProp;

class InferableComponent extends React.Component<Props, State> {

  private formRef = React.createRef<HTMLFormElement>();

  public state: State = {
    user: null,
    password: null,
  };

  private get isEmpty(): boolean {
    return !this.state.user || !this.state.password;
  }

  public render(): JSX.Element {
    return (
      <section id="login-form">
        <form
          ref={this.formRef}
          onSubmit={this.login.bind(this)}
        >
          <div className="form-row">
            <input
              type="text"
              placeholder="User"
              onInput={this.handleInputChange.bind(this, 'user')}
            ></input>
            <i className="fa fa-user-secret fa-2x"></i>
            <label className="placeholder">User</label>
          </div>
          <div className="form-row">
            <input
              type="password"
              placeholder="Password"
              onInput={this.handleInputChange.bind(this, 'password')}
            ></input>
            <i className="fa fa-key fa-2x"></i>
            <label className="placeholder">Password</label>
          </div>
          <div className="form-row">
            <button type="submit">
              <i className="fa fa-lock"></i>
              <span>Login</span>
            </button>
          </div>
        </form>
      </section>
    );
  }

  private handleInputChange(key: keyof Auth, $event: React.ChangeEvent<HTMLInputElement>): void {
    const { value } = $event.target;
    this.setState({ [key]: value } as object);
  }

  private clearSchema(): void {
    utils.resetForm(this.formRef.current);
    this.setState({
      user: null,
      password: null,
    });
  }

  private login($event: React.FormEvent<HTMLFormElement>): void {
    $event.preventDefault();
    if (this.isEmpty) {
      this.clearSchema();
      $notifications.push('Empty Fields', 'peru');
    } else {
      const auth = utils.removeTags(this.state);
      $auth.login(auth).then((isAuth) => {
        if (isAuth) {
          this.clearSchema();
          $notifications.push('Welcome', 'darkslategray');
          utils.delay(() => {
            const action = new SetAuthStatusAction('authorized');
            this.props.dispatch(action);
            this.props.history.replace('/contacts');
          });
        } else {
          this.clearSchema();
          $notifications.push('Login Failed', 'firebrick');
        }
      });
    }
  }
}

export const LoginForm = utils.compose(InferableComponent)
  .pipe(withRouter)
  .pipe(connect())
  .result();
