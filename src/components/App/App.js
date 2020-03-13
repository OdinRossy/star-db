import React, {Component} from 'react'
import './App.css'

import Header from "../Header";
import ErrorIndicator from "../ErrorIndicator";
import ItemDetails, {Record} from "../ItemDetails";
import SwapiService from "../../services/SwapiService";
import PersonPage from "../PersonPage";
import RandomPlanet from "../RandomPlanet";

export default class App extends Component {

    swapiService = new SwapiService();

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

        const {getPerson, getStarship, getPersonImage, getStarshipImage} = this.swapiService;

        const personDetails = (
            <ItemDetails
                itemId={11}
                getData={getPerson}
                getImageUrl={getPersonImage}
            >
                <Record field="gender" label="Gender"/>
                <Record field="birthYear" label="birthYear"/>
                <Record field="eyeColor" label="Eye color"/>
            </ItemDetails>
        );

        const starshipDetails = (
            <ItemDetails
                itemId={5}
                getData={getStarship}
                getImageUrl={getStarshipImage}
            >
                <Record field="model" label="Model"/>
                <Record field="length" label="Length"/>
                <Record field="costInCredits" label="Cost"/>
            </ItemDetails>
        );


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

                {/*<ErrorBoundary>*/}
                {/*    <Row leftElement={personDetails} rightElement={starshipDetails}/>*/}
                {/*</ErrorBoundary>*/}

            </div>
        );
    }
}