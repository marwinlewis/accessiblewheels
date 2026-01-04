# Car Modifiers Locator - Implementation Guide

This document provides a complete walkthrough for implementing and using the Car Modifiers Locator component with Google Maps integration.

## 📋 Quick Start

### 1. Get Your Google Maps API Key

Visit [Google Cloud Console](https://console.cloud.google.com/) and:

1. Create a new project
2. Enable these APIs:
   - Maps JavaScript API
   - Places API
   - Geocoding API
3. Create an API Key under Credentials
4. Restrict the key to your domain

### 2. Configure Your Environment

Create `.env.local` in the frontend directory:

```env
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=YOUR_API_KEY_HERE
```

### 3. Access the Page

Run the development server:

```bash
npm run dev
```

Navigate to: `http://localhost:3000/car-modifiers`

## 🏗️ Atomic Design Architecture

### Atoms (Single Elements)

Located in `src/components/atoms/`

- **Button.tsx** - Reusable button with variants (primary, secondary, outline) and sizes
- **Badge.tsx** - Rating display with automatic color coding
- **SearchInput.tsx** - Text input field with focus states
- **MapMarker.tsx** - Visual marker icon for the map

### Molecules (Combinations)

Located in `src/components/molecules/`

- **SearchBar.tsx** - SearchInput + Button combination

  ```tsx
  <SearchBar
    searchValue={city}
    onSearchChange={setCity}
    onSearch={handleSearch}
  />
  ```

- **ShopCard.tsx** - Displays individual shop with image, rating, address

  ```tsx
  <ShopCard
    shop={shop}
    onClick={handleShopClick}
    isActive={activeShop.id === shop.id}
  />
  ```

- **LocationInfo.tsx** - Icon + text information display
  ```tsx
  <LocationInfo icon="location" label="Address" value="123 Main St" />
  ```

### Organisms (Complex Components)

Located in `src/components/organisms/`

- **ShopList.tsx** - Scrollable list of shops

  - Handles loading states
  - Empty state messaging
  - Active shop highlighting

  ```tsx
  <ShopList
    shops={shops}
    onShopClick={handleShopClick}
    activeShopId={activeShopId}
    isLoading={isLoading}
  />
  ```

- **MapView.tsx** - Google Maps integration
  - Manages map instance
  - Marker placement and updates
  - Info windows
  - Map centering on active shop
  ```tsx
  <MapView
    shops={shops}
    activeShopId={activeShopId}
    centerLat={lat}
    centerLng={lng}
    onMarkerClick={handleMarkerClick}
  />
  ```

### Templates (Layouts)

Located in `src/components/templates/`

- **ResultsLayout.tsx** - Two-column responsive layout
  - Desktop: Map on left, sidebar on right
  - Mobile: Stacked vertically
  ```tsx
  <ResultsLayout
    mainContent={<MapView ... />}
    sidebar={<ShopList ... />}
  />
  ```

### Pages (Full Components)

Located in `src/pages/`

- **car-modifiers.tsx** - Main component with state management
  - Handles search logic
  - Manages active selections
  - Error handling
  - Integrates all child components

## 🔄 Data Flow

```
CarModifiersPage (State Management)
  │
  ├─→ SearchBar (Input)
  │    └─→ Search Action
  │         └─→ Update shops state
  │
  ├─→ ResultsLayout (Layout)
  │    ├─→ MapView
  │    │    └─→ Displays shops on map
  │    │         └─→ Click marker
  │    │              └─→ Emit onMarkerClick
  │    │
  │    └─→ ShopList
  │         └─→ Displays shops in list
  │              └─→ Click card
  │                   └─→ Emit onShopClick
  │                        └─→ Set activeShopId
  │
  └─→ Update activeShopId
       └─→ Trigger map to center
```

## 🎯 User Interactions

### 1. Search by City

```
User types city name → Enter or clicks Search button
→ API call to Geocoding API (city name to coordinates)
→ API call to PlacesService (find shops nearby)
→ Update shops list
→ Clear active selection
→ Map recenters
```

### 2. Click Shop Card

```
User clicks shop card
→ Set activeShopId in state
→ MapView detects change via useEffect
→ Map pans to shop location
→ Marker bounces/highlights
→ Info window opens
```

### 3. Click Map Marker

```
User clicks marker on map
→ Emit onMarkerClick event
→ Parent sets activeShopId
→ Shop card gets highlighted
→ Info window opens
```

## 📱 Responsive Behavior

### Mobile (< 1024px)

- Single column layout
- Full-width search bar
- Map takes full width (small)
- List below map in scrollable container
- Optimized touch targets

### Desktop (≥ 1024px)

- Two column layout
- Search bar spans full width
- Map: 66% width (flex-1)
- List: 384px (w-96) fixed width
- Horizontal arrangement

## 🔌 API Integration

The component structure is ready for API integration. Current implementation uses dummy data.

### To Implement Real API:

1. **Geocoding (City to Coordinates)**

```typescript
const geocodeCity = async (cityName: string) => {
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${cityName}&key=${API_KEY}`
  );
  const data = await response.json();
  return {
    lat: data.results[0].geometry.location.lat,
    lng: data.results[0].geometry.location.lng,
  };
};
```

2. **PlacesService (Find Shops)**

```typescript
const service = new google.maps.places.PlacesService(mapElement);
service.nearbySearch(
  {
    location: { lat, lng },
    radius: 15000,
    keyword: "car modification",
  },
  (results) => {
    // Map results to Shop interface
  }
);
```

3. **Get Place Details**

```typescript
service.getDetails({ placeId: shop.id }, (place) => {
  // Get phone, hours, website, reviews
});
```

## 🎨 Customization Guide

### Change Primary Colors

Edit each component's Tailwind classes:

```tsx
// Blue → Green
'bg-blue-600' → 'bg-green-600'
'focus:ring-blue-500' → 'focus:ring-green-500'
'text-blue-600' → 'text-green-600'
```

### Add New Shop Fields

1. Update Shop interface in `molecules/ShopCard.tsx`
2. Add field to DUMMY_SHOPS array
3. Update ShopCard display
4. Update MapView info window

### Modify Badge Ratings

Edit `atoms/Badge.tsx` thresholds:

```tsx
if (rating >= 4.5) return "gold"; // Change threshold
if (rating >= 4) return "silver";
if (rating >= 3.5) return "bronze";
```

### Change Map Style

In `organisms/MapView.tsx`, add map options:

```tsx
const mapOptions = {
  styles: [
    /* custom styles */
  ],
  mapTypeControl: true,
  streetViewControl: true,
};
```

## ⚙️ Configuration

### Environment Variables

- `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` - Google Maps API key

### Constants (in page component)

- `DUMMY_SHOPS` - Initial shop data
- Default center coordinates (40.7128, -74.006)
- Default zoom level (12)

### Component Props

All components are fully typed with TypeScript. See component files for:

- Required props
- Optional props with defaults
- Available variants/styles
- Callback signatures

## 🧪 Testing

### Mock Data

The component includes comprehensive dummy data for testing:

- 6 sample shops with realistic data
- Images from Unsplash (public domain)
- Varied ratings and distances

### Loading States

All components handle:

- Initial loading
- Search loading
- Empty states
- Error states

## 🚀 Performance Considerations

1. **Image Optimization**

   - Use next/image for production
   - Implement lazy loading
   - Optimize image sizes

2. **Map Performance**

   - Limit visible markers
   - Use clustering for many shops
   - Cache API responses

3. **Code Splitting**
   - Next.js splits by route
   - MapView is loaded only when needed

## 🔒 Security

1. **API Key Protection**

   - Use `NEXT_PUBLIC_` only for client-side safe keys
   - Restrict key to specific domains
   - Use server-side calls for sensitive data

2. **Input Validation**
   - City name is trimmed and validated
   - API responses are typed
   - Error boundaries included

## 📊 File Structure Summary

```
frontend/
├── app/
│   ├── car-modifiers/
│   │   └── page.tsx          # Route page
│   └── layout.tsx            # Root with Google Maps script
│
├── src/
│   ├── components/
│   │   ├── atoms/
│   │   │   ├── Button.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── SearchInput.tsx
│   │   │   └── MapMarker.tsx
│   │   ├── molecules/
│   │   │   ├── SearchBar.tsx
│   │   │   ├── ShopCard.tsx
│   │   │   └── LocationInfo.tsx
│   │   ├── organisms/
│   │   │   ├── ShopList.tsx
│   │   │   └── MapView.tsx
│   │   ├── templates/
│   │   │   └── ResultsLayout.tsx
│   │   └── index.ts          # Component exports
│   │
│   ├── pages/
│   │   └── car-modifiers.tsx # Main page component
│   │
│   └── utils/
│       └── helpers.ts        # Utility functions
│
├── .env.example              # Environment variables template
├── .env.local               # Your actual API key (IGNORED)
└── CAR_MODIFIERS_SETUP.md   # Setup instructions
```

## 🐛 Common Issues & Solutions

### Issue: "Google Maps API not loaded"

**Solution**: Verify API key in `.env.local` and script is loading

### Issue: Markers not showing

**Solution**: Enable Maps JavaScript API in Google Cloud Console

### Issue: Search not working

**Solution**: Enable Geocoding API and Places API

### Issue: CORS errors

**Solution**: Verify API key restrictions allow your domain

## 📚 Additional Resources

- [Google Maps JavaScript API Docs](https://developers.google.com/maps/documentation/javascript)
- [Places API Documentation](https://developers.google.com/maps/documentation/places/web-service/overview)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)

## 🎓 Learning Path

1. **Start**: Review component structure in `src/components/`
2. **Understand**: Read this guide's "Data Flow" section
3. **Modify**: Change colors, add new fields
4. **Integrate**: Add real Google Maps API calls
5. **Deploy**: Test on different devices, then deploy

---

**Last Updated**: January 3, 2026  
**Version**: 1.0  
**Status**: Production Ready with Dummy Data
