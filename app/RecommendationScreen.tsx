import { router, useLocalSearchParams } from 'expo-router';
import { useEffect } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useRestaurant } from '../hooks/useRestaurant';

export default function RecommendationScreen() {
  const { budget } = useLocalSearchParams<{ budget: string }>();
  const { restaurant, loading, error, rerollsLeft, getRecommendation, reroll } =
    useRestaurant(budget ?? '$$');

  useEffect(() => {
    getRecommendation();
  }, []);

  if (loading) {
    return (
      <View style={styles.centered}>
        <Text style={styles.loadingText}>Finding your next meal...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={getRecommendation}>
          <Text style={styles.buttonText}>Try Again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!restaurant) return null;

  const name = restaurant.displayName?.text ?? 'Unknown Restaurant';
  const address = restaurant.formattedAddress ?? '';
  const rating = restaurant.rating ?? 'N/A';
  const summary = restaurant.editorialSummary?.text ?? '';

  const acceptRestaurant = () => {
    router.push({
      pathname: '/AcceptedRestaurantScreen',
      params: { restaurant: JSON.stringify({ name, address, rating, summary }) },
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <View style={styles.card}>
        <Text style={styles.name}>{name}</Text>
        {summary ? <Text style={styles.description}>{summary}</Text> : null}
        <View style={styles.infoRow}>
          <Text style={styles.info}>⭐ {rating}</Text>
          <Text style={styles.info}>📍 {address}</Text>
        </View>
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.button, styles.rejectButton, rerollsLeft === 0 && styles.disabled]}
            onPress={reroll}
            disabled={rerollsLeft === 0}
          >
            <Text style={styles.buttonText}>
              Next {rerollsLeft > 0 ? `(${rerollsLeft} left)` : '(none left)'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.acceptButton]} onPress={acceptRestaurant}>
            <Text style={styles.buttonText}>Accept</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  card: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    elevation: 5,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
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
  disabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  loadingText: {
    fontSize: 18,
    color: '#888',
  },
  errorText: {
    fontSize: 16,
    color: '#E8501A',
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#1a1a1a',
    padding: 15,
    borderRadius: 15,
  },
});