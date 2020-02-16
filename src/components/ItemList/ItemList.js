import React, {Component} from 'react'
import './ItemList.css'
import SwapiService from "../../services/SwapiService";
import Spinner from "../Spinner";
import ErrorIndicator from "../ErrorIndicator";

export default class ItemList extends Component {

    swapiService = new SwapiService();

    state = {
        peopleList: null,
        peopleListLoaded: false,
        error: false
    };

    componentDidMount() {
        this.swapiService.getAllPeople()
            .then(peopleList => {
                this.setState({peopleList, peopleListLoaded: true});
                this.updateSelectedItem();
            })
            .catch(error => this.setState({error: true, peopleListLoaded: true}));
    }

    updateSelectedItem = () => {
        const {peopleList} = this.state;

        if (peopleList && peopleList.length > 0) {
            this.props.onItemSelected(peopleList[0].id)
        }
    };

    render() {
        const {peopleList, peopleListLoaded, error} = this.state;

        const buildItems = peopleList => {
            return peopleList.map(person => (
                <li key={person.id}
                    className="list-group-item"
                    onClick={() => this.props.onItemSelected(person.id)}
                >{person.name}
                </li>
            ))
        };

        if (!peopleListLoaded) {
            return <Spinner/>
        }

        if (error) {
            return <ErrorIndicator/>
        }

        return (
            <ul className="item-list list-group">
                {buildItems(peopleList)}
            </ul>
        );
    }
}