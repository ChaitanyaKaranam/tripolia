import { timeConversion } from "./utils";

// Filter flight results
export function filterFlightResults(filters, flights) {

    console.log(filters);
    console.log(flights);

    let filtereddata;

    // Filter by date
    let filteredbydate = filterByDate(filters, flights);

    // Find connecting flights
    let connectingFlights = findConnectingFlights(filters, filteredbydate);

    // Find nonstop airlines
    filtereddata = findNonStopAirlines(filters, filteredbydate);    

    // Sort by time
    filtereddata = sortByTime(filtereddata);

    // Add connecting flights
    filtereddata.push(connectingFlights);

    return filtereddata;
}

// Filter flights by date
export function findNonStopAirlines(filters, flights) {
    const { from, to } = filters;
    return flights
        .filter(flight =>
            flight && flight.origin && flight.destination && flight.date &&
            flight.origin.toLowerCase().includes(from.toLowerCase()) &&
            flight.destination.toLowerCase().includes(to.toLowerCase())
        )
}

export function filterByDate(filters, flights) {
    const { departure } = filters;
    return flights
            .filter(flight => new Date(flight.date).toDateString() === new Date(departure).toDateString())
}

export function filterByDestination(filters, flights) {
    const { to } = filters;
    return flights
            .filter(flight => flight.destination.toLowerCase().includes(to.toLowerCase()))
}

export function filterbyOrigin(filters, flights) {
    const { from } = filters;
    return flights
            .filter(flight => flight.destination.toLowerCase().includes(from.toLowerCase()))
}

// Fitler flights by time
export function sortByTime(flights) {
    return flights.sort((a, b) => Date.parse(`01/01/2020 ${a.departureTime}`) - Date.parse(`01/01/2020 ${b.departureTime}`))
}

export function findConnectingFlights(filters, flights) {
    const { from } = filters;

    // Find all the airlines to destination
    let multiairlines = filterByDestination(filters, flights);

    // Filter direct flights
    let indirectflights = multiairlines.filter(airline => !airline.origin.toLowerCase().includes(from.toLowerCase()));

    // Find unique indirect origins
    let indirectorigins = Array.from(new Set(indirectflights.map(airline => airline.origin)));

    // Flight reaching connecting destination
    let indirectdestinations = indirectorigins.map(origin => {
        return findNonStopAirlines({ from , to: origin }, flights);
    })
    indirectdestinations = indirectdestinations.flat();

    // Finding connecting flights
    let connectingflights = []
    let MINIMUM_LAYOVER_TIME = 30.0;
    indirectdestinations.forEach(flight => {
        for(let inflight of indirectflights){
            if(flight.destination.toLowerCase().includes(inflight.origin.toLowerCase())){
                if(timeConversion(Date.parse(`01/01/2020 ${inflight.departureTime}`) - Date.parse(`01/01/2020 ${flight.arrivalTime}`), 'minutes') > MINIMUM_LAYOVER_TIME){
                    connectingflights.push([flight, inflight])
                }
            }
        }
    })

    return connectingflights;
}

// Get flight metadata
export function getFlightMetadata(flights, formdata) {
    let flightcount = 0;
    let date = '';
    flights.forEach(flight => {
        if(Array.isArray(flight)){
            if(!date){
                if(flight.length > 0){
                    date = flight[0][0]['date']
                }
            }
            flightcount += flight.length;
        }else{
            if(!date){
                date = flight.date
            }
            flightcount += 1;
        }
    })

    console.log(formdata);

    date = new Date(date).toLocaleDateString("en-us", { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric'});

    return {
        flightcount,
        date: flightcount > 0 ? date : '',
        from : formdata['from'],
        to: formdata['to']
    }
}