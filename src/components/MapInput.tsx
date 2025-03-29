
import React, { useEffect, useRef, useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface MapInputProps {
  onLocationSelect: (location: { address: string, coordinates: { lat: number, lng: number } }) => void;
  initialValue?: string;
  initialCoordinates?: { lat: number, lng: number };
}

const MapInput: React.FC<MapInputProps> = ({ 
  onLocationSelect, 
  initialValue = '',
  initialCoordinates = { lat: 31.7917, lng: -7.0926 } // Default to Morocco center
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [marker, setMarker] = useState<google.maps.Marker | null>(null);
  const [searchInput, setSearchInput] = useState(initialValue);
  
  useEffect(() => {
    // Load Google Maps script dynamically
    if (!window.google) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyB5_OT1oVjy6G7SsOe3K20nEXWZCrH9AyM&libraries=places`;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
      
      script.onload = initMap;
      
      return () => {
        document.head.removeChild(script);
      };
    } else {
      initMap();
    }
  }, []);
  
  const initMap = () => {
    if (!mapRef.current || !window.google) return;
    
    const mapOptions: google.maps.MapOptions = {
      center: initialCoordinates,
      zoom: 8,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: false,
    };
    
    const newMap = new google.maps.Map(mapRef.current, mapOptions);
    setMap(newMap);
    
    const newMarker = new google.maps.Marker({
      position: initialCoordinates,
      map: newMap,
      draggable: true,
      animation: google.maps.Animation.DROP,
    });
    setMarker(newMarker);
    
    // Initialize autocomplete
    if (inputRef.current) {
      const autocomplete = new google.maps.places.Autocomplete(inputRef.current);
      autocomplete.bindTo('bounds', newMap);
      
      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        
        if (!place.geometry || !place.geometry.location) {
          return;
        }
        
        // Update map and marker
        newMap.setCenter(place.geometry.location);
        newMap.setZoom(15);
        newMarker.setPosition(place.geometry.location);
        
        // Notify parent component
        onLocationSelect({
          address: place.formatted_address || '',
          coordinates: {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng()
          }
        });
        
        setSearchInput(place.formatted_address || '');
      });
    }
    
    // Add click event to map
    newMap.addListener('click', (e: google.maps.MapMouseEvent) => {
      if (e.latLng) {
        newMarker.setPosition(e.latLng);
        
        // Get address from coordinates (reverse geocoding)
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode({ location: e.latLng }, (results, status) => {
          if (status === 'OK' && results && results[0]) {
            const address = results[0].formatted_address;
            setSearchInput(address);
            
            // Notify parent component
            onLocationSelect({
              address,
              coordinates: {
                lat: e.latLng?.lat() || 0,
                lng: e.latLng?.lng() || 0
              }
            });
          }
        });
      }
    });
    
    // Add dragend event to marker
    newMarker.addListener('dragend', () => {
      const position = newMarker.getPosition();
      if (position) {
        // Get address from coordinates (reverse geocoding)
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode({ location: position }, (results, status) => {
          if (status === 'OK' && results && results[0]) {
            const address = results[0].formatted_address;
            setSearchInput(address);
            
            // Notify parent component
            onLocationSelect({
              address,
              coordinates: {
                lat: position.lat(),
                lng: position.lng()
              }
            });
          }
        });
      }
    });
  };
  
  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          ref={inputRef}
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search for a location"
          className="pl-10"
        />
      </div>
      <div 
        ref={mapRef} 
        className="w-full h-[300px] rounded-md overflow-hidden border border-input"
      />
    </div>
  );
};

export default MapInput;
