import { Colors } from 'react-native-ui-lib';
import { Appearance } from 'react-native';

Colors.loadColors({
  white: '#eee',
  black: '#111',
});

Colors.loadSchemes({
  light: {
    screenBG: Colors.white,
  },
  dark: {
    screenBG: Colors.grey10,
  },
});

Colors.setScheme(Appearance.getColorScheme() === 'light' ? 'light' : 'dark');
