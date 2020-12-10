import { useEffect, useState } from "react";
import { LOCATIONS } from "../../config/locations";
import DateSelect from "../Inputs/DateSelect";
import SearchSelect from "../Inputs/SearchSelect";

export default function SearchFlight({ handleOnSubmit, roundtrip, formdata }) {

    let [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        setSuggestions(LOCATIONS.map(location => {
            return {
                'searchquery': `${location.city}-${location.code}`,
                'display': location.city
            }
        }));
    }, [])

    return (
        <form onSubmit={handleOnSubmit}>
            <div className="form-fields">
                <SearchSelect
                    name="from"
                    label="From"
                    isRequired={true}
                    suggestions={suggestions}
                    defaultvalue={formdata && formdata['from']}
                />
                <SearchSelect
                    name="to"
                    label="To"
                    isRequired={true}
                    suggestions={suggestions}
                    defaultvalue={formdata && formdata['to']}
                />
                <DateSelect
                    name="departure"
                    label="Departure"
                    isRequired={true}
                    allowpastdates={true}
                    defaultvalue={formdata && formdata['departure']}
                />
                {roundtrip && <DateSelect
                    name="arrival"
                    label="Arrival"
                    isRequired={true}
                    allowpastdates={true}
                    defaultvalue={formdata && formdata['arrival']}
                />}
            </div>
            <div>
                <button type="submit" className="primary">Fetch Flights</button>
            </div>
        </form>
    )
}