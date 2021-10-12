import React from "react";

/**
 * Renders information about Ramen Truck orders
 */
export const RamenOrders = (props) => {
    return (
        <div id="profile-div">
            <p><strong>Bowl Size: </strong> {props.ramenData.bowlSize}</p>
            <p><strong>Bowl Type: </strong> {props.ramenData.bowlType}</p>
            <p><strong>Toppings: </strong> 
                {
                    props.ramenData.toppings
                }
            </p>
        </div>
    );
};