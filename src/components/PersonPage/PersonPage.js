import React, {Component} from 'react'
import ItemList from "../ItemList";
import PersonDetails from "../PersonDetails";
import ErrorIndicator from "../ErrorIndicator";
import SwapiService from "../../services/SwapiService";
import Row from "../Row";

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

        const itemList = (
            <ItemList
                onItemSelected={this.onPersonSelected}
                getData={this.swapiService.getAllPeople}
                renderItem={({name, gender, birthYear}) => `${name} (${gender}, ${birthYear})`}
            />
        );

        const personDetails = (
            <PersonDetails
                personId={selectedPersonId}
            />
        );

        return <Row leftElement={itemList} rightElement={personDetails}/>
    }
}