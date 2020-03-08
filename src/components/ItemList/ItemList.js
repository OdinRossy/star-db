import React, {Component} from 'react'
import './ItemList.css'
import Spinner from "../Spinner";
import ErrorIndicator from "../ErrorIndicator";

export default class ItemList extends Component {

    state = {
        itemList: null,
        isLoaded: false,
        hasErrors: false
    };

    componentDidMount() {
        const {getData} = this.props;

        getData()
            .then(this.onItemListLoaded)
            .catch(this.onError);
    }

    updateSelectedItem = () => {
        const {itemList} = this.state;

        if (itemList && itemList.length > 0) {
            this.props.onItemSelected(itemList[0].id)
        }
    };

    onItemListLoaded = itemList => {
        this.setState({itemList, isLoaded: true});
        this.updateSelectedItem();
    };

    onError = error => {
        console.error(error);
        this.setState({hasErrors: true, isLoaded: true})
    };

    renderItems = (items, onItemSelected) => {
        return items.map(item => (
                <li key={item.id}
                    className="list-group-item"
                    onClick={() => onItemSelected(item.id)}
                >{this.props.children(item)}
                </li>
            )
        )
    };

    render() {
        const {itemList, isLoaded, hasErrors} = this.state;

        return isLoaded ? hasErrors ? <ErrorIndicator/> :
            <ul className="item-list list-group">
                {this.renderItems(itemList, this.props.onItemSelected)}
            </ul> : <Spinner/>
    }
}