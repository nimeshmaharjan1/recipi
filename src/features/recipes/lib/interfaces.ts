export interface RecipeSearchResults {
  results: RecipeResult[];
  offset: number;
  number: number;
  totalResults: number;
}

export interface RecipeResult {
  id: number;
  title: string;
  image: string;
  imageType: string;
}

interface AnalyzedInstruction {
  name: string;
  steps: Step[];
}

export interface Step {
  number: number;
  step: string;
  ingredients: Ingredient[];
  equipment: Equipment[];
  length?: Length;
}

export interface Ingredient {
  id: number;
  name: string;
  localizedName: string;
  image: string;
}

export interface Equipment {
  id: number;
  name: string;
  localizedName: string;
  image: string;
}

export interface Length {
  number: number;
  unit: string;
}

export interface GetRecipeInformation {
  id: number;
  title: string;
  image: string;
  imageType: string;
  servings: number;
  readyInMinutes: number;
  license: string;
  sourceName: string;
  sourceUrl: string;
  spoonacularSourceUrl: string;
  aggregateLikes: number;
  healthScore: number;
  spoonacularScore: number;
  pricePerServing: number;
  analyzedInstructions: AnalyzedInstruction[];
  cheap: boolean;
  creditsText: string;
  cuisines: any[];
  dairyFree: boolean;
  diets: any[];
  gaps: string;
  glutenFree: boolean;
  instructions: string;
  ketogenic: boolean;
  lowFodmap: boolean;
  occasions: any[];
  sustainable: boolean;
  vegan: boolean;
  vegetarian: boolean;
  veryHealthy: boolean;
  veryPopular: boolean;
  whole30: boolean;
  weightWatcherSmartPoints: number;
  dishTypes: string[];
  extendedIngredients: ExtendedIngredient[];
  summary: string;
  winePairing: WinePairing;
}

export interface ExtendedIngredient {
  aisle: string;
  amount: number;
  consitency: string;
  id: number;
  image: string;
  measures: Measures;
  meta: string[];
  name: string;
  original: string;
  originalName: string;
  unit: string;
}

export interface Measures {
  metric: Metric;
  us: Us;
}

export interface Metric {
  amount: number;
  unitLong: string;
  unitShort: string;
}

export interface Us {
  amount: number;
  unitLong: string;
  unitShort: string;
}

export interface WinePairing {
  pairedWines: string[];
  pairingText: string;
  productMatches: ProductMatch[];
}

export interface ProductMatch {
  id: number;
  title: string;
  description: string;
  price: string;
  imageUrl: string;
  averageRating: number;
  ratingCount: number;
  score: number;
  link: string;
}

export interface SimilarRecipe {
  id: number;
  imageType: string;
  readyInMinutes: number;
  servings: number;
  sourceUrl: string;
  title: string;
}
