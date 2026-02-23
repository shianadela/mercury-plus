import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  FlatList,
  Dimensions,
  RefreshControl,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/Colors';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';

const { width } = Dimensions.get('window');

const quickActions = [
  { icon: 'camera' as const, label: 'Scan Rx', color: '#00A86B', route: '/prescription' },
  { icon: 'search' as const, label: 'Find Medicine', color: '#3B82F6', route: '/(tabs)/search' },
  { icon: 'location' as const, label: 'Near Me', color: '#F59E0B', route: '/store' },
  { icon: 'chatbubble-ellipses' as const, label: 'AI Chat', color: '#8B5CF6', route: '/chat' },
];

const promos = [
  { id: '1', title: '20% OFF Vitamins', subtitle: 'Use code: HEALTHY2026', color: '#00A86B' },
  { id: '2', title: 'Free Delivery', subtitle: 'Orders over ₱500', color: '#3B82F6' },
  { id: '3', title: 'Suki Card 2X Points', subtitle: 'This weekend only!', color: '#F59E0B' },
];

const nearbyBranches = [
  { id: '1', name: 'Mercury Drug - Makati Ave', distance: '0.8 km', isOpen: true, is24hrs: false },
  { id: '2', name: 'Mercury Drug - BGC', distance: '1.2 km', isOpen: true, is24hrs: true },
  { id: '3', name: 'Mercury Drug - Glorietta', distance: '1.5 km', isOpen: true, is24hrs: false },
];

export default function HomeScreen() {
  const { itemCount } = useCart();
  const { user } = useAuth();
  const [refreshing, setRefreshing] = useState(false);

  const displayName = user?.displayName || 'User';
  const initials = displayName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#00A86B" />
        }
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Magandang araw!</Text>
            <Text style={styles.userName}>{displayName}</Text>
          </View>
          <View style={styles.headerRight}>
            <Pressable style={styles.iconButton} onPress={() => router.push('/reminders')}>
              <Ionicons name="notifications-outline" size={24} color={Colors.light.text} />
              <View style={styles.notifBadge}>
                <Text style={styles.notifBadgeText}>3</Text>
              </View>
            </Pressable>
            <Pressable style={styles.avatarContainer}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{initials}</Text>
              </View>
            </Pressable>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActionsContainer}>
          {quickActions.map((action, index) => (
            <Pressable
              key={index}
              style={styles.quickAction}
              onPress={() => router.push(action.route as any)}
            >
              <View style={[styles.quickActionIcon, { backgroundColor: action.color + '15' }]}>
                <Ionicons name={action.icon} size={24} color={action.color} />
              </View>
              <Text style={styles.quickActionLabel}>{action.label}</Text>
            </Pressable>
          ))}
        </View>

        {/* Promo Carousel */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Promotions</Text>
            <Pressable onPress={() => router.push('/promotions')}>
              <Text style={styles.seeAll}>See All</Text>
            </Pressable>
          </View>
          <FlatList
            horizontal
            data={promos}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingHorizontal: 20 }}
            ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
            renderItem={({ item }) => (
              <Pressable style={[styles.promoCard, { backgroundColor: item.color }]}>
                <View style={styles.promoContent}>
                  <Text style={styles.promoTitle}>{item.title}</Text>
                  <Text style={styles.promoSubtitle}>{item.subtitle}</Text>
                  <View style={styles.promoButton}>
                    <Text style={styles.promoButtonText}>Shop Now</Text>
                  </View>
                </View>
                <View style={styles.promoDecoration}>
                  <Ionicons name="pricetag" size={60} color="rgba(255,255,255,0.2)" />
                </View>
              </Pressable>
            )}
          />
        </View>

        {/* Medication Reminders */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Today's Reminders</Text>
            <Pressable onPress={() => router.push('/reminders')}>
              <Text style={styles.seeAll}>Manage</Text>
            </Pressable>
          </View>
          <View style={styles.reminderCard}>
            <View style={styles.reminderIconContainer}>
              <Ionicons name="medical" size={24} color="#00A86B" />
            </View>
            <View style={styles.reminderInfo}>
              <Text style={styles.reminderMedicine}>Losartan 50mg</Text>
              <Text style={styles.reminderTime}>8:00 AM - 1 tablet</Text>
            </View>
            <Pressable style={styles.reminderAction}>
              <Ionicons name="checkmark-circle" size={28} color="#00A86B" />
            </Pressable>
          </View>
          <View style={styles.reminderCard}>
            <View style={[styles.reminderIconContainer, { backgroundColor: '#EDE9FE' }]}>
              <Ionicons name="medical" size={24} color="#8B5CF6" />
            </View>
            <View style={styles.reminderInfo}>
              <Text style={styles.reminderMedicine}>Metformin 500mg</Text>
              <Text style={styles.reminderTime}>12:00 PM - 1 tablet</Text>
            </View>
            <Pressable style={styles.reminderAction}>
              <Ionicons name="checkmark-circle-outline" size={28} color="#9CA3AF" />
            </Pressable>
          </View>
        </View>

        {/* Refill Alert */}
        <View style={styles.section}>
          <Pressable style={styles.refillCard}>
            <View style={styles.refillIcon}>
              <Ionicons name="alert-circle" size={24} color="#F59E0B" />
            </View>
            <View style={styles.refillInfo}>
              <Text style={styles.refillTitle}>Refill Needed Soon</Text>
              <Text style={styles.refillText}>Losartan 50mg - ~5 days supply left</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </Pressable>
        </View>

        {/* Nearby Branches */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Nearby Branches</Text>
            <Pressable onPress={() => router.push('/store')}>
              <Text style={styles.seeAll}>Map View</Text>
            </Pressable>
          </View>
          {nearbyBranches.map((branch) => (
            <Pressable
              key={branch.id}
              style={styles.branchItem}
              onPress={() => router.push('/store')}
            >
              <View style={styles.branchIconContainer}>
                <Ionicons name="storefront" size={20} color="#00A86B" />
              </View>
              <View style={styles.branchInfo}>
                <Text style={styles.branchName}>{branch.name}</Text>
                <Text style={styles.branchDistance}>{branch.distance}</Text>
              </View>
              <View style={styles.branchBadges}>
                {branch.is24hrs && (
                  <View style={styles.badge24hr}>
                    <Text style={styles.badge24hrText}>24/7</Text>
                  </View>
                )}
                <View style={[styles.statusBadge, branch.isOpen ? styles.openBadge : styles.closedBadge]}>
                  <Text style={[styles.statusText, branch.isOpen ? styles.openText : styles.closedText]}>
                    {branch.isOpen ? 'Open' : 'Closed'}
                  </Text>
                </View>
              </View>
            </Pressable>
          ))}
        </View>

        {/* Health Tips */}
        <View style={[styles.section, { marginBottom: 30 }]}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Health Tip</Text>
          </View>
          <View style={styles.healthTipCard}>
            <Ionicons name="bulb" size={24} color="#F59E0B" />
            <View style={styles.healthTipContent}>
              <Text style={styles.healthTipTitle}>Stay Hydrated</Text>
              <Text style={styles.healthTipText}>
                Drink at least 8 glasses of water daily. Proper hydration helps your body absorb medications more effectively.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Floating Cart Button */}
      <Pressable
        style={styles.cartFab}
        onPress={() => router.push('/checkout')}
      >
        <Ionicons name="cart" size={26} color="#FFFFFF" />
        {itemCount > 0 && (
          <View style={styles.cartBadge}>
            <Text style={styles.cartBadgeText}>{itemCount > 99 ? '99+' : itemCount}</Text>
          </View>
        )}
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8FAFB',
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 16,
  },
  greeting: {
    fontSize: 14,
    color: Colors.light.textSecondary,
  },
  userName: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.light.text,
    marginTop: 2,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconButton: {
    position: 'relative',
    padding: 4,
  },
  notifBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#EF4444',
    borderRadius: 10,
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notifBadgeText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: '700',
  },
  avatarContainer: {},
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#00A86B',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
  },
  quickActionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    paddingVertical: 16,
    marginHorizontal: 20,
    backgroundColor: '#FFF',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  quickAction: {
    alignItems: 'center',
    gap: 8,
  },
  quickActionIcon: {
    width: 52,
    height: 52,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quickActionLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.light.text,
  },
  section: {
    marginTop: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.light.text,
  },
  seeAll: {
    fontSize: 14,
    color: '#00A86B',
    fontWeight: '600',
  },
  promoCard: {
    width: width * 0.7,
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  promoContent: {
    flex: 1,
  },
  promoTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFF',
    marginBottom: 4,
  },
  promoSubtitle: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 12,
  },
  promoButton: {
    backgroundColor: 'rgba(255,255,255,0.25)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  promoButtonText: {
    color: '#FFF',
    fontSize: 13,
    fontWeight: '600',
  },
  promoDecoration: {
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.5,
  },
  reminderCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 8,
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  reminderIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#E6F7EF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  reminderInfo: {
    flex: 1,
    marginLeft: 12,
  },
  reminderMedicine: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.light.text,
  },
  reminderTime: {
    fontSize: 13,
    color: Colors.light.textSecondary,
    marginTop: 2,
  },
  reminderAction: {
    padding: 4,
  },
  refillCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    backgroundColor: '#FEF3C7',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  refillIcon: {
    marginRight: 12,
  },
  refillInfo: {
    flex: 1,
  },
  refillTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#92400E',
  },
  refillText: {
    fontSize: 13,
    color: '#A16207',
    marginTop: 2,
  },
  branchItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 8,
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  branchIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#E6F7EF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  branchInfo: {
    flex: 1,
    marginLeft: 12,
  },
  branchName: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.light.text,
  },
  branchDistance: {
    fontSize: 12,
    color: Colors.light.textSecondary,
    marginTop: 2,
  },
  branchBadges: {
    flexDirection: 'row',
    gap: 6,
  },
  badge24hr: {
    backgroundColor: '#DBEAFE',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  badge24hrText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#3B82F6',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  openBadge: {
    backgroundColor: '#D1FAE5',
  },
  closedBadge: {
    backgroundColor: '#FEE2E2',
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
  },
  openText: {
    color: '#059669',
  },
  closedText: {
    color: '#DC2626',
  },
  healthTipCard: {
    flexDirection: 'row',
    marginHorizontal: 20,
    backgroundColor: '#FFFBEB',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#FEF3C7',
    gap: 12,
  },
  healthTipContent: {
    flex: 1,
  },
  healthTipTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#92400E',
    marginBottom: 4,
  },
  healthTipText: {
    fontSize: 13,
    color: '#A16207',
    lineHeight: 18,
  },
  cartFab: {
    position: 'absolute',
    bottom: 24,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#00A86B',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  cartBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
    backgroundColor: '#EF4444',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  cartBadgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
});
