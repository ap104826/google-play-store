import React from 'react';
import moment from 'moment';

export default function StoreApp(props) {
    return (
        <div className="Apps">
            <h2>{props.App}</h2>
            <div>Genre: {props.Genres}</div>
            <div>Rating:{props.Rating}</div>
        </div>
    )
}