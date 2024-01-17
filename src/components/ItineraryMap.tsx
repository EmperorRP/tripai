import * as React from 'react';
import Map from 'react-map-gl';

export default function ItineraryMap() {
  const TOKEN = "pk.eyJ1IjoidGhlcmFodWxwdWphcmkiLCJhIjoiY2xyN3g5YjZrMjkwMTJqcDhlbjQzazQwdyJ9.ON6Iebncf1MQOubXeAyC7Q";
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Map
        mapboxAccessToken={TOKEN}
        initialViewState={{
          longitude: -122.4,
          latitude: 37.8,
          zoom: 14
        }}
        style={{ width: '100%', height: '100%' }}
        mapStyle="mapbox://styles/therahulpujari/clrd8dcyr00b101qt5qjh4wjf"
      />
    </div>
  );
}
