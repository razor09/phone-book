import * as React from 'react';
import { connect, DispatchProp } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { utils } from '../../libs';
import { Contact, Message } from '../../models';
import { $contact, $socket } from '../../services';
import { DashboardContact } from '../dashboard-contact/dashboard-contact.component';
import { DashboardCreate } from '../dashboard-create/dashboard-create.component';
import './dashboard-list.style';

interface State {
	contacts: Contact[];
	registry: Contact[];
}

type Props = RouteComponentProps & DispatchProp;

class InferableComponent extends React.Component<Props, State> {

	private inputRef = React.createRef<HTMLInputElement>();

	public state: State = {
		contacts: new Array<Contact>(),
		registry: new Array<Contact>(),
	};

	public render(): JSX.Element {
		return (
			<section id="dashboard-list">
				<div className="search">
					<input
						type="text"
						placeholder="Search"
						ref={this.inputRef}
						onChange={utils.debounceFactory(this.filterContacts.bind(this), 320)}
					></input>
					<i className="fa fa-search fa-2x"></i>
					<label className="placeholder">Search</label>
				</div>
				<DashboardCreate></DashboardCreate>
				<TransitionGroup>{this.renderContacts()}</TransitionGroup>
			</section>
		);
	}

	private renderContacts(): JSX.Element[] {
		const { contacts } = this.state;
		return contacts.map((contact) => {
			return (
				<CSSTransition
					classNames="list"
					key={contact.id}
					timeout={200}
				>
					<DashboardContact
						contact={contact}
						key={contact.id}
					></DashboardContact>
				</CSSTransition>
			);
		});
	}

	public componentDidMount(): void {
		this.receiveContacts();
		$socket.client.on(Message.Create, this.receiveContacts.bind(this));
		$socket.client.on(Message.Update, this.receiveContacts.bind(this));
		$socket.client.on(Message.Remove, this.receiveContacts.bind(this));
	}

	public componentWillUnmount(): void {
		$socket.client.off(Message.Create);
		$socket.client.off(Message.Update);
		$socket.client.off(Message.Remove);
	}

	private receiveContacts(): void {
		$contact.receiveContacts().then((contacts) => {
			this.setState({ contacts });
			this.setState({ registry: contacts });
		});
	}

	private filterContacts(): void {
		const { value } = this.inputRef.current;
		const { registry } = this.state;
		const contacts = registry.filter((contact) => {
			const pattern = contact.name.toLowerCase();
			const search = value.toLowerCase();
			return pattern.includes(search);
		});
		this.setState({ contacts });
	}
}

export const DashboardList = utils.compose(InferableComponent)
	.pipe(connect())
	.result();