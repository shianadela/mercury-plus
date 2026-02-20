import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import Badge from './ui/Badge';

const colors = Colors.light;

interface Branch {
  name: string;
  address: string;
  distance?: string;
  isOpen: boolean;
  is24Hours?: boolean;
  services?: string[];
}

interface BranchCardProps {
  branch: Branch;
  onPress?: () => void;
}

export default function BranchCard({ branch, onPress }: BranchCardProps) {
  const { name, address, distance, isOpen, is24Hours, services } = branch;

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        pressed && onPress && styles.pressed,
      ]}
    >
      <View style={styles.topRow}>
        <View style={styles.iconContainer}>
          <Ionicons name="storefront" size={22} color={colors.tint} />
        </View>
        <View style={styles.info}>
          <Text style={styles.name} numberOfLines={1}>
            {name}
          </Text>
          <Text style={styles.address} numberOfLines={2}>
            {address}
          </Text>
        </View>
        {distance && (
          <View style={styles.distanceContainer}>
            <Ionicons
              name="location-outline"
              size={14}
              color={colors.textSecondary}
            />
            <Text style={styles.distance}>{distance}</Text>
          </View>
        )}
      </View>

      <View style={styles.badgeRow}>
        <Badge
          text={isOpen ? 'Open' : 'Closed'}
          variant={isOpen ? 'success' : 'danger'}
          size="sm"
        />
        {is24Hours && (
          <Badge text="24/7" variant="info" size="sm" />
        )}
      </View>

      {services && services.length > 0 && (
        <View style={styles.servicesRow}>
          {services.map((service, index) => (
            <View key={index} style={styles.serviceTag}>
              <Text style={styles.serviceText}>{service}</Text>
            </View>
          ))}
        </View>
      )}

      {onPress && (
        <View style={styles.chevron}>
          <Ionicons
            name="chevron-forward"
            size={20}
            color={colors.tabIconDefault}
          />
        </View>
      )}
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
  pressed: {
    opacity: 0.85,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: colors.tintLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  info: {
    flex: 1,
    marginRight: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  address: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 2,
    lineHeight: 18,
  },
  distanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  distance: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  badgeRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 12,
  },
  servicesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 10,
  },
  serviceTag: {
    backgroundColor: '#F1F3F5',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  serviceText: {
    fontSize: 11,
    fontWeight: '500',
    color: colors.textSecondary,
  },
  chevron: {
    position: 'absolute',
    right: 16,
    top: '50%',
  },
});
