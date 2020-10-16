import * as React from 'react';
import { DispatchProp } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { utils } from '../../libs';
import { Contact } from '../../models';
import { $contact, $notifications } from '../../services';
import './dashboard-update.style';

interface Params {
  id: string;
}

type State = Contact;

type Props = RouteComponentProps<Params> & DispatchProp;

class InferableComponent extends React.Component<Props, State> {

  private formRef = React.createRef<HTMLFormElement>();

  public state: State = {
    id: null,
    name: '',
    number: '',
  };

  private get isEmpty(): boolean {
    return !this.state.name || !this.state.number;
  }

  public render(): JSX.Element {
    const { name, number } = this.state;
    return (
      <section id="dashboard-edit">
        <form
          ref={this.formRef}
          onSubmit={this.updateContact.bind(this)}
        >
          <div className="form-row">
            <div className="form-row-column">
              <input
                type="text"
                placeholder="Name"
                onChange={this.handleInputChange.bind(this, 'name')}
                value={name}
              ></input>
              <i className="fa fa-user fa-2x"></i>
              <label className="placeholder">Name</label>
            </div>
            <div className="form-row-column">
              <input
                type="text"
                placeholder="Number"
                onChange={this.handleInputChange.bind(this, 'number')}
                value={number}
              ></input>
              <i className="fa fa-phone fa-2x"></i>
              <label className="placeholder">Number</label>
            </div>
          </div>
          <div className="button-group">
            <button type="submit">
              <i className="fa fa-upload"></i>
              <span>Update</span>
            </button>
            <button
              type="button"
              onClick={this.clearSchema.bind(this)}
            >
              <i className="fa fa-paint-brush"></i>
              <span>Clear</span>
            </button>
            <button
              className="navigate-button"
              onClick={this.goBack.bind(this)}
            >
              <i className="fa fa-sign-out"></i>
              <span>Go Back</span>
            </button>
          </div>
        </form>
      </section>
    );
  }

  public componentDidMount(): void {
    this.receiveContact();
  }

  private handleInputChange(key: keyof Contact, $event: React.ChangeEvent<HTMLInputElement>): void {
    const { value } = $event.target;
    this.setState({ [key]: value } as object);
  }

  private clearSchema(): void {
    utils.resetForm(this.formRef.current);
    this.setState({
      name: '',
      number: '',
    });
  }

  private goBack(): void {
    this.props.history.replace('/contacts');
  }

  private receiveContact(): void {
    const id = utils.toInteger(this.props.match.params.id);
    $contact.receiveContact(id).then((contact) => {
      if (!!contact) {
        this.setState(contact);
      }
    });
  }

  private updateContact($event: React.FormEvent<HTMLFormElement>): void {
    $event.preventDefault();
    if (this.isEmpty) {
      this.clearSchema();
      $notifications.push('Empty Fields', 'peru');
    } else {
      const { id, name, number } = this.state;
      const contact = utils.removeTags({ name, number });
      const operation = !!id ? $contact.updateContact(id, contact) : $contact.createContact(contact);
      operation.then(() => {
        this.clearSchema();
        $notifications.push('Updated', 'darkslategray');
        this.props.history.replace('/contacts');
      });
    }
  }
}

export const DashboardEdit = utils.compose(InferableComponent)
  .pipe(withRouter)
  .result();
