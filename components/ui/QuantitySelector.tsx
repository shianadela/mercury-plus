import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';

const colors = Colors.light;

interface QuantitySelectorProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}

export default function QuantitySelector({
  value,
  onChange,
  min = 1,
  max = 99,
}: QuantitySelectorProps) {
  const canDecrease = value > min;
  const canIncrease = value < max;

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => canDecrease && onChange(value - 1)}
        style={({ pressed }) => [
          styles.button,
          !canDecrease && styles.buttonDisabled,
          pressed && canDecrease && styles.buttonPressed,
        ]}
        hitSlop={4}
      >
        <Ionicons
          name="remove"
          size={18}
          color={canDecrease ? colors.tint : colors.tabIconDefault}
        />
      </Pressable>

      <View style={styles.valueContainer}>
        <Text style={styles.value}>{value}</Text>
      </View>

      <Pressable
        onPress={() => canIncrease && onChange(value + 1)}
        style={({ pressed }) => [
          styles.button,
          styles.buttonAdd,
          !canIncrease && styles.buttonDisabled,
          pressed && canIncrease && styles.buttonPressed,
        ]}
        hitSlop={4}
      >
        <Ionicons
          name="add"
          size={18}
          color={canIncrease ? '#FFFFFF' : colors.tabIconDefault}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  button: {
    width: 34,
    height: 34,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.tintLight,
  },
  buttonAdd: {
    backgroundColor: colors.tint,
  },
  buttonDisabled: {
    backgroundColor: '#F1F3F5',
  },
  buttonPressed: {
    opacity: 0.7,
  },
  valueContainer: {
    minWidth: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  value: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
});
