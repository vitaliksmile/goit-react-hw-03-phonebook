import { Component } from 'react';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';
import { nanoid } from 'nanoid';
import s from './App.module.css';

export default class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };
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
