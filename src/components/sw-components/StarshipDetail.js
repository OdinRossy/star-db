import React from 'react'
import {SwapiServiceConsumer} from "../SwapiServiceContext";
import ItemDetails, {Record} from "../ItemDetails";

const StarshipDetails = ({itemId}) => (
    <SwapiServiceConsumer>
        {
            ({getStarship, getStarshipImage}) => (
                <ItemDetails
                    itemId={itemId}
                    getData={getStarship}
                    getImageUrl={getStarshipImage}
                >
                    <Record field="model" label="Model"/>
                    <Record field="length" label="Length"/>
                    <Record field="costInCredits" label="Cost"/>
                </ItemDetails>
            )
        }
    </SwapiServiceConsumer>
);

export default StarshipDetails