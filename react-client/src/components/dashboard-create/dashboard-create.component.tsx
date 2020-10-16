import * as React from 'react';
import { connect, DispatchProp } from 'react-redux';
import { utils } from '../../libs';
import { Contact } from '../../models';
import { $contact, $notifications } from '../../services';
import './dashboard-create.style';

type State = Contact;

type Props = DispatchProp;

class InferableComponent extends React.Component<Props, State> {

  private formRef = React.createRef<HTMLFormElement>();

  public state: State = {
    name: '',
    number: '',
  };

  private get isEmpty(): boolean {
    return !this.state.name || !this.state.number;
  }

  public render(): JSX.Element {
    return (
      <section id="dashboard-create">
        <form
          ref={this.formRef}
          onSubmit={this.createContact.bind(this)}
        >
          <div className="form-row">
            <div className="form-row-column">
              <input
                type="text"
                placeholder="Name"
                onChange={this.handleInputChange.bind(this, 'name')}
              ></input>
              <i className="fa fa-user fa-2x"></i>
              <label className="placeholder">Name</label>
            </div>
            <div className="form-row-column">
              <input
                type="text"
                placeholder="Number"
                onChange={this.handleInputChange.bind(this, 'number')}
              ></input>
              <i className="fa fa-phone fa-2x"></i>
              <label className="placeholder">Number</label>
            </div>
          </div>
          <div className="button-group">
            <button type="submit">
              <i className="fa fa-plus"></i>
              <span>Create</span>
            </button>
            <button
              type="button"
              onClick={this.clearSchema.bind(this)}
            >
              <i className="fa fa-paint-brush"></i>
              <span>Clear</span>
            </button>
          </div>
        </form>
      </section>
    );
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

  private createContact($event: React.FormEvent<HTMLFormElement>): void {
    $event.preventDefault();
    if (this.isEmpty) {
      this.clearSchema();
      $notifications.push('Empty Fields', 'peru');
    } else {
      const contact = utils.removeTags(this.state);
      $contact.createContact(contact).then(() => {
        this.clearSchema();
        $notifications.push('Created', 'darkslategray');
      });
    }
  }
}

export const DashboardCreate = utils.compose(InferableComponent)
  .pipe(connect())
  .result();
