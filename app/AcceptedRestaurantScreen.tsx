import { router, useLocalSearchParams } from 'expo-router';
import {
  Linking,
  ScrollView,
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
      <View style={styles.centered}>
        <Text style={{ color: '#888', fontSize: 16 }}>No restaurant selected.</Text>
      </View>
    );
  }

  const { name, address, rating, summary } = restaurant;

  const query = encodeURIComponent(`${name} ${address}`);
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${query}`;
  const doordashUrl = `https://www.doordash.com/search/store/${encodeURIComponent(name)}`;
  const googleSearchUrl = `https://www.google.com/search?q=${query}+menu`;

  const openLink = (url: string) => Linking.openURL(url);

  return (
    <ScrollView
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.inner}>
        {/* Hero */}
        <View style={styles.hero}>
          <View style={styles.pillBadge}>
            <Text style={styles.pillText}>✅ You're going here</Text>
          </View>
          <Text style={styles.name}>{name}</Text>
          {summary ? <Text style={styles.description}>{summary}</Text> : null}
          <View style={styles.metaRow}>
            <View style={styles.metaChip}>
              <Text style={styles.metaChipText}>⭐ {rating}</Text>
            </View>
            <View style={[styles.metaChip, { flex: 1 }]}>
              <Text style={styles.metaChipText} numberOfLines={1}>📍 {address}</Text>
            </View>
          </View>
        </View>

        <View style={styles.divider} />

        <Text style={styles.actionsLabel}>What's next?</Text>

        <View style={styles.actionsGrid}>
          <TouchableOpacity
            style={[styles.actionCard, { backgroundColor: '#111' }]}
            onPress={() => openLink(googleSearchUrl)}
            activeOpacity={0.85}
          >
            <Text style={styles.actionEmoji}>🍽️</Text>
            <Text style={styles.actionText}>View Menu</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionCard, { backgroundColor: '#1A73E8' }]}
            onPress={() => openLink(mapsUrl)}
            activeOpacity={0.85}
          >
            <Text style={styles.actionEmoji}>🗺️</Text>
            <Text style={styles.actionText}>Open in Maps</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionCard, { backgroundColor: '#FF3008' }]}
            onPress={() => openLink(doordashUrl)}
            activeOpacity={0.85}
          >
            <Text style={styles.actionEmoji}>🛵</Text>
            <Text style={styles.actionText}>Order on DoorDash</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.rerollButton}
          onPress={() => router.back()}
          activeOpacity={0.85}
        >
          <Text style={styles.rerollText}>↩ Pick a different restaurant</Text>
        </TouchableOpacity>

        <Text style={styles.footerBrand}>Mirepoix</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    backgroundColor: '#FFFBF7',
    alignItems: 'center',
    padding: 24,
    paddingVertical: 36,
  },
  inner: {
    width: '100%',
    maxWidth: 480,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFBF7',
  },
  hero: {
    marginBottom: 28,
  },
  pillBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#E6F9EE',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 5,
    marginBottom: 14,
  },
  pillText: {
    fontSize: 13,
    color: '#27AE60',
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  name: {
    fontSize: 34,
    fontWeight: '800',
    color: '#111',
    letterSpacing: -0.5,
    lineHeight: 40,
    marginBottom: 10,
  },
  description: {
    fontSize: 15,
    color: '#888',
    lineHeight: 22,
    marginBottom: 16,
  },
  metaRow: {
    flexDirection: 'row',
    gap: 10,
    flexWrap: 'wrap',
  },
  metaChip: {
    backgroundColor: '#F2F2F2',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  metaChipText: {
    fontSize: 13,
    color: '#555',
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: '#EEE',
    marginBottom: 24,
  },
  actionsLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#aaa',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 14,
  },
  actionsGrid: {
    gap: 12,
    marginBottom: 16,
  },
  actionCard: {
    borderRadius: 18,
    paddingVertical: 18,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  actionEmoji: {
    fontSize: 22,
  },
  actionText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  rerollButton: {
    marginTop: 8,
    paddingVertical: 16,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: '#DDD',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginBottom: 32,
  },
  rerollText: {
    color: '#888',
    fontSize: 15,
    fontWeight: '600',
  },
  footerBrand: {
    textAlign: 'center',
    fontSize: 13,
    fontWeight: '700',
    color: '#E8501A',
    opacity: 0.4,
    letterSpacing: -0.3,
  },
});
