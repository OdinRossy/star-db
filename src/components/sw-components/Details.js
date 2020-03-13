import ItemDetails, {Record} from "../ItemDetails";
import React from "react";
import SwapiService from "../../services/SwapiService";

const swapiService = new SwapiService();

const {
    getPerson,
    getPlanet,
    getStarship,
    getPersonImage,
    getPlanetImage,
    getStarshipImage
} = swapiService;

const PersonDetails = ({itemId}) => (
    <ItemDetails
        itemId={itemId}
        getData={getPerson}
        getImageUrl={getPersonImage}
    >
        <Record field="gender" label="Gender"/>
        <Record field="birthYear" label="birthYear"/>
        <Record field="eyeColor" label="Eye color"/>
    </ItemDetails>
);

const PlanetDetails = ({itemId}) => (
    <ItemDetails
        itemId={itemId}
        getData={getPlanet}
        getImageUrl={getPlanetImage}
    >
        <Record field="population" label="Population"/>
        <Record field="rotationPeriod" label="Rotation period"/>
        <Record field="diameter" label="Diameter"/>
    </ItemDetails>
);

const StarshipDetails = ({itemId}) => (
    <ItemDetails
        itemId={itemId}
        getData={getStarship}
        getImageUrl={getStarshipImage}
    >
        <Record field="model" label="Model"/>
        <Record field="length" label="Length"/>
        <Record field="costInCredits" label="Cost"/>
    </ItemDetails>
);

export {
    PersonDetails,
    PlanetDetails,
    StarshipDetails
}