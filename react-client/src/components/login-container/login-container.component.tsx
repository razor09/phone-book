import * as React from 'react';
import { DispatchProp } from 'react-redux';
import { Redirect, RouteComponentProps } from 'react-router-dom';
import { utils } from '../../libs';
import { AuthStatus } from '../../store/auth/auth.state';
import { adapter } from '../../store/global.reducer';
import { LoginForm } from '../login-form/login-form.component';

interface StateProps {
  status: AuthStatus;
}

type Props = StateProps & DispatchProp & RouteComponentProps;

class InferableComponent extends React.Component<Props> {

  private get path(): string {
    return this.props.match.path;
  }

  public render(): JSX.Element {
    const { status } = this.props;
    switch (status) {
      case 'authorized': return this.redirect();
      case 'unauthorized': return this.display();
      default: return null;
    }
  }

  private display(): JSX.Element {
    return (
      <LoginForm></LoginForm>
    );
  }

  private redirect(): JSX.Element {
    return (
      <Redirect to={`${this.path}contacts`}></Redirect>
    );
  }
}

export const LoginContainer = utils.compose(InferableComponent)
  .pipe(adapter<StateProps>((state) => {
    return {
      status: state.authReducer.status,
    };
  }))
  .result();
