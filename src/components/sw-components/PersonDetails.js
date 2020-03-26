import React from 'react'
import {withSwapiService} from "../hoc-helpers";
import ItemDetails, {Record} from "../ItemDetails";

const PersonDetails = ({itemId, swapiService}) => (
    <ItemDetails
        itemId={itemId}
        getData={swapiService.getPerson}
        getImageUrl={swapiService.getPersonImage}
    >
        <Record field="gender" label="Gender"/>
        <Record field="birthYear" label="birthYear"/>
        <Record field="eyeColor" label="Eye color"/>
    </ItemDetails>
);

export default withSwapiService(PersonDetails)