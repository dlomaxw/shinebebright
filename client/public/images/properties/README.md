# Property Images Directory

## Usage Guidelines

### 📁 Directory Structure
```
client/public/images/properties/
├── featured/           # Featured property images
├── residential/        # Residential property images  
├── commercial/         # Commercial property images
└── thumbnails/         # Thumbnail versions
```

### ⚠️ Important Usage Rules

1. **File Naming Convention:**
   - Use property ID or unique identifier
   - Format: `{property-id}_{sequence}.{ext}`
   - Example: `prince_charles_luxury_01.jpg`

2. **Image Requirements:**
   - Primary images: 1200x800px minimum
   - Thumbnails: 400x300px
   - Format: JPG, PNG, WebP
   - Max size: 2MB per image

3. **Do NOT Use Images For:**
   - ❌ Company logos (use /src/assets/ instead)
   - ❌ UI icons (use lucide-react)
   - ❌ Generic placeholders
   - ❌ Non-property related content

4. **DO Use Images For:**
   - ✅ Property exterior photos
   - ✅ Property interior photos
   - ✅ Property amenity photos
   - ✅ Location/neighborhood images

### 🔧 Implementation
Images in this directory are served at: `/images/properties/{filename}`

### 📝 Notes
- This directory was created to resolve placeholder image usage
- Replaces the temporary `/api/placeholder/*` endpoint
- Ensures proper separation of property images from other assets