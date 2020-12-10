// Uses search query to check suggestions.
// If query is part of search query, will return that suggestion
// format of suggestions - { searchquery: 'query', display: 'value to be returned' }

export function getSuggestions(suggestions, query) {
    return suggestions
        .filter(suggestion => suggestion.searchquery.toLowerCase().includes(query.toLowerCase()))
        .map(suggestion => suggestion.display)
}

// Build query string from formdata
export function buildQueryString(form) {
    const formData = new FormData(form);
    let parameters = ''
    for (const i of formData) {
        if (i[0] && i[1]) {
            parameters = `${parameters}${i[0]}=${i[1]}&`
        }
    }
    return parameters.substring(0, parameters.length - 1);
}

export function parseQueryString(search) {
    const qs = new URLSearchParams(search);
    let obj = {}
    for(const i of qs){
        if(i[0] && i[1]) {
            obj[i[0]] = i[1]
        }
    }
    return obj;
}