import { timeConversion } from "../../helpers/utils";

export default function FlightCard(props) {

    const { name, flightNo, origin, destination, departureTime, arrivalTime, price, hidebooking, mode, hideprice } = props;

    return (
        <div className="flightcard">
            <div>
                <h3>{name}</h3>
                <label>{flightNo}</label>
            </div>
            <div>
                <h3>{departureTime}</h3>
                <label>{origin}</label>
            </div>
            <div>
                <h3>{arrivalTime}</h3>
                <label>{destination}</label>
            </div>
            <div>
                <h3>{timeConversion(Date.parse(`01/01/2020 ${arrivalTime}`) - Date.parse(`01/01/2020 ${departureTime}`))}</h3>
                <label>{ !mode ? 'Non stop' : mode }</label>
            </div>
            {!hideprice ? <div>
                <h3 className="price">{price}</h3>
            </div> : <div></div>}
            {!hidebooking ? <div>
                <button className="primary small">Book</button>
            </div> : <div></div>}
        </div>
    )
}