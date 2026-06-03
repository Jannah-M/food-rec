import { Ionicons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

type RootStackParamList = {
  Onboarding: undefined;
  Recommendations: undefined;
};

type OnboardingScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Onboarding'
>;

export default function OnboardingScreen({ navigation }: OnboardingScreenProps) {
  const [selection, setSelection] = useState('vegan');
  const [budget, setBudget] = useState('$');
  const [name, setName] = useState('');

  const handleNext = () => {
    router.push({
      pathname: '/RecommendationScreen',
      params: { budget },
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* BRAND HEADER */}
          <View style={styles.brandHeader}>
            <Text style={styles.appName}>Mirepoix</Text>
            <Text style={styles.tagline}>Your next great meal, decided.</Text>
          </View>

          {/* FORM CARD */}
          <View style={styles.card}>

            {/* NAME INPUT */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Your Name</Text>
              <TextInput
                placeholder="e.g. Alex"
                placeholderTextColor="#bbb"
                value={name}
                onChangeText={setName}
                style={styles.input}
              />
            </View>

            {/* BUDGET */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Budget</Text>
              <View style={styles.budgetRow}>
                {[
                  { key: '$', label: '$', sub: 'Cheap' },
                  { key: '$$', label: '$$', sub: 'Moderate' },
                  { key: '$$$', label: '$$$', sub: 'Fancy' },
                ].map((item) => (
                  <Pressable
                    key={item.key}
                    style={[styles.budgetButton, budget === item.key && styles.selectedBudget]}
                    onPress={() => setBudget(item.key)}
                  >
                    <Text style={[styles.budgetText, budget === item.key && styles.selectedBudgetText]}>
                      {item.label}
                    </Text>
                    <Text style={[styles.budgetSub, budget === item.key && styles.selectedBudgetSub]}>
                      {item.sub}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>

            {/* DIETARY */}
            <View style={[styles.section, { marginBottom: 0 }]}>
              <Text style={styles.sectionTitle}>Dietary Preference</Text>
              <View style={styles.toggleRow}>
                {['vegan', 'non-vegan'].map((opt) => (
                  <Pressable
                    key={opt}
                    style={[styles.toggleButton, selection === opt && styles.toggleSelected]}
                    onPress={() => setSelection(opt)}
                  >
                    <Text style={[styles.toggleText, selection === opt && styles.toggleTextSelected]}>
                      {opt === 'vegan' ? '🌿 Vegan' : '🥩 Non-Vegan'}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>
          </View>

          {/* NEXT BUTTON */}
          <Pressable
            style={({ pressed }) => [styles.nextButton, pressed && styles.pressed]}
            onPress={handleNext}
          >
            <Text style={styles.nextButtonText}>Find My Restaurant</Text>
            <Ionicons name="arrow-forward" size={20} color="#fff" />
          </Pressable>

          <Text style={styles.footerNote}>We'll find something nearby that fits.</Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFBF7',
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 40,
  },

  // Brand
  brandHeader: {
    alignItems: 'center',
    marginBottom: 36,
  },
  appName: {
    fontSize: 44,
    fontWeight: '900',
    color: '#E8501A',
    letterSpacing: -1.5,
    marginBottom: 6,
  },
  tagline: {
    fontSize: 15,
    color: '#aaa',
    fontWeight: '500',
  },

  // Card
  card: {
    width: '100%',
    maxWidth: 440,
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.07,
    shadowRadius: 16,
    elevation: 4,
    marginBottom: 20,
  },

  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#aaa',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#FAFAFA',
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    borderWidth: 1.5,
    borderColor: '#EEE',
    color: '#111',
  },

  // Budget
  budgetRow: {
    flexDirection: 'row',
    gap: 10,
  },
  budgetButton: {
    flex: 1,
    paddingVertical: 14,
    backgroundColor: '#FAFAFA',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#EEE',
  },
  selectedBudget: {
    backgroundColor: '#E8501A',
    borderColor: '#E8501A',
  },
  budgetText: {
    fontSize: 20,
    fontWeight: '800',
    color: '#111',
  },
  selectedBudgetText: {
    color: '#fff',
  },
  budgetSub: {
    fontSize: 10,
    color: '#bbb',
    marginTop: 2,
    fontWeight: '500',
  },
  selectedBudgetSub: {
    color: 'rgba(255,255,255,0.75)',
  },

  // Toggle
  toggleRow: {
    flexDirection: 'row',
    gap: 10,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 13,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#EEE',
    backgroundColor: '#FAFAFA',
    alignItems: 'center',
  },
  toggleSelected: {
    backgroundColor: '#111',
    borderColor: '#111',
  },
  toggleText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#777',
  },
  toggleTextSelected: {
    color: '#fff',
  },

  // CTA
  nextButton: {
    width: '100%',
    maxWidth: 440,
    backgroundColor: '#E8501A',
    height: 56,
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    shadowColor: '#E8501A',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 14,
    elevation: 6,
    marginBottom: 16,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  pressed: {
    opacity: 0.88,
    transform: [{ scale: 0.98 }],
  },

  footerNote: {
    fontSize: 13,
    color: '#ccc',
    textAlign: 'center',
  },
});
