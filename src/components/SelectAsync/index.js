import React, { useState, useEffect } from 'react';
import AsyncSelect from 'react-select/async';
import { useDebounce } from 'use-lodash-debounce';
import PropTypes from 'prop-types';
import api from '../../services/api';

export default function SelectAsync({
    name,
    onChange,
    placeholder,
    URLtoFetch,
}) {
    const [inputValue, setInputValue] = useState('');
    // const [value, setValue] = useState({});
    const debouncedValue = useDebounce(inputValue, 200);

    const [options, setOptions] = useState([]);
    useEffect(() => {
        async function fetchData() {
            const response = await api.get(
                `${URLtoFetch}?page=${1}&q=${debouncedValue}`
            );
            const newOptions = response.data.map(data => ({
                value: data.id,
                label: data.name,
            }));

            setOptions(newOptions);
            return newOptions;
        }
        fetchData(debouncedValue);
    }, [debouncedValue, URLtoFetch]);

    function handleInputChange(newValue) {
        const valueToSet = newValue.replace(/\W/g, '');
        setInputValue(valueToSet);
        return valueToSet;
    }
    function filterOptions(valueInput) {
        return options.filter(i =>
            i.label.toLowerCase().includes(valueInput.toLowerCase())
        );
    }
    function loadOptions(handleOptions, callback) {
        callback(filterOptions(handleOptions));
    }

    return (
        <AsyncSelect
            inputId={name}
            loadOptions={loadOptions}
            options={options}
            onInputChange={handleInputChange}
            onChange={e => onChange(e.value)}
            placeholder={placeholder}
            defaultOptions={options}
        />
    );
}

SelectAsync.propTypes = {
    URLtoFetch: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};
