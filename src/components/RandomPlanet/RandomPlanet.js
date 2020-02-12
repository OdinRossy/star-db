import React, {Component, Fragment} from 'react'
import './RandomPlanet.css'

import SwapiService from "../../services/SwapiService";
import Spinner from "../Spinner";

export default class RandomPlanet extends Component {

    swapiService = new SwapiService();

    state = {
        planet: {},
        isLoaded: false
    };

    componentDidMount() {
        this.updatePlanet()
    }

    onPlanetLoaded = (planet) => {
        this.setState({
            planet,
            isLoaded: true
        })
    };

    updatePlanet() {
        const id = Math.floor(Math.random() * 25) + 2;
        this.swapiService.getPlanet(id)
            .then(this.onPlanetLoaded)
    }

    render() {
        const {planet, isLoaded} = this.state;
        const content = isLoaded ? <PlanetView planet={planet}/> : <Spinner/>;

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