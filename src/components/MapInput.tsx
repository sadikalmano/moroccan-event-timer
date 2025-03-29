
import React, { useState, useRef, useEffect } from 'react';
import { Search, MapPin } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface MapInputProps {
  onLocationSelect: (location: { address: string; coordinates: { lat: number; lng: number } }) => void;
  initialValue?: string;
  initialCoordinates?: { lat: number; lng: number };
}

const MapInput: React.FC<MapInputProps> = ({ 
  onLocationSelect, 
  initialValue = '', 
  initialCoordinates = { lat: 31.7917, lng: -7.0926 } // Default to Morocco center
}) => {
  const [inputValue, setInputValue] = useState(initialValue);
  const [coordinates, setCoordinates] = useState(initialCoordinates);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<google.maps.Map | null>(null);
  const markerRef = useRef<google.maps.Marker | null>(null);
  const geocoderRef = useRef<google.maps.Geocoder | null>(null);

  // Initialize the map
  useEffect(() => {
    // Check if the Google Maps script is loaded
    if (!window.google || !window.google.maps) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyC2MUoC_jw7nDLbCrVUWQG9V91Fejouhw8&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = initializeMap;
      document.head.appendChild(script);
      return () => {
        document.head.removeChild(script);
      };
    } else {
      initializeMap();
    }
  }, []);

  const initializeMap = () => {
    if (!mapContainerRef.current) return;

    // Create map instance
    mapRef.current = new google.maps.Map(mapContainerRef.current, {
      center: coordinates,
      zoom: 6,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: false,
    });

    // Create marker
    markerRef.current = new google.maps.Marker({
      position: coordinates,
      map: mapRef.current,
      draggable: true,
      animation: google.maps.Animation.DROP,
    });

    // Create geocoder
    geocoderRef.current = new google.maps.Geocoder();

    // Add event listener for marker drag end
    google.maps.event.addListener(markerRef.current, 'dragend', handleMarkerDragEnd);

    // Add click event listener to map
    mapRef.current.addListener('click', (e: google.maps.MapMouseEvent) => {
      if (!e.latLng) return;
      
      const newPosition = {
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
      };
      
      setCoordinates(newPosition);
      
      if (markerRef.current) {
        markerRef.current.setPosition(newPosition);
      }
      
      // Reverse geocode to get address
      reverseGeocode(newPosition);
    });
  };

  const handleMarkerDragEnd = () => {
    if (!markerRef.current) return;
    
    const position = markerRef.current.getPosition();
    if (!position) return;
    
    const newCoordinates = {
      lat: position.lat(),
      lng: position.lng(),
    };
    
    setCoordinates(newCoordinates);
    
    // Reverse geocode to get address
    reverseGeocode(newCoordinates);
  };

  const searchLocation = () => {
    if (!geocoderRef.current || !inputValue.trim()) return;
    
    setIsLoading(true);
    setError(null);
    
    geocoderRef.current.geocode({ address: inputValue }, (results, status) => {
      setIsLoading(false);
      
      if (status === google.maps.GeocoderStatus.OK && results && results[0]) {
        const location = results[0].geometry.location;
        const newCoordinates = {
          lat: location.lat(),
          lng: location.lng(),
        };
        
        setCoordinates(newCoordinates);
        
        if (mapRef.current) {
          mapRef.current.setCenter(newCoordinates);
          mapRef.current.setZoom(13);
        }
        
        if (markerRef.current) {
          markerRef.current.setPosition(newCoordinates);
        }
        
        const formattedAddress = results[0].formatted_address;
        setInputValue(formattedAddress);
        
        onLocationSelect({
          address: formattedAddress,
          coordinates: newCoordinates,
        });
      } else {
        setError('Location not found. Please try again.');
      }
    });
  };

  const reverseGeocode = (coordinates: { lat: number; lng: number }) => {
    if (!geocoderRef.current) return;
    
    setIsLoading(true);
    
    geocoderRef.current.geocode({ location: coordinates }, (results, status) => {
      setIsLoading(false);
      
      if (status === google.maps.GeocoderStatus.OK && results && results[0]) {
        const formattedAddress = results[0].formatted_address;
        setInputValue(formattedAddress);
        
        onLocationSelect({
          address: formattedAddress,
          coordinates,
        });
      }
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Search for a location"
            className="pl-10"
            onKeyDown={(e) => e.key === 'Enter' && searchLocation()}
          />
        </div>
        <Button 
          onClick={searchLocation} 
          disabled={isLoading || !inputValue}
          className="bg-primary text-primary-foreground"
        >
          {isLoading ? 'Searching...' : 'Search'}
        </Button>
      </div>
      
      {error && (
        <div className="text-sm text-destructive">{error}</div>
      )}
      
      <Card className="rounded-lg overflow-hidden border shadow-sm">
        <div 
          ref={mapContainerRef} 
          className="w-full h-[300px]"
        />
      </Card>
      
      <div className="flex items-center text-sm text-muted-foreground">
        <MapPin className="h-4 w-4 mr-2" />
        <span>Click on the map or drag the marker to select a location</span>
      </div>
    </div>
  );
};

export default MapInput;
