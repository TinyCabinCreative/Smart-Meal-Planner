# 🎯 Smart Meal Planner

An AI-powered meal planning application built with Nuxt 3 that optimizes ingredient usage and provides real-time pricing from Real Canadian Superstore.

![Landing page screenshot](App\assets\css\img\ScreenShot.png)
![screenshot showing grocery list](App\assets\css\img\ScreenShotGroceries.png)
![screenshot showing recipes](App\assets\css\img\ScreenShotRecipes.png)
## ✨ Features

- **🤖 ML-Powered Optimization**: Uses TensorFlow.js for ingredient clustering to minimize variety and maximize reuse
- **💰 Real-Time Pricing**: Integrates with Real Canadian Superstore's API for accurate pricing
- **🛒 Smart Grocery Lists**: Automatically consolidates ingredients and calculates savings
- **📊 Nutritional Tracking**: Tracks calories, protein, carbs, and fat for each meal
- **🎨 Dark Theme UI**: Clean, minimal interface built with Tailwind CSS
- **📱 Responsive Design**: Works perfectly on desktop, tablet, and mobile

## 🚀 How It Works

1. **Input Your Calorie Goal**: Enter your daily calorie target (1200-4000 calories)
2. **ML Optimization**: The app uses machine learning to select recipes that share common ingredients
3. **7-Day Meal Plan**: Get a complete week of breakfast, lunch, and dinner
4. **Smart Grocery List**: Consolidated shopping list with real Superstore prices
5. **Cost Savings**: See how much you save by reducing ingredient variety

## 🛠️ Tech Stack

- **Framework**: Nuxt 3
- **Styling**: Tailwind CSS
- **ML**: TensorFlow.js
- **API**: Real Canadian Superstore (PC Express) unofficial API
- **Language**: TypeScript

## 📦 Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🌐 API Integration

### Real Canadian Superstore API

This app uses the unofficial PC Express API to fetch real-time grocery prices. The API endpoint:

```
POST https://api.pcexpress.ca/product-facade/v3/products/search
```

**Headers:**
- `X-Apikey`: `1im1hL52q9xvta16GlSdYDsTsG0dmyhF`
- `Site-Banner`: `superstore`
- `Content-Type`: `application/json`

**Body:**
```json
{
  "pagination": { "from": 0, "size": 20 },
  "banner": "superstore",
  "query": "chicken breast",
  "locale": "en",
  "postalCode": "V5K0A1"
}
```

### Fallback Pricing

If the Superstore API is unavailable, the app falls back to estimated prices based on typical grocery costs.

## 🧠 Machine Learning Features

### Ingredient Clustering

The `IngredientOptimizer` class uses vector embeddings to represent ingredients based on:

- **Category**: Protein, carbs, vegetables, fats, etc.
- **Nutritional Profile**: Protein, carbs, fat content
- **Usage Patterns**: How ingredients are commonly used together

### Optimization Algorithm

1. **Vector Similarity**: Calculate cosine similarity between ingredient vectors
2. **Recipe Scoring**: Score recipes based on:
   - Calorie match to target
   - Ingredient overlap with already-selected recipes
3. **Consolidation**: Merge duplicate ingredients across meals
4. **Cost Analysis**: Calculate savings from reduced ingredient variety

## 📁 Project Structure

```
nuxt-meal-planner/
├── assets/
│   └── css/
│       └── main.css          # Tailwind styles
├── pages/
│   └── index.vue             # Main application page
├── server/
│   └── api/
│       ├── superstore.ts     # Superstore API integration
│       ├── recipes.ts        # Recipe database
│       ├── generate-meal-plan.post.ts
│       └── generate-grocery-list.post.ts
├── types/
│   └── index.ts              # TypeScript interfaces
├── utils/
│   └── ingredientOptimizer.ts # ML optimization logic
├── nuxt.config.ts
├── tailwind.config.js
└── package.json
```

## 🎨 UI/UX Design

### Color Palette

- **Background**: `#0a0a0a` (dark-bg)
- **Surface**: `#1a1a1a` (dark-surface)
- **Border**: `#2a2a2a` (dark-border)
- **Text**: `#e5e5e5` (dark-text)
- **Accent**: Blue (`#3b82f6`) and Purple (`#8b5cf6`)

### Design Principles

1. **Minimal**: Clean, focused interface with no clutter
2. **Dark**: Easy on the eyes for extended planning sessions
3. **Responsive**: Adapts seamlessly to all screen sizes
4. **Accessible**: High contrast ratios and clear typography

## 📊 Example Output

### Weekly Meal Plan
```
Monday (1,980 calories)
├── Breakfast: Vegetable Omelet (320 cal)
├── Lunch: Grilled Chicken Wrap (380 cal)
└── Dinner: Chicken Rice Bowl (520 cal)

Tuesday (2,010 calories)
├── Breakfast: Berry Oatmeal Bowl (380 cal)
├── Lunch: Black Bean Buddha Bowl (460 cal)
└── Dinner: Herb-Baked Salmon (450 cal)
```

### Grocery List Savings
```
Total Items: 24 (reduced from 63)
Total Cost: $127.50
Estimated Savings: $97.50 (43%)
```

## 🔧 Configuration

### Calorie Targets

The app distributes daily calories as:
- **Breakfast**: 25%
- **Lunch**: 35%
- **Dinner**: 40%

### Postal Code

Enter your postal code for location-specific Superstore pricing. Default is `V5K0A1` (Vancouver).

## 🚢 Deployment

### Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Deploy to Netlify

```bash
# Build the app
npm run build

# Deploy the .output directory
```

### Environment Variables

No environment variables required! The app uses public APIs and client-side ML.

## 🤝 Contributing

This is a proof-of-concept application. To extend it:

1. **Add More Recipes**: Expand `server/api/recipes.ts`
2. **Improve ML**: Enhance `utils/ingredientOptimizer.ts` with better embeddings
3. **Add Dietary Filters**: Implement vegetarian, vegan, gluten-free options
4. **Recipe Instructions**: Add detailed cooking instructions view
5. **Shopping List Export**: Add PDF/CSV export options

## ⚠️ Limitations

1. **Unofficial API**: The Superstore API is not officially supported and may change
2. **Price Accuracy**: Prices are location-dependent and may vary
3. **Recipe Database**: Currently has a limited set of ~10 recipes
4. **No Authentication**: No user accounts or saved meal plans

## 📝 License

MIT License - feel free to use this project for learning or commercial purposes.

## 🙏 Credits

- **PC Express API**: Reverse-engineered by the community
- **TensorFlow.js**: Google's ML library
- **Nuxt 3**: Vue.js framework
- **Tailwind CSS**: Utility-first CSS framework

## 📧 Support

For questions or issues, please open an issue on GitHub.

---

**Built with ❤️ for smarter meal planning**