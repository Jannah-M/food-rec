import { router, useLocalSearchParams } from 'expo-router';
import {
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
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

  const { name, address, rating, summary } = restaurant;

  // Generate links dynamically from name + address
  const query = encodeURIComponent(`${name} ${address}`);
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${query}`;
  const doordashUrl = `https://www.doordash.com/search/store/${encodeURIComponent(name)}`;
  const googleSearchUrl = `https://www.google.com/search?q=${query}+menu`;

  const openLink = (url: string) => Linking.openURL(url);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.headerBlock}>
        <Text style={styles.name}>{name}</Text>
        {summary ? <Text style={styles.description}>{summary}</Text> : null}
        <Text style={styles.address}>📍 {address}</Text>
        <Text style={styles.rating}>⭐ {rating}</Text>
      </View>

      {/* Actions */}
      <TouchableOpacity style={styles.button} onPress={() => openLink(googleSearchUrl)}>
        <Text style={styles.buttonText}>View Menu</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => openLink(mapsUrl)}>
        <Text style={styles.buttonText}>Open in Maps</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => openLink(doordashUrl)}>
        <Text style={styles.buttonText}>Open DoorDash</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, styles.rerollButton]} onPress={() => router.back()}>
        <Text style={styles.buttonText}>Reroll</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
    backgroundColor: 'white',
  },
  headerBlock: {
    marginBottom: 32,
    marginTop: 20,
  },
  name: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  description: {
    fontSize: 17,
    color: '#666',
    marginTop: 10,
  },
  address: {
    fontSize: 15,
    color: '#888',
    marginTop: 10,
  },
  rating: {
    fontSize: 16,
    marginTop: 6,
    color: '#1a1a1a',
  },
  button: {
    backgroundColor: '#111',
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 15,
  },
  rerollButton: {
    backgroundColor: '#E8501A',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});