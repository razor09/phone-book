import * as React from 'react';
import { connect, DispatchProp } from 'react-redux';
import { Redirect, Route, RouteComponentProps, Switch } from 'react-router-dom';
import { utils } from '../../libs';
import { $auth, $notifications } from '../../services';
import { SetAuthStatusAction } from '../../store/auth/actions/set-auth-status.action';
import { DashboardContainer } from '../dashboard-container/dashboard-container.component';
import { LayoutHeader } from '../layout-header/layout-header.component';
import { LayoutNotifications } from '../layout-notifications/layout-notifications.component';
import { LayoutPreloader } from '../layout-preloader/layout-preloader.component';
import { LoginContainer } from '../login-container/login-container.component';
import './layout-container.style';

type Props = DispatchProp & RouteComponentProps;

class InferableComponent extends React.Component<Props> {

  public render(): JSX.Element {
    return (
      <section id="layout-container">
        <LayoutHeader></LayoutHeader>
        <LayoutPreloader></LayoutPreloader>
        <LayoutNotifications></LayoutNotifications>
        <div className="outlet">
          <Switch>
            <Route
              exact
              path="/"
              component={LoginContainer}
            ></Route>
            <Route
              path="/contacts"
              component={DashboardContainer}
            ></Route>
            <Route path="*">
              <Redirect to="/"></Redirect>
            </Route>
          </Switch>
        </div>
      </section>
    );
  }

  public componentDidMount(): void {
    $auth.checkAuth().then((isAuth) => {
      if (isAuth) {
        const action = new SetAuthStatusAction('authorized');
        this.props.dispatch(action);
        $notifications.setTitle('Login');
      } else {
        const action = new SetAuthStatusAction('unauthorized');
        this.props.dispatch(action);
        $notifications.setTitle('Dashboard');
      }
    });
  }
}

export const LayoutContainer = utils.compose(InferableComponent)
  .pipe(connect())
  .result();
