import { useEffect, useRef, useState } from "react"
import { getSuggestions } from "../../../helpers/utils";
import { useOnClickOutside } from "../../../hooks";

export default function SearchSelect({ name, label, isRequired, suggestions, defaultvalue }) {

    let [showSuggestions, setShowSuggestions] = useState(false);
    let [query, setQuery] = useState(defaultvalue ? defaultvalue : '');
    let [suggestionsList, setSuggestionsList] = useState(null);
    let [isSelected, setIsSelected] = useState(defaultvalue ? true : false);
    
    const ref = useRef();

    useOnClickOutside(ref, handleOnBlur)  
   
    useEffect(() => {
        // Remove suggestion if input is empty
        if (query === '') {
            if (showSuggestions) {
                setShowSuggestions(false)
            }
        }
        setSuggestionsList(getSuggestions(suggestions, query));

        // eslint-disable-next-line
    }, [query])

    function renderSuggestions() {
        function handleOnSuggestClick(item) {
            setQuery(item);
            if (!isSelected) {
                setIsSelected(true);
                setShowSuggestions(false);
            }
        }
        if (showSuggestions) {
            if (Array.isArray(suggestionsList) && suggestionsList.length > 0) {
                return <List
                    items={suggestionsList}
                    onClick={handleOnSuggestClick}
                />
            }
        }
    }

    function handleOnChange(event) {
        // show suggestions if they are not
        if (!showSuggestions) {
            setShowSuggestions(true);
        }

        // If input is not selected from the suggestions
        if (isSelected) {
            setIsSelected(false);
        }

        setQuery(event.target.value);
    }

    function handleOnBlur() {
        // Set first suggestion if not selected
        if (Array.isArray(suggestionsList)) {
            if (suggestionsList.length === 1) {
                setQuery(suggestionsList[0]);
            }else{
                if(!isSelected){
                    setQuery('')
                }
            }
            setShowSuggestions(false);
        }
    }

    return (
        <div className="input-field search-select" ref={ref}>
            <label htmlFor={name}>{label}</label>
            <input
                id={name}
                type="search"
                placeholder={label}
                name={name}
                required={isRequired ? true : false}
                value={query}
                onChange={handleOnChange}
            />
            { renderSuggestions()}
        </div>
    )
}

function List({ items, onClick }) {
    return (
        <ul className="search-menu">
            { items.map(item => <li key={item} onClick={() => onClick(item)}>{item}</li>)}
        </ul>
    )
}