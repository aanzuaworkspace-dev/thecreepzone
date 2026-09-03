export type CategoryId = 'all' | 'crepas' | 'waffles' | 'frappes' | 'malteadas' | 'cafes' | 'extras';

export interface MenuItem {
  id: string;
  name: string;
  category: CategoryId;
  price: number;
  description: string;
  image?: string;
  badge?: string;
  badgeColor?: 'tertiary' | 'primary' | 'secondary' | 'purple' | 'green';
  spookyLevel?: 1 | 2 | 3 | 4 | 5;
  isSweet?: boolean;
  isSavory?: boolean;
  isCold?: boolean;
  isHot?: boolean;
  allergens?: string[];
  options?: {
    sizes?: { name: string; price: number }[];
    bases?: string[];
    toppings?: { name: string; price?: number }[];
    syrups?: string[];
  };
}

export interface ExtraTopping {
  name: string;
  price: number;
  category: 'bases' | 'frutas' | 'toppings';
  description?: string;
}
