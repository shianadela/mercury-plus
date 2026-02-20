import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

interface Branch {
  id: string;
  name: string;
  address: string;
  distance: string;
  distanceNum: number;
  isOpen: boolean;
  is24hrs: boolean;
  services: string[];
  hours: string;
  phone: string;
  lat: number;
  lng: number;
}

interface StockItem {
  name: string;
  price: string;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
}

const BRANCHES: Branch[] = [
  {
    id: '1',
    name: 'Mercury Drug - Makati Ave',
    address: '123 Makati Ave, Makati City',
    distance: '0.8 km',
    distanceNum: 0.8,
    isOpen: true,
    is24hrs: false,
    services: ['Vaccines', 'Lab Tests'],
    hours: '7:00 AM - 10:00 PM',
    phone: '(02) 8911-5071',
    lat: 0.35,
    lng: 0.45,
  },
  {
    id: '2',
    name: 'Mercury Drug - BGC Stopover',
    address: '31st St, BGC, Taguig City',
    distance: '1.2 km',
    distanceNum: 1.2,
    isOpen: true,
    is24hrs: true,
    services: ['Vaccines', 'Delivery', 'Free Clinic'],
    hours: 'Open 24 Hours',
    phone: '(02) 8911-5072',
    lat: 0.55,
    lng: 0.6,
  },
  {
    id: '3',
    name: 'Mercury Drug - Glorietta',
    address: 'Glorietta Mall, Ayala Center, Makati City',
    distance: '1.5 km',
    distanceNum: 1.5,
    isOpen: true,
    is24hrs: false,
    services: ['Delivery'],
    hours: '10:00 AM - 9:00 PM',
    phone: '(02) 8911-5073',
    lat: 0.3,
    lng: 0.35,
  },
  {
    id: '4',
    name: 'Mercury Drug - SM Megamall',
    address: 'SM Megamall, EDSA, Mandaluyong City',
    distance: '2.1 km',
    distanceNum: 2.1,
    isOpen: true,
    is24hrs: true,
    services: ['Vaccines', 'Lab Tests', 'Delivery'],
    hours: 'Open 24 Hours',
    phone: '(02) 8911-5074',
    lat: 0.7,
    lng: 0.3,
  },
  {
    id: '5',
    name: 'Mercury Drug - Eastwood',
    address: 'Eastwood City Walk, Quezon City',
    distance: '3.4 km',
    distanceNum: 3.4,
    isOpen: true,
    is24hrs: false,
    services: ['Vaccines'],
    hours: '8:00 AM - 10:00 PM',
    phone: '(02) 8911-5075',
    lat: 0.82,
    lng: 0.55,
  },
  {
    id: '6',
    name: 'Mercury Drug - Robinsons Ermita',
    address: 'Pedro Gil St, Ermita, Manila',
    distance: '4.0 km',
    distanceNum: 4.0,
    isOpen: false,
    is24hrs: false,
    services: ['Delivery'],
    hours: '8:00 AM - 9:00 PM',
    phone: '(02) 8911-5076',
    lat: 0.15,
    lng: 0.2,
  },
  {
    id: '7',
    name: 'Mercury Drug - SM North EDSA',
    address: 'North Ave, Quezon City',
    distance: '5.2 km',
    distanceNum: 5.2,
    isOpen: true,
    is24hrs: true,
    services: ['Vaccines', 'Lab Tests', 'Free Clinic', 'Delivery'],
    hours: 'Open 24 Hours',
    phone: '(02) 8911-5077',
    lat: 0.88,
    lng: 0.15,
  },
  {
    id: '8',
    name: 'Mercury Drug - Alabang Town Center',
    address: 'Alabang-Zapote Rd, Muntinlupa City',
    distance: '8.5 km',
    distanceNum: 8.5,
    isOpen: true,
    is24hrs: false,
    services: ['Vaccines', 'Delivery'],
    hours: '8:00 AM - 10:00 PM',
    phone: '(02) 8911-5078',
    lat: 0.2,
    lng: 0.75,
  },
];

const SAMPLE_STOCK: StockItem[] = [
  { name: 'Biogesic (Paracetamol) 500mg', price: '₱5.50', status: 'In Stock' },
  { name: 'Neozep Forte', price: '₱9.75', status: 'In Stock' },
  { name: 'Solmux (Carbocisteine) 500mg', price: '₱12.00', status: 'Low Stock' },
  { name: 'Cetirizine 10mg', price: '₱4.50', status: 'In Stock' },
  { name: 'Kremil-S Tablet', price: '₱6.25', status: 'Out of Stock' },
  { name: 'Ibuprofen 200mg', price: '₱3.75', status: 'In Stock' },
];

const FILTERS = ['Open Now', '24/7', 'Vaccine Center', 'Free Clinic', 'Near Me'];

export default function StoreLocatorScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [expandedBranch, setExpandedBranch] = useState<string | null>(null);

  const toggleFilter = (filter: string) => {
    setActiveFilters((prev) =>
      prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]
    );
  };

  const filteredBranches = BRANCHES.filter((branch) => {
    const matchesSearch =
      !searchQuery ||
      branch.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      branch.address.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilters =
      activeFilters.length === 0 ||
      activeFilters.every((filter) => {
        if (filter === 'Open Now') return branch.isOpen;
        if (filter === '24/7') return branch.is24hrs;
        if (filter === 'Vaccine Center') return branch.services.includes('Vaccines');
        if (filter === 'Free Clinic') return branch.services.includes('Free Clinic');
        if (filter === 'Near Me') return branch.distanceNum <= 3;
        return true;
      });

    return matchesSearch && matchesFilters;
  });

  const getStockColor = (status: string) => {
    if (status === 'In Stock') return '#00A86B';
    if (status === 'Low Stock') return '#F59E0B';
    return '#EF4444';
  };

  const getStockIcon = (status: string): 'checkmark-circle' | 'warning' | 'close-circle' => {
    if (status === 'In Stock') return 'checkmark-circle';
    if (status === 'Low Stock') return 'warning';
    return 'close-circle';
  };

  const renderBranchCard = ({ item }: { item: Branch }) => (
    <View style={styles.branchCard}>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => router.push(`/store/${item.id}`)}
      >
        <View style={styles.branchHeader}>
          <View style={styles.branchNameRow}>
            <Text style={styles.branchName} numberOfLines={1}>
              {item.name}
            </Text>
            <View style={styles.branchBadges}>
              <View style={[styles.statusBadge, { backgroundColor: item.isOpen ? '#DCFCE7' : '#FEE2E2' }]}>
                <View style={[styles.statusDot, { backgroundColor: item.isOpen ? '#00A86B' : '#EF4444' }]} />
                <Text style={[styles.statusText, { color: item.isOpen ? '#00A86B' : '#EF4444' }]}>
                  {item.isOpen ? 'Open' : 'Closed'}
                </Text>
              </View>
              {item.is24hrs && (
                <View style={styles.badge24}>
                  <Text style={styles.badge24Text}>24/7</Text>
                </View>
              )}
            </View>
          </View>
          <View style={styles.addressRow}>
            <Ionicons name="location-outline" size={14} color="#6B7280" />
            <Text style={styles.addressText}>{item.address}</Text>
          </View>
          <View style={styles.distanceRow}>
            <Ionicons name="navigate-outline" size={13} color="#6B7280" />
            <Text style={styles.distanceText}>{item.distance}</Text>
            <Text style={styles.dotSeparator}> · </Text>
            <Ionicons name="time-outline" size={13} color="#6B7280" />
            <Text style={styles.distanceText}>{item.hours}</Text>
          </View>
        </View>

        {/* Service Tags */}
        <View style={styles.serviceTags}>
          {item.services.map((service) => (
            <View key={service} style={styles.serviceTag}>
              <Text style={styles.serviceTagText}>{service}</Text>
            </View>
          ))}
        </View>
      </TouchableOpacity>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={styles.viewStockButton}
          onPress={() => setExpandedBranch(expandedBranch === item.id ? null : item.id)}
        >
          <Ionicons name="medical-outline" size={16} color="#00A86B" />
          <Text style={styles.viewStockText}>View Stock</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.directionsButton}>
          <Ionicons name="navigate" size={16} color="#FFFFFF" />
          <Text style={styles.directionsText}>Get Directions</Text>
        </TouchableOpacity>
      </View>

      {/* Stock Section */}
      {expandedBranch === item.id && (
        <View style={styles.stockSection}>
          <View style={styles.stockHeader}>
            <Ionicons name="medical" size={16} color="#1A1A2E" />
            <Text style={styles.stockTitle}>Stock Check</Text>
          </View>
          {SAMPLE_STOCK.map((stock) => (
            <View key={stock.name} style={styles.stockRow}>
              <View style={styles.stockInfo}>
                <Text style={styles.stockName}>{stock.name}</Text>
                <Text style={styles.stockPrice}>{stock.price}</Text>
              </View>
              <View style={[styles.stockBadge, { backgroundColor: getStockColor(stock.status) + '18' }]}>
                <Ionicons name={getStockIcon(stock.status)} size={14} color={getStockColor(stock.status)} />
                <Text style={[styles.stockStatus, { color: getStockColor(stock.status) }]}>{stock.status}</Text>
              </View>
            </View>
          ))}
          <TouchableOpacity
            style={styles.viewAllStockButton}
            onPress={() => router.push(`/store/${item.id}`)}
          >
            <Text style={styles.viewAllStockText}>View All Stock</Text>
            <Ionicons name="arrow-forward" size={14} color="#00A86B" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  const renderMapView = () => (
    <View style={styles.mapContainer}>
      <View style={styles.mockMap}>
        {/* Map grid lines */}
        <View style={[styles.gridLine, { top: '25%', left: 0, right: 0, height: 1 }]} />
        <View style={[styles.gridLine, { top: '50%', left: 0, right: 0, height: 1 }]} />
        <View style={[styles.gridLine, { top: '75%', left: 0, right: 0, height: 1 }]} />
        <View style={[styles.gridLine, { left: '25%', top: 0, bottom: 0, width: 1 }]} />
        <View style={[styles.gridLine, { left: '50%', top: 0, bottom: 0, width: 1 }]} />
        <View style={[styles.gridLine, { left: '75%', top: 0, bottom: 0, width: 1 }]} />

        {/* Road labels */}
        <Text style={[styles.roadLabel, { top: '23%', left: '5%' }]}>EDSA</Text>
        <Text style={[styles.roadLabel, { top: '48%', left: '30%' }]}>Ayala Ave</Text>
        <Text style={[styles.roadLabel, { top: '73%', left: '55%' }]}>C5 Road</Text>

        {/* Current location */}
        <View style={[styles.currentLocation, { top: '45%', left: '40%' }]}>
          <View style={styles.currentLocationDot} />
          <View style={styles.currentLocationPulse} />
        </View>

        {/* Branch Pins */}
        {filteredBranches.map((branch) => (
          <TouchableOpacity
            key={branch.id}
            style={[
              styles.mapPin,
              {
                top: `${branch.lat * 85 + 5}%`,
                left: `${branch.lng * 85 + 5}%`,
              },
            ]}
            onPress={() => router.push(`/store/${branch.id}`)}
          >
            <View style={[styles.pinMarker, !branch.isOpen && styles.pinMarkerClosed]}>
              <Ionicons name="medical" size={12} color="#FFFFFF" />
            </View>
            <View style={styles.pinLabel}>
              <Text style={styles.pinLabelText} numberOfLines={1}>
                {branch.name.replace('Mercury Drug - ', '')}
              </Text>
              <Text style={styles.pinDistanceText}>{branch.distance}</Text>
            </View>
          </TouchableOpacity>
        ))}

        {/* Legend */}
        <View style={styles.mapLegend}>
          <Text style={styles.legendTitle}>Map View</Text>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: '#00A86B' }]} />
            <Text style={styles.legendText}>Open</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: '#EF4444' }]} />
            <Text style={styles.legendText}>Closed</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: '#3B82F6' }]} />
            <Text style={styles.legendText}>You</Text>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#1A1A2E" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Find a Branch</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search-outline" size={20} color="#9CA3AF" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search branch or area..."
            placeholderTextColor="#9CA3AF"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={20} color="#9CA3AF" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* View Toggle */}
      <View style={styles.toggleContainer}>
        <View style={styles.viewToggle}>
          <TouchableOpacity
            style={[styles.toggleButton, viewMode === 'list' && styles.toggleButtonActive]}
            onPress={() => setViewMode('list')}
          >
            <Ionicons name="list-outline" size={16} color={viewMode === 'list' ? '#FFFFFF' : '#6B7280'} />
            <Text style={[styles.toggleText, viewMode === 'list' && styles.toggleTextActive]}>
              List View
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.toggleButton, viewMode === 'map' && styles.toggleButtonActive]}
            onPress={() => setViewMode('map')}
          >
            <Ionicons name="map-outline" size={16} color={viewMode === 'map' ? '#FFFFFF' : '#6B7280'} />
            <Text style={[styles.toggleText, viewMode === 'map' && styles.toggleTextActive]}>
              Map View
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Filter Chips */}
      <View style={styles.filtersContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filtersList}>
          {FILTERS.map((filter) => {
            const isActive = activeFilters.includes(filter);
            return (
              <TouchableOpacity
                key={filter}
                style={[styles.filterChip, isActive && styles.filterChipActive]}
                onPress={() => toggleFilter(filter)}
              >
                {filter === 'Open Now' && (
                  <Ionicons name="time-outline" size={14} color={isActive ? '#FFF' : '#6B7280'} />
                )}
                {filter === '24/7' && (
                  <Ionicons name="moon-outline" size={14} color={isActive ? '#FFF' : '#6B7280'} />
                )}
                {filter === 'Vaccine Center' && (
                  <Ionicons name="medkit-outline" size={14} color={isActive ? '#FFF' : '#6B7280'} />
                )}
                {filter === 'Free Clinic' && (
                  <Ionicons name="heart-outline" size={14} color={isActive ? '#FFF' : '#6B7280'} />
                )}
                {filter === 'Near Me' && (
                  <Ionicons name="locate-outline" size={14} color={isActive ? '#FFF' : '#6B7280'} />
                )}
                <Text style={[styles.filterText, isActive && styles.filterTextActive]}>{filter}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Results Count */}
      <View style={styles.resultsHeader}>
        <Text style={styles.resultsCount}>{filteredBranches.length} branches found</Text>
      </View>

      {/* Content */}
      {viewMode === 'list' ? (
        <FlatList
          data={filteredBranches}
          keyExtractor={(item) => item.id}
          renderItem={renderBranchCard}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Ionicons name="search-outline" size={48} color="#D1D5DB" />
              <Text style={styles.emptyTitle}>No branches found</Text>
              <Text style={styles.emptySubtitle}>Try adjusting your search or filters</Text>
            </View>
          }
        />
      ) : (
        renderMapView()
      )}
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
    borderBottomColor: '#E5E7EB',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A2E',
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 44,
    gap: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#1A1A2E',
  },
  toggleContainer: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 4,
  },
  viewToggle: {
    flexDirection: 'row',
    backgroundColor: '#E5E7EB',
    borderRadius: 10,
    padding: 3,
  },
  toggleButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 8,
    gap: 6,
  },
  toggleButtonActive: {
    backgroundColor: '#00A86B',
  },
  toggleText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#6B7280',
  },
  toggleTextActive: {
    color: '#FFFFFF',
  },
  filtersContainer: {
    paddingTop: 10,
  },
  filtersList: {
    paddingHorizontal: 16,
    gap: 8,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
    gap: 5,
    marginRight: 8,
  },
  filterChipActive: {
    backgroundColor: '#00A86B',
    borderColor: '#00A86B',
  },
  filterText: {
    fontSize: 13,
    color: '#6B7280',
    fontWeight: '500',
  },
  filterTextActive: {
    color: '#FFFFFF',
  },
  resultsHeader: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 6,
  },
  resultsCount: {
    fontSize: 13,
    color: '#6B7280',
    fontWeight: '500',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  branchCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    marginBottom: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  branchHeader: {
    marginBottom: 10,
  },
  branchNameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  branchName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1A1A2E',
    flex: 1,
    marginRight: 8,
  },
  branchBadges: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
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
    fontSize: 11,
    fontWeight: '600',
  },
  badge24: {
    backgroundColor: '#DBEAFE',
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 10,
  },
  badge24Text: {
    fontSize: 11,
    fontWeight: '700',
    color: '#3B82F6',
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 4,
  },
  addressText: {
    fontSize: 13,
    color: '#6B7280',
    flex: 1,
  },
  distanceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  distanceText: {
    fontSize: 12,
    color: '#6B7280',
  },
  dotSeparator: {
    fontSize: 12,
    color: '#D1D5DB',
  },
  serviceTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 12,
  },
  serviceTag: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 8,
  },
  serviceTagText: {
    fontSize: 11,
    color: '#6B7280',
    fontWeight: '500',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  viewStockButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#00A86B',
    gap: 6,
  },
  viewStockText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#00A86B',
  },
  directionsButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: '#00A86B',
    gap: 6,
  },
  directionsText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  stockSection: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  stockHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 10,
  },
  stockTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1A1A2E',
  },
  stockRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F9FAFB',
  },
  stockInfo: {
    flex: 1,
    marginRight: 12,
  },
  stockName: {
    fontSize: 13,
    color: '#1A1A2E',
    fontWeight: '500',
  },
  stockPrice: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  stockBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
  },
  stockStatus: {
    fontSize: 11,
    fontWeight: '600',
  },
  viewAllStockButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    paddingVertical: 8,
    gap: 4,
  },
  viewAllStockText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#00A86B',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A2E',
    marginTop: 12,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  // Map View Styles
  mapContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  mockMap: {
    flex: 1,
    backgroundColor: '#E8F4F0',
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
  },
  gridLine: {
    position: 'absolute',
    backgroundColor: '#D1E8DF',
  },
  roadLabel: {
    position: 'absolute',
    fontSize: 10,
    color: '#9CA3AF',
    fontWeight: '600',
    letterSpacing: 1,
  },
  currentLocation: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  currentLocationDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#3B82F6',
    borderWidth: 3,
    borderColor: '#FFFFFF',
    zIndex: 2,
  },
  currentLocationPulse: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(59, 130, 246, 0.15)',
    zIndex: 1,
  },
  mapPin: {
    position: 'absolute',
    alignItems: 'center',
  },
  pinMarker: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#00A86B',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  pinMarkerClosed: {
    backgroundColor: '#EF4444',
  },
  pinLabel: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 6,
    marginTop: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    maxWidth: 100,
  },
  pinLabelText: {
    fontSize: 9,
    fontWeight: '600',
    color: '#1A1A2E',
    textAlign: 'center',
  },
  pinDistanceText: {
    fontSize: 8,
    color: '#6B7280',
    textAlign: 'center',
  },
  mapLegend: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  legendTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: '#1A1A2E',
    marginBottom: 6,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 3,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  legendText: {
    fontSize: 10,
    color: '#6B7280',
  },
});
