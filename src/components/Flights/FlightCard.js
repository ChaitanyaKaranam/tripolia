import { timeConversion } from "../../helpers/utils";

export default function FlightCard(props) {

    const { name, flightNo, origin, destination, departureTime, arrivalTime, price } = props;

    return (
        <div className="flightcard">
            <div>
                <h2>{name}</h2>
                <label>{flightNo}</label>
            </div>
            <div>
                <h2>{departureTime}</h2>
                <label>{origin}</label>
            </div>
            <div>
                <h2>{arrivalTime}</h2>
                <label>{destination}</label>
            </div>
            <div>
                <h2>{timeConversion(Date.parse(`01/01/2020 ${arrivalTime}`)-Date.parse(`01/01/2020 ${departureTime}`))}</h2>
                <label>Non stop</label>
            </div>
            <div>
                <h2 className="price">{price}</h2>
            </div>
            <div>
                <button className="primary small">Book</button>
            </div>
        </div>
    )
}