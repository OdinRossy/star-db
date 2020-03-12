import React from 'react'

const Row = ({leftElement, rightElement}) => {
    return (
        <div>
            <div className="row mb2">
                <div className="col-md-6">
                    {leftElement}
                </div>
                <div className="col-md-6">
                    {rightElement}
                </div>
            </div>
        </div>
    )
};

export default Row