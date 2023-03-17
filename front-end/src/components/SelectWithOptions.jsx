import React from 'react';
import PropTypes from 'prop-types';

function SelectWithOptions({ value, onChange, data, name, dataTestId,
  className, ...otherProps }) {
  return (
    <select
      data-testid={ dataTestId }
      className={ className }
      id={ name }
      name={ name }
      value={ value }
      onChange={ onChange }
      { ...otherProps }
    >
      <option
        key="defaultSelect"
        value=""
        disabled
        hidden
      >
        {}
      </option>
      { data.map((option) => (
        <option
          key={ option.id }
          value={ option.id }
        >
          { option.name }
        </option>
      )) }
    </select>
  );
}

SelectWithOptions.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  onChange: PropTypes.func.isRequired,
  data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
  dataTestId: PropTypes.string,
};

SelectWithOptions.defaultProps = {
  className: null,
  dataTestId: null,
  value: '',
};

export default SelectWithOptions;
