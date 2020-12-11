import SearchFlight from "../components/Flights/SearchFlight";
import { ROUTES } from "../config/routes";
import { buildQueryString } from "../helpers/utils";

function Home({ history }) {

    const { FLIGHTS } = ROUTES;

    function handleOnSubmit(event) {
        event.preventDefault();
        history.push(`${FLIGHTS.path}?${buildQueryString(event.target)}`)
    }

    return (
        <div className="home">
            <main>
                <h1>Tripolia - Easiest way to book flight tickets</h1>
                <SearchFlight 
                    handleOnSubmit={handleOnSubmit}
                    roundtrip={true}
                    isRoundTripRequired={false}
                />
            </main>
        </div>
    )
}

export default Home;