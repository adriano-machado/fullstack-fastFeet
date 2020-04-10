import React, { useState } from 'react';

import AsyncSelect from 'react-select/async';

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
];

export default function WithCallbacks({ name, onChange, placeholder }) {
    const [inputValue, setInputValue] = useState('');
    const [value, setValue] = useState({});

    function handleInputChange(newValue) {
        console.log(newValue);

        const valueToSet = newValue.replace(/\W/g, '');
        setInputValue(valueToSet);
        return valueToSet;
    }
    function filterColors(valueInput) {
        return options.filter(i =>
            i.label.toLowerCase().includes(valueInput.toLowerCase())
        );
    }
    function loadOptions(options, callback) {
        setTimeout(() => {
            //   return options
            callback(filterColors(options));
        }, 1000);
    }

    return (
        <AsyncSelect
            inputId={name}
            loadOptions={loadOptions}
            options={options}
            onInputChange={handleInputChange}
            onChange={e => onChange(e.value)}
            placeholder={placeholder}
            //   value={this.props.value.value}
        />
    );
}
