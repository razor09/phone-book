import * as React from 'react';
import { connect, DispatchProp } from 'react-redux';
import { Redirect, Route, RouteComponentProps, Switch } from 'react-router-dom';
import { utils } from '../../libs';
import { AuthStatus } from '../../store/auth/auth.state';
import { GlobalState } from '../../store/global.state';
import { DashboardList } from '../dashboard-list/dashboard-list.component';
import { DashboardEdit } from '../dashboard-update/dashboard-update.component';

interface StateProps {
  status: AuthStatus;
}

type Props = StateProps & DispatchProp & RouteComponentProps;

class InferableComponent extends React.Component<Props> {

  public render(): JSX.Element {
    const { status } = this.props;
    switch (status) {
      case 'authorized': return this.display();
      case 'unauthorized': return this.redirect();
      default: return null;
    }
  }

  private display(): JSX.Element {
    const { path } = this.props.match;
    return (
      <Switch>
        <Route
          exact
          path={path}
          component={DashboardList}
        ></Route>
        <Route
          exact
          path={`${path}/:id`}
          component={DashboardEdit}
        ></Route>
      </Switch>
    );
  }

  private redirect(): JSX.Element {
    return (
      <Redirect to="/"></Redirect>
    );
  }
}

export const DashboardContainer = utils.compose(InferableComponent)
  .pipe(connect<StateProps, object, object, GlobalState>((state) => {
    return {
      status: state.authReducer.status,
    };
  }))
  .result();
