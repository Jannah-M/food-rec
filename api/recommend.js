export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    if (req.method === 'OPTIONS') return res.status(200).end();
  
    const { latitude, longitude, priceLevel } = req.query;
  
    if (!latitude || !longitude) {
      return res.status(400).json({ error: 'latitude and longitude are required' });
    }
  
    try {
      const body = {
        includedTypes: ['restaurant'],
        maxResultCount: 20,
        locationRestriction: {
          circle: {
            center: {
              latitude: parseFloat(latitude),
              longitude: parseFloat(longitude),
            },
            radius: 1500.0,
          },
        },
      };
  
      // Filter by price level if provided
      if (priceLevel) {
        body.priceLevels = [`PRICE_LEVEL_${['', 'INEXPENSIVE', 'MODERATE', 'EXPENSIVE'][parseInt(priceLevel)]}`];
      }
  
      const response = await fetch('https://places.googleapis.com/v1/places:searchNearby', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Goog-Api-Key': process.env.GOOGLE_PLACES_API_KEY,
          'X-Goog-FieldMask':
            'places.displayName,places.formattedAddress,places.rating,places.priceLevel,places.photos,places.id,places.editorialSummary,places.types',
        },
        body: JSON.stringify(body),
      });
  
      const data = await response.json();
  
      if (!data.places || data.places.length === 0) {
        return res.status(404).json({ error: 'No restaurants found nearby' });
      }
  
      const pick = data.places[Math.floor(Math.random() * data.places.length)];
      return res.status(200).json({ restaurant: pick });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Something went wrong' });
    }
  }