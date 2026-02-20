import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  TextInput,
  FlatList,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/Colors';

interface Medicine {
  id: string;
  brandName: string;
  genericName: string;
  dosage: string;
  form: string;
  price: number;
  genericPrice?: number;
  category: string;
  rxRequired: boolean;
}

const medicines: Medicine[] = [
  { id: '1', brandName: 'Biogesic', genericName: 'Paracetamol', dosage: '500mg', form: 'Tablet', price: 5.50, genericPrice: 3.00, category: 'Pain Relief', rxRequired: false },
  { id: '2', brandName: 'Neozep Forte', genericName: 'Phenylephrine + Chlorphenamine + Paracetamol', dosage: '', form: 'Tablet', price: 9.75, category: 'Respiratory', rxRequired: false },
  { id: '3', brandName: 'Solmux', genericName: 'Carbocisteine', dosage: '500mg', form: 'Capsule', price: 12.00, category: 'Respiratory', rxRequired: false },
  { id: '4', brandName: 'Dolfenal', genericName: 'Mefenamic Acid', dosage: '500mg', form: 'Capsule', price: 8.50, category: 'Pain Relief', rxRequired: false },
  { id: '5', brandName: 'Amoxicillin', genericName: 'Amoxicillin', dosage: '500mg', form: 'Capsule', price: 7.00, category: 'Antibiotics', rxRequired: true },
  { id: '6', brandName: 'Losartan', genericName: 'Losartan Potassium', dosage: '50mg', form: 'Tablet', price: 8.00, category: 'Cardiovascular', rxRequired: true },
  { id: '7', brandName: 'Metformin', genericName: 'Metformin HCl', dosage: '500mg', form: 'Tablet', price: 5.00, category: 'Diabetes', rxRequired: true },
  { id: '8', brandName: 'Cetirizine', genericName: 'Cetirizine Dihydrochloride', dosage: '10mg', form: 'Tablet', price: 4.50, category: 'Pain Relief', rxRequired: false },
  { id: '9', brandName: 'Kremil-S', genericName: 'Aluminum Hydroxide + Magnesium Hydroxide + Simethicone', dosage: '', form: 'Tablet', price: 6.00, category: 'Pain Relief', rxRequired: false },
  { id: '10', brandName: 'Enervon-C', genericName: 'Multivitamins + Iron', dosage: '', form: 'Tablet', price: 8.75, category: 'Vitamins', rxRequired: false },
  { id: '11', brandName: 'Centrum Advance', genericName: 'Multivitamins + Minerals', dosage: '', form: 'Tablet', price: 18.00, category: 'Vitamins', rxRequired: false },
  { id: '12', brandName: 'Bioflora', genericName: 'Saccharomyces boulardii', dosage: '', form: 'Capsule', price: 22.00, category: 'Pain Relief', rxRequired: false },
  { id: '13', brandName: 'Robitussin DM', genericName: 'Dextromethorphan + Guaifenesin', dosage: '', form: 'Syrup', price: 120.00, category: 'Respiratory', rxRequired: false },
  { id: '14', brandName: 'Diatabs', genericName: 'Loperamide', dosage: '2mg', form: 'Tablet', price: 5.00, category: 'Pain Relief', rxRequired: false },
  { id: '15', brandName: 'Flanax', genericName: 'Naproxen Sodium', dosage: '550mg', form: 'Tablet', price: 12.50, category: 'Pain Relief', rxRequired: false },
];

const categories = ['All', 'Pain Relief', 'Antibiotics', 'Vitamins', 'Cardiovascular', 'Diabetes', 'Respiratory'];

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredMedicines = useMemo(() => {
    return medicines.filter((med) => {
      const matchesSearch =
        searchQuery === '' ||
        med.brandName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        med.genericName.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === 'All' || med.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const handleAddToCart = (medicine: Medicine) => {
    if (medicine.rxRequired) {
      Alert.alert(
        'Prescription Required',
        `${medicine.brandName} requires a valid prescription. Would you like to upload one?`,
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Upload Rx', onPress: () => router.push('/prescription' as any) },
        ]
      );
    } else {
      Alert.alert('Added to Cart', `${medicine.brandName} has been added to your cart.`);
    }
  };

  const handleMedicinePress = (medicine: Medicine) => {
    console.log('Medicine selected:', medicine.brandName);
    Alert.alert(
      medicine.brandName,
      `${medicine.genericName}\n${medicine.dosage ? medicine.dosage + ' ' : ''}${medicine.form}\nPrice: \u20B1${medicine.price.toFixed(2)}${medicine.genericPrice ? '\nGeneric: \u20B1' + medicine.genericPrice.toFixed(2) : ''}${medicine.rxRequired ? '\n\nPrescription required' : ''}`,
    );
  };

  const renderMedicineCard = ({ item }: { item: Medicine }) => (
    <Pressable style={styles.medicineCard} onPress={() => handleMedicinePress(item)}>
      <View style={styles.medicineInfo}>
        <View style={styles.medicineHeader}>
          <Text style={styles.brandName}>{item.brandName}</Text>
          {item.rxRequired && (
            <View style={styles.rxBadge}>
              <Text style={styles.rxBadgeText}>Rx</Text>
            </View>
          )}
        </View>
        <Text style={styles.genericName}>{item.genericName}</Text>
        <Text style={styles.dosageForm}>
          {item.dosage ? `${item.dosage} ` : ''}{item.form}
        </Text>
        <View style={styles.priceRow}>
          <Text style={styles.price}>{'\u20B1'}{item.price.toFixed(2)}</Text>
          {item.genericPrice && (
            <Text style={styles.genericPrice}>
              Generic: {'\u20B1'}{item.genericPrice.toFixed(2)}
            </Text>
          )}
        </View>
      </View>
      <Pressable
        style={styles.addToCartButton}
        onPress={() => handleAddToCart(item)}
      >
        <Ionicons name="cart-outline" size={16} color="#FFFFFF" />
        <Text style={styles.addToCartText}>Add</Text>
      </Pressable>
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Find Medicine</Text>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Ionicons name="search" size={20} color={Colors.light.textSecondary} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search by brand or generic name..."
              placeholderTextColor={Colors.light.textSecondary}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery.length > 0 && (
              <Pressable onPress={() => setSearchQuery('')}>
                <Ionicons name="close-circle" size={20} color={Colors.light.textSecondary} />
              </Pressable>
            )}
          </View>
        </View>

        {/* Category Chips */}
        <View style={styles.categoryContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryScroll}
          >
            {categories.map((category) => (
              <Pressable
                key={category}
                style={[
                  styles.categoryChip,
                  selectedCategory === category && styles.categoryChipActive,
                ]}
                onPress={() => setSelectedCategory(category)}
              >
                <Text
                  style={[
                    styles.categoryChipText,
                    selectedCategory === category && styles.categoryChipTextActive,
                  ]}
                >
                  {category}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        {/* Results Count */}
        <View style={styles.resultsHeader}>
          <Text style={styles.resultsCount}>
            {filteredMedicines.length} medicine{filteredMedicines.length !== 1 ? 's' : ''} found
          </Text>
        </View>

        {/* Results List */}
        {filteredMedicines.length > 0 ? (
          <FlatList
            data={filteredMedicines}
            keyExtractor={(item) => item.id}
            renderItem={renderMedicineCard}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <View style={styles.emptyState}>
            <Ionicons name="search-outline" size={64} color={Colors.light.border} />
            <Text style={styles.emptyTitle}>No medicines found</Text>
            <Text style={styles.emptySubtitle}>
              Try adjusting your search or browse a different category
            </Text>
          </View>
        )}

        {/* Floating Scan Button */}
        <Pressable
          style={styles.fab}
          onPress={() => router.push('/scanner' as any)}
        >
          <Ionicons name="barcode-outline" size={24} color="#FFFFFF" />
        </Pressable>
      </View>
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
  header: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 8,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.light.text,
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingBottom: 12,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.light.card,
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 48,
    borderWidth: 1,
    borderColor: Colors.light.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 15,
    color: Colors.light.text,
  },
  categoryContainer: {
    marginBottom: 4,
  },
  categoryScroll: {
    paddingHorizontal: 20,
    gap: 8,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Colors.light.card,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  categoryChipActive: {
    backgroundColor: Colors.light.tint,
    borderColor: Colors.light.tint,
  },
  categoryChipText: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.light.textSecondary,
  },
  categoryChipTextActive: {
    color: '#FFFFFF',
  },
  resultsHeader: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  resultsCount: {
    fontSize: 13,
    color: Colors.light.textSecondary,
    fontWeight: '500',
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  medicineCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.light.card,
    borderRadius: 14,
    padding: 16,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 3,
  },
  medicineInfo: {
    flex: 1,
  },
  medicineHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  brandName: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.light.text,
  },
  rxBadge: {
    backgroundColor: '#FEE2E2',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  rxBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#DC2626',
  },
  genericName: {
    fontSize: 13,
    color: Colors.light.textSecondary,
    marginTop: 2,
  },
  dosageForm: {
    fontSize: 12,
    color: Colors.light.textSecondary,
    marginTop: 2,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 6,
  },
  price: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.light.tint,
  },
  genericPrice: {
    fontSize: 12,
    color: Colors.light.textSecondary,
    fontStyle: 'italic',
  },
  addToCartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: Colors.light.tint,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 10,
  },
  addToCartText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingBottom: 100,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.light.text,
    marginTop: 16,
  },
  emptySubtitle: {
    fontSize: 14,
    color: Colors.light.textSecondary,
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 20,
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.light.tint,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
});
