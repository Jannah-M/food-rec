import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import type { Restaurant } from '../data/restaurants';

type RootStackParamList = {
  Recommendations: undefined;
  AcceptedRestaurant: { restaurant: Restaurant };
};

type AcceptedRestaurantScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'AcceptedRestaurant'
>;

export default function AcceptedRestaurantScreen({
  route,
  navigation,
}: AcceptedRestaurantScreenProps) {
  const { restaurant } = route.params;

  const openLink = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: restaurant.image }}
        style={styles.image}
      />

      <Text style={styles.name}>{restaurant.name}</Text>

      <Text style={styles.description}>
        {restaurant.description}
      </Text>

      <Text style={styles.typeText}>
        {restaurant.cuisine} • {restaurant.budget}
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => openLink(restaurant.menuUrl)}
      >
        <Text style={styles.buttonText}>View Menu</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => openLink(restaurant.mapsUrl)}
      >
        <Text style={styles.buttonText}>Go To Maps</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => openLink(restaurant.doordashUrl)}
      >
        <Text style={styles.buttonText}>Open DoorDash</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.rerollButton]}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttonText}>Reroll</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  image: {
    width: '100%',
    height: 250,
    borderRadius: 20,
  },
  name: {
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 20,
  },
  description: {
    fontSize: 17,
    color: '#666',
    marginTop: 10,
  },
  typeText: {
    fontSize: 18,
    marginTop: 10,
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#111',
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 15,
  },
  rerollButton: {
    backgroundColor: '#ff5a5f',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});