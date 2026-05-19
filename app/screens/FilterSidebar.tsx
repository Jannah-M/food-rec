import React from 'react';
import {
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

type Filters = {
  comfortFood: boolean;
  surpriseMe: boolean;
  budget: string;
  cuisine: string;
  distance: string;
  mealType: string;
};

type Props = {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
};

export default function FilterSidebar({ filters, setFilters }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Filters</Text>

      <View style={styles.filterRow}>
        <Text>Comfort Food</Text>
        <Switch
          value={filters.comfortFood}
          onValueChange={(value) =>
            setFilters({ ...filters, comfortFood: value })
          }
        />
      </View>

      <View style={styles.filterRow}>
        <Text>Surprise Me</Text>
        <Switch
          value={filters.surpriseMe}
          onValueChange={(value) =>
            setFilters({ ...filters, surpriseMe: value })
          }
        />
      </View>

      <TouchableOpacity style={styles.button}>
        <Text>Budget: {filters.budget}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <Text>Cuisine: {filters.cuisine}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <Text>Distance: {filters.distance}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <Text>Meal: {filters.mealType}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <Text>Delivery / Dine-In</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <Text>Wait Time</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 120,
    backgroundColor: '#f2f2f2',
    padding: 10,
    borderRightWidth: 1,
    borderColor: '#ddd',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  filterRow: {
    marginBottom: 15,
  },
  button: {
    padding: 10,
    backgroundColor: 'white',
    marginBottom: 10,
    borderRadius: 8,
  },
});
