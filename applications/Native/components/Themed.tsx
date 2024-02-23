/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import {
  SafeAreaView as DefaultSafeAreaView,
  Text as DefaultText,
  TextInput as DefaultTextInput,
  Button as DefaulButton,
} from 'react-native';

import {
  View as UILibDefaultView,
  Text as UILibText,
  TextField as UILibTextField,
  Button as UILibButton,
} from 'react-native-ui-lib';
import type {
  TextFieldProps as UILibTextFieldProps,
  TextFieldRef,
  ButtonProps as UILibButtonProps,
  TextProps as UILibTextProps,
  ViewProps as UILibViewProps,
} from 'react-native-ui-lib/src/index';

import Colors from '@/constants/Colors';
import { useColorScheme } from './useColorScheme';
import React from 'react';

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type TextProps = ThemeProps & DefaultText['props'];
export type TextInputProps = ThemeProps & DefaultTextInput['props'];
export type ButtonProps = ThemeProps & DefaulButton['props'];
export type SafeAreaViewProps = ThemeProps & DefaultSafeAreaView['props'];

// react-native-ui-lib
export type UITextProps = TextProps & UILibTextProps;
export type UITextFieldProps = TextInputProps &
  UILibTextFieldProps & { ref?: React.Ref<TextFieldRef> };
export type UIButtonProps = ThemeProps & UILibButtonProps;
export type ViewProps = ThemeProps & UILibViewProps;

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark,
) {
  const theme = useColorScheme() ?? 'light';
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}

export function Text(props: TextProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return <DefaultText style={[{ color }, style]} {...otherProps} />;
}

export function UIText(props: UITextProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return <UILibText style={[{ color }, style]} {...otherProps} />;
}

export const UITextField = React.forwardRef((props: UITextFieldProps, ref: any) => {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return <UILibTextField ref={ref} labelColor={color} style={[{ color }, style]} {...otherProps} />;
});

export function UIButton(props: UIButtonProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    'buttonBackgroundColor',
  );
  const disabledBackgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    'disabledBackgroundColor',
  );

  return <UILibButton {...otherProps} />;
}

export function View(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return <UILibDefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}

export function SafeAreaView(props: SafeAreaViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return <DefaultSafeAreaView style={[{ backgroundColor }, style]} {...otherProps} />;
}
