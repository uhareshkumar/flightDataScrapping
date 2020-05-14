import React from 'react';
import Segment from './Segment';
import DataList from './DataList';

class Form extends React.Component {
    getInMonth(month) {
        switch(month){
            case 0: return '01';
            case 1: return '02';
            case 2: return '03';
            case 3: return '04';
            case 4: return '05';
            case 5: return '06';
            case 6: return '07';
            case 7: return '08';
            case 8: return '09';
            case 9: return '10';
            case 10: return '11';
            case 11: return '12';
            default: return '0';
        }
    }

    state = {
      date: `${new Date().getFullYear()}-${this.getInMonth(new Date().getMonth())}-${new Date().getDate()}`,
      from: '',
      to: '',
      error: ''  
    };

    onFormSubmit = (event) => {
        event.preventDefault();
        if(this.state.date === '' || this.state.from === '' || this.state.to === '') {
            this.setState({error:'Enter all the details...'});
        }
        else {
            const temp1 = this.state.from.split('-');
            const temp2 = this.state.to.split('-');
            var error = '';
            if(temp1.length !== 4) {
                
                if(temp2.length !== 4) {
                    error = 'Enter Valid Form & To details';
                }
                else {
                    error = 'Enter Valid Form details';
                }
                this.setState({error:error});
            }
            else if(temp2.length !== 4) {
                error = 'Enter Valid To details';
                this.setState({error:error});
            }
            else {
                this.setState({error:''});
                this.props.onSearch(this.state);
            }
        }
    };

    onChangeDate = (event) => {
        this.setState({date:event.target.value});
    }

    onChangeFrom = (event) => {
        this.setState({from:event.target.value});
    }

    onChangeTo = (event) => {
        this.setState({to:event.target.value});
    }

    render() {
        return(
            <div className="ui segment">
                <form className="ui form" onSubmit={this.onFormSubmit} >
                    <div className="ui field">
                        <label>Flight Search</label>
                    </div>
                    <div className="ui horizontal segments">
                        <Segment> 
                            <label>Date</label>
                            <input 
                                type="date"
                                value={this.state.date}
                                onChange={this.onChangeDate} 
                            />
                        </Segment>

                        <Segment>
                            <label>From</label>
                            <input 
                                type="text"
                                value={this.state.from}
                                onChange={this.onChangeFrom}
                                list="from" 
                            />
                            <DataList
                                id="from" 
                            />
                        </Segment>
        
                        <Segment>
                            <label>To</label>
                            <input 
                                type="text"
                                value={this.state.to}
                                onChange={this.onChangeTo}
                                list="to"
                            />
                            <DataList
                                id="to" 
                            />
                        </Segment>
                        
                        <Segment>
                            <label>Submit</label>
                            <input 
                                className="ui primary button" 
                                type="Submit" 
                            />
                        </Segment>
                    </div>   
                </form>
                <div>{this.state.error}</div>
            </div>
        );
    }
}

export default Form;