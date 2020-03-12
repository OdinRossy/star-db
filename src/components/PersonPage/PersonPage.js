import React, {Component} from 'react'
import ItemList from "../ItemList";
import ItemDetails from "../ItemDetails";
import SwapiService from "../../services/SwapiService";
import Row from "../Row";
import ErrorBoundary from "../ErrorBoundary";

export default class PersonPage extends Component {

    swapiService = new SwapiService();

    state = {
        selectedPersonId: null,
    };

    onPersonSelected = selectedPersonId => {
        this.setState({selectedPersonId})
    };

    render() {
        const {selectedPersonId} = this.state;

        const itemList = (
            <ItemList
                onItemSelected={this.onPersonSelected}
                getData={this.swapiService.getAllPeople}
            >{({name, gender, birthYear}) => `${name} (${gender}, ${birthYear})`}
            </ItemList>
        );

        const personDetails = (
            <ErrorBoundary>
                <ItemDetails itemId={selectedPersonId}/>
            </ErrorBoundary>
        );

        return (
            <Row leftElement={itemList} rightElement={personDetails}/>
        )
    }
}