import React from 'react';
import DataRow from './DataRow';

class DataTable extends React.Component {
    getContent = (details,paytmUrl,yatraUrl,goibiboUrl) => {
        let i = 0;
        const content = details.map((detail) => {
            return(
                <DataRow
                    key = {i++}
                    detail = {detail}
                    paytmUrl = {paytmUrl}
                    yatraUrl = {yatraUrl}
                    goibiboUrl = {goibiboUrl}
                />
            );
        });
        return content;
    }

    render() {
        if(!this.props.data) {
            return null;
        }
        else {
            const data = this.props.data.data;
            if(data.details.length === 0){
                return(
                    <div>
                        Flight Not Found!!!
                    </div>
                );
            }

            return(
                <table className="ui celled table">
                    <thead>
                        <tr>
                            <th>
                                Flight Name
                                <i  
                                    className="arrow alternate circle down icon" 
                                    onClick={() => {this.props.sort("flightName")}}
                                />
                                <i  
                                    className="arrow alternate circle up icon" 
                                    onClick={() => {this.props.sortReverse("flightName")}}
                                />
                            </th>
                            <th>
                                Departure Time
                                <i 
                                    className="arrow alternate circle down icon"
                                    onClick={() => {this.props.sort("departureTime")}} 
                                />
                                <i 
                                    className="arrow alternate circle up icon"
                                    onClick={() => {this.props.sortReverse("departureTime")}} 
                                />
                            </th>
                            <th>
                                Arrival Time
                                <i 
                                    className="arrow alternate circle down icon"
                                    onClick={() => {this.props.sort("arrivalTime")}}
                                />
                                <i 
                                    className="arrow alternate circle up icon"
                                    onClick={() => {this.props.sortReverse("arrivalTime")}}
                                />
                            </th>
                            <th>
                                Duration
                                <i 
                                    className="arrow alternate circle down icon" 
                                    onClick={() => {this.props.sort("duration")}}
                                />
                                <i 
                                    className="arrow alternate circle up icon" 
                                    onClick={() => {this.props.sortReverse("duration")}}
                                />
                            </th>
                            <th>Paytm Price</th>
                            <th>Yatra Price</th>
                            <th>Goibibo Price</th>
                            <th>
                                Suggession
                                <i 
                                    className="arrow alternate circle down icon" 
                                    onClick={() => {this.props.sort("price")}}
                                />
                                <i 
                                    className="arrow alternate circle up icon" 
                                    onClick={() => {this.props.sortReverse("price")}}
                                />
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.getContent(data.details,data.paytmUrl,data.yatraUrl,data.goibiboUrl)}
                    </tbody>
                </table>
            );
        }
    }
}

export default DataTable;