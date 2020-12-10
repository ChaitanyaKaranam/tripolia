import { useEffect, useState } from "react";
import SearchSelect from "../components/SearchSelect";
import { LOCATIONS } from "../config/locations";

function Home() {

    let [ suggestions, setSuggestions ] = useState([]);

    useEffect(() => {
        setSuggestions(LOCATIONS.map(location => {
            return {
                'searchquery': `${location.city}-${location.code}`,
                'display': location.city
            }
        }))
    }, [])

    return (
        <div className="home">
            <main>
                <h1>Tripolia - Easiest way to book flight tickets</h1>
                <form>
                    <div className="form-fields">
                        <SearchSelect 
                            name="from" 
                            label="From" 
                            isRequired={true}
                            suggestions={suggestions}
                        />
                        <SearchSelect
                            name="to"
                            label="To"
                            isRequired={true}
                            suggestions={suggestions}
                        />
                        <div className="input-field">
                            <label htmlFor="departure">Departure</label>
                            <input id="departure" type="date" name="departure" min={new Date().toLocaleDateString('sv-SE')} required/>
                        </div>
                        <div className="input-field">
                            <label htmlFor="arrival">Arrival</label>
                            <input id="arrival" type="date" name="arrival" min={new Date().toLocaleDateString('sv-SE')}/>
                        </div>
                    </div>
                    <div>
                        <button type="submit" className="primary">Fetch Flights</button>
                    </div>
                </form>
            </main>
        </div>
    )
}

export default Home;