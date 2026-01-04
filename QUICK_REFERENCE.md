# Quick Reference - Car Modifiers Locator

## 🚀 Quick Start (5 minutes)

### Step 1: Add API Key

Create/edit `.env.local`:

```env
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_key_here
```

### Step 2: Run the App

```bash
npm run dev
```

### Step 3: View the Page

Open: `http://localhost:3000/car-modifiers`

---

## 📂 File Structure at a Glance

```
src/components/
├── atoms/           → Button, Badge, SearchInput, MapMarker
├── molecules/       → SearchBar, ShopCard, LocationInfo
├── organisms/       → ShopList, MapView
├── templates/       → ResultsLayout
└── index.ts        → All exports

src/pages/
└── car-modifiers.tsx → Main page component

app/car-modifiers/
└── page.tsx         → Route page

src/utils/
└── helpers.ts       → Utility functions

src/types/
└── car-modifiers.ts → TypeScript definitions
```

---

## 🎯 Core Components

| Component     | Type     | Purpose                        |
| ------------- | -------- | ------------------------------ |
| Button        | Atom     | Clickable button with variants |
| Badge         | Atom     | Rating display (auto-colored)  |
| SearchInput   | Atom     | Text input field               |
| MapMarker     | Atom     | Map marker icon                |
| SearchBar     | Molecule | Input + Button combo           |
| ShopCard      | Molecule | Shop info card                 |
| LocationInfo  | Molecule | Icon + text line               |
| ShopList      | Organism | Scrollable shop list           |
| MapView       | Organism | Google Map display             |
| ResultsLayout | Template | Two-column layout              |

---

## 🔌 How to Use Components

### Import

```tsx
import { Button, Badge, ShopCard } from "@/src/components";
// Or import specific path
import Button from "@/src/components/atoms/Button";
```

### Example Usage

```tsx
// Simple Button
<Button onClick={handleClick}>Search</Button>

// Button with variants
<Button variant="primary" size="lg" disabled={isLoading}>
  {isLoading ? 'Loading...' : 'Submit'}
</Button>

// Rating Badge
<Badge rating={4.5} />

// Search Bar
<SearchBar
  searchValue={city}
  onSearchChange={setCity}
  onSearch={handleSearch}
/>

// Shop Card
<ShopCard
  shop={shopData}
  onClick={handleSelectShop}
  isActive={activeId === shopData.id}
/>

// Shop List
<ShopList
  shops={shops}
  onShopClick={handleShopClick}
  activeShopId={activeShopId}
  isLoading={loading}
/>

// Map View
<MapView
  shops={shops}
  activeShopId={activeShopId}
  centerLat={40.7128}
  centerLng={-74.006}
  onMarkerClick={handleMarkerClick}
/>
```

---

## 🎨 Tailwind CSS Quick Classes

### Colors

```
bg-blue-600    → Primary blue background
text-gray-700  → Text color
border-gray-300 → Border color
hover:bg-blue-700 → Hover state
```

### Spacing

```
p-4  → Padding (all sides)
px-4 → Padding (left & right)
py-2 → Padding (top & bottom)
gap-2 → Gap between items
m-3  → Margin
```

### Responsive

```
sm:text-sm    → Small screen
md:w-96       → Medium screen
lg:flex-row   → Large screen (≥1024px)
xl:grid-cols-4 → Extra large
```

### States

```
hover:scale-105        → Scale on hover
focus:ring-2           → Focus ring
disabled:opacity-50    → Disabled state
active:shadow-lg       → Active state
```

---

## 🔄 Data Flow

```
User types city → SearchBar
                ↓
            handleSearch
                ↓
        Update shops state
                ↓
    ShopList + MapView update
                ↓
User clicks shop card
                ↓
Set activeShopId
                ↓
MapView centers on shop
+ ShopCard highlights
```

---

## 🧩 Component Props Cheat Sheet

### Atoms

```tsx
Button: { children, onClick?, variant?, size?, disabled? }
Badge: { rating, maxRating?, variant?, showLabel? }
SearchInput: { value, onChange, placeholder?, disabled? }
MapMarker: { position?, label?, isActive?, onClick? }
```

### Molecules

```tsx
SearchBar: { searchValue, onSearchChange, onSearch, isLoading? }
ShopCard: { shop, onClick?, isActive? }
LocationInfo: { icon, label, value, href? }
```

### Organisms

```tsx
ShopList: { shops, onShopClick, activeShopId?, isLoading? }
MapView: { shops, activeShopId?, centerLat?, centerLng?, onMarkerClick? }
```

---

## 🎯 Responsive Design

### Mobile First Approach

```tsx
// Default = mobile
flex flex-col           // Stack vertically

// Tablet
sm:flex-row            // Side by side

// Desktop (≥1024px)
lg:flex-row
lg:w-96                // Fixed width
```

### Your Breakpoint

```
Mobile  < 640px
Tablet  640px - 1024px
Desktop ≥ 1024px
```

---

## 🔍 Debugging Tips

### Issue: Component not rendering

- Check import path
- Verify component export in index.ts
- Check props types match interface

### Issue: Map not showing

- Verify API key in .env.local
- Check Google Cloud APIs enabled
- Look for console errors

### Issue: Styling looks wrong

- Check Tailwind CSS is imported
- Verify tailwind.config.js exists
- Clear .next folder and rebuild

### Issue: TypeScript errors

- Check prop types in component file
- Hover over component name for hints
- Check types/car-modifiers.ts for interfaces

---

## 🚀 API Integration Quick Start

Replace dummy data in `src/pages/car-modifiers.tsx`:

```tsx
// 1. Geocode city to coordinates
const geocode = async (city: string) => {
  const res = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=${API_KEY}`
  );
  return res.json();
};

// 2. Search for shops
const nearbySearch = (lat, lng) => {
  const service = new google.maps.places.PlacesService(mapRef.current);
  service.nearbySearch(
    {
      location: { lat, lng },
      radius: 15000,
      keyword: "car modification",
    },
    callback
  );
};

// 3. Get shop details
const getDetails = (placeId) => {
  service.getDetails(
    { placeId, fields: ["name", "rating", "photos"] },
    callback
  );
};
```

---

## 📊 Color Codes (Tailwind)

### Rating Colors

- 4.5-5.0: Gold (yellow-100/yellow-800)
- 4.0-4.4: Silver (gray-100/gray-800)
- 3.5-3.9: Bronze (orange-100/orange-800)
- Below 3.5: Gray (gray-200/gray-700)

### Status Colors

- Primary: Blue-600
- Success: Green-600
- Warning: Amber-600
- Error: Red-600
- Neutral: Gray-600

---

## 📱 Mobile Optimization

### Touch Targets

- Minimum 48px x 48px (button height: py-2.5)

### Readable Text

- Minimum 16px font (base)
- Line height: 1.5

### Spacing

- Gap between elements: gap-3 or gap-4

### Viewport

```html
<meta name="viewport" content="width=device-width, initial-scale=1" />
```

(Already in Next.js layout)

---

## 🎬 Event Handlers Pattern

```tsx
// Click handler
const handleClick = useCallback(() => {
  // Do something
}, [dependencies]);

// Change handler
const handleChange = useCallback((value: string) => {
  setState(value);
}, []);

// Async handler
const handleSearch = useCallback(async () => {
  setLoading(true);
  try {
    const results = await fetchShops();
    setShops(results);
  } catch (error) {
    setError(error.message);
  } finally {
    setLoading(false);
  }
}, []);
```

---

## 📦 Dependencies Used

```json
{
  "dependencies": {
    "react": "^18.x",
    "next": "^14.x",
    "typescript": "^5.x"
  },
  "devDependencies": {
    "tailwindcss": "^3.x",
    "@types/react": "^18.x",
    "@types/node": "^20.x"
  }
}
```

No additional libraries needed!

---

## ✨ Performance Tips

1. **Use useCallback** for event handlers
2. **Keep components pure** (no side effects)
3. **Memoize expensive calculations**
4. **Lazy load images** with Next.js Image
5. **Debounce search** input for API calls

---

## 🔒 Security Checklist

- ✅ API key in .env.local (not committed)
- ✅ Input validation (city name trimmed)
- ✅ Error messages (user-friendly, not detailed)
- ✅ XSS protection (React escapes by default)
- ✅ TypeScript (catches type errors)

---

## 📚 Documentation Files

1. **CAR_MODIFIERS_SETUP.md** - Full setup guide
2. **IMPLEMENTATION_GUIDE.md** - Deep dive guide
3. **PROJECT_SUMMARY.md** - Complete overview
4. **QUICK_REFERENCE.md** - This file

---

## 🎯 Common Tasks

### Add New Atom Component

1. Create `src/components/atoms/YourComponent.tsx`
2. Export in `src/components/index.ts`
3. Use in molecules/organisms

### Style a Component

```tsx
className = "px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700";
```

### Add Loading State

```tsx
{
  isLoading && <div className="animate-spin">Loading...</div>;
}
```

### Handle Error

```tsx
{
  error && <div className="text-red-600">{error}</div>;
}
```

---

## 🚀 Ready to Build!

Your Car Modifiers Locator is ready to use. Start with the main page at:

```
http://localhost:3000/car-modifiers
```

For detailed guides, see:

- IMPLEMENTATION_GUIDE.md (for APIs)
- CAR_MODIFIERS_SETUP.md (for setup)

Happy coding! 🎉
