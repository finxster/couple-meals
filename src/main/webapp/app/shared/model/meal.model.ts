import { Moment } from 'moment';

export const enum MealType {
  LUNCH = 'LUNCH',
  DINNER = 'DINNER'
}

export interface IMeal {
  id?: number;
  title?: string;
  date?: Moment;
  type?: MealType;
  recipeId?: number;
}

export const defaultValue: Readonly<IMeal> = {};
