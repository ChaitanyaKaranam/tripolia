import { useEffect, useState } from "react";
import ConnectingFlights from "../components/Flights/ConnectingFlights";
import FlightCard from "../components/Flights/FlightCard";
import SearchFlight from "../components/Flights/SearchFlight";
import Tabs from "../components/Tabs";
import { FLIGHT_DATA } from "../config/flightData";
import { filterFlightResults, getFlightMetadata } from "../helpers/flights";
import { buildFormData, parseQueryString } from "../helpers/utils"

export default function Flights({ location }) {

    let [flightData, setFlightData] = useState([]);
    let [formdata, setFormdata] = useState(parseQueryString(location.search) || {});
    let [filteredFlightData, setFilteredFlightData] = useState([]);
    let [filteredArrivalFlightData, setFilteredArrivalflightData] = useState([]);
    let [isRoundTrip, setIsRoundTrip] = useState(false);

    useEffect(() => {
        function getFlightData() {
            setFlightData(FLIGHT_DATA)
        }
        getFlightData();
    }, [])

    useEffect(() => {
        if (formdata) {
            const { from, to, departure, arrival } = formdata;
            setFilteredFlightData(filterFlightResults({ from, to, departure }, flightData));
            if (isRoundTrip) {
                console.log(to, from, arrival);
                setFilteredArrivalflightData(filterFlightResults({ from: to, to: from, departure: arrival }, flightData));
            }
            checkRoundTrip(formdata);
        }
    }, [formdata, flightData])

    // Set new formdata
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

    function onRoundTripChange(isRoundTrip){
        if(formdata['arrival']){
            setIsRoundTrip(isRoundTrip);
        }
    }

    return (
        <div className="container flights">
            <div className="flights_search">
                <Search
                    formdata={formdata}
                    onSubmit={onSubmit}
                    onRoundTripChange={onRoundTripChange}
                />
            </div>
            <div className="flights_list">
                <h1>Flights List</h1>
                <div className={isRoundTrip ? 'flights_list-grid' : ''}>
                    <div className="flights_list-content">
                        <FlightMetadata
                            flights={filteredFlightData}
                            formdata={formdata}
                        />
                        <FlightsList
                            flights={filteredFlightData}
                        />
                    </div>
                    {isRoundTrip &&
                        <div className="flights_list-content">
                            <FlightMetadata
                                flights={filteredArrivalFlightData}
                                formdata={formdata}
                                isRoundTrip={isRoundTrip}
                            />
                            <FlightsList
                                flights={filteredArrivalFlightData}
                            />
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

function Search({ formdata, onSubmit, onRoundTripChange }) {

    let [isRoundTrip, setIsRoundTrip] = useState(formdata && formdata['arrival'] ? true : false)

    function handleOnSubmit(event) {
        event.preventDefault();
        onSubmit(buildFormData(event.target))
    }

    function onTabChange(tab) {
        if(tab === 'One-way'){
            if(isRoundTrip){
                setIsRoundTrip(false)
                onRoundTripChange(false)
            }
        }else{
            if(!isRoundTrip){
                setIsRoundTrip(true)
                onRoundTripChange(true)
            }
        }
    }

    return (
        <div>
            <Tabs
                tabs={['One-way', 'Round-trip']}
                onChange={onTabChange}
            />
            <SearchFlight
                handleOnSubmit={handleOnSubmit}
                formdata={formdata}
                roundtrip={isRoundTrip}
            />
        </div>
    )
}

function FlightMetadata({ flights, formdata, isRoundTrip }) {

    const { flightcount, date, from, to } = getFlightMetadata(flights, formdata);

    return (
        <div>
            { !isRoundTrip ? <h2>{from} to {to}</h2> : <h2>{to} to {from}</h2>}
            
            <div>
                <span>{flightcount} flights found</span> &nbsp;&nbsp;
                <span>{date}</span>
            </div>
        </div>

    )
}

function FlightsList({ flights }) {

    function renderFlights() {
        if (flights && Array.isArray(flights) && flights.length > 0) {
            return flights.map((flight, index) => {
                if (Array.isArray(flight)) {
                    if (flight.length > 0) {
                        return <ConnectingFlights key={"connectingflights"} connectingFlights={flight} />
                    }
                } else {
                    return <FlightCard key={flight.flightNo} {...flight} />
                }
            })
        }
    }

    return (
        <ul>
            { renderFlights()}
        </ul>
    )
}