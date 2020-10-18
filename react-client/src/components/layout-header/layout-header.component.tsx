import * as React from 'react';
import { connect, DispatchProp } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { utils } from '../../libs';
import { $auth, $notifications } from '../../services';
import { SetAuthStatusAction } from '../../store/auth/actions/set-auth-status.action';
import { AuthStatus, AuthTitle } from '../../store/auth/auth.state';
import { GlobalState } from '../../store/global.state';
import './layout-header.style';

interface StateProps {
  status: AuthStatus;
  title: AuthTitle;
}

type Props = StateProps & DispatchProp & RouteComponentProps;

class InferableComponent extends React.Component<Props> {

  public render(): JSX.Element {
    const { title } = this.props;
    return (
      <header id="layout-header">
        <div className="title">
          <i className="fa fa-code"></i>
          <span>{title}</span>
        </div>
        {this.renderElement()}
      </header>
    );
  }

  private renderElement(): JSX.Element {
    const { status } = this.props;
    const isAuth = status === 'authorized';
    return isAuth && (
      <button onClick={this.logout.bind(this)}>
        <i className="fa fa-sign-out"></i>
        <span>Logout</span>
      </button>
    );
  }

  private logout(): void {
    $auth.logout().then(() => {
      $notifications.push('Bye', 'darkslategray');
      utils.delay(() => {
        const action = new SetAuthStatusAction('unauthorized');
        this.props.dispatch(action);
        this.props.history.replace('/');
      });
    });
  }
}

export const LayoutHeader = utils.compose(InferableComponent)
  .pipe(withRouter)
  .pipe(connect<StateProps, object, object, GlobalState>((state) => {
    return {
      status: state.authReducer.status,
      title: state.authReducer.title,
    };
  }))
  .result();
