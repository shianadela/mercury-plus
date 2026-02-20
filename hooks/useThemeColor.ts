import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

type ThemeColorName = keyof typeof Colors.light & keyof typeof Colors.dark;

/**
 * Returns the appropriate color based on the current color scheme.
 * If a color is provided via props for the current scheme, it takes priority.
 */
export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: ThemeColorName
): string {
  const scheme = useColorScheme();
  const colorFromProps = props[scheme];

  if (colorFromProps) {
    return colorFromProps;
  }

  return Colors[scheme][colorName];
}
