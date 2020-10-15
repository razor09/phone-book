import * as React from 'react';
import { connect, DispatchProp } from 'react-redux';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { utils } from '../../libs';
import { Notification } from '../../models';
import { GlobalState } from '../../store/global.state';
import './layout-notifications.style';

interface StateProps {
	notifications: Notification[];
}

type Props = StateProps & DispatchProp;

class InferableComponent extends React.Component<Props> {

	public render(): JSX.Element {
		return (
			<section id="layout-notifications">
				<TransitionGroup>{this.renderNotifications()}</TransitionGroup>
			</section>
		);
	}

	private renderNotifications(): JSX.Element[] {
		const { notifications } = this.props;
		return notifications.map((notification, index) => {
			const { text, color } = notification;
			return (
				<CSSTransition
					classNames="notification"
					key={index}
					timeout={200}
				>
					<div
						className="notification"
						key={index}
						style={{ color }}
					>{text}</div>
				</CSSTransition>
			);
		});
	}
}

export const LayoutNotifications = utils.compose(InferableComponent)
	.pipe(connect<StateProps, object, object, GlobalState>((state) => {
		return {
			notifications: state.notificationsReducer.notifications,
		};
	}))
	.result();