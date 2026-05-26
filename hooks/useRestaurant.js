import { useState } from 'react';
import { fetchRecommendation } from '../services/googlePlaces';

export function useRestaurant(budget = '$$') {
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [rerollsLeft, setRerollsLeft] = useState(3);

  const getLocation = () =>
    new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, {
        enableHighAccuracy: true,
        timeout: 10000,
      });
    });

  const getRecommendation = async () => {
    setLoading(true);
    setError(null);

    try {
      const position = await getLocation();
      const { latitude, longitude } = position.coords;
      const result = await fetchRecommendation(latitude, longitude, budget);
      setRestaurant(result);
    } catch (err) {
      if (err.code === 1) {
        setError('Location access denied. Please enable location permissions.');
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const reroll = async () => {
    if (rerollsLeft === 0) return;
    setRerollsLeft(prev => prev - 1);
    setRestaurant(null);
    await getRecommendation();
  };

  return { restaurant, loading, error, rerollsLeft, getRecommendation, reroll };
}