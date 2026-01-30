<template>
  <div class="max-w-7xl mx-auto px-4 py-12">
    <!-- Header -->
    <header class="text-center mb-16">
      <h1 class="text-5xl font-bold mb-4 bg-gradient-to-r from-accent-primary to-accent-secondary bg-clip-text text-transparent">
        Smart Meal Planner
      </h1>
      <p class="text-dark-muted text-lg">
        AI-powered meal planning with ingredient optimization & Real Canadian Superstore pricing
      </p>
    </header>

    <!-- Input Section -->
    <div v-if="!mealPlan" class="max-w-2xl mx-auto">
      <div class="card">
        <h2 class="section-title">Your Daily Calorie Goal</h2>
        
        <div class="space-y-6">
          <div>
            <label class="block text-sm font-medium mb-2">Daily Calories</label>
            <input 
              v-model.number="calorieGoal" 
              type="number" 
              min="1200" 
              max="4000" 
              step="50"
              class="input"
              placeholder="e.g., 2000"
            />
            <p class="text-sm text-dark-muted mt-2">
              Recommended: 1500-2500 for weight loss, 2000-3000 for maintenance
            </p>
          </div>

          <div>
            <label class="block text-sm font-medium mb-2">Postal Code (Optional)</label>
            <input 
              v-model="postalCode" 
              type="text" 
              class="input"
              placeholder="e.g., V5K 0A1"
            />
            <p class="text-sm text-dark-muted mt-2">
              For accurate Superstore pricing in your area
            </p>
          </div>

          <button 
            @click="generateMealPlan" 
            :disabled="loading || !calorieGoal"
            class="btn-primary w-full"
          >
            <span v-if="loading">Generating...</span>
            <span v-else>🎯 Generate Weekly Meal Plan</span>
          </button>
        </div>

        <!-- Features -->
        <div class="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="text-center p-4 bg-dark-bg rounded-lg">
            <div class="text-2xl mb-2">🤖</div>
            <div class="text-sm font-medium">ML-Powered</div>
            <div class="text-xs text-dark-muted mt-1">Ingredient clustering</div>
          </div>
          <div class="text-center p-4 bg-dark-bg rounded-lg">
            <div class="text-2xl mb-2">💰</div>
            <div class="text-sm font-medium">Cost Optimized</div>
            <div class="text-xs text-dark-muted mt-1">Real-time pricing</div>
          </div>
          <div class="text-center p-4 bg-dark-bg rounded-lg">
            <div class="text-2xl mb-2">🛒</div>
            <div class="text-sm font-medium">Smart Lists</div>
            <div class="text-xs text-dark-muted mt-1">Consolidated shopping</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Meal Plan Display -->
    <div v-else class="space-y-8">
      <!-- Summary -->
      <div class="card">
        <div class="flex justify-between items-center">
          <div>
            <h2 class="text-2xl font-bold">Your 7-Day Meal Plan</h2>
            <p class="text-dark-muted mt-1">
              Target: {{ calorieGoal }} cal/day • Avg: {{ Math.round(avgCalories) }} cal/day
            </p>
          </div>
          <button @click="reset" class="btn-secondary">
            ← Start Over
          </button>
        </div>
      </div>

      <!-- Tabs -->
      <div class="flex gap-4 border-b border-dark-border">
        <button 
          @click="activeTab = 'meals'"
          :class="[
            'pb-3 px-4 font-medium transition-colors',
            activeTab === 'meals' ? 'border-b-2 border-accent-primary text-accent-primary' : 'text-dark-muted hover:text-dark-text'
          ]"
        >
          📅 Meal Plan
        </button>
        <button 
          @click="activeTab = 'grocery'"
          :class="[
            'pb-3 px-4 font-medium transition-colors',
            activeTab === 'grocery' ? 'border-b-2 border-accent-primary text-accent-primary' : 'text-dark-muted hover:text-dark-text'
          ]"
        >
          🛒 Grocery List
        </button>
      </div>

      <!-- Meal Plan View -->
      <div v-show="activeTab === 'meals'" class="space-y-4">
        <div v-for="day in mealPlan" :key="day.day" class="card">
          <h3 class="text-xl font-bold mb-4 flex items-center gap-2">
            <span class="text-accent-primary">{{ day.day }}</span>
            <span class="text-sm font-normal text-dark-muted">
              ({{ day.totalCalories }} cal)
            </span>
          </h3>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <!-- Breakfast -->
            <div class="bg-dark-bg rounded-lg p-4">
              <div class="text-xs text-dark-muted mb-2">BREAKFAST</div>
              <div class="font-semibold mb-1">{{ day.breakfast.name }}</div>
              <div class="text-sm text-dark-muted mb-3">{{ day.breakfast.calories }} cal</div>
              <div class="text-xs space-y-1">
                <div class="flex justify-between">
                  <span>Protein:</span>
                  <span class="text-dark-text">{{ day.breakfast.protein }}g</span>
                </div>
                <div class="flex justify-between">
                  <span>Carbs:</span>
                  <span class="text-dark-text">{{ day.breakfast.carbs }}g</span>
                </div>
                <div class="flex justify-between">
                  <span>Fat:</span>
                  <span class="text-dark-text">{{ day.breakfast.fat }}g</span>
                </div>
              </div>
            </div>

            <!-- Lunch -->
            <div class="bg-dark-bg rounded-lg p-4">
              <div class="text-xs text-dark-muted mb-2">LUNCH</div>
              <div class="font-semibold mb-1">{{ day.lunch.name }}</div>
              <div class="text-sm text-dark-muted mb-3">{{ day.lunch.calories }} cal</div>
              <div class="text-xs space-y-1">
                <div class="flex justify-between">
                  <span>Protein:</span>
                  <span class="text-dark-text">{{ day.lunch.protein }}g</span>
                </div>
                <div class="flex justify-between">
                  <span>Carbs:</span>
                  <span class="text-dark-text">{{ day.lunch.carbs }}g</span>
                </div>
                <div class="flex justify-between">
                  <span>Fat:</span>
                  <span class="text-dark-text">{{ day.lunch.fat }}g</span>
                </div>
              </div>
            </div>

            <!-- Dinner -->
            <div class="bg-dark-bg rounded-lg p-4">
              <div class="text-xs text-dark-muted mb-2">DINNER</div>
              <div class="font-semibold mb-1">{{ day.dinner.name }}</div>
              <div class="text-sm text-dark-muted mb-3">{{ day.dinner.calories }} cal</div>
              <div class="text-xs space-y-1">
                <div class="flex justify-between">
                  <span>Protein:</span>
                  <span class="text-dark-text">{{ day.dinner.protein }}g</span>
                </div>
                <div class="flex justify-between">
                  <span>Carbs:</span>
                  <span class="text-dark-text">{{ day.dinner.carbs }}g</span>
                </div>
                <div class="flex justify-between">
                  <span>Fat:</span>
                  <span class="text-dark-text">{{ day.dinner.fat }}g</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Grocery List View -->
      <div v-show="activeTab === 'grocery'">
        <div v-if="loadingGrocery" class="card text-center py-12">
          <div class="text-4xl mb-4">🛒</div>
          <div class="text-lg">Generating optimized grocery list...</div>
        </div>

        <div v-else-if="groceryList" class="space-y-6">
          <!-- Summary Card -->
          <div class="card bg-gradient-to-br from-accent-primary/10 to-accent-secondary/10 border-accent-primary/20">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <div class="text-3xl font-bold text-accent-primary">
                  ${{ grocerySummary.totalCost.toFixed(2) }}
                </div>
                <div class="text-sm text-dark-muted mt-1">Total Cost</div>
              </div>
              <div>
                <div class="text-3xl font-bold text-accent-success">
                  {{ grocerySummary.totalItems }}
                </div>
                <div class="text-sm text-dark-muted mt-1">Unique Items</div>
              </div>
              <div>
                <div class="text-3xl font-bold text-accent-secondary">
                  ${{ grocerySummary.estimatedSavings.toFixed(2) }}
                </div>
                <div class="text-sm text-dark-muted mt-1">Est. Savings</div>
              </div>
            </div>
            <div class="mt-4 text-sm text-dark-muted">
              💡 Saved {{ grocerySummary.ingredientsConsolidated }} ingredients through smart consolidation
            </div>
          </div>

          <!-- Grocery Items by Category -->
          <div v-for="category in categories" :key="category" class="card">
            <h3 class="font-bold text-lg mb-4 capitalize">{{ category }}</h3>
            <div class="space-y-2">
              <div 
                v-for="item in getItemsByCategory(category)" 
                :key="item.name"
                class="flex justify-between items-center p-3 bg-dark-bg rounded-lg hover:bg-dark-border transition-colors"
              >
                <div class="flex-1">
                  <div class="font-medium">{{ item.name }}</div>
                  <div class="text-sm text-dark-muted">
                    {{ item.quantity.toFixed(1) }} {{ item.unit }}
                  </div>
                </div>
                <div class="text-accent-primary font-semibold">
                  ${{ item.price.toFixed(2) }}
                </div>
              </div>
            </div>
          </div>

          <button 
            @click="downloadGroceryList" 
            class="btn-primary w-full"
          >
            📥 Download Grocery List
          </button>
        </div>

        <div v-else class="card text-center py-12">
          <button @click="generateGroceryList" class="btn-primary">
            Generate Grocery List
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { MealPlan, GroceryItem } from '~/types';

const calorieGoal = ref(2000);
const postalCode = ref('');
const loading = ref(false);
const loadingGrocery = ref(false);
const mealPlan = ref<MealPlan[] | null>(null);
const groceryList = ref<GroceryItem[] | null>(null);
const grocerySummary = ref({
  totalCost: 0,
  totalItems: 0,
  estimatedSavings: 0,
  ingredientsConsolidated: 0
});
const activeTab = ref<'meals' | 'grocery'>('meals');

const avgCalories = computed(() => {
  if (!mealPlan.value) return 0;
  return mealPlan.value.reduce((sum, day) => sum + day.totalCalories, 0) / mealPlan.value.length;
});

const categories = computed(() => {
  if (!groceryList.value) return [];
  return [...new Set(groceryList.value.map(item => item.category))];
});

const getItemsByCategory = (category: string) => {
  return groceryList.value?.filter(item => item.category === category) || [];
};

async function generateMealPlan() {
  loading.value = true;
  try {
    const response = await $fetch('/api/generate-meal-plan', {
      method: 'POST',
      body: {
        dailyCalories: calorieGoal.value,
        postalCode: postalCode.value
      }
    });
    
    mealPlan.value = (response as any).mealPlan;
  } catch (error) {
    console.error('Error generating meal plan:', error);
    alert('Failed to generate meal plan. Please try again.');
  } finally {
    loading.value = false;
  }
}

async function generateGroceryList() {
  if (!mealPlan.value) return;
  
  loadingGrocery.value = true;
  try {
    const response = await $fetch('/api/generate-grocery-list', {
      method: 'POST',
      body: {
        mealPlan: mealPlan.value,
        postalCode: postalCode.value
      }
    });
    
    groceryList.value = (response as any).groceryList;
    grocerySummary.value = (response as any).summary;
  } catch (error) {
    console.error('Error generating grocery list:', error);
    alert('Failed to generate grocery list. Please try again.');
  } finally {
    loadingGrocery.value = false;
  }
}

function downloadGroceryList() {
  if (!groceryList.value) return;
  
  let text = 'GROCERY LIST\n\n';
  
  for (const category of categories.value) {
    text += `${category.toUpperCase()}\n`;
    const items = getItemsByCategory(category);
    for (const item of items) {
      text += `  ${item.name} - ${item.quantity.toFixed(1)} ${item.unit} - $${item.price.toFixed(2)}\n`;
    }
    text += '\n';
  }
  
  text += `TOTAL: $${grocerySummary.value.totalCost.toFixed(2)}\n`;
  text += `ESTIMATED SAVINGS: $${grocerySummary.value.estimatedSavings.toFixed(2)}\n`;
  
  const blob = new Blob([text], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'grocery-list.txt';
  a.click();
  URL.revokeObjectURL(url);
}

function reset() {
  mealPlan.value = null;
  groceryList.value = null;
  activeTab.value = 'meals';
}

// Auto-generate grocery list when switching to grocery tab
watch(activeTab, (newTab) => {
  if (newTab === 'grocery' && !groceryList.value && mealPlan.value) {
    generateGroceryList();
  }
});
</script>
