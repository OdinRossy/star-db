import React, {Component} from 'react'
import ItemList from "../ItemList";
import PersonDetails from "../PersonDetails";
import ErrorIndicator from "../ErrorIndicator";
import SwapiService from "../../services/SwapiService";

export default class PersonPage extends Component {

    swapiService = new SwapiService();

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
                            getData={this.swapiService.getAllPeople}
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