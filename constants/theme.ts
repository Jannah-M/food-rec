import '@/global.css';
import { Platform } from 'react-native';

export const Colors = {
  light: {
    text: '#1a1a1a',
    background: '#FFF8F2',
    backgroundElement: '#F2E8DF',
    backgroundSelected: '#E8D5C8',
    textSecondary: '#888880',
    primary: '#E8501A',
    primaryLight: '#FAEAE3',
  },
  dark: {
    text: '#ffffff',
    background: '#1a1a1a',
    backgroundElement: '#2a2a2a',
    backgroundSelected: '#333333',
    textSecondary: '#B0B4BA',
    primary: '#E8501A',
    primaryLight: '#3a2520',
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'var(--font-display)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
});

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;