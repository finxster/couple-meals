import { IMeal } from 'app/shared/model/meal.model';

export interface IRecipe {
  id?: number;
  title?: string;
  stepByStep?: any;
  ingredients?: any;
  meals?: IMeal[];
}

export const defaultValue: Readonly<IRecipe> = {};
