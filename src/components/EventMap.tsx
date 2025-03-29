
import React, { useEffect, useRef } from 'react';

interface EventMapProps {
  coordinates: {
    lat: number;
    lng: number;
  };
  locationName: string;
}

const EventMap: React.FC<EventMapProps> = ({ coordinates, locationName }) => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load Google Maps API
    if (!window.google || !window.google.maps) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyC2MUoC_jw7nDLbCrVUWQG9V91Fejouhw8&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = initMap;
      document.head.appendChild(script);

      return () => {
        document.head.removeChild(script);
      };
    } else {
      initMap();
    }
  }, [coordinates]);

  const initMap = () => {
    if (!mapRef.current) return;

    const map = new google.maps.Map(mapRef.current, {
      center: coordinates,
      zoom: 14,
      mapTypeControl: false,
      fullscreenControl: true,
      streetViewControl: true
      // zoomControl removed as it's not in our type definitions
    });

    const marker = new google.maps.Marker({
      position: coordinates,
      map: map,
      animation: google.maps.Animation.DROP,
      title: locationName,
    });

    // Using a properly defined infoWindow
    const infoWindow = new google.maps.InfoWindow({
      content: `<div class="p-2"><strong>${locationName}</strong></div>`,
    });

    marker.addListener('click', () => {
      infoWindow.open(map, marker);
    });

    // Open by default
    infoWindow.open(map, marker);
  };

  return (
    <div 
      ref={mapRef} 
      className="w-full h-[300px]"
      aria-label={`Map showing location: ${locationName}`}
    />
  );
};

export default EventMap;
