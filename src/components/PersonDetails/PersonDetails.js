import React, {Component} from 'react'
import './PersonDetails.css'
import SwapiService from "../../services/SwapiService";
import Spinner from "../Spinner";
import ErrorIndicator from "../ErrorIndicator";

export default class PersonDetails extends Component {

    swapiService = new SwapiService();

    state = {
        person: null,
        personLoaded: false,
        hasErrors: false
    };

    componentDidMount() {
        this.updatePerson()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.personId !== prevProps.personId) {
            this.updatePerson()
        }
    }

    updatePerson = () => {
        const {personId} = this.props;
        const {person} = this.state;

        if (person) {
            this.setState({person: null})
        }

        if (personId) {
            this.setState({personLoaded: false});
            this.swapiService.getPerson(personId)
                .then(this.onPersonLoaded)
                .catch(this.onError)
        }
    };

    onPersonLoaded = person => {
        this.setState({
            person,
            personLoaded: true
        })
    };

    onError = error => {
        console.error(error);
        this.setState({
            hasErrors: true,
            personLoaded: true
        })
    };

    render() {
        const {person, personLoaded, hasErrors} = this.state;
        return !personLoaded ? <Spinner/> : hasErrors || !person ? <ErrorIndicator/> : <PersonView person={person}/>
    }
}

const PersonView = ({person: {id, name, gender, birthYear, eyeColor}}) => {
    return (
        <div className="person-details card">
            <img className="person-image"
                 alt="Loading"
                 src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`}/>

            <div className="card-body">
                <h4>{name}</h4>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                        <span className="term">Gender</span>
                        <span>{gender}</span>
                    </li>
                    <li className="list-group-item">
                        <span className="term">Birth Year</span>
                        <span>{birthYear}</span>
                    </li>
                    <li className="list-group-item">
                        <span className="term">Eye Color</span>
                        <span>{eyeColor}</span>
                    </li>
                </ul>
            </div>
        </div>
    )
};