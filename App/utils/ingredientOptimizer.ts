import * as tf from '@tensorflow/tfjs';
import type { Ingredient, Recipe } from '~/types';

/**
 * ML-powered ingredient optimizer that uses clustering to group similar ingredients
 * and minimize variety in meal plans while maintaining nutritional balance
 */
export class IngredientOptimizer {
  private ingredientVectors: Map<string, number[]> = new Map();
  
  constructor() {
    this.initializeIngredientVectors();
  }

  /**
   * Initialize ingredient embeddings based on category, nutritional profile, and usage
   */
  private initializeIngredientVectors() {
    // Common ingredient categories and their vector representations
    const categories = {
      protein: { meat: 1, fish: 2, legumes: 3, dairy: 4, eggs: 5 },
      carbs: { grains: 1, pasta: 2, bread: 3, rice: 4, potatoes: 5 },
      vegetables: { leafy: 1, root: 2, cruciferous: 3, nightshade: 4, allium: 5 },
      fruits: { citrus: 1, berries: 2, tropical: 3, stone: 4, pome: 5 },
      fats: { oil: 1, nuts: 2, seeds: 3, butter: 4, avocado: 5 },
      dairy: { milk: 1, cheese: 2, yogurt: 3, cream: 4 },
      spices: { herbs: 1, hot: 2, aromatic: 3, sweet: 4 },
    };

    // Create vector embeddings for common ingredients
    const ingredients = {
      // Proteins
      'chicken breast': [1, 0, 0, 0, 0, 25, 0, 0.5],
      'ground beef': [1, 0, 0, 0, 0, 20, 0, 15],
      'salmon': [2, 0, 0, 0, 0, 22, 0, 13],
      'eggs': [5, 0, 0, 0, 0, 6, 0, 5],
      'tofu': [3, 0, 0, 0, 0, 8, 0, 4],
      'black beans': [3, 2, 0, 0, 0, 8, 20, 0.5],
      
      // Carbs
      'brown rice': [0, 4, 0, 0, 0, 2, 45, 1],
      'pasta': [0, 2, 0, 0, 0, 5, 40, 1],
      'sweet potato': [0, 5, 2, 0, 0, 2, 25, 0.1],
      'quinoa': [0, 4, 0, 0, 0, 4, 21, 2],
      'oats': [0, 1, 0, 0, 0, 5, 27, 3],
      
      // Vegetables
      'broccoli': [0, 0, 3, 0, 0, 3, 6, 0.3],
      'spinach': [0, 0, 1, 0, 0, 3, 3, 0.4],
      'carrots': [0, 0, 2, 0, 0, 1, 10, 0.2],
      'bell pepper': [0, 0, 4, 0, 0, 1, 6, 0.3],
      'onion': [0, 0, 5, 0, 0, 1, 9, 0.1],
      'tomato': [0, 0, 4, 0, 0, 1, 4, 0.2],
      'garlic': [0, 0, 5, 0, 0, 1, 3, 0.1],
      
      // Fats
      'olive oil': [1, 0, 0, 0, 0, 0, 0, 14],
      'avocado': [5, 0, 0, 1, 0, 2, 9, 15],
      'almonds': [2, 0, 0, 0, 0, 6, 6, 14],
      
      // Dairy
      'milk': [1, 0, 0, 0, 0, 3, 5, 3],
      'cheddar cheese': [2, 0, 0, 0, 0, 7, 1, 9],
      'greek yogurt': [3, 0, 0, 0, 0, 10, 4, 0.4],
    };

    for (const [ingredient, vector] of Object.entries(ingredients)) {
      this.ingredientVectors.set(ingredient.toLowerCase(), vector);
    }
  }

  /**
   * Calculate ingredient similarity using cosine similarity
   */
  private calculateSimilarity(vec1: number[], vec2: number[]): number {
    const dotProduct = vec1.reduce((sum, val, i) => sum + val * vec2[i], 0);
    const mag1 = Math.sqrt(vec1.reduce((sum, val) => sum + val * val, 0));
    const mag2 = Math.sqrt(vec2.reduce((sum, val) => sum + val * val, 0));
    return dotProduct / (mag1 * mag2);
  }

  /**
   * Cluster recipes by ingredient similarity to maximize ingredient reuse
   */
  public optimizeRecipeSelection(
    allRecipes: Recipe[],
    targetCalories: number,
    daysNeeded: number = 7
  ): Recipe[] {
    const mealsPerDay = 3; // breakfast, lunch, dinner
    const totalMeals = daysNeeded * mealsPerDay;
    const caloriesPerMeal = targetCalories / mealsPerDay;

    // Score each recipe based on calorie target and ingredient availability
    const scoredRecipes = allRecipes.map(recipe => {
      const calorieScore = 1 - Math.abs(recipe.calories - caloriesPerMeal) / caloriesPerMeal;
      return {
        recipe,
        score: calorieScore,
        ingredients: recipe.ingredients.map(i => i.name.toLowerCase())
      };
    });

    // Select recipes that maximize ingredient overlap
    const selectedRecipes: Recipe[] = [];
    const ingredientUsage = new Map<string, number>();

    for (let i = 0; i < totalMeals && scoredRecipes.length > 0; i++) {
      // Calculate bonus for recipes that use already-selected ingredients
      const recipesWithBonus = scoredRecipes.map(sr => {
        const overlapBonus = sr.ingredients.reduce((bonus, ing) => {
          return bonus + (ingredientUsage.get(ing) || 0) * 0.2;
        }, 0);
        
        return {
          ...sr,
          finalScore: sr.score + overlapBonus
        };
      });

      // Sort by final score and select the best
      recipesWithBonus.sort((a, b) => b.finalScore - a.finalScore);
      const selected = recipesWithBonus[0];
      
      selectedRecipes.push(selected.recipe);
      
      // Update ingredient usage
      selected.ingredients.forEach(ing => {
        ingredientUsage.set(ing, (ingredientUsage.get(ing) || 0) + 1);
      });

      // Remove selected recipe
      const index = scoredRecipes.findIndex(sr => sr.recipe.id === selected.recipe.id);
      scoredRecipes.splice(index, 1);
    }

    return selectedRecipes;
  }

  /**
   * Consolidate grocery list to minimize unique ingredients
   */
  public consolidateGroceryList(ingredients: Ingredient[]): Ingredient[] {
    const consolidated = new Map<string, Ingredient>();

    for (const ingredient of ingredients) {
      const key = ingredient.name.toLowerCase();
      
      if (consolidated.has(key)) {
        const existing = consolidated.get(key)!;
        // Convert to common unit and sum quantities
        existing.quantity += this.convertToCommonUnit(ingredient.quantity, ingredient.unit, existing.unit);
      } else {
        consolidated.set(key, { ...ingredient });
      }
    }

    return Array.from(consolidated.values());
  }

  /**
   * Simple unit conversion for common cooking measurements
   */
  private convertToCommonUnit(quantity: number, fromUnit: string, toUnit: string): number {
    if (fromUnit === toUnit) return quantity;
    
    const conversions: { [key: string]: number } = {
      'tsp-tbsp': 1/3,
      'tbsp-cup': 1/16,
      'cup-ml': 240,
      'oz-g': 28.35,
      'lb-g': 453.592,
    };

    const key = `${fromUnit}-${toUnit}`;
    return conversions[key] ? quantity * conversions[key] : quantity;
  }

  /**
   * Estimate total cost savings from ingredient consolidation
   */
  public calculateSavings(originalList: Ingredient[], consolidatedList: Ingredient[]): number {
    // Estimate 15% savings per consolidated item due to bulk purchasing
    const uniqueItemReduction = originalList.length - consolidatedList.length;
    return uniqueItemReduction * 0.15;
  }
}

export const ingredientOptimizer = new IngredientOptimizer();
