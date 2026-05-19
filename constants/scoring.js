function cuisineScore(userCuisine, restaurantCuisine) {
  if (!userCuisine || !restaurantCuisine) return 0;

  return userCuisine.toLowerCase() ===
    restaurantCuisine.toLowerCase()
    ? 1
    : 0;
}

function priceScore(userPrice, restaurantPrice) {
  const difference = Math.abs(userPrice - restaurantPrice);

  // closer prices score higher
  return Math.max(0, 1 - difference * 0.5);
}

function distanceScore(distance, maxDistance) {
  if (distance > maxDistance) return 0;

  return 1 - distance / maxDistance;
}

function calculateRestaurantScore(restaurant, preferences) {
  const cuisine = cuisineScore(
    preferences.cuisine,
    restaurant.cuisine
  );

  const price = priceScore(
    preferences.preferredPrice,
    restaurant.priceLevel
  );

  const distance = distanceScore(
    restaurant.distanceMiles,
    preferences.maxDistance
  );

  const finalScore =
    cuisine * 0.5 +
    price * 0.3 +
    distance * 0.2;

  return Number(finalScore.toFixed(2));
}

function rankRestaurants(restaurants, preferences) {
  return restaurants
    .map((restaurant) => ({
      ...restaurant,
      score: calculateRestaurantScore(
        restaurant,
        preferences
      ),
    }))
    .sort((a, b) => b.score - a.score);
}

module.exports = {
  calculateRestaurantScore,
  rankRestaurants,
};
