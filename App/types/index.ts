export interface Ingredient {
  name: string;
  category: string;
  quantity: number;
  unit: string;
  price?: number;
  productId?: string;
}

export interface Recipe {
  id: string;
  name: string;
  description: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  ingredients: Ingredient[];
  instructions: string[];
  prepTime: number;
  cookTime: number;
}

export interface MealPlan {
  day: string;
  breakfast: Recipe;
  lunch: Recipe;
  dinner: Recipe;
  snacks?: Recipe[];
  totalCalories: number;
}

export interface GroceryItem {
  name: string;
  quantity: number;
  unit: string;
  price: number;
  category: string;
  productId?: string;
}

export interface SuperstoreProduct {
  code: string;
  name: string;
  brand: string;
  price: number;
  unit: string;
  description: string;
  imageUrl?: string;
}

export interface MealPlanRequest {
  dailyCalories: number;
  postalCode?: string;
  dietaryRestrictions?: string[];
  preferences?: string[];
}
