import React from 'react';
import {SwapiServiceConsumer} from "../SwapiServiceContext";
import ItemDetails, {Record} from "../ItemDetails";

const PlanetDetails = ({itemId}) => (
    <SwapiServiceConsumer>
        {
            ({getPlanet, getPlanetImage}) => (
                <ItemDetails
                    itemId={itemId}
                    getData={getPlanet}
                    getImageUrl={getPlanetImage}
                >
                    <Record field="population" label="Population"/>
                    <Record field="rotationPeriod" label="Rotation period"/>
                    <Record field="diameter" label="Diameter"/>
                </ItemDetails>
            )
        }
    </SwapiServiceConsumer>

);

export default PlanetDetails