import { Ionicons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import {
    Pressable,
    SafeAreaView,
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
    navigation.navigate('Recommendations');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* TITLE */}
      <View style={styles.header}>
        <Text style={styles.title}>Welcome!</Text>
        <Text style={styles.subtitle}>
          Let’s find food that matches your vibe.
        </Text>
      </View>

      {/* NAME INPUT */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Your Name</Text>

        <TextInput
          placeholder="Enter your name"
          placeholderTextColor="#999"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />
      </View>

      {/* BUDGET */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Budget</Text>

        <View style={styles.budgetRow}>
          {['$', '$$', '$$$'].map((item) => (
            <Pressable
              key={item}
              style={[
                styles.budgetButton,
                budget === item && styles.selectedBudget,
              ]}
              onPress={() => setBudget(item)}
            >
              <Text
                style={[
                  styles.budgetText,
                  budget === item && styles.selectedBudgetText,
                ]}
              >
                {item}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      {/* DIETARY */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Dietary Restrictions</Text>

        <View style={styles.radioRow}>
          <Pressable
            style={styles.radioOption}
            onPress={() => setSelection('vegan')}
          >
            <View style={styles.outerCircle}>
              {selection === 'vegan' && (
                <View style={styles.innerCircle} />
              )}
            </View>

            <Text style={styles.radioText}>Vegan</Text>
          </Pressable>

          <Pressable
            style={styles.radioOption}
            onPress={() => setSelection('non-vegan')}
          >
            <View style={styles.outerCircle}>
              {selection === 'non-vegan' && (
                <View style={styles.innerCircle} />
              )}
            </View>

            <Text style={styles.radioText}>Non-Vegan</Text>
          </Pressable>
        </View>
      </View>

      {/* NEXT BUTTON */}
      <Pressable
        style={({ pressed }) => [
          styles.nextButton,
          pressed && styles.pressed,
        ]}
        onPress={handleNext}
      >
        <Text style={styles.nextButtonText}>Next</Text>

        <Ionicons name="arrow-forward" size={20} color="#fff" />
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 24,
    paddingTop: 40,
  },

  header: {
    marginBottom: 40,
  },

  title: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#111',
  },

  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 10,
  },

  section: {
    marginBottom: 35,
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 16,
    color: '#111',
  },

  input: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 16,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#ddd',
  },

  budgetRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  budgetButton: {
    width: 90,
    height: 90,
    backgroundColor: '#fff',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ddd',
  },

  selectedBudget: {
    backgroundColor: '#ff5a5f',
    borderColor: '#ff5a5f',
  },

  budgetText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111',
  },

  selectedBudgetText: {
    color: '#fff',
  },

  radioRow: {
    flexDirection: 'row',
    gap: 30,
  },

  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  outerCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#111',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },

  innerCircle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#4CAF50',
  },

  radioText: {
    fontSize: 18,
    color: '#111',
  },

  nextButton: {
    marginTop: 'auto',
    marginBottom: 30,
    backgroundColor: '#ff5a5f',
    height: 60,
    borderRadius: 18,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },

  nextButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },

  pressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
});