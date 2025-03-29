
declare interface Window {
  google: typeof google;
}

declare namespace google {
  namespace maps {
    class Map {
      constructor(mapDiv: Element, opts?: MapOptions);
      setCenter(latLng: LatLng | LatLngLiteral): void;
      setZoom(zoom: number): void;
      setMapTypeControl(value: boolean): void;
      setFullscreenControl(value: boolean): void;
      setStreetViewControl(value: boolean): void;
      setZoomControl(value: boolean): void;
      addListener(eventName: string, handler: Function): MapsEventListener;
      getCenter(): LatLng;
      getZoom(): number;
    }

    class LatLng {
      constructor(lat: number, lng: number, noWrap?: boolean);
      lat(): number;
      lng(): number;
    }

    class Marker {
      constructor(opts?: MarkerOptions);
      setPosition(latLng: LatLng | LatLngLiteral): void;
      setMap(map: Map | null): void;
      setAnimation(animation: any): void;
      setDraggable(draggable: boolean): void;
      setTitle(title: string): void;
      addListener(eventName: string, handler: Function): MapsEventListener;
      getPosition(): LatLng;
    }

    class InfoWindow {
      constructor(opts?: InfoWindowOptions);
      open(map: Map, anchor?: MVCObject): void;
      setContent(content: string | Node): void;
    }

    class Geocoder {
      constructor();
      geocode(request: GeocoderRequest, callback: (results: GeocoderResult[], status: GeocoderStatus) => void): void;
    }

    interface MapOptions {
      center?: LatLng | LatLngLiteral;
      zoom?: number;
      mapTypeId?: string;
      mapTypeControl?: boolean;
      fullscreenControl?: boolean;
      streetViewControl?: boolean;
      zoomControl?: boolean;
    }

    interface MarkerOptions {
      position: LatLng | LatLngLiteral;
      map?: Map;
      title?: string;
      animation?: any;
      draggable?: boolean;
    }

    interface InfoWindowOptions {
      content?: string | Node;
      position?: LatLng | LatLngLiteral;
    }

    interface GeocoderRequest {
      address?: string;
      location?: LatLng | LatLngLiteral;
    }

    interface GeocoderResult {
      formatted_address: string;
      geometry: {
        location: LatLng;
      };
    }

    interface LatLngLiteral {
      lat: number;
      lng: number;
    }

    interface MapsEventListener {
      remove(): void;
    }

    interface MVCObject {
      addListener(eventName: string, handler: Function): MapsEventListener;
    }

    const Animation: {
      DROP: any;
    };

    enum GeocoderStatus {
      OK = 'OK',
      ZERO_RESULTS = 'ZERO_RESULTS',
      OVER_QUERY_LIMIT = 'OVER_QUERY_LIMIT',
      REQUEST_DENIED = 'REQUEST_DENIED',
      INVALID_REQUEST = 'INVALID_REQUEST',
      UNKNOWN_ERROR = 'UNKNOWN_ERROR',
      ERROR = 'ERROR'
    }
  }
}
