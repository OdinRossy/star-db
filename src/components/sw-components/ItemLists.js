import React from 'react'
import SwapiService from "../../services/SwapiService";
import withData from "../hoc-helpers";
import ItemList from "../ItemList";

const swapiService = new SwapiService();

const {
    getAllPeople,
    getAllPlanets,
    getAllStarships
} = swapiService;

const withChildFunction = (Wrapped, fn) => {
    return (props) => <Wrapped {...props}>{fn}</Wrapped>
};

const renderName = ({name}) => <span>{name}</span>;

const renderModelAndName = ({model, name}) => <span>{name} ({model })</span>;

const PersonList = withData(
    withChildFunction(ItemList, renderName), getAllPeople);
const PlanetList = withData(
    withChildFunction(ItemList, renderName), getAllPlanets);
const StarshipList = withData(
    withChildFunction(ItemList, renderModelAndName), getAllStarships);

export {
    PersonList,
    PlanetList,
    StarshipList
}