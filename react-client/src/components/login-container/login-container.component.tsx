import * as React from 'react';
import { connect, DispatchProp } from 'react-redux';
import { Redirect, RouteComponentProps } from 'react-router-dom';
import { utils } from '../../libs';
import { AuthStatus } from '../../store/auth/auth.state';
import { GlobalState } from '../../store/global.state';
import { LoginForm } from '../login-form/login-form.component';

interface StateProps {
	status: AuthStatus;
}

type Props = StateProps & RouteComponentProps & DispatchProp;

class InferableComponent extends React.Component<Props> {

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
			<Redirect to="/contacts"></Redirect>
		);
	}
}

export const LoginContainer = utils.compose(InferableComponent)
	.pipe(connect<StateProps, object, object, GlobalState>((state) => {
		return {
			status: state.authReducer.status,
		};
	}))
	.result();