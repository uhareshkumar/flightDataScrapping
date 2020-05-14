import React from 'react';

const Segment = ({children}) => {
    return(
        <div className="ui segment">
            <div className="ui field">
                {children}
            </div>
        </div>
    );
}

export default Segment;