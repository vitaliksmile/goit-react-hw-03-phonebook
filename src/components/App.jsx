import { Component } from 'react';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';
import { nanoid } from 'nanoid';
import s from './App.module.css';

export default class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const contact = localStorage.getItem('contacts');
    const contactParse = JSON.parse(contact);
    if (contactParse) {
      this.setState({ contacts: contactParse });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }
  handleChangeForm = e => {
    const { name, value } = e.target;

    this.setState({ [name]: value });
  };

  addContact = ({ name, number }) => {
    if (
      this.state.contacts.some(contact => {
        return contact.name === name || contact.number === number;
      })
    ) {
      return alert(`${name}: is already in contacts`);
    }
    this.setState(prev => ({
      contacts: [...prev.contacts, { name, number, id: nanoid() }],
    }));
  };
  filterContact = () => {
    const { contacts, filter } = this.state;
    if (filter.length === 0) return contacts;
    const filttredContacts = contacts.filter(el =>
      el.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
    );
    return filttredContacts;
  };
  removeContact = id => {
    this.setState(prev => ({
      contacts: prev.contacts.filter(contact => contact.id !== id),
    }));
  };

  render() {
    return (
      <div className={s.div}>
        <h1>Phonebook</h1>
        <ContactForm addContact={this.addContact} />

        <h2>Contacts</h2>
        <Filter
          handleChangeForm={this.handleChangeForm}
          value={this.state.filter}
        />
        <ContactList
          filterContact={this.filterContact()}
          removeContact={this.removeContact}
        />
      </div>
    );
  }
}
