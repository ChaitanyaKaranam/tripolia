// Uses search query to check suggestions.
// If query is part of search query, will return that suggestion
// format of suggestions - { searchquery: 'query', display: 'value to be returned' }

export function getSuggestions(suggestions, query) {
    return suggestions
            .filter(suggestion => suggestion.searchquery.toLowerCase().includes(query.toLowerCase()))
            .map(suggestion => suggestion.display)
}