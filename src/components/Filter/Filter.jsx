import PropTypes from 'prop-types';
const Filter = ({ handleChangeForm, value }) => {
  return (
    <input
      placeholder="Find a contact"
      onChange={handleChangeForm}
      type="text"
      name="filter"
      value={value}
    />
  );
};

export default Filter;

Filter.propTypes = {
  handleChangeForm: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};
