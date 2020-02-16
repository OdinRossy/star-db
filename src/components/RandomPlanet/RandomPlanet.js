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
        hasErrors: false
    };

    componentDidMount() {
        this.updatePlanet();
        this.interval = setInterval(this.updatePlanet, 10000)
    }

    componentWillUnmount() {
        clearInterval(this.interval)
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
            hasErrors: true,
            isLoaded: true
        })
    };

    updatePlanet = () => {
        this.setState({
            isLoaded: false
        });

        this.swapiService.getPlanet(this.swapiService.buildRandomId(0, 25, 3))
            .then(this.onPlanetLoaded)
            .catch(this.onError)
    };

    render() {
        const {planet, isLoaded, hasErrors} = this.state;
        const content = isLoaded ? hasErrors ? <ErrorIndicator/> : <PlanetView planet={planet}/> : <Spinner/>;

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