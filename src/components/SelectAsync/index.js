
import React, { Component } from 'react';

import AsyncSelect from 'react-select/async';


const customStyles = {
    placeholder: {
      color: 'blue',
    },

  }
const filterColors = (inputValue) => {
  return options.filter(i =>
    i.label.toLowerCase().includes(inputValue.toLowerCase())
  );
};
const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ]
const loadOptions = (inputValue, callback) => {
  setTimeout(() => {
    //   return options
    callback(filterColors(inputValue));
  }, 1000);
};



export default class WithCallbacks extends Component {
  state = { inputValue: '',value: {} };
  handleInputChange = (newValue) => {
    console.log(newValue)

    const inputValue = newValue.replace(/\W/g, '');
    this.setState({ inputValue });
    return inputValue;
  };
  render() {
    return (
        <AsyncSelect
          inputId={this.props.name}
          loadOptions={loadOptions}
          options={options}
          onInputChange={this.handleInputChange}
          onChange={(e) =>this.props.onChange(e.value)}
          placeholder={this.props.placeholder}
        //   value={this.props.value.value}
        />
    );
  }
}
