import { router } from 'expo-router';
import { useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import FilterSidebar from '../components/FilterSidebar';
import { restaurants } from '../data/restaurants';

export default function RecommendationScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [filters, setFilters] = useState({
    comfortFood: false,
    surpriseMe: true,
    budget: '$$',
    cuisine: 'Any',
    distance: '5 miles',
    mealType: 'Dinner',
  });

  const restaurant = restaurants[currentIndex];

  const nextRestaurant = () => {
    if (currentIndex < restaurants.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const acceptRestaurant = () => {
    router.push({
      pathname: '/AcceptedRestaurantScreen',
      params: { restaurant: JSON.stringify(restaurant) },
    });
  };

  if (!restaurant) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FilterSidebar filters={filters} setFilters={setFilters} />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.card}>
          <Image source={{ uri: restaurant.image }} style={styles.image} />
          <Text style={styles.name}>{restaurant.name}</Text>
          <Text style={styles.description}>{restaurant.description}</Text>
          <View style={styles.infoRow}>
            <Text style={styles.info}>🍽 {restaurant.cuisine}</Text>
            <Text style={styles.info}>💵 {restaurant.budget}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.info}>📍 {restaurant.distance}</Text>
            <Text style={styles.info}>⏱ {restaurant.waitTime}</Text>
          </View>
          <Text style={styles.sectionTitle}>Popular Items</Text>
          {(restaurant?.popularItems ?? []).map((item, index) => (
            <Text key={index} style={styles.menuItem}>• {item}</Text>
          ))}
          <View style={styles.buttonRow}>
            <TouchableOpacity style={[styles.button, styles.rejectButton]} onPress={nextRestaurant}>
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.acceptButton]} onPress={acceptRestaurant}>
              <Text style={styles.buttonText}>Accept</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#FFF8F2',
  },
  content: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 15,
    elevation: 5,
  },
  image: {
    width: '100%',
    height: 250,
    borderRadius: 20,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 15,
    color: '#1a1a1a',
  },
  description: {
    fontSize: 16,
    marginTop: 10,
    color: '#888',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  info: {
    fontSize: 15,
    color: '#1a1a1a',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    color: '#1a1a1a',
  },
  menuItem: {
    marginTop: 5,
    fontSize: 16,
    color: '#444',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 25,
  },
  button: {
    flex: 1,
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  rejectButton: {
    backgroundColor: '#1a1a1a',
  },
  acceptButton: {
    backgroundColor: '#E8501A',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});