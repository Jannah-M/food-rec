import { router, useLocalSearchParams } from 'expo-router';
import {
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function AcceptedRestaurantScreen() {
  const params = useLocalSearchParams();
  const restaurant = params.restaurant ? JSON.parse(params.restaurant as string) : null;

  if (!restaurant) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>No restaurant selected.</Text>
      </View>
    );
  }

  const openLink = (url: string) => {
    if (url) Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: restaurant.image }}
        style={styles.image}
      />
      <Text style={styles.name}>{restaurant.name}</Text>
      <Text style={styles.description}>{restaurant.description}</Text>
      <Text style={styles.typeText}>
        {restaurant.cuisine} • {restaurant.budget}
      </Text>
      <TouchableOpacity style={styles.button} onPress={() => openLink(restaurant.menuUrl)}>
        <Text style={styles.buttonText}>View Menu</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => openLink(restaurant.mapsUrl)}>
        <Text style={styles.buttonText}>Go To Maps</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => openLink(restaurant.doordashUrl)}>
        <Text style={styles.buttonText}>Open DoorDash</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, styles.rerollButton]} onPress={() => router.back()}>
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