import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import Badge from './ui/Badge';
import Button from './ui/Button';

const colors = Colors.light;

interface Medicine {
  brandName: string;
  genericName: string;
  price: number;
  genericPrice?: number;
  form: string;
  dosage: string;
  requiresPrescription: boolean;
  category?: string;
}

interface MedicineCardProps {
  medicine: Medicine;
  onPress?: () => void;
  onAddToCart?: () => void;
  compact?: boolean;
}

export default function MedicineCard({
  medicine,
  onPress,
  onAddToCart,
  compact = false,
}: MedicineCardProps) {
  const {
    brandName,
    genericName,
    price,
    genericPrice,
    form,
    dosage,
    requiresPrescription,
    category,
  } = medicine;

  const savings =
    genericPrice && genericPrice < price
      ? ((price - genericPrice) / price) * 100
      : 0;

  if (compact) {
    return (
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          styles.compactCard,
          pressed && styles.pressed,
        ]}
      >
        <View style={styles.compactContent}>
          <Text style={styles.brandName} numberOfLines={1}>
            {brandName}
          </Text>
          <Text style={styles.genericName} numberOfLines={1}>
            {genericName} - {dosage} {form}
          </Text>
        </View>
        <View style={styles.compactRight}>
          <Text style={styles.price}>P{price.toFixed(2)}</Text>
          {requiresPrescription && (
            <Ionicons name="document-text" size={14} color={colors.warning} />
          )}
        </View>
      </Pressable>
    );
  }

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && onPress && styles.pressed]}
    >
      <View style={styles.topRow}>
        <View style={styles.nameSection}>
          <Text style={styles.brandName} numberOfLines={1}>
            {brandName}
          </Text>
          <Text style={styles.genericName} numberOfLines={1}>
            {genericName}
          </Text>
        </View>
        {requiresPrescription && (
          <Badge text="Rx" variant="warning" size="sm" />
        )}
      </View>

      <Text style={styles.dosageForm}>
        {dosage} / {form}
      </Text>

      {category && (
        <Badge text={category} variant="default" size="sm" />
      )}

      <View style={styles.bottomRow}>
        <View style={styles.priceSection}>
          <Text style={styles.price}>P{price.toFixed(2)}</Text>
          {genericPrice && genericPrice < price && (
            <View style={styles.genericPriceRow}>
              <Text style={styles.genericPriceLabel}>Generic: </Text>
              <Text style={styles.genericPrice}>
                P{genericPrice.toFixed(2)}
              </Text>
              <View style={styles.savingsBadge}>
                <Text style={styles.savingsText}>
                  Save {savings.toFixed(0)}%
                </Text>
              </View>
            </View>
          )}
        </View>

        {onAddToCart && (
          <Button
            title="Add"
            onPress={onAddToCart}
            variant="primary"
            size="sm"
            icon={
              <Ionicons name="cart-outline" size={16} color="#FFFFFF" />
            }
          />
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  compactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.card,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  pressed: {
    opacity: 0.85,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  nameSection: {
    flex: 1,
    marginRight: 8,
  },
  brandName: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  genericName: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 2,
  },
  dosageForm: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 6,
    marginBottom: 8,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: 12,
  },
  priceSection: {
    flex: 1,
  },
  price: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.text,
  },
  genericPriceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  genericPriceLabel: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  genericPrice: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.tint,
  },
  savingsBadge: {
    backgroundColor: colors.successLight,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    marginLeft: 6,
  },
  savingsText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.success,
  },
  compactContent: {
    flex: 1,
    marginRight: 12,
  },
  compactRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
});
