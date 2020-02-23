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

    render() {
        const {itemList, isLoaded, hasErrors} = this.state;

        return isLoaded ?
            hasErrors ? <ErrorIndicator/> :
                <ItemListView
                    itemList={itemList}
                    onItemSelected={this.props.onItemSelected}/> : <Spinner/>
    }
}

const ItemListView = ({itemList, onItemSelected}) => {
    const itemElements = itemList.map(item => (
        <li key={item.id}
            className="list-group-item"
            onClick={() => onItemSelected(item.id)}
        >{item.name}
        </li>
    ));

    return (
        <ul className="item-list list-group">
            {itemElements}
        </ul>
    );
};