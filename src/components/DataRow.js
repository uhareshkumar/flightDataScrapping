import React from 'react';

const DataRow = (props) => {
    const getLink = (price, url) => {
        if(price === 'Not Found\r') {
            return price;
        }
        else {
            return(
                <a target="_blank" rel="noopener noreferrer" href={url}>
                    {price}
                </a>
            );
        }
    };

    return(
        <tr>
            <th>{props.detail.flightName}</th>
            <th>{props.detail.departureTime}</th>
            <th>{props.detail.arrivalTime}</th>
            <th>{props.detail.duration}</th>
            <th>
                {
                    getLink(props.detail.paytmPrice,props.paytmUrl)
                }
            </th>
            <th>
                {
                    getLink(props.detail.yatraPrice,props.yatraUrl)    
                }
            </th>
            <th>
                {
                    getLink(props.detail.goibiboPrice,props.goibiboUrl)
                }
            </th>
            <th>
                <a target="_blank" rel="noopener noreferrer" href={props.detail.bestPrice.url}>
                    {(props.detail.bestPrice.priceInString+' - '+props.detail.bestPrice.company)}
                </a>
            </th>
        </tr>
    );
};

export default DataRow;