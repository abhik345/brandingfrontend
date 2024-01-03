
import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const MapComponent = () => {
    const [position, setPosition] = useState(null);

    const handleMapClick = (e) => {
        setPosition([e.latlng.lat, e.latlng.lng]);

    };
    console.log(position)
    return (
        <div>
            <h1>Click on the map to get latitude and longitude</h1>
            <div className="mapouter">
                <div className="gmap_canvas">
                    <iframe
                        src="https://maps.google.com/maps?q=&amp;t=&amp;z=13&amp;ie=UTF8&amp;iwloc=&amp;output=embed"
                        frameBorder="0" scrolling="no"></iframe>


                </div>
            </div>
        </div>
    );
};

export default MapComponent;
