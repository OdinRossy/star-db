import React from 'react'
import {withSwapiService} from "../hoc-helpers";
import ItemDetails, {Record} from "../ItemDetails";

const PersonDetails = props => (
    <ItemDetails {...props}>
        <Record field="gender" label="Gender"/>
        <Record field="birthYear" label="birthYear"/>
        <Record field="eyeColor" label="Eye color"/>
    </ItemDetails>
);

const mapMethodsToProps = swapiService => {
    return {
        getData: swapiService.getPerson,
        getImageUrl: swapiService.getPersonImage
    }
};

export default withSwapiService(PersonDetails, mapMethodsToProps)