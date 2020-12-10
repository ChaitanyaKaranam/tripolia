import { useState } from "react"

export default function DateSelect({ name, label, isRequired, allowpastdates, defaultvalue }) {
    
    let [ query, setQuery ] = useState(defaultvalue ? defaultvalue : '');

    function handleOnChange(event) {
        setQuery(event.target.value)
    }
    
    return (
        <div className="input-field">
            <label htmlFor={name}>{label}</label>
            <input
                id={name}
                type="date"
                name={name}
                min={!allowpastdates ? new Date().toLocaleDateString('sv-SE') : null}
                required={isRequired}
                value={query}
                onChange={handleOnChange}
            />
        </div>
    )
}