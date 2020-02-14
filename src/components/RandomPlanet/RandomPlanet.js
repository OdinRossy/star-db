import React, {Component, Fragment} from 'react'
import './RandomPlanet.css'

import SwapiService from "../../services/SwapiService";
import Spinner from "../Spinner";
import ErrorIndicator from "../ErrorIndicator";

export default class RandomPlanet extends Component {

    swapiService = new SwapiService();

    state = {
        planet: {},
        isLoaded: false,
        error: false
    };

    componentDidMount() {
        this.updatePlanet()
    }

    onPlanetLoaded = planet => {
        this.setState({
            planet,
            isLoaded: true
        })
    };

    onError = error => {
        console.error(error);
        this.setState({
            error: true,
            isLoaded: true
        })
    };

    updatePlanet = () => {
        const id = this.swapiService.buildRandomId(0,25,3);
        this.swapiService.getPlanet(id)
            .then(this.onPlanetLoaded)
            .catch(this.onError)
    };

    render() {
        const {planet, isLoaded, error} = this.state;
        const content = isLoaded ? error ? <ErrorIndicator/> : <PlanetView planet={planet}/> : <Spinner/>;

        return (
            <div className="random-planet jumbotron rounded">
                {content}
            </div>
        );
    }
}

const PlanetView = ({planet: {id, name, population, rotationPeriod, diameter}}) => {
    return (
        <Fragment>
            <img className="planet-image"
                 src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`}
                 alt="Loading.."/>
            <div>
                <h4>{name}</h4>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                        <span className="term">Population: </span>
                        <span>{population}</span>
                    </li>
                    <li className="list-group-item">
                        <span className="term">Rotation Period: </span>
                        <span>{rotationPeriod}</span>
                    </li>
                    <li className="list-group-item">
                        <span className="term">Diameter: </span>
                        <span>{diameter}</span>
                    </li>
                </ul>
            </div>
        </Fragment>
    )
};