import * as React from 'react';
import { DispatchProp } from 'react-redux';
import { Redirect, Route, RouteComponentProps, Switch } from 'react-router-dom';
import { utils } from '../../libs';
import { AuthStatus } from '../../store/auth/auth.state';
import { adapter } from '../../store/global.reducer';
import { DashboardList } from '../dashboard-list/dashboard-list.component';
import { DashboardEdit } from '../dashboard-update/dashboard-update.component';

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
      case 'authorized': return this.display();
      case 'unauthorized': return this.redirect();
      default: return null;
    }
  }

  private display(): JSX.Element {
    return (
      <Switch>
        <Route
          exact
          path={this.path}
          component={DashboardList}
        ></Route>
        <Route
          exact
          path={`${this.path}/:id`}
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
  .pipe(adapter<StateProps>((state) => {
    return {
      status: state.authReducer.status,
    };
  }))
  .result();
