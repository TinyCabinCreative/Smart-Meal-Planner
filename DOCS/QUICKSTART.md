# 🚀 Quick Start Guide

## Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

## Setup (2 minutes)

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start development server**
   ```bash
   npm run dev
   ```

3. **Open in browser**
   ```
   http://localhost:3000
   ```

## Using the App

### Step 1: Enter Your Calorie Goal
- Input your daily calorie target (e.g., 2000)
- Optionally add your postal code for local pricing

### Step 2: Generate Meal Plan
- Click "Generate Weekly Meal Plan"
- View your optimized 7-day meal plan

### Step 3: Get Grocery List
- Switch to the "Grocery List" tab
- See consolidated ingredients with prices
- Download the list for shopping

## Key Features to Try

1. **Compare Calorie Targets**: Try 1500 vs 2500 calories to see different meal selections
2. **View Savings**: Check how much you save through ingredient consolidation
3. **Download List**: Export your grocery list as a text file

## Tips for Best Results

- **Accurate Calories**: Use an online TDEE calculator for your target
- **Local Pricing**: Enter your postal code for accurate Superstore prices
- **Meal Variety**: The app automatically selects diverse recipes while minimizing ingredients

## Troubleshooting

### Port Already in Use
```bash
# Use a different port
PORT=3001 npm run dev
```

### API Errors
- The Superstore API may occasionally be unavailable
- The app will fall back to estimated prices automatically

### Build Issues
```bash
# Clear cache and reinstall
rm -rf node_modules .nuxt
npm install
```

## Next Steps

- Explore the code in `/utils/ingredientOptimizer.ts` to see the ML logic
- Add your own recipes in `/server/api/recipes.ts`
- Customize the UI in `/pages/index.vue`

## Production Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## Deploy

### Quick Deploy to Vercel
```bash
npx vercel
```

### Quick Deploy to Netlify
```bash
npm run build
# Upload .output/public folder to Netlify
```

---

**Need help?** Check the main README.md for detailed documentation.
