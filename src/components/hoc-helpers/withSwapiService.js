import React from 'react'
import {SwapiServiceConsumer} from '../SwapiServiceContext'

const withSwapiService = (Wrapped, mapMethodsToProps) => {
    return props => (
        <SwapiServiceConsumer>
            {
                swapiService =>
                    <Wrapped {...props} {...mapMethodsToProps(swapiService)}/>
            }
        </SwapiServiceConsumer>
    )
};

export default withSwapiService;