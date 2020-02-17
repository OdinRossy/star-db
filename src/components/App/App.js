import React, {Component} from 'react'
import './App.css'

import Header from "../Header";
import RandomPlanet from "../RandomPlanet";
import PersonPage from "../PersonPage";
import ErrorIndicator from "../ErrorIndicator";

export default class App extends Component {

    state = {
        showRandomPlanet: true,
        hasErrors: false
    };

    componentDidCatch(error, errorInfo) {
        console.error(error, errorInfo);
        this.setState({
            hasErrors: true
        })
    }

    toggleShowRandomPlanet = () => {
        this.setState(({showRandomPlanet}) => {
            return {
                showRandomPlanet: !showRandomPlanet
            }
        })
    };

    render() {
        const {showRandomPlanet, hasErrors} = this.state;

        if (hasErrors) {
            return <ErrorIndicator/>
        }

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

                <PersonPage/>

            </div>
        );
    }
}