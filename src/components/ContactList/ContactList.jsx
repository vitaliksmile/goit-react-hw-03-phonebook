import s from './ContactList.module.css';
import PropTypes from 'prop-types';

const ContactList = ({ filterContact, removeContact }) => {
  return (
    <ul>
      {filterContact.map(({ name, number, id }) => {
        return (
          <li key={id}>
            {name}: {number}
            <button
              className={s['button-30']}
              type="button"
              onClick={() => {
                removeContact(id);
              }}
            >
              Delete
            </button>
          </li>
        );
      })}
    </ul>
  );
};
export default ContactList;
ContactList.propTypes = {
  filterContact: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  removeContact: PropTypes.func.isRequired,
};
