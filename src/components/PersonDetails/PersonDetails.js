import React, {Component} from 'react'
import './PersonDetails.css'
import SwapiService from "../../services/SwapiService";
import Spinner from "../Spinner";

export default class PersonDetails extends Component {

    swapiService = new SwapiService();

    state = {
        person: null
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
        if (personId) {
            this.swapiService.getPerson(personId)
                .then(person => this.setState({person}))
        }
    };

    render() {
        const {person} = this.state;

        if (person) {
            const {id, name, gender, birthYear, eyeColor} = person;
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
        } else {
            return (
                <Spinner/>
            )
        }
    }
}