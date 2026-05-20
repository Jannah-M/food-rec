export type Restaurant = {
  id: string;
  name: string;
  cuisine: string;
  price: number;
  distance: number;
  rating: number;
  popularity: number;
};

export const restaurants: Restaurant[] = [
  {
    id: '1',
    name: 'Casa Oaxaca',
    cuisine: 'Mexican',
    price: 2,
    distance: 340,
    rating: 8.4,
    popularity: 0.72,
  },
  {
    id: '2',
    name: 'Tacos El Primo',
    cuisine: 'Mexican',
    price: 1,
    distance: 700,
    rating: 7.9,
    popularity: 0.61,
  },
];