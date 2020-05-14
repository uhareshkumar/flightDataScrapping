import React from 'react';
import Scrapper from '../api/Scrapper';

class Scrape extends React.Component {

    state = {
        flightDetails: null,
        isScraping: false
    };

    getData() {

        const {date,from,to} = this.props.data;
        var dateData = date.split('-');
        const dateInNum = dateData[2];
        const month = dateData[1];
        const year = dateData[0];

        var fromData = from.split('-');
        const fromAirportCity = fromData[0];
        const fromAirportCode = fromData[1];
        const fromCountryName = fromData[2];
        const fromCountryCode = fromData[3];

        var toData = to.split('-');
        const toAirportCity = toData[0];
        const toAirportCode = toData[1];
        const toCountryName = toData[2];
        const toCountryCode = toData[3];

        return {
            dateInNum,
            month,
            year,
            fromAirportCity,
            fromAirportCode,
            fromCountryName,
            fromCountryCode,
            toAirportCity,
            toAirportCode,
            toCountryName,
            toCountryCode
        };
    }

    getScrappedData = async() => {
        this.setState({isScraping: true});
        const details = await Scrapper.post('/getFlights', this.getData());
        console.log(details);
        this.setState({
            flightDetails: details
        });
        this.props.scrapedData(this.state.flightDetails);
        this.setState({isScraping: false});
    }

    componentDidUpdate = () => {
        if(this.props.data && !this.state.flightDetails && !this.state.isScraping) {
            this.getScrappedData();
        }
        else if(this.props.data && this.state.flightDetails && !this.state.isScraping && this.props.scrapeAgain) {
            this.getScrappedData();
        }
    }

    render() {

        if(this.props.data) {
            if(this.state.flightDetails && !this.state.isScraping) {    
                return null;
            }
            else {
                return (
                    <div className="ui segment" style={{height:"20vh"}}>
                        <div className="ui active dimmer">
                            <div className="ui text loader">Hold On Best Fare is Loading...</div>
                        </div>
                        <p></p>
                    </div>
            );}    
        }
        else{
            return null;
        }
    }  
};

export default Scrape;