import React, {Component} from 'react'
import './App.css'

import Header from "../Header";
import ErrorIndicator from "../ErrorIndicator";
import Row from "../Row";
import ErrorBoundary from "../ErrorBoundary";
import ItemDetails from "../ItemDetails";
import SwapiService from "../../services/SwapiService";

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
                
            </ItemDetails>
        );

        const starshipDetails = (
            <ItemDetails
                itemId={5}
                getData={getStarship}
                getImageUrl={getStarshipImage}
            >

            </ItemDetails>
        );


        return (
            <div>
                <Header/>
                {/*{*/}
                {/*    showRandomPlanet ? <RandomPlanet/> : null*/}
                {/*}*/}

                {/*<button*/}
                {/*    className="toggle-planet btn btn-warning btn-lg"*/}
                {/*    onClick={this.toggleShowRandomPlanet}>*/}
                {/*    Toggle Random Planet*/}
                {/*</button>*/}

                {/*<PersonPage/>*/}

                <ErrorBoundary>
                    <Row leftElement={personDetails} rightElement={starshipDetails}/>
                </ErrorBoundary>

            </div>
        );
    }
}