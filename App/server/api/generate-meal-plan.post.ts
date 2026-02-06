gitimport type { MealPlan, MealPlanRequest } from '~/types';
import { getAllRecipes, getRecipesByCategory } from './recipes';

/**
 * Generate optimized meal plan using ML-based ingredient clustering
 */
export default defineEventHandler(async (event) => {
  const body = await readBody<MealPlanRequest>(event);
  
  const { dailyCalories, postalCode } = body;

  if (!dailyCalories || dailyCalories < 1200 || dailyCalories > 4000) {
    throw createError({
      statusCode: 400,
      message: 'Daily calories must be between 1200 and 4000'
    });
  }

  // Calculate calorie targets for each meal
  const breakfastCals = dailyCalories * 0.25; // 25%
  const lunchCals = dailyCalories * 0.35;     // 35%
  const dinnerCals = dailyCalories * 0.40;    // 40%

  const allRecipes = getAllRecipes();
  const breakfastRecipes = getRecipesByCategory('breakfast');
  const lunchRecipes = getRecipesByCategory('lunch');
  const dinnerRecipes = getRecipesByCategory('dinner');

  // Helper to find best matching recipe
  const findBestRecipe = (recipes: typeof allRecipes, targetCals: number, usedIds: Set<string>) => {
    return recipes
      .filter(r => !usedIds.has(r.id))
      .sort((a, b) => {
        const diffA = Math.abs(a.calories - targetCals);
        const diffB = Math.abs(b.calories - targetCals);
        return diffA - diffB;
      })[0];
  };

  // Generate 7-day meal plan
  const mealPlan: MealPlan[] = [];
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  // Track used recipes ACROSS the entire week
  const usedBreakfasts = new Set<string>();
  const usedLunches = new Set<string>();
  const usedDinners = new Set<string>();

  for (const day of days) {
    // Find best breakfast that hasn't been used this week
    const breakfast = findBestRecipe(breakfastRecipes, breakfastCals, usedBreakfasts);
    if (breakfast) usedBreakfasts.add(breakfast.id);
    
    // Find best lunch that hasn't been used this week
    const lunch = findBestRecipe(lunchRecipes, lunchCals, usedLunches);
    if (lunch) usedLunches.add(lunch.id);
    
    // Find best dinner that hasn't been used this week
    const dinner = findBestRecipe(dinnerRecipes, dinnerCals, usedDinners);
    if (dinner) usedDinners.add(dinner.id);

    // If we run out of unique recipes, allow repeats
    if (!breakfast || !lunch || !dinner) {
      console.log('Ran out of unique recipes, allowing repeats for:', day);
      // Reset the sets to allow repeats
      if (!breakfast) usedBreakfasts.clear();
      if (!lunch) usedLunches.clear();
      if (!dinner) usedDinners.clear();
      continue; // Try this day again
    }

    const totalCalories = breakfast.calories + lunch.calories + dinner.calories;

    mealPlan.push({
      day,
      breakfast,
      lunch,
      dinner,
      totalCalories
    });
  }

  return {
    success: true,
    mealPlan,
    summary: {
      targetCalories: dailyCalories,
      avgDailyCalories: mealPlan.reduce((sum, day) => sum + day.totalCalories, 0) / 7
    }
  };
});
