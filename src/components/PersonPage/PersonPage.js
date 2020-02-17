import React, {Component} from 'react'
import ItemList from "../ItemList";
import PersonDetails from "../PersonDetails";
import ErrorIndicator from "../ErrorIndicator";

export default class PersonPage extends Component {

    state = {
        selectedPersonId: null,
        hasErrors: false
    };

    componentDidCatch(error, errorInfo) {
        console.error(error, errorInfo);
        this.setState({
            hasErrors: true
        })
    }

    onPersonSelected = selectedPersonId => {
        this.setState({selectedPersonId})
    };

    render() {
        const {selectedPersonId, hasErrors} = this.state;

        if (hasErrors) {
            return <ErrorIndicator/>
        }

        return (
            <div>
                <div className="row mb2">
                    <div className="col-md-6 mb2">
                        <ItemList
                            onItemSelected={this.onPersonSelected}
                        />
                    </div>
                    <div className="col-md-6">
                        <PersonDetails
                            personId={selectedPersonId}
                        />
                    </div>
                </div>
            </div>
        )
    }
}