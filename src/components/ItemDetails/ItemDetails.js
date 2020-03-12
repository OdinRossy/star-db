import React, {Component} from 'react'
import './ItemDetails.css'
import SwapiService from "../../services/SwapiService";
import Spinner from "../Spinner";
import ErrorIndicator from "../ErrorIndicator";

const Record = ({item, field, label}) => {
    return (
        <li className="list-group-item">
            <span className="term">{label}</span>
            <span>{item[field]}</span>
        </li>
    )
};

export {
    Record
}

export default class ItemDetails extends Component {

    swapiService = new SwapiService();

    state = {
        item: null,
        itemLoaded: false,
        hasErrors: false,
        image: null
    };

    componentDidMount() {
        this.updateItem()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.itemId !== prevProps.itemId) {
            this.updateItem()
        }
    }

    updateItem = () => {
        const {itemId, getData, getImageUrl} = this.props;
        const {item} = this.state;

        if (item) {
            this.setState({item: null})
        }

        if (itemId) {
            this.setState({itemLoaded: false});
            getData(itemId)
                .then(this.onItemLoaded)
                .catch(this.onError)
        }
    };

    onItemLoaded = item => {
        this.setState({
            item,
            itemLoaded: true,
            image: this.props.getImageUrl(item)
        })
    };

    onError = error => {
        console.error(error);
        this.setState({
            hasErrors: true,
            itemLoaded: true
        })
    };

    render() {
        const {item, itemLoaded, hasErrors, image} = this.state;
        return !itemLoaded ? <Spinner/> : hasErrors || !item ? <ErrorIndicator/> : (
            <div className="item-details card border-secondary">
                <img className="person-image"
                     alt="Loading"
                     src={image}/>

                <div className="card-body">
                    <h4>{item.name}</h4>
                    <ul className="list-group list-group-flush">
                        {
                            React.Children.map(this.props.children, child => {
                                return child
                            })
                        }
                    </ul>
                </div>
            </div>
        )
    }
}