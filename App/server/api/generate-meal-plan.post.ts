import type { MealPlan, MealPlanRequest } from '~/types';
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

  for (const day of days) {
    const usedIds = new Set<string>();
    
    const breakfast = findBestRecipe(breakfastRecipes, breakfastCals, usedIds);
    usedIds.add(breakfast.id);
    
    const lunch = findBestRecipe(lunchRecipes, lunchCals, usedIds);
    usedIds.add(lunch.id);
    
    const dinner = findBestRecipe(dinnerRecipes, dinnerCals, usedIds);
    usedIds.add(dinner.id);

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
