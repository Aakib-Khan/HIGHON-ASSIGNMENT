import React, { useEffect, useState } from "react";
import mapboxgl from "mapbox-gl/dist/mapbox-gl.js";
import { useControl } from "react-map-gl";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import "mapbox-gl/dist/mapbox-gl.css";
import ReactMapGL, {
  GeolocateControl,
  Marker,
  NavigationControl,
  FullscreenControl,
} from "react-map-gl";
import MapBoxGeocoder from "@mapbox/mapbox-gl-geocoder";
import { useNavigate } from "react-router-dom";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;
export default function HomePage() {
  const redirect = useNavigate();

  const [lat, setLat] = useState(24.45677614934833);
  const [lng, setLng] = useState(54.37585762735543);
  // console.log(lat, lng);
  const user = localStorage.getItem("user");

  const collectData = async () => {
    let result = await fetch("/user/signup", {
      method: "post",
      body: JSON.stringify({ lat, lng }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
  };
  useEffect(() => {
    if (user == null) {
      redirect("/");
    }
  }, );

  const Geocoder = () => {
    const ctrl = new MapBoxGeocoder({
      accessToken: process.env.REACT_APP_MAPBOX_ACCESS_TOKEN,
      marker: false,
      collapsed: true,
      // position:top-left
    });
    useControl(() => ctrl);
    ctrl.on("result", (e) => {
      const coords = e.result.geometry.coordinates;
      // console.log("coords" + coords);
      setLat(coords[1]);
      setLng(coords[0]);
      collectData();
    });
    return null;
  };

  return (
    <div className="App">
      <ReactMapGL
        mapboxAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
        initialViewState={{
          longitude: lng,
          latitude: lat,
          zoom: 8,
        }}
        style={{
          width: 1380,
          height: 650,
          borderRadius: "15px",
          border: "2px solid red",
        }}
        mapStyle="mapbox://styles/akib-khan/cl9xqr928003x15phq7zgvijn"
      >
        <Marker
          latitude={lat}
          longitude={lng}
          draggable
          onDragEnd={(e) => {
            setLat(e.lngLat.lat);
            setLng(e.lngLat.lng);
          }}
        />
        <FullscreenControl position="top-left" />
        <Geocoder/>
        <NavigationControl position="top-left" />
        

        <GeolocateControl
          // onTrackUserLocationEnd={redirect('/profile')}
          // onTrackUserLocationStart={collectData()}
          position="top-left"
          trackUserLocation
          onGeolocate={(e) => ({
            setLat: e.coords.latitude,
            setLng: e.coords.longitude,
          })}
        />
      </ReactMapGL>
    </div>
  );
}
