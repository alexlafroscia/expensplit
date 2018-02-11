import React, { Component } from 'react';
import PropTypes from 'prop-types';

export const RETURN_KEY_CODE = 13;
export const ESCAPE_KEY_CODE = 27;

export default class Input extends Component {
  constructor() {
    super(...arguments);

    this.handleKeyUp = this.handleKeyUp.bind(this);
  }

  handleKeyUp(event) {
    const { onEscape, onSubmit, onChange } = this.props;

    if (event.keyCode === ESCAPE_KEY_CODE) {
      if (onEscape) {
        onEscape(event);
      }
      return;
    }

    if (event.keyCode === RETURN_KEY_CODE) {
      if (onSubmit) {
        onSubmit(event);
      }
      return;
    }

    onChange(event);
  }

  render() {
    return (
      <input
        className={this.props.className}
        autoFocus={this.props.autoFocus}
        defaultValue={this.props.value}
        onKeyUp={this.handleKeyUp}
        onFocus={e => {
          const { value } = e.target;
          e.target.value = '';
          e.target.value = value;
        }}
      />
    );
  }
}
Input.propTypes = {
  className: PropTypes.string,
  value: PropTypes.string.isRequired,
  autoFocus: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  onEscape: PropTypes.func,
  onSubmit: PropTypes.func
};
