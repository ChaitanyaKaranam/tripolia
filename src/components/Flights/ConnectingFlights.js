import { useState } from "react";
import { timeConversion } from "../../helpers/utils";
import FlightCard from "./FlightCard";

export default function ConnectingFlights({ connectingFlights }) {
    return (
        <div>
            { connectingFlights.map((flights) => {
                return (
                    <ConnectingFlightCard key={`${flights[0]['flightNo']}-${flights[1]['flightNo']}`} flights={flights} />
                )
            })}
        </div>
    )
}

function ConnectingFlightCard({ flights }) {

    let [showAllFlights, setShowAllFlights] = useState(false);

    function toggleShowFlights(params) {
        setShowAllFlights(!showAllFlights);
    }

    return (
        <div className="connectingflight">
            <div className="flightcard">
                <div>
                    <h3 className="link" onClick={toggleShowFlights}>Multiple</h3>
                    <label>{`${flights[0]['flightNo']}, ${flights[1]['flightNo']}`}</label>
                </div>
                <div>
                    <h3>{`${flights[0]['departureTime']}`}</h3>
                    <label>{`${flights[0]['origin']}`}</label>
                </div>
                <div>
                    <h3>{`${flights[1]['arrivalTime']}`}</h3>
                    <label>{`${flights[1]['destination']}`}</label>
                </div>
                <div>
                    <h3>{timeConversion(Date.parse(`01/01/2020 ${flights[1]['arrivalTime']}`) - Date.parse(`01/01/2020 ${flights[0]['departureTime']}`))}</h3>
                    <label>{'multiple'}</label>
                </div>
                <div>
                    <h3 className="price">{`${flights[0]['price'] + flights[1]['price']}`}</h3>
                </div>
                <div>
                    <button className="primary small">Book</button>
                </div>
            </div>
            {showAllFlights && <div className="container multiple">
                <h4>Layover time: <label>{ timeConversion(Date.parse(`01/01/2020 ${flights[1]['departureTime']}`) - Date.parse(`01/01/2020 ${flights[0]['arrivalTime']}`)) }</label></h4>
                <br/>
                {flights.map((flight) => {
                    return <FlightCard key={flight.flightNo} {...flight} hidebooking={true} mode={'connecting'} hideprice={true} />
                })}
            </div>}

        </div>
    )
}