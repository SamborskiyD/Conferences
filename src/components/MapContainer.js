import React, {useRef, useState, useCallback} from 'react'
import { GoogleMap, MarkerF } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '100%',
  borderRadius: "10px"
};

const defaultOptions = {
    panControl: true,
    zoomControl: true,
    scaleControl: false,
    streetViewControl: false,
    rotateControl: false,
    clickabelIcons: false,
    mapTypeControl: false,
    keyboardShortcuts: false,
    scrollwhell: false,
    disableDoubleClickZoom: true,
    fullscreenControl: false
}


const MapContainer = ({center, markerAllow, markerPosition, setMarkerPos})  => {

  const mapRef = useRef(undefined)

  const onLoad = useCallback(function callback(map) {
    mapRef.current = map;
  }, [])

  const onUnmount = useCallback(function callback(map) {
    mapRef.current = undefined
  }, [])

  const onMapClick = useCallback((loc) => {
    if (markerAllow === true)
    {
      const lat = loc.latLng.lat();
      const lng = loc.latLng.lng();
      setMarkerPos((prev) => ({ ...prev, lat: lat.toString(), lng: lng.toString()}));
    }
  }, [markerPosition])

  const onMarkerDragEnd = (loc) => {
    if (markerAllow === true)
    {
      const lat = loc.latLng.lat();
      const lng = loc.latLng.lng();
      setMarkerPos((prev) => ({ ...prev, lat: lat.toString(), lng: lng.toString()}));
    }
  }

  return (
        <div className='mapContainer'>
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={5}
              onLoad={onLoad}
              onUnmount={onUnmount}
              options={defaultOptions}
              onClick={onMapClick}
            >
                <MarkerF position={markerPosition} draggable={markerAllow} onDragEnd={onMarkerDragEnd}/>
            </GoogleMap>
        </div>
    )
}

export default MapContainer