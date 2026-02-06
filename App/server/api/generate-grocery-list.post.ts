import type { MealPlan, GroceryItem, Ingredient } from '~/types';

/**
 * Generate consolidated grocery list with Superstore pricing
 */
export default defineEventHandler(async (event) => {
  const body = await readBody<{ mealPlan: MealPlan[], postalCode?: string }>(event);
  
  const { mealPlan, postalCode } = body;

  if (!mealPlan || mealPlan.length === 0) {
    throw createError({
      statusCode: 400,
      message: 'Meal plan is required'
    });
  }

  // Consolidate all ingredients from the meal plan
  const consolidatedIngredients = new Map<string, Ingredient>();

  for (const day of mealPlan) {
    const allMeals = [day.breakfast, day.lunch, day.dinner];
    
    for (const meal of allMeals) {
      for (const ingredient of meal.ingredients) {
        const key = ingredient.name.toLowerCase();
        
        if (consolidatedIngredients.has(key)) {
          const existing = consolidatedIngredients.get(key)!;
          existing.quantity += ingredient.quantity;
        } else {
          consolidatedIngredients.set(key, { ...ingredient });
        }
      }
    }
  }

  // Convert to grocery list
  const groceryList: GroceryItem[] = [];
  
  for (const [name, ingredient] of consolidatedIngredients) {
    // Try to fetch price from Superstore API
    let price = 0;
    
    try {
      const searchResult = await $fetch('/api/superstore', {
        query: { q: ingredient.name, postal: postalCode }
      });
      
      if ((searchResult as any).products && (searchResult as any).products.length > 0) {
        price = (searchResult as any).products[0].price;
      } else {
        // No products found, use estimate
        price = estimatePrice(ingredient);
      }
    } catch (error) {
      // Use estimated price if API fails
      price = estimatePrice(ingredient);
    }
    
    // Final fallback if still zero
    if (!price || price === 0) {
      price = estimatePrice(ingredient);
    }

    groceryList.push({
      name: ingredient.name,
      quantity: Math.ceil(ingredient.quantity * 10) / 10, // Round to 1 decimal
      unit: ingredient.unit,
      category: ingredient.category,
      price: price
    });
  }

  // Sort by category
  groceryList.sort((a, b) => a.category.localeCompare(b.category));

  // Calculate total cost
  const totalCost = groceryList.reduce((sum, item) => sum + item.price, 0);

  // Calculate estimated savings from consolidation
  const totalIngredients = mealPlan.reduce((sum, day) => {
    return sum + 
      day.breakfast.ingredients.length +
      day.lunch.ingredients.length +
      day.dinner.ingredients.length;
  }, 0);

  const consolidationSavings = (totalIngredients - groceryList.length) * 2.5; // $2.50 per reduced unique item

  return {
    success: true,
    groceryList,
    summary: {
      totalItems: groceryList.length,
      totalCost: Math.round(totalCost * 100) / 100,
      estimatedSavings: Math.round(consolidationSavings * 100) / 100,
      ingredientsConsolidated: totalIngredients - groceryList.length
    }
  };
});

/**
 * Estimate price for common ingredients (fallback when API fails)
 */
function estimatePrice(ingredient: Ingredient): number {
  const priceEstimates: { [key: string]: number } = {
    // Proteins (per 100g or per item)
    'chicken breast': 3.99,
    'ground beef': 4.49,
    'salmon': 6.99,
    'tofu': 3.49,
    'eggs': 0.50, // per egg
    'black beans': 1.29,
    'protein powder': 1.50, // per scoop
    
    // Carbs
    'brown rice': 2.99,
    'quinoa': 4.49,
    'oats': 2.49,
    'pasta': 1.99,
    'sweet potato': 1.49,
    'whole wheat tortilla': 0.40,
    'whole wheat bread': 0.35, // per slice
    'granola': 5.99,
    
    // Vegetables
    'broccoli': 2.99,
    'spinach': 3.49,
    'bell pepper': 1.99,
    'onion': 0.79,
    'garlic': 0.99,
    'tomato': 1.29,
    'carrots': 1.99,
    
    // Fruits
    'banana': 0.30,
    'blueberries': 4.99,
    'strawberries': 5.49,
    'frozen berries': 4.49,
    'lemon': 0.99,
    'lime': 0.99,
    
    // Dairy
    'milk': 4.99,
    'cheddar cheese': 5.99,
    'greek yogurt': 4.49,
    'butter': 5.49,
    
    // Fats & Others
    'olive oil': 7.99,
    'avocado': 2.49,
    'almonds': 5.99,
    'soy sauce': 3.99,
    'honey': 5.99
  };

  const basePrice = priceEstimates[ingredient.name.toLowerCase()] || 2.99;
  
  // Adjust price based on quantity
  const multiplier = ingredient.quantity > 1 ? Math.ceil(ingredient.quantity) : 1;
  
  return Math.round(basePrice * multiplier * 100) / 100;
}
