import React, {Component} from 'react'
import './App.css'

import Header from "../Header";
import ErrorIndicator from "../ErrorIndicator";
import SwapiService from "../../services/SwapiService";
import RandomPlanet from "../RandomPlanet";
import {PersonDetails, PersonList, PlanetDetails, PlanetList, StarshipDetails, StarshipList} from "../sw-components";
import ErrorBoundary from "../ErrorBoundary";
import Row from "../Row";

export default class App extends Component {

    swapiService = new SwapiService();

    state = {
        showRandomPlanet: false,
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

                <ErrorBoundary>
                    <Row leftElement={(
                        <PersonList/>
                    )} rightElement={<PersonDetails itemId={11}/>}/>
                </ErrorBoundary>

                <ErrorBoundary>
                    <Row leftElement={(
                        <StarshipList/>
                    )} rightElement={<StarshipDetails itemId={5}/>}/>
                </ErrorBoundary>

                <ErrorBoundary>
                    <Row leftElement={(
                        <PlanetList/>
                    )} rightElement={<PlanetDetails itemId={5}/>}/>
                </ErrorBoundary>

            </div>
        );
    }
}