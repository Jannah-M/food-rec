import { registerRootComponent } from 'expo';

import App from './App';

registerRootComponent(App);

export { default as OnboardingScreen } from './OnboardingScreen';
export { default as RecommendationScreen } from './RecommendationScreen';
export { default as AcceptedRestaurantScreen } from './AcceptedRestaurantScreen';
