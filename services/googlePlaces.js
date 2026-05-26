
const PRICE_MAP = {
    '$': 1,
    '$$': 2,
    '$$$': 3,
  };
  
  export async function fetchRecommendation(latitude, longitude, budget = '$$') {
    const priceLevel = PRICE_MAP[budget] ?? 2;
  
    const res = await fetch(
      `/api/recommend?latitude=${latitude}&longitude=${longitude}&priceLevel=${priceLevel}`
    );
  
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Failed to fetch recommendation');
    }
  
    const data = await res.json();
    return data.restaurant;
  }