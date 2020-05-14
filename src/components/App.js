import React from 'react';
import Form from './Form';
import Scrape from './Scrape';
import DataTable from './DataTable';

class App extends React.Component {

    state = {
        searchData : null,
        flightDetails: null,
        scrapeAgain: false
    }

    onSearch = (searchData) => {
        if(this.state.flightDetails) {
            this.setState({searchData: searchData, scrapeAgain:true});
        } 
        else {
            this.setState({searchData: searchData, scrapeAgain:false});
        }
    }

    onScrapedData = (flightDetails) => {
        this.setState({flightDetails: flightDetails, scrapeAgain:false});
    }



    render() {
        return(
            <div className="ui container">
                <Form 
                    onSearch = {this.onSearch}
                />
                <Scrape
                    data = {this.state.searchData}
                    scrapeAgain = {this.state.scrapeAgain}
                    scrapedData = {this.onScrapedData}
                />
                <DataTable
                    data = {this.state.flightDetails}
                    sort = {this.sortFlightDetails}
                    sortReverse = {this.sortReverseFlightDetails}
                />
            </div>
        );
    }

    preProcess = (duration) => {
        duration = duration.replace(' ','');
        duration = duration.replace('m','');
        duration = duration.replace('h', ':');
        duration = duration.split(':');

        if(duration.length === 1) {
            if(duration[0] < 10) {
                duration[0] = 0 + duration[0]
            }
            duration = "00:" + duration[0];
        }
        else {
            if(duration[0] < 10) {
                duration[0] = 0 + duration[0];
            }
            if(duration[1] < 10) {
                duration[1] = 0 + duration[1];
            }
            duration = duration[0]+":"+duration[1];
        }
        return duration;
    }

    sortFlightDetails = (attribute) => {

        const flightDetails = this.state.flightDetails;
        const details = flightDetails.data.details;

        if(attribute === 'duration') {
            for(let i=0; i<details.length -1; i++) {
                for(let j=i+1; j<details.length; j++) {
                    var temp1 = this.preProcess(details[i][attribute]);
                    var temp2 = this.preProcess(details[j][attribute]);

                    if(temp1.localeCompare(temp2) > 0) {
                        const temp = details[j];
                        details[j] = details[i];
                        details[i] = temp;
                    }  
                }
            }
        }
        else if(attribute === 'price') {
            for(let i=0; i<details.length -1; i++) {
                for(let j=i+1; j<details.length; j++) {
                    if(details[i].bestPrice.price > details[j].bestPrice.price) {
                        const temp = details[j];
                        details[j] = details[i];
                        details[i] = temp;
                    }  
                }
            }
        }
        else {
            for(let i=0; i<details.length -1; i++) {
                for(let j=i+1; j<details.length; j++) {
                    if(details[i][attribute].localeCompare(details[j][attribute]) > 0) {
                        const temp = details[j];
                        details[j] = details[i];
                        details[i] = temp;
                    }  
                }
            }
        }
        
        flightDetails.details = details;
        this.setState({flightDetails: flightDetails, scrapeAgain:false});
    }

    sortReverseFlightDetails = (attribute) => {

        const flightDetails = this.state.flightDetails;
        const details = flightDetails.data.details;

        if(attribute === 'duration') {
            for(let i=0; i<details.length -1; i++) {
                for(let j=i+1; j<details.length; j++) {
                    var temp1 = this.preProcess(details[i][attribute]);
                    var temp2 = this.preProcess(details[j][attribute]);

                    if(temp1.localeCompare(temp2) < 0) {
                        const temp = details[j];
                        details[j] = details[i];
                        details[i] = temp;
                    }  
                }
            }
        }
        else if(attribute === 'price') {
            for(let i=0; i<details.length -1; i++) {
                for(let j=i+1; j<details.length; j++) {
                    if(details[i].bestPrice.price < details[j].bestPrice.price) {
                        const temp = details[j];
                        details[j] = details[i];
                        details[i] = temp;
                    }  
                }
            }
        }
        else {
            for(let i=0; i<details.length -1; i++) {
                for(let j=i+1; j<details.length; j++) {
                    if(details[i][attribute].localeCompare(details[j][attribute]) < 0) {
                        const temp = details[j];
                        details[j] = details[i];
                        details[i] = temp;
                    }  
                }
            }
        }
        
        flightDetails.details = details;
        this.setState({flightDetails: flightDetails, scrapeAgain:false});
    }


}

export default App;