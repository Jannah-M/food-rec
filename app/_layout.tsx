import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { useColorScheme } from 'react-native';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen
          name="RecommendationScreen"
          options={{
            title: 'Recommendations',
            headerStyle: { backgroundColor: '#FFFBF7' },
            headerShadowVisible: false,
            headerTintColor: '#111',
            headerTitleStyle: { fontWeight: '700' },
          }}
        />
        <Stack.Screen
          name="AcceptedRestaurantScreen"
          options={{
            title: 'Your Pick',
            headerStyle: { backgroundColor: '#FFFBF7' },
            headerShadowVisible: false,
            headerTintColor: '#111',
            headerTitleStyle: { fontWeight: '700' },
          }}
        />
      </Stack>
    </ThemeProvider>
  );
}
