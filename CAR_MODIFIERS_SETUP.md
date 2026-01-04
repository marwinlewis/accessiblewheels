# Car Modifiers Locator Setup Guide

## Overview

The Car Modifiers Locator is a responsive web application built with React, Next.js, and Tailwind CSS that displays car modification shops using an Atomic Design structure.

## Project Structure

```
src/
├── components/
│   ├── atoms/              # Basic building blocks
│   │   ├── Button.tsx      # Reusable button component
│   │   ├── Badge.tsx       # Rating badge display
│   │   ├── SearchInput.tsx # Search input field
│   │   └── MapMarker.tsx   # Map marker icon
│   │
│   ├── molecules/          # Simple combinations of atoms
│   │   ├── SearchBar.tsx   # Search input + button
│   │   ├── ShopCard.tsx    # Shop information card
│   │   └── LocationInfo.tsx # Location details with icon
│   │
│   ├── organisms/          # Complex component structures
│   │   ├── ShopList.tsx    # Scrollable list of shops
│   │   └── MapView.tsx     # Interactive Google Map
│   │
│   ├── templates/          # Page layouts
│   │   └── ResultsLayout.tsx # Sidebar + main content layout
│   │
│   └── index.ts            # Component exports

app/
├── car-modifiers/
│   └── page.tsx            # Route page for car modifiers
└── layout.tsx              # Root layout with Google Maps script

src/pages/
└── car-modifiers.tsx       # Main page component with state
```

## Features

- ✅ **Responsive Design**: Mobile-first approach with Tailwind CSS

  - Mobile: Stacked layout (map above list)
  - Tablet/Desktop: Side-by-side layout (map left, list right)

- ✅ **Search by City**: Enter city name to find modification shops

  - Integrated search bar with loading states
  - Error handling and user feedback

- ✅ **Interactive Map**: Google Maps with markers for each shop

  - Click markers to view shop details
  - Click shop cards to center map on that location
  - Animated markers for active selection
  - Info windows with shop information

- ✅ **Shop Cards**: Display shop details including:

  - Image
  - Name
  - Star rating with automatic color coding
  - Review count
  - Address
  - Distance

- ✅ **Atomic Design Structure**: Clear component hierarchy
  - Atoms: Single-purpose UI elements
  - Molecules: Simple component combinations
  - Organisms: Complex, self-contained sections
  - Templates: Page-level layouts
  - Pages: Full-page components with state logic

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
# or
yarn install
```

### 2. Get Google Maps API Key

1. Visit [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable these APIs:
   - **Maps JavaScript API**
   - **Places API** (for shop search)
   - **Geocoding API** (for city search)
4. Create an API key (Credentials → API Key)
5. Add restrictions to your API key

### 3. Configure Environment Variables

Create a `.env.local` file in the frontend directory:

```env
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_api_key_here
```

The `NEXT_PUBLIC_` prefix makes this variable accessible in the browser.

### 4. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000/car-modifiers` to see the application.

## Component Usage Examples

### Using Individual Components

```tsx
import { Button, Badge, SearchInput } from '@/src/components';

// Button
<Button onClick={handleClick} variant="primary" size="md">
  Click me
</Button>

// Badge
<Badge rating={4.5} />

// SearchInput
<SearchInput
  value={searchValue}
  onChange={(value) => setSearchValue(value)}
  placeholder="Search..."
/>
```

### Building with Molecules

```tsx
import { SearchBar, ShopCard } from '@/src/components';

// SearchBar combines Input + Button
<SearchBar
  searchValue={search}
  onSearchChange={setSearch}
  onSearch={handleSearch}
/>

// ShopCard displays shop information
<ShopCard shop={shop} onClick={handleShopClick} isActive={isActive} />
```

### Using Organisms

```tsx
import { ShopList, MapView } from '@/src/components';

// ShopList with scrolling and selection
<ShopList
  shops={shops}
  onShopClick={handleShopClick}
  activeShopId={activeShopId}
/>

// MapView with Google Maps integration
<MapView
  shops={shops}
  activeShopId={activeShopId}
  centerLat={40.7128}
  centerLng={-74.006}
  onMarkerClick={handleMarkerClick}
/>
```

## Implementing Google Maps Integration

The current implementation includes a placeholder structure for Google Maps PlacesService. To implement actual API calls:

### Update `src/pages/car-modifiers.tsx`:

```tsx
// Replace the handleSearch function with actual API calls
const handleSearch = async () => {
  setIsLoading(true);

  try {
    // 1. Geocode the city name to coordinates
    const geocodeResult = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${searchValue}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
    );
    const geocodeData = await geocodeResult.json();
    const { lat, lng } = geocodeData.results[0].geometry.location;

    // 2. Search for car modification shops nearby
    const service = new window.google.maps.places.PlacesService(
      googleMapRef.current
    );

    const request = {
      location: { lat, lng },
      radius: 15000,
      keyword: "car modification",
      type: "car_repair",
    };

    service.nearbySearch(request, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        const formattedShops = results.map((place) => ({
          id: place.place_id,
          name: place.name,
          rating: place.rating || 0,
          reviews: place.user_ratings_total || 0,
          distance: calculateDistance(lat, lng, place.geometry.location),
          address: place.vicinity,
          imageUrl: place.photos?.[0]?.getUrl(),
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        }));

        setShops(formattedShops);
      }
    });
  } catch (error) {
    console.error("Search error:", error);
  } finally {
    setIsLoading(false);
  }
};
```

## Responsive Behavior

### Mobile (< 1024px)

- Full-width search bar at top
- Map takes full width below header
- Shop list appears below map
- Single column layout

### Tablet/Desktop (>= 1024px)

- Search bar at top
- Two-column layout:
  - Left: Google Map (flex-1)
  - Right: Shop list sidebar (w-96)
- Horizontal scrolling for better space usage

## Styling with Tailwind CSS

The project uses Tailwind CSS utility classes for styling. Key classes used:

- **Layout**: `flex`, `grid`, `gap-`, `p-`, `m-`
- **Colors**: `bg-`, `text-`, `border-`, `hover:`, `focus:`
- **Responsive**: `sm:`, `md:`, `lg:`, `xl:` prefixes
- **Effects**: `shadow-`, `rounded-`, `transition-`

## Customization

### Changing Color Scheme

Edit component files and update Tailwind classes:

```tsx
// Button.tsx - Change blue to green
"bg-green-600 hover:bg-green-700 focus:ring-green-500";
```

### Adding More Atoms

1. Create new file in `src/components/atoms/`
2. Export from `src/components/index.ts`
3. Use in molecules/organisms

### Modifying Shop Data

Update the `DUMMY_SHOPS` array in `src/pages/car-modifiers.tsx` or replace with actual API calls.

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari 14+, Chrome Android)

## Performance Tips

1. **Images**: Shop card images are fetched from Unsplash CDN with caching
2. **Map Lazy Loading**: Google Maps script loads only when needed
3. **Memoization**: Use `useCallback` for handlers to prevent re-renders
4. **Code Splitting**: Next.js automatically splits code by route

## Troubleshooting

### "Google Maps API not loaded" Message

- Ensure `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` is set in `.env.local`
- Check that the API key has the required APIs enabled
- Wait a few seconds for the script to load

### Map not showing markers

- Verify your API key has Maps JavaScript API enabled
- Check console for CORS errors
- Ensure `window.google` is defined before creating map

### Search not working

- Check that all environment variables are set correctly
- Verify API key has Geocoding API enabled
- Check browser console for specific error messages

## Future Enhancements

- [ ] Implement actual Google Maps PlacesService API calls
- [ ] Add filters (price range, service type, hours)
- [ ] User reviews and ratings
- [ ] Shop detail pages with full information
- [ ] Directions integration
- [ ] Favorite/bookmark shops
- [ ] Share shop locations
- [ ] Dark mode support

## License

This component is part of the Adapted Vehicle project.
