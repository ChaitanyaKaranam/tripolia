import { useEffect, useState } from "react";
import FlightCard from "../components/Flights/FlightCard";
import SearchFlight from "../components/Flights/SearchFlight";
import { FLIGHT_DATA } from "../config/flightData";
import { buildFormData, parseQueryString } from "../helpers/utils"

export default function Flights({ location }) {

    let [flightData, setFlightData] = useState([]);
    let [formdata, setFormdata] = useState(parseQueryString(location.search) || {});
    let [filteredFlightData, setFilteredFlightData] = useState([]);
    let [isRoundTrip, setIsRoundTrip] = useState(false);

    useEffect(() => {
        function getFlightData() {
            setFlightData(FLIGHT_DATA)
        }
        getFlightData();
    }, [])

    useEffect(() => {
        if (formdata) {
            const { from, to, departure } = formdata;
            setFilteredFlightData(filterFlightResults({ from, to, departure }, flightData));
            checkRoundTrip(formdata);
        }
    }, [formdata, flightData])

    function onSubmit(formdata) {
        setFormdata(formdata);
        checkRoundTrip(formdata);
    }

    // Check if mode is roundtrip
    function checkRoundTrip(formdata) {
        if (formdata['arrival'] && !isRoundTrip) {
            setIsRoundTrip(true);
        }
    }

    // Filter flight results
    function filterFlightResults(filters, flights) {
        const { from, to, departure, arrival } = filters;
        function filterFlights(flights) {
            // Filter flights by date
            function filterByDate(flights) {
                return flights
                    .filter(flight =>
                        flight && flight.origin && flight.destination && flight.date &&
                        flight.origin.toLowerCase().includes(from.toLowerCase()) &&
                        flight.destination.toLowerCase().includes(to.toLowerCase()) &&
                        new Date(flight.date).toDateString() === new Date(departure).toDateString()
                    )
            }

            // Fitler flights by time
            function sortByTime(flights) {
                return flights.sort((a, b) => Date.parse(`01/01/2020 ${a.departureTime}`) - Date.parse(`01/01/2020 ${b.departureTime}`))
            }

            let filteredData = filterByDate(flights);
            filterByDate = sortByTime(flights);
            return filteredData
        }
        return filterFlights(flights);
    }

    return (
        <div className="container flights">
            <div className="flights_search">
                <Search
                    formdata={formdata}
                    onSubmit={onSubmit}
                />
            </div>
            <div className="flights_list">
                <h2>Flights List</h2>
                <FlightsList
                    flights={filteredFlightData}
                    isRoundTrip={isRoundTrip}
                />
            </div>
        </div>
    )
}

function Search({ formdata, onSubmit }) {

    let [isRoundTrip, setIsRoundTrip] = useState(formdata && formdata['arrival'] ? true : false)

    function handleOnSubmit(event) {
        event.preventDefault();
        onSubmit(buildFormData(event.target))
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

function FlightsList({ flights, isRoundTrip }) {

    function renderFlights() {
        if (flights && Array.isArray(flights) && flights.length > 0) {
            return flights.map(flight => {
                return <FlightCard key={flight.flightNo} {...flight}/>
            })
        }
    }

    return (
        <ul>
            { renderFlights()}
        </ul>
    )
}