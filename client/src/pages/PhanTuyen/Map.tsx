import React, {useState} from 'react';
import {GoogleMap, GoogleMapProps, Marker, Polyline, withGoogleMap, withScriptjs} from 'react-google-maps';
import {useQuery} from "react-query";
import HanhtrinhService from "@/core/services/hanhtrinh.service.ts";

interface MarkerType {
    lat: number;
    lng: number;
}

interface MapProps extends GoogleMapProps {
    // Define any additional props for your Map component here
}

const Map: React.FC<MapProps> = (props) => {
    const [markers, setMarkers] = useState<MarkerType[]>([]);

    const handleMapClick = (event: google.maps.MapMouseEvent) => {
        const newMarker: MarkerType = {
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
        };

        setMarkers((prevMarkers) => [...prevMarkers, newMarker]);
    };
    const {data} = useQuery({
        queryKey: "maps",
        queryFn: () => HanhtrinhService.detail(12),
        onSuccess: value => {
            setMarkers(prevState => [...prevState, ...value?.data.map(t => {
                const newMarker: MarkerType = {
                    lat: t.lat,
                    lng: t.log,
                };
                return newMarker
            })])
        }
    })
    console.log(data)
    return (
        <div>
            <GoogleMap
                defaultZoom={8}
                defaultCenter={{ lat: 21.027763, lng: 105.834160 }}
                onClick={handleMapClick}
                {...props}
            >
                <Polyline
                    path={markers}
                    options={{
                        strokeColor: '#FF0000',
                        strokeOpacity: 1,
                        strokeWeight: 2,
                    }}
                />

                {markers.map((marker, index) => (
                    <Marker
                        key={index}
                        position={{ lat: marker.lat, lng: marker.lng }}
                    />
                ))}
            </GoogleMap>
        </div>
    );
};

const WrappedMap = withScriptjs(withGoogleMap(Map));

export default WrappedMap;
