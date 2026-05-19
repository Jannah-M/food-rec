import type { NativeStackScreenProps } from '@react-navigation/native-stack';
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
import { restaurants, type Restaurant } from '../data/restaurants';

type RootStackParamList = {
  Recommendations: undefined;
  AcceptedRestaurant: { restaurant: Restaurant };
};

type RecommendationScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Recommendations'
>;

export default function RecommendationScreen({ navigation }: RecommendationScreenProps) {
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
    navigation.navigate('AcceptedRestaurant', {
      restaurant,
    });
  };

  return (
    <View style={styles.container}>
      <FilterSidebar filters={filters} setFilters={setFilters} />

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.card}>
          <Image
            source={{ uri: restaurant.image }}
            style={styles.image}
          />

          <Text style={styles.name}>{restaurant.name}</Text>

          <Text style={styles.description}>
            {restaurant.description}
          </Text>

          <View style={styles.infoRow}>
            <Text style={styles.info}>🍽 {restaurant.cuisine}</Text>
            <Text style={styles.info}>💵 {restaurant.budget}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.info}>📍 {restaurant.distance}</Text>
            <Text style={styles.info}>⏱ {restaurant.waitTime}</Text>
          </View>

          <Text style={styles.sectionTitle}>Popular Items</Text>

          {restaurant.popularItems.map((item, index) => (
            <Text key={index} style={styles.menuItem}>
              • {item}
            </Text>
          ))}

          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={[styles.button, styles.rejectButton]}
              onPress={nextRestaurant}
            >
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.acceptButton]}
              onPress={acceptRestaurant}
            >
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
    backgroundColor: '#fff',
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
  },
  description: {
    fontSize: 16,
    marginTop: 10,
    color: '#666',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  info: {
    fontSize: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
  },
  menuItem: {
    marginTop: 5,
    fontSize: 16,
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
    backgroundColor: '#ff5a5f',
  },
  acceptButton: {
    backgroundColor: '#4CAF50',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});