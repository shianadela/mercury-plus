import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Alert,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/Colors';
import { useAuth } from '@/context/AuthContext';

interface MenuItem {
  icon: keyof typeof Ionicons.glyphMap;
  iconColor: string;
  iconBg: string;
  label: string;
  subtitle?: string;
  route?: string;
  isDestructive?: boolean;
}

const menuItems: MenuItem[] = [
  {
    icon: 'card',
    iconColor: '#F59E0B',
    iconBg: '#FEF3C7',
    label: 'Suki Card',
    subtitle: '1,240 points',
    route: '/promotions/suki',
  },
  {
    icon: 'document-text',
    iconColor: '#00A86B',
    iconBg: '#D1FAE5',
    label: 'My Prescriptions',
    route: '/prescription',
  },
  {
    icon: 'alarm',
    iconColor: '#8B5CF6',
    iconBg: '#EDE9FE',
    label: 'Medication Reminders',
    route: '/reminders',
  },
  {
    icon: 'people',
    iconColor: '#3B82F6',
    iconBg: '#DBEAFE',
    label: 'Caregiver Access',
    subtitle: 'Manage family access',
  },
  {
    icon: 'wallet',
    iconColor: '#0EA5E9',
    iconBg: '#E0F2FE',
    label: 'Payment Methods',
    subtitle: 'GCash, Maya, Cards',
  },
  {
    icon: 'location',
    iconColor: '#EF4444',
    iconBg: '#FEE2E2',
    label: 'Addresses',
    subtitle: '2 saved addresses',
  },
  {
    icon: 'notifications',
    iconColor: '#F59E0B',
    iconBg: '#FEF3C7',
    label: 'Notifications',
  },
  {
    icon: 'language',
    iconColor: '#6366F1',
    iconBg: '#E0E7FF',
    label: 'Language',
    subtitle: 'English',
  },
  {
    icon: 'help-circle',
    iconColor: '#10B981',
    iconBg: '#D1FAE5',
    label: 'Help & Support',
  },
  {
    icon: 'information-circle',
    iconColor: '#6B7280',
    iconBg: '#F3F4F6',
    label: 'About Mercury+',
    subtitle: 'Version 1.0.0',
  },
];

const stats = [
  { label: 'Orders', value: '12' },
  { label: 'Prescriptions', value: '5' },
  { label: 'Suki Points', value: '1,240' },
];

export default function ProfileScreen() {
  const { user, signOut } = useAuth();

  const displayName = user?.displayName || 'User';
  const email = user?.email || '';
  const initials = displayName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
  const role = user?.role === 'caregiver' ? 'Caregiver' : 'Patient';

  const handleMenuPress = (item: MenuItem) => {
    if (item.route) {
      router.push(item.route as any);
    } else {
      Alert.alert(item.label, 'This feature is coming soon.');
    }
  };

  const handleSignOut = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Sign Out',
          style: 'destructive',
          onPress: async () => {
            await signOut();
            // AuthGate in _layout.tsx will redirect to login automatically
          },
        },
      ],
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            {user?.photoURL ? (
              <Image source={{ uri: user.photoURL }} style={styles.avatar} />
            ) : (
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{initials}</Text>
              </View>
            )}
            <Pressable style={styles.editAvatarButton}>
              <Ionicons name="camera" size={14} color="#FFFFFF" />
            </Pressable>
          </View>
          <Text style={styles.userName}>{displayName}</Text>
          <Text style={styles.userEmail}>{email}</Text>
          <View style={styles.roleBadge}>
            <Ionicons name={role === 'Caregiver' ? 'people' : 'person'} size={12} color={Colors.light.tint} />
            <Text style={styles.roleBadgeText}>{role}</Text>
          </View>
        </View>

        {/* Stats Row */}
        <View style={styles.statsCard}>
          {stats.map((stat, index) => (
            <React.Fragment key={stat.label}>
              {index > 0 && <View style={styles.statDivider} />}
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
            </React.Fragment>
          ))}
        </View>

        {/* Suki Card Banner */}
        <Pressable
          style={styles.sukiBanner}
          onPress={() => router.push('/promotions/suki' as any)}
        >
          <View style={styles.sukiBannerLeft}>
            <Ionicons name="star" size={24} color="#FFFFFF" />
            <View style={styles.sukiBannerInfo}>
              <Text style={styles.sukiBannerTitle}>Suki Card Gold</Text>
              <Text style={styles.sukiBannerPoints}>1,240 points available</Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={20} color="rgba(255,255,255,0.8)" />
        </Pressable>

        {/* Menu Items */}
        <View style={styles.menuSection}>
          {menuItems.map((item, index) => (
            <Pressable
              key={index}
              style={[
                styles.menuItem,
                index === 0 && styles.menuItemFirst,
                index === menuItems.length - 1 && styles.menuItemLast,
              ]}
              onPress={() => handleMenuPress(item)}
            >
              <View style={[styles.menuIcon, { backgroundColor: item.iconBg }]}>
                <Ionicons name={item.icon} size={20} color={item.iconColor} />
              </View>
              <View style={styles.menuContent}>
                <Text style={styles.menuLabel}>{item.label}</Text>
                {item.subtitle && (
                  <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
                )}
              </View>
              <Ionicons name="chevron-forward" size={18} color={Colors.light.textSecondary} />
            </Pressable>
          ))}
        </View>

        {/* Sign Out */}
        <Pressable style={styles.signOutButton} onPress={handleSignOut}>
          <Ionicons name="log-out-outline" size={20} color="#EF4444" />
          <Text style={styles.signOutText}>Sign Out</Text>
        </Pressable>

        {/* App Version */}
        <Text style={styles.versionText}>Mercury+ v1.0.0</Text>

        <View style={{ height: 30 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  container: {
    flex: 1,
  },
  profileHeader: {
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 24,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 14,
  },
  avatar: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: Colors.light.tint,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.light.tint,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: Colors.light.text,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: Colors.light.background,
  },
  userName: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.light.text,
  },
  userEmail: {
    fontSize: 14,
    color: Colors.light.textSecondary,
    marginTop: 4,
  },
  roleBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: Colors.light.tint + '15',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 12,
    marginTop: 10,
  },
  roleBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.light.tint,
  },
  statsCard: {
    flexDirection: 'row',
    marginHorizontal: 20,
    backgroundColor: Colors.light.card,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    backgroundColor: Colors.light.border,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.light.text,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.light.textSecondary,
    marginTop: 4,
    fontWeight: '500',
  },
  sukiBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginTop: 16,
    backgroundColor: Colors.light.tint,
    borderRadius: 14,
    padding: 16,
    shadowColor: Colors.light.tint,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  sukiBannerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  sukiBannerInfo: {},
  sukiBannerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  sukiBannerPoints: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.85)',
    marginTop: 2,
  },
  menuSection: {
    marginHorizontal: 20,
    marginTop: 24,
    backgroundColor: Colors.light.card,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 3,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.border,
  },
  menuItemFirst: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  menuItemLast: {
    borderBottomWidth: 0,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  menuIcon: {
    width: 38,
    height: 38,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuContent: {
    flex: 1,
    marginLeft: 12,
  },
  menuLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.light.text,
  },
  menuSubtitle: {
    fontSize: 12,
    color: Colors.light.textSecondary,
    marginTop: 2,
  },
  signOutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginHorizontal: 20,
    marginTop: 24,
    backgroundColor: Colors.light.card,
    borderRadius: 14,
    paddingVertical: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  signOutText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#EF4444',
  },
  versionText: {
    textAlign: 'center',
    fontSize: 12,
    color: Colors.light.textSecondary,
    marginTop: 20,
  },
});
