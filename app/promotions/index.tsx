import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  FlatList,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

const TABS = ['All Promos', 'For You', 'Suki Deals'];

interface Promo {
  id: string;
  title: string;
  description: string;
  validity: string;
  category: string;
  accentColor: string;
}

const PROMOTIONS: Promo[] = [
  {
    id: '1',
    title: '20% OFF All Vitamins',
    description: 'Stock up on your daily vitamins!',
    validity: 'Valid until Mar 31, 2026',
    category: 'Vitamins',
    accentColor: '#00A86B',
  },
  {
    id: '2',
    title: 'Buy 1 Get 1 Biogesic',
    description: 'Limited time offer',
    validity: 'Valid until Feb 28, 2026',
    category: 'Pain Relief',
    accentColor: '#3B82F6',
  },
  {
    id: '3',
    title: 'Free Delivery Weekend',
    description: 'Free delivery for orders \u20B1500+',
    validity: 'Valid: Weekends only',
    category: 'Delivery',
    accentColor: '#8B5CF6',
  },
  {
    id: '4',
    title: 'Senior Citizen 20% Discount',
    description: 'Valid with Senior Citizen ID',
    validity: 'Everyday',
    category: 'Discount',
    accentColor: '#F59E0B',
  },
  {
    id: '5',
    title: 'Suki Points 2X',
    description: 'Double points on all purchases',
    validity: 'Valid until Mar 15, 2026',
    category: 'Loyalty',
    accentColor: '#EF4444',
  },
  {
    id: '6',
    title: 'Generic Medicine Month',
    description: 'Extra 10% off generic medicines',
    validity: 'Valid: March 2026',
    category: 'Generics',
    accentColor: '#14B8A6',
  },
  {
    id: '7',
    title: 'Free Flu Vaccine',
    description: 'At participating branches with vaccine center',
    validity: 'Valid while supplies last',
    category: 'Vaccines',
    accentColor: '#06B6D4',
  },
  {
    id: '8',
    title: 'Diaper Bundle Deal',
    description: 'Save \u20B1150 on diaper bundles',
    validity: 'Valid until Feb 28',
    category: 'Baby',
    accentColor: '#EC4899',
  },
];

export default function PromotionsScreen() {
  const [activeTab, setActiveTab] = useState(0);

  const renderPromoCard = ({ item }: { item: Promo }) => (
    <Pressable style={styles.promoCard}>
      <View style={[styles.promoAccent, { backgroundColor: item.accentColor }]} />
      <View style={styles.promoContent}>
        <View style={styles.promoTopRow}>
          <Text style={styles.promoTitle}>{item.title}</Text>
          <View style={[styles.categoryBadge, { backgroundColor: item.accentColor + '18' }]}>
            <Text style={[styles.categoryText, { color: item.accentColor }]}>{item.category}</Text>
          </View>
        </View>
        <Text style={styles.promoDescription}>{item.description}</Text>
        <View style={styles.promoBottom}>
          <View style={styles.validityRow}>
            <Ionicons name="time-outline" size={13} color="#6B7280" />
            <Text style={styles.promoValidity}>{item.validity}</Text>
          </View>
          <Pressable style={styles.viewDetailsLink}>
            <Text style={styles.viewDetailsText}>View Details</Text>
            <Ionicons name="chevron-forward" size={14} color="#00A86B" />
          </Pressable>
        </View>
      </View>
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#1A1A2E" />
        </Pressable>
        <Text style={styles.headerTitle}>Promotions</Text>
        <View style={{ width: 40 }} />
      </View>

      <FlatList
        data={PROMOTIONS}
        keyExtractor={(item) => item.id}
        renderItem={renderPromoCard}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <>
            {/* Suki Card */}
            <View style={styles.sukiCard}>
              <View style={styles.sukiCardInner}>
                <View style={styles.sukiCardTop}>
                  <Text style={styles.sukiCardLabel}>SUKI CARD</Text>
                  <View style={styles.sukiLogo}>
                    <Text style={styles.sukiLogoText}>M+</Text>
                  </View>
                </View>

                <View style={styles.sukiCardMiddle}>
                  <View style={styles.sukiCardDetails}>
                    <Text style={styles.sukiCardNumber}>****  ****  ****  1234</Text>
                    <Text style={styles.sukiCardName}>JUAN DELA CRUZ</Text>
                  </View>
                  <View style={styles.qrPlaceholder}>
                    <View style={styles.qrRow}>
                      <View style={styles.qrBlock} />
                      <View style={[styles.qrBlock, styles.qrBlockLight]} />
                      <View style={styles.qrBlock} />
                    </View>
                    <View style={styles.qrRow}>
                      <View style={[styles.qrBlock, styles.qrBlockLight]} />
                      <View style={styles.qrBlock} />
                      <View style={[styles.qrBlock, styles.qrBlockLight]} />
                    </View>
                    <View style={styles.qrRow}>
                      <View style={styles.qrBlock} />
                      <View style={[styles.qrBlock, styles.qrBlockLight]} />
                      <View style={styles.qrBlock} />
                    </View>
                  </View>
                </View>

                <View style={styles.sukiCardBottom}>
                  <View style={styles.pointsContainer}>
                    <Ionicons name="star" size={16} color="#FCD34D" />
                    <Text style={styles.pointsText}>1,240 Points</Text>
                  </View>
                </View>
              </View>
            </View>

            {/* Points Progress */}
            <View style={styles.progressSection}>
              <View style={styles.progressLabelRow}>
                <Text style={styles.progressLabel}>260 points to Gold status</Text>
                <Text style={styles.progressPercent}>83%</Text>
              </View>
              <View style={styles.progressBar}>
                <View style={styles.progressFill} />
              </View>
            </View>

            {/* Tab Switcher */}
            <View style={styles.tabContainer}>
              {TABS.map((tab, index) => (
                <Pressable
                  key={tab}
                  style={[styles.tab, activeTab === index && styles.activeTab]}
                  onPress={() => setActiveTab(index)}
                >
                  <Text style={[styles.tabText, activeTab === index && styles.activeTabText]}>
                    {tab}
                  </Text>
                </Pressable>
              ))}
            </View>
          </>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFB',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A2E',
  },
  listContent: {
    paddingBottom: 32,
  },
  sukiCard: {
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 18,
    overflow: 'hidden',
    shadowColor: '#00A86B',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 8,
  },
  sukiCardInner: {
    borderRadius: 18,
    padding: 20,
    backgroundColor: '#00A86B',
    // Simulating gradient with overlay

  },
  sukiCardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  sukiCardLabel: {
    fontSize: 14,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 3,
  },
  sukiLogo: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.25)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sukiLogoText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
  },
  sukiCardMiddle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 18,
  },
  sukiCardDetails: {
    flex: 1,
  },
  sukiCardNumber: {
    fontSize: 17,
    fontWeight: '600',
    color: '#FFFFFF',
    letterSpacing: 2,
    marginBottom: 8,
  },
  sukiCardName: {
    fontSize: 13,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.85)',
    letterSpacing: 1.5,
  },
  qrPlaceholder: {
    width: 48,
    height: 48,
    padding: 4,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 6,
    gap: 2,
    justifyContent: 'center',
  },
  qrRow: {
    flexDirection: 'row',
    gap: 2,
    justifyContent: 'center',
  },
  qrBlock: {
    width: 10,
    height: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 1,
  },
  qrBlockLight: {
    backgroundColor: 'rgba(255,255,255,0.4)',
  },
  sukiCardBottom: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.2)',
    paddingTop: 12,
  },
  pointsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  pointsText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  progressSection: {
    marginHorizontal: 16,
    marginTop: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  progressLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 13,
    color: '#6B7280',
    fontWeight: '500',
  },
  progressPercent: {
    fontSize: 13,
    color: '#00A86B',
    fontWeight: '700',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    width: '83%',
    height: '100%',
    backgroundColor: '#00A86B',
    borderRadius: 4,
  },
  tabContainer: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginTop: 20,
    marginBottom: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 10,
  },
  activeTab: {
    backgroundColor: '#00A86B',
  },
  tabText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#6B7280',
  },
  activeTabText: {
    color: '#FFFFFF',
  },
  promoCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginBottom: 10,
    borderRadius: 14,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 1,
  },
  promoAccent: {
    width: 5,
  },
  promoContent: {
    flex: 1,
    padding: 14,
  },
  promoTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  promoTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1A1A2E',
    flex: 1,
    marginRight: 8,
  },
  categoryBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  categoryText: {
    fontSize: 11,
    fontWeight: '700',
  },
  promoDescription: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 10,
    lineHeight: 18,
  },
  promoBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  validityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  promoValidity: {
    fontSize: 12,
    color: '#6B7280',
  },
  viewDetailsLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  viewDetailsText: {
    fontSize: 13,
    color: '#00A86B',
    fontWeight: '600',
  },
});
