/**
 * Type definitions for Car Modifiers Locator
 */

export interface Shop {
  id: string;
  name: string;
  rating: number;
  reviews: number;
  distance: number; // in km
  address: string;
  imageUrl: string;
  lat: number;
  lng: number;
  phone?: string;
  website?: string;
  hours?: string;
  price_level?: number;
  types?: string[];
}

export interface SearchLocation {
  lat: number;
  lng: number;
  address: string;
}

export interface PlaceResult {
  place_id: string;
  name: string;
  rating?: number;
  user_ratings_total?: number;
  geometry: {
    location: {
      lat: () => number;
      lng: () => number;
    };
  };
  vicinity: string;
  photos?: Array<{
    getUrl: (options: { maxWidth: number; maxHeight: number }) => string;
  }>;
  formatted_phone_number?: string;
  website?: string;
  opening_hours?: {
    open_now: boolean;
    weekday_text?: string[];
  };
  price_level?: number;
  types?: string[];
}

export interface GeocodeResult {
  address_components: Array<{
    long_name: string;
    short_name: string;
    types: string[];
  }>;
  formatted_address: string;
  geometry: {
    bounds?: {
      northeast: { lat: number; lng: number };
      southwest: { lat: number; lng: number };
    };
    location: {
      lat: number;
      lng: number;
    };
    location_type: string;
    viewport: {
      northeast: { lat: number; lng: number };
      southwest: { lat: number; lng: number };
    };
  };
  place_id: string;
  types: string[];
}

export type ButtonVariant = "primary" | "secondary" | "outline";
export type ButtonSize = "sm" | "md" | "lg";
export type BadgeVariant = "gold" | "silver" | "bronze" | "gray";
export type LocationInfoIcon = "location" | "phone" | "clock" | "website";

export interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
}

export interface BadgeProps {
  rating: number;
  maxRating?: number;
  variant?: BadgeVariant;
  showLabel?: boolean;
  className?: string;
}

export interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  autoFocus?: boolean;
}

export interface SearchBarProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  onSearch: () => void;
  placeholder?: string;
  isLoading?: boolean;
  disabled?: boolean;
}

export interface ShopCardProps {
  shop: Shop;
  onClick?: (shop: Shop) => void;
  isActive?: boolean;
  className?: string;
}

export interface LocationInfoProps {
  icon: LocationInfoIcon;
  label: string;
  value: string;
  href?: string;
  className?: string;
}

export interface ShopListProps {
  shops: Shop[];
  onShopClick: (shop: Shop) => void;
  activeShopId?: string;
  isLoading?: boolean;
  emptyMessage?: string;
  className?: string;
}

export interface MapViewProps {
  shops: Shop[];
  activeShopId?: string;
  centerLat?: number;
  centerLng?: number;
  onMarkerClick?: (shop: Shop) => void;
  isLoading?: boolean;
  className?: string;
}

export interface ResultsLayoutProps {
  sidebar: React.ReactNode;
  mainContent: React.ReactNode;
  className?: string;
}

export interface CarModifiersPageState {
  searchValue: string;
  shops: Shop[];
  activeShopId?: string;
  isLoading: boolean;
  searchLocation: SearchLocation;
  error: string | null;
}

export interface MapMarkerProps {
  position?: { lat: number; lng: number };
  label?: string;
  title?: string;
  isActive?: boolean;
  onClick?: () => void;
  className?: string;
}

// Google Maps API Type Extensions
declare global {
  interface Window {
    google: {
      maps: {
        Map: new (
          element: HTMLElement,
          options: google.maps.MapOptions,
        ) => google.maps.Map;
        Marker: new (options: google.maps.MarkerOptions) => google.maps.Marker;
        InfoWindow: new (
          options: google.maps.InfoWindowOptions,
        ) => google.maps.InfoWindow;
        LatLng: new (lat: number, lng: number) => google.maps.LatLng;
        LatLngBounds: new () => google.maps.LatLngBounds;
        SymbolPath: {
          CIRCLE: google.maps.SymbolPath;
          BACKWARD_CLOSED_ARROW: google.maps.SymbolPath;
          FORWARD_CLOSED_ARROW: google.maps.SymbolPath;
          BACKWARD_OPEN_ARROW: google.maps.SymbolPath;
          FORWARD_OPEN_ARROW: google.maps.SymbolPath;
        };
        Animation: {
          BOUNCE: number;
          DROP: number;
        };
        places: {
          PlacesService: new (
            element: HTMLElement | google.maps.Map,
          ) => google.maps.places.PlacesService;
          PlacesServiceStatus: {
            OK: string;
            ZERO_RESULTS: string;
            INVALID_REQUEST: string;
            OVER_QUERY_LIMIT: string;
            REQUEST_DENIED: string;
            UNKNOWN_ERROR: string;
          };
        };
        geocoder: {
          Geocoder: new () => google.maps.geocoder.Geocoder;
        };
      };
    };
  }
}

// Ambient declarations for Google Maps API
declare namespace google.maps {
  interface MapOptions {
    zoom?: number;
    center?: LatLng | LatLngLiteral;
    mapTypeControl?: boolean;
    fullscreenControl?: boolean;
    zoomControl?: boolean;
    streetViewControl?: boolean;
    styles?: MapTypeStyle[];
    mapTypeId?: string;
  }

  interface MarkerOptions {
    position: LatLng | LatLngLiteral;
    map?: Map;
    title?: string;
    animation?: number;
    icon?: string | Symbol;
  }

  interface InfoWindowOptions {
    content: string | Node;
    position?: LatLng | LatLngLiteral;
  }

  interface LatLngLiteral {
    lat: number;
    lng: number;
  }

  interface Symbol {
    path: SymbolPath | string;
    fillColor?: string;
    fillOpacity?: number;
    scale?: number;
    strokeColor?: string;
    strokeWeight?: number;
  }

  interface MapTypeStyle {
    elementType?: string;
    featureType?: string;
    stylers: { [key: string]: string | number | boolean }[];
  }

  enum SymbolPath {
    CIRCLE = 0,
  }

  class Map {
    constructor(element: HTMLElement, options: MapOptions);
    setZoom(zoom: number): void;
    panTo(latLng: LatLng | LatLngLiteral): void;
    fitBounds(bounds: LatLngBounds): void;
  }

  class Marker {
    constructor(options: MarkerOptions);
    setMap(map: Map | null): void;
    addListener(eventName: string, callback: Function): void;
    setAnimation(animation: number): void;
    setIcon(icon: string | Symbol): void;
  }

  class InfoWindow {
    constructor(options: InfoWindowOptions);
    open(map: Map, anchor?: Marker): void;
    close(): void;
  }

  class LatLng {
    constructor(lat: number, lng: number);
    lat(): number;
    lng(): number;
  }

  class LatLngBounds {
    extend(point: LatLng): void;
  }

  namespace places {
    class PlacesService {
      constructor(element: HTMLElement | Map);
      nearbySearch(
        request: PlacesServiceRequest,
        callback: (results: PlaceResult[], status: string) => void,
      ): void;
      getDetails(
        request: PlaceDetailsRequest,
        callback: (place: PlaceResult, status: string) => void,
      ): void;
    }

    interface PlacesServiceRequest {
      location: LatLng | LatLngLiteral;
      radius?: number;
      types?: string[];
      keyword?: string;
      name?: string;
    }

    interface PlaceDetailsRequest {
      placeId: string;
      fields?: string[];
    }
  }

  namespace geocoder {
    class Geocoder {
      geocode(
        request: GeocoderRequest,
        callback: (results: GeocodeResult[], status: string) => void,
      ): void;
    }

    interface GeocoderRequest {
      address?: string;
      location?: LatLng | LatLngLiteral;
      bounds?: LatLngBounds;
      region?: string;
      componentRestrictions?: { [key: string]: string };
    }
  }
}
