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

export function buildFormData(form) {
    const formData = new FormData(form);
    let obj = {}
    for(const i of formData){
        if(i[0] && i[1]) {
            obj[i[0]] = i[1]
        }
    }
    return obj;
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

export function timeConversion(millisec) {

    var seconds = (millisec / 1000).toFixed(1);
    var minutes = (millisec / (1000 * 60)).toFixed(1);
    var hours = (millisec / (1000 * 60 * 60)).toFixed(1);
    var days = (millisec / (1000 * 60 * 60 * 24)).toFixed(1);

    if (seconds < 60) {
        return seconds + " s";
    } else if (minutes < 60) {
        return minutes + " m";
    } else if (hours < 24) {
        return hours + " h";
    } else {
        return days + " days"
    }
}