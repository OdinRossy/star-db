import React from 'react'
import './ItemList.css'

const ItemList = props => {
    const {onItemSelected, data, children: renderLabel} = props;

    const renderItems = () => {
        return data.map(item => (
                <li key={item.id}
                    className="list-group-item"
                    onClick={() => onItemSelected(item.id)}
                >{renderLabel(item)}
                </li>
            )
        )
    };

    return (
        <ul className="item-list list-group">
            {renderItems(data)}
        </ul>
    )
};

export default ItemList