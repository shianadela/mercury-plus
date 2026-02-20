import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';

interface StockMedicine {
  id: string;
  name: string;
  generic: string;
  price: string;
  priceNum: number;
  category: string;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
  quantity?: number;
}

interface BranchData {
  id: string;
  name: string;
  address: string;
  phone: string;
  hours: string;
  is24hrs: boolean;
  isOpen: boolean;
  services: string[];
  distance: string;
}

const BRANCHES_MAP: Record<string, BranchData> = {
  '1': {
    id: '1',
    name: 'Mercury Drug - Makati Ave',
    address: '123 Makati Ave, Legazpi Village, Makati City 1229',
    phone: '(02) 8911-5071',
    hours: '7:00 AM - 10:00 PM',
    is24hrs: false,
    isOpen: true,
    services: ['Vaccines', 'Lab Tests'],
    distance: '0.8 km',
  },
  '2': {
    id: '2',
    name: 'Mercury Drug - BGC Stopover',
    address: '31st St, BGC Stopover Pavilion, Taguig City 1634',
    phone: '(02) 8911-5072',
    hours: 'Open 24 Hours',
    is24hrs: true,
    isOpen: true,
    services: ['Vaccines', 'Delivery', 'Free Clinic'],
    distance: '1.2 km',
  },
  '3': {
    id: '3',
    name: 'Mercury Drug - Glorietta',
    address: 'Ground Floor, Glorietta 1, Ayala Center, Makati City',
    phone: '(02) 8911-5073',
    hours: '10:00 AM - 9:00 PM',
    is24hrs: false,
    isOpen: true,
    services: ['Delivery'],
    distance: '1.5 km',
  },
  '4': {
    id: '4',
    name: 'Mercury Drug - SM Megamall',
    address: 'Ground Floor, SM Megamall Building A, EDSA, Mandaluyong City',
    phone: '(02) 8911-5074',
    hours: 'Open 24 Hours',
    is24hrs: true,
    isOpen: true,
    services: ['Vaccines', 'Lab Tests', 'Delivery'],
    distance: '2.1 km',
  },
  '5': {
    id: '5',
    name: 'Mercury Drug - Eastwood',
    address: 'Eastwood City Walk 2, E. Rodriguez Jr. Ave, Quezon City',
    phone: '(02) 8911-5075',
    hours: '8:00 AM - 10:00 PM',
    is24hrs: false,
    isOpen: true,
    services: ['Vaccines'],
    distance: '3.4 km',
  },
  '6': {
    id: '6',
    name: 'Mercury Drug - Robinsons Ermita',
    address: 'Robinsons Place Ermita, Pedro Gil St, Manila',
    phone: '(02) 8911-5076',
    hours: '8:00 AM - 9:00 PM',
    is24hrs: false,
    isOpen: false,
    services: ['Delivery'],
    distance: '4.0 km',
  },
  '7': {
    id: '7',
    name: 'Mercury Drug - SM North EDSA',
    address: 'Ground Floor, SM North EDSA, North Ave, Quezon City',
    phone: '(02) 8911-5077',
    hours: 'Open 24 Hours',
    is24hrs: true,
    isOpen: true,
    services: ['Vaccines', 'Lab Tests', 'Free Clinic', 'Delivery'],
    distance: '5.2 km',
  },
  '8': {
    id: '8',
    name: 'Mercury Drug - Alabang Town Center',
    address: 'Alabang Town Center, Alabang-Zapote Rd, Muntinlupa City',
    phone: '(02) 8911-5078',
    hours: '8:00 AM - 10:00 PM',
    is24hrs: false,
    isOpen: true,
    services: ['Vaccines', 'Delivery'],
    distance: '8.5 km',
  },
};

const STOCK_DATA: StockMedicine[] = [
  { id: '1', name: 'Biogesic', generic: 'Paracetamol 500mg', price: '₱5.50', priceNum: 5.5, category: 'Pain Relief', status: 'In Stock', quantity: 245 },
  { id: '2', name: 'Neozep Forte', generic: 'Phenylephrine + Chlorphenamine + Paracetamol', price: '₱9.75', priceNum: 9.75, category: 'Cold & Flu', status: 'In Stock', quantity: 180 },
  { id: '3', name: 'Solmux', generic: 'Carbocisteine 500mg', price: '₱12.00', priceNum: 12.0, category: 'Cough', status: 'Low Stock', quantity: 18 },
  { id: '4', name: 'Cetirizine 10mg', generic: 'Cetirizine Dihydrochloride', price: '₱4.50', priceNum: 4.5, category: 'Allergy', status: 'In Stock', quantity: 320 },
  { id: '5', name: 'Kremil-S', generic: 'Aluminum Hydroxide + Magnesium Hydroxide + Simethicone', price: '₱6.25', priceNum: 6.25, category: 'Antacid', status: 'Out of Stock', quantity: 0 },
  { id: '6', name: 'Ibuprofen 200mg', generic: 'Ibuprofen', price: '₱3.75', priceNum: 3.75, category: 'Pain Relief', status: 'In Stock', quantity: 410 },
  { id: '7', name: 'Dolfenal', generic: 'Mefenamic Acid 500mg', price: '₱7.00', priceNum: 7.0, category: 'Pain Relief', status: 'In Stock', quantity: 156 },
  { id: '8', name: 'Flanax', generic: 'Naproxen Sodium 550mg', price: '₱14.50', priceNum: 14.5, category: 'Pain Relief', status: 'Low Stock', quantity: 12 },
  { id: '9', name: 'Amoxicillin 500mg', generic: 'Amoxicillin Trihydrate', price: '₱8.00', priceNum: 8.0, category: 'Antibiotic', status: 'In Stock', quantity: 95 },
  { id: '10', name: 'Losartan 50mg', generic: 'Losartan Potassium', price: '₱6.50', priceNum: 6.5, category: 'Hypertension', status: 'In Stock', quantity: 200 },
  { id: '11', name: 'Metformin 500mg', generic: 'Metformin Hydrochloride', price: '₱4.00', priceNum: 4.0, category: 'Diabetes', status: 'In Stock', quantity: 175 },
  { id: '12', name: 'Robitussin DM', generic: 'Dextromethorphan + Guaifenesin', price: '₱185.00', priceNum: 185.0, category: 'Cough', status: 'In Stock', quantity: 34 },
  { id: '13', name: 'Loperamide 2mg', generic: 'Loperamide Hydrochloride', price: '₱5.00', priceNum: 5.0, category: 'Antidiarrheal', status: 'Low Stock', quantity: 8 },
  { id: '14', name: 'Omeprazole 20mg', generic: 'Omeprazole', price: '₱7.50', priceNum: 7.5, category: 'Antacid', status: 'In Stock', quantity: 140 },
  { id: '15', name: 'Amlodipine 5mg', generic: 'Amlodipine Besylate', price: '₱5.25', priceNum: 5.25, category: 'Hypertension', status: 'Out of Stock', quantity: 0 },
  { id: '16', name: 'Diatabs', generic: 'Attapulgite 600mg', price: '₱6.00', priceNum: 6.0, category: 'Antidiarrheal', status: 'In Stock', quantity: 88 },
  { id: '17', name: 'Vitamin C 500mg', generic: 'Ascorbic Acid', price: '₱3.50', priceNum: 3.5, category: 'Vitamins', status: 'In Stock', quantity: 500 },
  { id: '18', name: 'Multivitamins + Iron', generic: 'Ferrous Sulfate + Multivitamins', price: '₱8.75', priceNum: 8.75, category: 'Vitamins', status: 'In Stock', quantity: 220 },
];

export default function BranchDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const branch = BRANCHES_MAP[id || '1'] || BRANCHES_MAP['1'];

  const categories = ['All', ...Array.from(new Set(STOCK_DATA.map((m) => m.category)))];

  const filteredStock = STOCK_DATA.filter((med) => {
    const matchesSearch =
      !searchQuery ||
      med.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      med.generic.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || med.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getStockColor = (status: string) => {
    if (status === 'In Stock') return '#00A86B';
    if (status === 'Low Stock') return '#F59E0B';
    return '#EF4444';
  };

  const getStockBg = (status: string) => {
    if (status === 'In Stock') return '#DCFCE7';
    if (status === 'Low Stock') return '#FEF3C7';
    return '#FEE2E2';
  };

  const getStockIcon = (status: string): 'checkmark-circle' | 'warning' | 'close-circle' => {
    if (status === 'In Stock') return 'checkmark-circle';
    if (status === 'Low Stock') return 'warning';
    return 'close-circle';
  };

  const handleReserve = () => {
    Alert.alert(
      'Reserve for Pickup',
      `Your reservation request at ${branch.name} has been submitted. You will receive a confirmation SMS within 15 minutes. Please pick up within 4 hours.`,
      [{ text: 'OK', style: 'default' }]
    );
  };

  const inStockCount = STOCK_DATA.filter((m) => m.status === 'In Stock').length;
  const lowStockCount = STOCK_DATA.filter((m) => m.status === 'Low Stock').length;
  const outOfStockCount = STOCK_DATA.filter((m) => m.status === 'Out of Stock').length;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#1A1A2E" />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle} numberOfLines={1}>
            {branch.name.replace('Mercury Drug - ', '')}
          </Text>
          <Text style={styles.headerSubtitle}>{branch.distance} away</Text>
        </View>
        <TouchableOpacity style={styles.headerAction}>
          <Ionicons name="share-outline" size={22} color="#6B7280" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Branch Info Card */}
        <View style={styles.infoCard}>
          <View style={styles.infoHeader}>
            <View style={styles.branchIcon}>
              <Ionicons name="medical" size={24} color="#00A86B" />
            </View>
            <View style={styles.infoHeaderText}>
              <Text style={styles.branchFullName}>{branch.name}</Text>
              <View style={styles.statusRow}>
                <View
                  style={[
                    styles.statusBadge,
                    { backgroundColor: branch.isOpen ? '#DCFCE7' : '#FEE2E2' },
                  ]}
                >
                  <View
                    style={[
                      styles.statusDot,
                      { backgroundColor: branch.isOpen ? '#00A86B' : '#EF4444' },
                    ]}
                  />
                  <Text
                    style={[styles.statusText, { color: branch.isOpen ? '#00A86B' : '#EF4444' }]}
                  >
                    {branch.isOpen ? 'Open Now' : 'Closed'}
                  </Text>
                </View>
                {branch.is24hrs && (
                  <View style={styles.badge24}>
                    <Text style={styles.badge24Text}>24/7</Text>
                  </View>
                )}
              </View>
            </View>
          </View>

          <View style={styles.infoRows}>
            <View style={styles.infoRow}>
              <Ionicons name="location-outline" size={18} color="#6B7280" />
              <Text style={styles.infoText}>{branch.address}</Text>
            </View>
            <View style={styles.infoRow}>
              <Ionicons name="call-outline" size={18} color="#6B7280" />
              <Text style={styles.infoText}>{branch.phone}</Text>
            </View>
            <View style={styles.infoRow}>
              <Ionicons name="time-outline" size={18} color="#6B7280" />
              <Text style={styles.infoText}>{branch.hours}</Text>
            </View>
          </View>

          {/* Services */}
          <View style={styles.servicesSection}>
            <Text style={styles.servicesLabel}>Available Services</Text>
            <View style={styles.servicesList}>
              {branch.services.map((service) => (
                <View key={service} style={styles.serviceChip}>
                  <Ionicons
                    name={
                      service === 'Vaccines'
                        ? 'medkit'
                        : service === 'Lab Tests'
                        ? 'flask'
                        : service === 'Delivery'
                        ? 'bicycle'
                        : 'heart'
                    }
                    size={14}
                    color="#00A86B"
                  />
                  <Text style={styles.serviceChipText}>{service}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Quick Actions */}
          <View style={styles.quickActions}>
            <TouchableOpacity style={styles.quickActionBtn}>
              <Ionicons name="call" size={18} color="#00A86B" />
              <Text style={styles.quickActionText}>Call</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickActionBtn}>
              <Ionicons name="navigate" size={18} color="#00A86B" />
              <Text style={styles.quickActionText}>Directions</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickActionBtn}>
              <Ionicons name="share-social" size={18} color="#00A86B" />
              <Text style={styles.quickActionText}>Share</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Stock Availability Section */}
        <View style={styles.stockSection}>
          <View style={styles.stockSectionHeader}>
            <Text style={styles.sectionTitle}>Stock Availability</Text>
            <Text style={styles.stockUpdated}>Updated 5 mins ago</Text>
          </View>

          {/* Stock Summary */}
          <View style={styles.stockSummary}>
            <View style={[styles.summaryItem, { backgroundColor: '#DCFCE7' }]}>
              <Text style={[styles.summaryCount, { color: '#00A86B' }]}>{inStockCount}</Text>
              <Text style={[styles.summaryLabel, { color: '#00A86B' }]}>In Stock</Text>
            </View>
            <View style={[styles.summaryItem, { backgroundColor: '#FEF3C7' }]}>
              <Text style={[styles.summaryCount, { color: '#F59E0B' }]}>{lowStockCount}</Text>
              <Text style={[styles.summaryLabel, { color: '#F59E0B' }]}>Low Stock</Text>
            </View>
            <View style={[styles.summaryItem, { backgroundColor: '#FEE2E2' }]}>
              <Text style={[styles.summaryCount, { color: '#EF4444' }]}>{outOfStockCount}</Text>
              <Text style={[styles.summaryLabel, { color: '#EF4444' }]}>Unavailable</Text>
            </View>
          </View>

          {/* Search */}
          <View style={styles.stockSearch}>
            <Ionicons name="search-outline" size={18} color="#9CA3AF" />
            <TextInput
              style={styles.stockSearchInput}
              placeholder="Search medicines..."
              placeholderTextColor="#9CA3AF"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <Ionicons name="close-circle" size={18} color="#9CA3AF" />
              </TouchableOpacity>
            )}
          </View>

          {/* Category Filter */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryList}
          >
            {categories.map((cat) => (
              <TouchableOpacity
                key={cat}
                style={[styles.categoryChip, selectedCategory === cat && styles.categoryChipActive]}
                onPress={() => setSelectedCategory(cat)}
              >
                <Text
                  style={[
                    styles.categoryChipText,
                    selectedCategory === cat && styles.categoryChipTextActive,
                  ]}
                >
                  {cat}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Medicine List */}
          <View style={styles.medicineList}>
            {filteredStock.map((med) => (
              <View key={med.id} style={styles.medicineRow}>
                <View style={styles.medicineInfo}>
                  <Text style={styles.medicineName}>{med.name}</Text>
                  <Text style={styles.medicineGeneric}>{med.generic}</Text>
                  <View style={styles.medicineMeta}>
                    <Text style={styles.medicinePrice}>{med.price}</Text>
                    <Text style={styles.medicineDot}> · </Text>
                    <Text style={styles.medicineCategory}>{med.category}</Text>
                  </View>
                </View>
                <View style={styles.medicineStock}>
                  <View
                    style={[styles.stockBadge, { backgroundColor: getStockBg(med.status) }]}
                  >
                    <Ionicons
                      name={getStockIcon(med.status)}
                      size={14}
                      color={getStockColor(med.status)}
                    />
                    <Text style={[styles.stockBadgeText, { color: getStockColor(med.status) }]}>
                      {med.status}
                    </Text>
                  </View>
                  {med.quantity !== undefined && med.quantity > 0 && (
                    <Text style={styles.quantityText}>{med.quantity} pcs</Text>
                  )}
                </View>
              </View>
            ))}

            {filteredStock.length === 0 && (
              <View style={styles.noResults}>
                <Ionicons name="search-outline" size={36} color="#D1D5DB" />
                <Text style={styles.noResultsText}>No medicines found</Text>
                <Text style={styles.noResultsSubtext}>Try a different search term</Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>

      {/* Reserve Button */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.reserveButton} onPress={handleReserve}>
          <Ionicons name="cart-outline" size={20} color="#FFFFFF" />
          <Text style={styles.reserveText}>Reserve for Pickup</Text>
        </TouchableOpacity>
      </View>
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
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerCenter: {
    flex: 1,
    marginLeft: 4,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1A1A2E',
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 1,
  },
  headerAction: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    paddingBottom: 100,
  },
  infoCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 16,
    padding: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  infoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  branchIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: '#DCFCE7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  infoHeaderText: {
    flex: 1,
  },
  branchFullName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A2E',
    marginBottom: 4,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    gap: 4,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  badge24: {
    backgroundColor: '#DBEAFE',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  badge24Text: {
    fontSize: 11,
    fontWeight: '700',
    color: '#3B82F6',
  },
  infoRows: {
    gap: 10,
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  infoText: {
    fontSize: 14,
    color: '#4B5563',
    flex: 1,
    lineHeight: 20,
  },
  servicesSection: {
    marginBottom: 16,
  },
  servicesLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#6B7280',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  servicesList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  serviceChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
    backgroundColor: '#DCFCE7',
    gap: 5,
  },
  serviceChipText: {
    fontSize: 12,
    color: '#00A86B',
    fontWeight: '600',
  },
  quickActions: {
    flexDirection: 'row',
    gap: 10,
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  quickActionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: '#F0FDF4',
    gap: 6,
  },
  quickActionText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#00A86B',
  },
  stockSection: {
    marginHorizontal: 16,
    marginTop: 16,
  },
  stockSectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A2E',
  },
  stockUpdated: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  stockSummary: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 14,
  },
  summaryItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 12,
  },
  summaryCount: {
    fontSize: 20,
    fontWeight: '800',
  },
  summaryLabel: {
    fontSize: 11,
    fontWeight: '600',
    marginTop: 2,
  },
  stockSearch: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 42,
    gap: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  stockSearchInput: {
    flex: 1,
    fontSize: 14,
    color: '#1A1A2E',
  },
  categoryList: {
    gap: 8,
    paddingBottom: 12,
  },
  categoryChip: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginRight: 8,
  },
  categoryChipActive: {
    backgroundColor: '#00A86B',
    borderColor: '#00A86B',
  },
  categoryChipText: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
  categoryChipTextActive: {
    color: '#FFFFFF',
  },
  medicineList: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    overflow: 'hidden',
  },
  medicineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  medicineInfo: {
    flex: 1,
    marginRight: 12,
  },
  medicineName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A2E',
  },
  medicineGeneric: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  medicineMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  medicinePrice: {
    fontSize: 13,
    fontWeight: '700',
    color: '#00A86B',
  },
  medicineDot: {
    fontSize: 12,
    color: '#D1D5DB',
  },
  medicineCategory: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  medicineStock: {
    alignItems: 'flex-end',
  },
  stockBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
  },
  stockBadgeText: {
    fontSize: 11,
    fontWeight: '600',
  },
  quantityText: {
    fontSize: 10,
    color: '#9CA3AF',
    marginTop: 3,
  },
  noResults: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  noResultsText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#6B7280',
    marginTop: 10,
  },
  noResultsSubtext: {
    fontSize: 13,
    color: '#9CA3AF',
    marginTop: 4,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 34,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 5,
  },
  reserveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00A86B',
    paddingVertical: 16,
    borderRadius: 14,
    gap: 8,
  },
  reserveText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
