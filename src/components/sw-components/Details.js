import ItemDetails, {Record} from "../ItemDetails";
import React from "react";
import {SwapiServiceConsumer} from "../SwapiServiceContext";

const PersonDetails = ({itemId}) => (
    <SwapiServiceConsumer>
        {
            ({getPerson, getPersonImage}) => (
                <ItemDetails
                    itemId={itemId}
                    getData={getPerson}
                    getImageUrl={getPersonImage}
                >
                    <Record field="gender" label="Gender"/>
                    <Record field="birthYear" label="birthYear"/>
                    <Record field="eyeColor" label="Eye color"/>
                </ItemDetails>
            )
        }

    </SwapiServiceConsumer>

);

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

export {
    PersonDetails,
    PlanetDetails,
    StarshipDetails
}