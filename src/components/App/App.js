import React, {Component} from 'react'
import './App.css'

import Header from "../Header";
import RandomPlanet from "../RandomPlanet";
import ItemList from "../ItemList";
import PersonDetails from "../PersonDetails";

export default class App extends Component {

    state = {
        showRandomPlanet: true,
        selectedPersonId: null,
    };

    toggleShowRandomPlanet = () => {
        this.setState(({showRandomPlanet}) => {
            return {
                showRandomPlanet: !showRandomPlanet
            }
        })
    };

    onPersonSelected = selectedPersonId => {
        this.setState({selectedPersonId})
    };

    render() {
        const {showRandomPlanet, selectedPersonId} = this.state;
        return (
            <div>
                <Header/>
                {
                    showRandomPlanet ? <RandomPlanet/> : null
                }

                <button
                    className="toggle-planet btn btn-warning btn-lg"
                    onClick={this.toggleShowRandomPlanet}>
                    Toggle Random Planet
                </button>

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
        );
    }
}