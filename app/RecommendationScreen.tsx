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
        <Text style={styles.loadingEmoji}>🍜</Text>
        <Text style={styles.loadingText}>Finding your next meal...</Text>
        <Text style={styles.loadingSubtext}>This won't take long</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorEmoji}>😕</Text>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={getRecommendation}>
          <Text style={styles.retryButtonText}>Try Again</Text>
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
    <ScrollView
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.inner}>
        {/* Top label */}
        <View style={styles.topLabel}>
          <Text style={styles.topLabelText}>Today's Pick · Mirepoix</Text>
        </View>

        {/* Card */}
        <View style={styles.card}>
          <View style={styles.ratingBadge}>
            <Text style={styles.ratingBadgeText}>⭐ {rating}</Text>
          </View>

          <Text style={styles.name}>{name}</Text>

          {summary ? <Text style={styles.description}>{summary}</Text> : null}

          <View style={styles.addressRow}>
            <Text style={styles.addressIcon}>📍</Text>
            <Text style={styles.address}>{address}</Text>
          </View>
        </View>

        {/* Rerolls counter */}
        {rerollsLeft > 0 && (
          <Text style={styles.rerollsLabel}>{rerollsLeft} skips remaining</Text>
        )}

        {/* Buttons */}
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.skipButton, rerollsLeft === 0 && styles.disabled]}
            onPress={reroll}
            disabled={rerollsLeft === 0}
            activeOpacity={0.8}
          >
            <Text style={styles.skipButtonText}>
              {rerollsLeft === 0 ? 'No skips left' : 'Skip →'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.acceptButton}
            onPress={acceptRestaurant}
            activeOpacity={0.85}
          >
            <Text style={styles.acceptButtonText}>Let's go! 🎉</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    backgroundColor: '#FFFBF7',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    paddingVertical: 40,
  },
  inner: {
    width: '100%',
    maxWidth: 480,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#FFFBF7',
  },
  loadingEmoji: {
    fontSize: 48,
    marginBottom: 16,
  },
  loadingText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111',
    marginBottom: 6,
  },
  loadingSubtext: {
    fontSize: 14,
    color: '#aaa',
  },
  errorEmoji: {
    fontSize: 48,
    marginBottom: 16,
  },
  errorText: {
    fontSize: 16,
    color: '#E8501A',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  },
  retryButton: {
    backgroundColor: '#111',
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 14,
  },
  retryButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
  },
  topLabel: {
    alignSelf: 'flex-start',
    backgroundColor: '#FDE8DF',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 5,
    marginBottom: 20,
  },
  topLabelText: {
    fontSize: 13,
    color: '#E8501A',
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 4,
    marginBottom: 16,
  },
  ratingBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFF3ED',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginBottom: 14,
  },
  ratingBadgeText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#E8501A',
  },
  name: {
    fontSize: 30,
    fontWeight: '800',
    color: '#111',
    letterSpacing: -0.5,
    lineHeight: 36,
    marginBottom: 10,
  },
  description: {
    fontSize: 15,
    color: '#888',
    lineHeight: 22,
    marginBottom: 16,
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 6,
    marginTop: 4,
  },
  addressIcon: {
    fontSize: 14,
    marginTop: 1,
  },
  address: {
    flex: 1,
    fontSize: 14,
    color: '#aaa',
    lineHeight: 20,
  },
  rerollsLabel: {
    fontSize: 13,
    color: '#bbb',
    textAlign: 'center',
    marginBottom: 16,
    fontWeight: '500',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
  },
  skipButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#DDD',
    backgroundColor: '#fff',
  },
  skipButtonText: {
    color: '#555',
    fontWeight: '600',
    fontSize: 15,
  },
  acceptButton: {
    flex: 1.4,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    backgroundColor: '#E8501A',
    shadowColor: '#E8501A',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 5,
  },
  acceptButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
  },
  disabled: {
    backgroundColor: '#F5F5F5',
    borderColor: '#EEE',
  },
});
