import { useState } from "react";
import SearchFlight from "../components/Flights/SearchFlight";
import { parseQueryString } from "../helpers/utils"

export default function Flights({ location }) {

    const queryParams = parseQueryString(location.search);
    console.log(queryParams);

    return (
        <div className="container flights">
            <div className="flights_search">
                <Search formdata={queryParams}/>
            </div>
            <div className="flights_list">
                <h2>Flights List</h2>
            </div>
        </div>
    )
}

function Search({ formdata }) {

    let [ isRoundTrip, setIsRoundTrip ] = useState(formdata && formdata['arrival'] ? true : false)

    function handleOnSubmit(event) {
        event.preventDefault();
        //history.push(`${FLIGHTS.path}?${buildQueryString(event.target)}`)
    }

    return (
        <div>
            <span>TAB</span>
            <SearchFlight
                handleOnSubmit={handleOnSubmit}
                formdata={formdata}
                roundtrip={isRoundTrip}
            />
        </div>
    )
}