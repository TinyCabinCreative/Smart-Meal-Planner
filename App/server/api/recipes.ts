import type { Recipe } from '~/types';

/**
 * Curated recipe database optimized for ingredient overlap
 * Recipes are designed to share common base ingredients
 */
export const recipeDatabase: Recipe[] = [
  // Chicken-based recipes
  {
    id: 'chicken-rice-bowl',
    name: 'Grilled Chicken Rice Bowl',
    description: 'Protein-packed bowl with tender chicken and brown rice',
    calories: 520,
    protein: 42,
    carbs: 48,
    fat: 14,
    prepTime: 15,
    cookTime: 25,
    ingredients: [
      { name: 'chicken breast', category: 'protein', quantity: 150, unit: 'g' },
      { name: 'brown rice', category: 'carbs', quantity: 1, unit: 'cup' },
      { name: 'broccoli', category: 'vegetables', quantity: 1, unit: 'cup' },
      { name: 'olive oil', category: 'fats', quantity: 1, unit: 'tbsp' },
      { name: 'garlic', category: 'vegetables', quantity: 2, unit: 'cloves' },
      { name: 'soy sauce', category: 'condiments', quantity: 2, unit: 'tbsp' }
    ],
    instructions: [
      'Cook brown rice according to package instructions',
      'Season chicken with salt, pepper, and minced garlic',
      'Grill chicken until internal temp reaches 165°F',
      'Steam broccoli until tender',
      'Assemble bowl with rice, sliced chicken, and broccoli',
      'Drizzle with soy sauce and olive oil'
    ]
  },
  {
    id: 'chicken-veggie-stir-fry',
    name: 'Chicken Veggie Stir Fry',
    description: 'Quick and healthy stir fry with colorful vegetables',
    calories: 480,
    protein: 38,
    carbs: 42,
    fat: 16,
    prepTime: 10,
    cookTime: 15,
    ingredients: [
      { name: 'chicken breast', category: 'protein', quantity: 150, unit: 'g' },
      { name: 'brown rice', category: 'carbs', quantity: 0.75, unit: 'cup' },
      { name: 'bell pepper', category: 'vegetables', quantity: 1, unit: 'whole' },
      { name: 'broccoli', category: 'vegetables', quantity: 1, unit: 'cup' },
      { name: 'onion', category: 'vegetables', quantity: 0.5, unit: 'whole' },
      { name: 'garlic', category: 'vegetables', quantity: 3, unit: 'cloves' },
      { name: 'olive oil', category: 'fats', quantity: 1.5, unit: 'tbsp' },
      { name: 'soy sauce', category: 'condiments', quantity: 2, unit: 'tbsp' }
    ],
    instructions: [
      'Cook rice and set aside',
      'Cut chicken into bite-sized pieces',
      'Heat oil in wok over high heat',
      'Stir fry chicken until cooked through',
      'Add vegetables and stir fry for 5 minutes',
      'Add soy sauce and garlic, toss to combine',
      'Serve over rice'
    ]
  },

  // Egg-based breakfast recipes
  {
    id: 'veggie-omelet',
    name: 'Vegetable Omelet',
    description: 'Fluffy omelet loaded with fresh vegetables',
    calories: 320,
    protein: 22,
    carbs: 12,
    fat: 20,
    prepTime: 5,
    cookTime: 10,
    ingredients: [
      { name: 'eggs', category: 'protein', quantity: 3, unit: 'whole' },
      { name: 'bell pepper', category: 'vegetables', quantity: 0.5, unit: 'whole' },
      { name: 'onion', category: 'vegetables', quantity: 0.25, unit: 'whole' },
      { name: 'spinach', category: 'vegetables', quantity: 1, unit: 'cup' },
      { name: 'cheddar cheese', category: 'dairy', quantity: 30, unit: 'g' },
      { name: 'olive oil', category: 'fats', quantity: 1, unit: 'tbsp' }
    ],
    instructions: [
      'Beat eggs in a bowl with salt and pepper',
      'Sauté vegetables in olive oil until soft',
      'Pour eggs over vegetables',
      'Cook until edges set, add cheese',
      'Fold omelet and cook until done'
    ]
  },
  {
    id: 'oatmeal-bowl',
    name: 'Berry Oatmeal Bowl',
    description: 'Hearty oatmeal with fresh berries and nuts',
    calories: 380,
    protein: 12,
    carbs: 58,
    fat: 12,
    prepTime: 5,
    cookTime: 10,
    ingredients: [
      { name: 'oats', category: 'carbs', quantity: 0.5, unit: 'cup' },
      { name: 'milk', category: 'dairy', quantity: 1, unit: 'cup' },
      { name: 'blueberries', category: 'fruits', quantity: 0.5, unit: 'cup' },
      { name: 'almonds', category: 'fats', quantity: 15, unit: 'g' },
      { name: 'honey', category: 'condiments', quantity: 1, unit: 'tbsp' }
    ],
    instructions: [
      'Combine oats and milk in pot',
      'Cook over medium heat, stirring occasionally',
      'Once thickened, transfer to bowl',
      'Top with berries, almonds, and honey'
    ]
  },

  // Salmon recipes
  {
    id: 'baked-salmon',
    name: 'Herb-Baked Salmon',
    description: 'Tender salmon with herbs and roasted vegetables',
    calories: 450,
    protein: 35,
    carbs: 28,
    fat: 22,
    prepTime: 10,
    cookTime: 20,
    ingredients: [
      { name: 'salmon', category: 'protein', quantity: 150, unit: 'g' },
      { name: 'sweet potato', category: 'carbs', quantity: 1, unit: 'medium' },
      { name: 'broccoli', category: 'vegetables', quantity: 1.5, unit: 'cup' },
      { name: 'olive oil', category: 'fats', quantity: 2, unit: 'tbsp' },
      { name: 'garlic', category: 'vegetables', quantity: 2, unit: 'cloves' },
      { name: 'lemon', category: 'fruits', quantity: 0.5, unit: 'whole' }
    ],
    instructions: [
      'Preheat oven to 400°F',
      'Cut sweet potato into cubes',
      'Toss vegetables with olive oil and garlic',
      'Place salmon on baking sheet with vegetables',
      'Bake for 18-20 minutes',
      'Squeeze lemon over salmon before serving'
    ]
  },

  // Beef recipes
  {
    id: 'beef-quinoa-bowl',
    name: 'Beef & Quinoa Power Bowl',
    description: 'Lean beef with quinoa and roasted vegetables',
    calories: 540,
    protein: 38,
    carbs: 45,
    fat: 20,
    prepTime: 10,
    cookTime: 25,
    ingredients: [
      { name: 'ground beef', category: 'protein', quantity: 120, unit: 'g' },
      { name: 'quinoa', category: 'carbs', quantity: 0.75, unit: 'cup' },
      { name: 'bell pepper', category: 'vegetables', quantity: 1, unit: 'whole' },
      { name: 'onion', category: 'vegetables', quantity: 0.5, unit: 'whole' },
      { name: 'garlic', category: 'vegetables', quantity: 2, unit: 'cloves' },
      { name: 'olive oil', category: 'fats', quantity: 1, unit: 'tbsp' }
    ],
    instructions: [
      'Cook quinoa according to package directions',
      'Brown ground beef in skillet',
      'Add chopped vegetables and cook until soft',
      'Season with salt, pepper, and garlic',
      'Serve beef mixture over quinoa'
    ]
  },

  // Vegetarian options
  {
    id: 'tofu-stir-fry',
    name: 'Crispy Tofu Stir Fry',
    description: 'Plant-based protein with crispy tofu and vegetables',
    calories: 420,
    protein: 24,
    carbs: 48,
    fat: 16,
    prepTime: 15,
    cookTime: 20,
    ingredients: [
      { name: 'tofu', category: 'protein', quantity: 200, unit: 'g' },
      { name: 'brown rice', category: 'carbs', quantity: 1, unit: 'cup' },
      { name: 'broccoli', category: 'vegetables', quantity: 1, unit: 'cup' },
      { name: 'bell pepper', category: 'vegetables', quantity: 1, unit: 'whole' },
      { name: 'onion', category: 'vegetables', quantity: 0.5, unit: 'whole' },
      { name: 'garlic', category: 'vegetables', quantity: 3, unit: 'cloves' },
      { name: 'soy sauce', category: 'condiments', quantity: 2, unit: 'tbsp' },
      { name: 'olive oil', category: 'fats', quantity: 1.5, unit: 'tbsp' }
    ],
    instructions: [
      'Press tofu to remove excess water',
      'Cut tofu into cubes',
      'Cook rice and set aside',
      'Pan fry tofu in oil until crispy',
      'Remove tofu, add vegetables to pan',
      'Stir fry vegetables until tender',
      'Return tofu to pan with soy sauce',
      'Serve over rice'
    ]
  },
  {
    id: 'black-bean-bowl',
    name: 'Black Bean Buddha Bowl',
    description: 'Nutritious bowl with black beans and fresh veggies',
    calories: 460,
    protein: 18,
    carbs: 68,
    fat: 14,
    prepTime: 10,
    cookTime: 15,
    ingredients: [
      { name: 'black beans', category: 'protein', quantity: 1, unit: 'cup' },
      { name: 'quinoa', category: 'carbs', quantity: 0.75, unit: 'cup' },
      { name: 'sweet potato', category: 'carbs', quantity: 1, unit: 'small' },
      { name: 'avocado', category: 'fats', quantity: 0.5, unit: 'whole' },
      { name: 'spinach', category: 'vegetables', quantity: 2, unit: 'cup' },
      { name: 'lime', category: 'fruits', quantity: 0.5, unit: 'whole' }
    ],
    instructions: [
      'Cook quinoa and black beans',
      'Roast diced sweet potato at 425°F for 20 minutes',
      'Arrange spinach in bowl',
      'Top with quinoa, beans, and sweet potato',
      'Add sliced avocado',
      'Squeeze lime juice over bowl'
    ]
  },

  // Lunch wraps/sandwiches
  {
    id: 'chicken-wrap',
    name: 'Grilled Chicken Wrap',
    description: 'Fresh wrap with grilled chicken and vegetables',
    calories: 380,
    protein: 32,
    carbs: 38,
    fat: 10,
    prepTime: 10,
    cookTime: 0,
    ingredients: [
      { name: 'chicken breast', category: 'protein', quantity: 100, unit: 'g' },
      { name: 'whole wheat tortilla', category: 'carbs', quantity: 1, unit: 'large' },
      { name: 'spinach', category: 'vegetables', quantity: 1, unit: 'cup' },
      { name: 'tomato', category: 'vegetables', quantity: 0.5, unit: 'whole' },
      { name: 'greek yogurt', category: 'dairy', quantity: 2, unit: 'tbsp' }
    ],
    instructions: [
      'Warm tortilla slightly',
      'Spread yogurt on tortilla',
      'Layer with spinach',
      'Add sliced grilled chicken',
      'Top with diced tomato',
      'Roll tightly and slice in half'
    ]
  }
];

/**
 * Get recipes by category
 */
export function getRecipesByCategory(category: 'breakfast' | 'lunch' | 'dinner'): Recipe[] {
  const categoryMap: { [key: string]: string[] } = {
    breakfast: ['veggie-omelet', 'oatmeal-bowl'],
    lunch: ['chicken-wrap', 'black-bean-bowl', 'tofu-stir-fry'],
    dinner: ['chicken-rice-bowl', 'chicken-veggie-stir-fry', 'baked-salmon', 'beef-quinoa-bowl']
  };

  const ids = categoryMap[category] || [];
  return recipeDatabase.filter(r => ids.includes(r.id));
}

/**
 * Get all recipes
 */
export function getAllRecipes(): Recipe[] {
  return recipeDatabase;
}
