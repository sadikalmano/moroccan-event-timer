
declare namespace google.maps {
  class Map {
    constructor(mapDiv: Element, opts?: MapOptions);
    setCenter(latLng: LatLng | LatLngLiteral): void;
    setZoom(zoom: number): void;
    addListener(eventName: string, handler: Function): MapsEventListener;
  }

  class Marker {
    constructor(opts?: MarkerOptions);
    setPosition(latLng: LatLng | LatLngLiteral): void;
    setMap(map: Map | null): void;
    addListener(eventName: string, handler: Function): MapsEventListener;
    getPosition(): LatLng;
    setAnimation(animation: Animation): void;
  }

  class InfoWindow {
    constructor(opts?: InfoWindowOptions);
    open(map?: Map, anchor?: Marker): void;
    close(): void;
    setContent(content: string | Element | Text): void;
    setPosition(position: LatLng | LatLngLiteral): void;
    addListener(eventName: string, handler: Function): MapsEventListener;
  }

  class Geocoder {
    constructor();
    geocode(request: GeocoderRequest, callback: (results: GeocoderResult[], status: GeocoderStatus) => void): void;
  }

  class LatLng {
    constructor(lat: number, lng: number, noWrap?: boolean);
    lat(): number;
    lng(): number;
    toJSON(): LatLngLiteral;
    toString(): string;
    equals(other: LatLng): boolean;
  }

  class MapsEventListener {
    remove(): void;
  }

  class Autocomplete {
    constructor(inputField: HTMLInputElement, opts?: AutocompleteOptions);
    addListener(eventName: string, handler: Function): MapsEventListener;
    bindTo(bindKey: string, target: any): void;
    getPlace(): PlaceResult;
  }

  interface InfoWindowOptions {
    content?: string | Element | Text;
    disableAutoPan?: boolean;
    maxWidth?: number;
    pixelOffset?: Size;
    position?: LatLng | LatLngLiteral;
    zIndex?: number;
  }

  interface LatLngLiteral {
    lat: number;
    lng: number;
  }

  interface MapOptions {
    center?: LatLng | LatLngLiteral;
    zoom?: number;
    mapTypeId?: string;
    mapTypeControl?: boolean;
    streetViewControl?: boolean;
    fullscreenControl?: boolean;
  }

  interface MarkerOptions {
    position?: LatLng | LatLngLiteral;
    map?: Map;
    title?: string;
    draggable?: boolean;
    animation?: Animation;
  }

  interface GeocoderRequest {
    address?: string;
    location?: LatLng | LatLngLiteral;
    placeId?: string;
    bounds?: LatLngBounds;
    region?: string;
  }

  interface GeocoderResult {
    address_components: AddressComponent[];
    formatted_address: string;
    geometry: {
      location: LatLng;
      location_type: string;
      viewport: LatLngBounds;
    };
    place_id: string;
    types: string[];
  }

  interface AddressComponent {
    long_name: string;
    short_name: string;
    types: string[];
  }

  interface AutocompleteOptions {
    bounds?: LatLngBounds;
    types?: string[];
    componentRestrictions?: { country: string | string[] };
    fields?: string[];
  }

  interface PlaceResult {
    address_components?: AddressComponent[];
    formatted_address?: string;
    geometry?: {
      location: LatLng;
      viewport: LatLngBounds;
    };
    place_id?: string;
    name?: string;
    types?: string[];
  }

  interface LatLngBounds {
    contains(latLng: LatLng | LatLngLiteral): boolean;
    equals(other: LatLngBounds | LatLngBoundsLiteral): boolean;
    extend(point: LatLng | LatLngLiteral): LatLngBounds;
    getCenter(): LatLng;
    getNorthEast(): LatLng;
    getSouthWest(): LatLng;
    isEmpty(): boolean;
    toJSON(): LatLngBoundsLiteral;
    toSpan(): LatLng;
    toString(): string;
    union(other: LatLngBounds | LatLngBoundsLiteral): LatLngBounds;
  }

  interface LatLngBoundsLiteral {
    east: number;
    north: number;
    south: number;
    west: number;
  }

  class Size {
    constructor(width: number, height: number, widthUnit?: string, heightUnit?: string);
    equals(other: Size): boolean;
    width: number;
    height: number;
  }

  type GeocoderStatus = 
    | 'OK'
    | 'ZERO_RESULTS'
    | 'OVER_QUERY_LIMIT'
    | 'REQUEST_DENIED'
    | 'INVALID_REQUEST'
    | 'UNKNOWN_ERROR';

  enum Animation {
    BOUNCE = 1,
    DROP = 2
  }

  interface MapMouseEvent {
    latLng?: LatLng;
  }

  namespace places {
    class Autocomplete extends google.maps.Autocomplete {}
  }
}
