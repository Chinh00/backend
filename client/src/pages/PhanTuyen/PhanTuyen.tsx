import Map from "@/pages/PhanTuyen/Map.tsx";

const PhanTuyen = () => {
    return <div className={"w-full px-10"}>
        <Map
            googleMapURL={`https://maps.googleapis.com/maps/api/js?key=AIzaSyDNI_ZWPqvdS6r6gPVO50I4TlYkfkZdXh8&callback=initMap`}
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `90vh`, margin: `auto`, border: '2px solid black' }} />}
            mapElement={<div style={{ height: `100%` }} />}
        />

    </div>
}

export default PhanTuyen