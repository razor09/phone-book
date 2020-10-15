import * as React from 'react';
import { connect, DispatchProp } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { utils } from '../../libs';
import { Contact } from '../../models';
import { $contact, $notifications } from '../../services';
import './dashboard-contact';

interface SelfProps {
	contact: Contact;
}

type Props = SelfProps & RouteComponentProps & DispatchProp;

class InferableComponent extends React.Component<Props> {

	public render(): JSX.Element {
		const { id, name, number } = this.props.contact;
		return (
			<div id="dashboard-contact">
				<div className="table-row-column">{name}</div>
				<div className="table-row-column">{number}</div>
				<div className="button-group">
					<button
						className="edit-button"
						onClick={this.editContact.bind(this, id)}
					>
						<i className="fa fa-pencil-square-o"></i>
						<span>Edit</span>
					</button>
					<button
						className="remove-button"
						onClick={this.removeContact.bind(this, id)}
					>
						<i className="fa fa-times"></i>
						<span>Remove</span>
					</button>
				</div>
			</div>
		);
	}

	private editContact(id: number): void {
		const { path } = this.props.match;
		this.props.history.replace(`${path}/${id}`);
	}

	private removeContact(id: number): void {
		$contact.removeContact(id).then(() => {
			$notifications.push('Removed', 'firebrick');
		});
	}
}

export const DashboardContact = utils.compose(InferableComponent)
	.pipe(withRouter)
	.pipe(connect())
	.result();