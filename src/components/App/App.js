import React, {Component} from 'react'
import './App.css'

import Header from "../Header";
import RandomPlanet from "../RandomPlanet";
import ItemList from "../ItemList";
import PersonDetails from "../PersonDetails";

export default class App extends Component {

    state = {
        showRandomPlanet: true
    };

    toggleShowRandomPlanet = () => {
        this.setState(({showRandomPlanet}) => {
            return {
                showRandomPlanet: !showRandomPlanet
            }
        })
    };

    render() {
        return (
            <div>
                <Header/>
                {
                    this.state.showRandomPlanet ? <RandomPlanet/> : null
                }

                <button
                    className="toggle-planet btn btn-warning btn-lg"
                    onClick={this.toggleShowRandomPlanet}>
                    Toggle Random Planet
                </button>

                <div className="row mb2">
                    <div className="col-md-6 mb2">
                        <ItemList/>
                    </div>
                    <div className="col-md-6">
                        <PersonDetails/>
                    </div>
                </div>
            </div>
        );
    }
}