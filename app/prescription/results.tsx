import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/Colors';

const { width } = Dimensions.get('window');

interface Medicine {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  pricePerUnit: number;
  genericName: string;
  genericPrice: number;
  savingsPercent: number;
  quantity: number;
}

const medicines: Medicine[] = [
  {
    id: '1',
    name: 'Losartan Potassium (Cozaar)',
    dosage: '50mg',
    frequency: '1 tablet, once daily',
    duration: '30 days',
    pricePerUnit: 8.0,
    genericName: 'Losartan Potassium (Generic)',
    genericPrice: 4.5,
    savingsPercent: 44,
    quantity: 30,
  },
  {
    id: '2',
    name: 'Metformin HCl (Glucophage)',
    dosage: '500mg',
    frequency: '1 tablet, twice daily',
    duration: '30 days',
    pricePerUnit: 5.0,
    genericName: 'Metformin HCl (Generic)',
    genericPrice: 3.0,
    savingsPercent: 40,
    quantity: 60,
  },
  {
    id: '3',
    name: 'Atorvastatin (Lipitor)',
    dosage: '20mg',
    frequency: '1 tablet, once daily',
    duration: '30 days',
    pricePerUnit: 15.0,
    genericName: 'Atorvastatin (Generic)',
    genericPrice: 7.5,
    savingsPercent: 50,
    quantity: 30,
  },
];

export default function PrescriptionResultsScreen() {
  const [useGeneric, setUseGeneric] = useState<{ [key: string]: boolean }>({
    '1': true,
    '2': true,
    '3': true,
  });
  const [addedToCart, setAddedToCart] = useState<{ [key: string]: boolean }>({});
  const [saved, setSaved] = useState(false);

  const toggleGeneric = (id: string) => {
    setUseGeneric((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleCartItem = (id: string) => {
    setAddedToCart((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const addAllToCart = () => {
    const allAdded: { [key: string]: boolean } = {};
    medicines.forEach((m) => {
      allAdded[m.id] = true;
    });
    setAddedToCart(allAdded);
  };

  const brandTotal = medicines.reduce((sum, m) => sum + m.pricePerUnit * m.quantity, 0);
  const genericTotal = medicines.reduce((sum, m) => sum + m.genericPrice * m.quantity, 0);
  const currentTotal = medicines.reduce((sum, m) => {
    const price = useGeneric[m.id] ? m.genericPrice : m.pricePerUnit;
    return sum + price * m.quantity;
  }, 0);
  const totalSavings = brandTotal - currentTotal;
  const allInCart = medicines.every((m) => addedToCart[m.id]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Pressable style={styles.backButton} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color={Colors.light.text} />
          </Pressable>
          <Text style={styles.headerTitle}>Prescription Results</Text>
          <Pressable style={styles.shareButton}>
            <Ionicons name="share-outline" size={22} color={Colors.light.textSecondary} />
          </Pressable>
        </View>

        {/* Success Banner */}
        <View style={styles.successBanner}>
          <View style={styles.successIconContainer}>
            <Ionicons name="checkmark-circle" size={24} color="#00A86B" />
          </View>
          <View style={styles.successTextContainer}>
            <Text style={styles.successTitle}>Prescription Analyzed Successfully</Text>
            <Text style={styles.successSubtext}>3 medicines identified with generic alternatives</Text>
          </View>
        </View>

        {/* Doctor Info Card */}
        <View style={styles.doctorCard}>
          <View style={styles.doctorHeader}>
            <View style={styles.doctorAvatar}>
              <Ionicons name="person" size={24} color="#00A86B" />
            </View>
            <View style={styles.doctorInfo}>
              <Text style={styles.doctorName}>Dr. Maria Santos</Text>
              <Text style={styles.doctorHospital}>Philippine General Hospital</Text>
            </View>
            <View style={styles.verifiedBadge}>
              <Ionicons name="shield-checkmark" size={16} color="#00A86B" />
              <Text style={styles.verifiedText}>Verified</Text>
            </View>
          </View>
          <View style={styles.doctorDetails}>
            <View style={styles.detailRow}>
              <Ionicons name="person-outline" size={16} color={Colors.light.textSecondary} />
              <Text style={styles.detailLabel}>Patient:</Text>
              <Text style={styles.detailValue}>Juan Dela Cruz</Text>
            </View>
            <View style={styles.detailRow}>
              <Ionicons name="calendar-outline" size={16} color={Colors.light.textSecondary} />
              <Text style={styles.detailLabel}>Date:</Text>
              <Text style={styles.detailValue}>February 15, 2026</Text>
            </View>
            <View style={styles.detailRow}>
              <Ionicons name="document-text-outline" size={16} color={Colors.light.textSecondary} />
              <Text style={styles.detailLabel}>Rx No:</Text>
              <Text style={styles.detailValue}>RX-2026-0215-0847</Text>
            </View>
          </View>
        </View>

        {/* Cost Summary Card */}
        <View style={styles.costSummaryCard}>
          <Text style={styles.costSummaryTitle}>Cost Comparison</Text>
          <View style={styles.costRow}>
            <Text style={styles.costLabel}>Brand Total</Text>
            <Text style={styles.costBrandValue}>
              {'\u20B1'}{brandTotal.toFixed(2)}
            </Text>
          </View>
          <View style={styles.costRow}>
            <Text style={styles.costLabel}>Your Selection</Text>
            <Text style={styles.costCurrentValue}>
              {'\u20B1'}{currentTotal.toFixed(2)}
            </Text>
          </View>
          <View style={styles.costDivider} />
          <View style={styles.savingsRow}>
            <View style={styles.savingsIconRow}>
              <Ionicons name="trending-down" size={20} color="#00A86B" />
              <Text style={styles.savingsLabel}>You Save</Text>
            </View>
            <Text style={styles.savingsValue}>
              {'\u20B1'}{totalSavings.toFixed(2)}
            </Text>
          </View>
          <View style={styles.savingsPercentBadge}>
            <Text style={styles.savingsPercentText}>
              {Math.round((totalSavings / brandTotal) * 100)}% savings with generics
            </Text>
          </View>
        </View>

        {/* Medicines List */}
        <View style={styles.medicinesSection}>
          <Text style={styles.medicinesTitle}>Prescribed Medicines</Text>

          {medicines.map((med) => {
            const isGeneric = useGeneric[med.id];
            const inCart = addedToCart[med.id];
            const currentPrice = isGeneric ? med.genericPrice : med.pricePerUnit;
            const lineTotal = currentPrice * med.quantity;

            return (
              <View key={med.id} style={styles.medicineCard}>
                {/* Medicine Header */}
                <View style={styles.medicineHeader}>
                  <View style={styles.medicineIconContainer}>
                    <Ionicons name="medical" size={20} color="#00A86B" />
                  </View>
                  <View style={styles.medicineNameContainer}>
                    <Text style={styles.medicineName}>
                      {isGeneric ? med.genericName : med.name}
                    </Text>
                    <Text style={styles.medicineDosage}>{med.dosage}</Text>
                  </View>
                </View>

                {/* Dosage Info */}
                <View style={styles.dosageInfo}>
                  <View style={styles.dosageItem}>
                    <Ionicons name="time-outline" size={14} color={Colors.light.textSecondary} />
                    <Text style={styles.dosageText}>{med.frequency}</Text>
                  </View>
                  <View style={styles.dosageItem}>
                    <Ionicons name="calendar-outline" size={14} color={Colors.light.textSecondary} />
                    <Text style={styles.dosageText}>{med.duration}</Text>
                  </View>
                  <View style={styles.dosageItem}>
                    <Ionicons name="layers-outline" size={14} color={Colors.light.textSecondary} />
                    <Text style={styles.dosageText}>{med.quantity} tablets</Text>
                  </View>
                </View>

                {/* Price Section */}
                <View style={styles.priceSection}>
                  <View style={styles.priceRow}>
                    <Text style={styles.priceLabel}>Price per tablet</Text>
                    <Text style={styles.priceValue}>
                      {'\u20B1'}{currentPrice.toFixed(2)}
                    </Text>
                  </View>
                  <View style={styles.priceRow}>
                    <Text style={styles.priceTotalLabel}>Total ({med.quantity} tablets)</Text>
                    <Text style={styles.priceTotalValue}>
                      {'\u20B1'}{lineTotal.toFixed(2)}
                    </Text>
                  </View>
                </View>

                {/* Generic Toggle */}
                <View style={styles.genericSection}>
                  <View style={styles.genericHeader}>
                    <Ionicons name="leaf" size={16} color="#00A86B" />
                    <Text style={styles.genericTitle}>Generic Alternative</Text>
                    {isGeneric && (
                      <View style={styles.savingsBadge}>
                        <Text style={styles.savingsBadgeText}>
                          SAVE {med.savingsPercent}%
                        </Text>
                      </View>
                    )}
                  </View>

                  <Pressable
                    style={styles.genericToggle}
                    onPress={() => toggleGeneric(med.id)}
                  >
                    <Pressable
                      style={[
                        styles.toggleOption,
                        !isGeneric && styles.toggleOptionActive,
                      ]}
                      onPress={() => setUseGeneric((prev) => ({ ...prev, [med.id]: false }))}
                    >
                      <Text
                        style={[
                          styles.toggleOptionText,
                          !isGeneric && styles.toggleOptionTextActive,
                        ]}
                      >
                        Brand {'\u20B1'}{med.pricePerUnit.toFixed(2)}
                      </Text>
                    </Pressable>
                    <Pressable
                      style={[
                        styles.toggleOption,
                        isGeneric && styles.toggleOptionActiveGreen,
                      ]}
                      onPress={() => setUseGeneric((prev) => ({ ...prev, [med.id]: true }))}
                    >
                      <Text
                        style={[
                          styles.toggleOptionText,
                          isGeneric && styles.toggleOptionTextActive,
                        ]}
                      >
                        Generic {'\u20B1'}{med.genericPrice.toFixed(2)}
                      </Text>
                    </Pressable>
                  </Pressable>
                </View>

                {/* Add to Cart */}
                <Pressable
                  style={[styles.addToCartButton, inCart && styles.addedToCartButton]}
                  onPress={() => toggleCartItem(med.id)}
                >
                  <Ionicons
                    name={inCart ? 'checkmark-circle' : 'cart-outline'}
                    size={18}
                    color={inCart ? '#FFF' : '#00A86B'}
                  />
                  <Text style={[styles.addToCartText, inCart && styles.addedToCartText]}>
                    {inCart ? 'Added to Cart' : 'Add to Cart'}
                  </Text>
                </Pressable>
              </View>
            );
          })}
        </View>

        {/* Bottom Actions */}
        <View style={styles.bottomActions}>
          <Pressable
            style={[styles.addAllButton, allInCart && styles.addAllButtonDisabled]}
            onPress={addAllToCart}
          >
            <Ionicons name="cart" size={20} color="#FFF" />
            <Text style={styles.addAllButtonText}>
              {allInCart ? 'All Items in Cart' : `Add All to Cart \u2022 \u20B1${currentTotal.toFixed(2)}`}
            </Text>
          </Pressable>

          <View style={styles.secondaryActions}>
            <Pressable
              style={styles.outlineButton}
              onPress={() => router.push('/store' as any)}
            >
              <Ionicons name="location-outline" size={18} color="#00A86B" />
              <Text style={styles.outlineButtonText}>Find Nearest Stock</Text>
            </Pressable>

            <Pressable
              style={styles.outlineButton}
              onPress={() => router.push('/reminders' as any)}
            >
              <Ionicons name="alarm-outline" size={18} color="#00A86B" />
              <Text style={styles.outlineButtonText}>Set Reminders</Text>
            </Pressable>
          </View>

          <Pressable
            style={[styles.saveButton, saved && styles.saveButtonSaved]}
            onPress={() => setSaved(true)}
          >
            <Ionicons
              name={saved ? 'bookmark' : 'bookmark-outline'}
              size={18}
              color={saved ? '#FFF' : '#6B7280'}
            />
            <Text style={[styles.saveButtonText, saved && styles.saveButtonTextSaved]}>
              {saved ? 'Prescription Saved' : 'Save Prescription'}
            </Text>
          </Pressable>
        </View>

        {/* Disclaimer */}
        <View style={styles.disclaimerSection}>
          <Ionicons name="information-circle-outline" size={16} color={Colors.light.textSecondary} />
          <Text style={styles.disclaimerText}>
            Generic alternatives contain the same active ingredients and are FDA-approved.
            Always consult your doctor before switching medicines.
          </Text>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
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
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 12,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  headerTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: '700',
    color: Colors.light.text,
    textAlign: 'center',
  },
  shareButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  successBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 16,
    backgroundColor: '#E6F7EF',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  successIconContainer: {
    marginRight: 12,
  },
  successTextContainer: {
    flex: 1,
  },
  successTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#065F46',
  },
  successSubtext: {
    fontSize: 13,
    color: '#047857',
    marginTop: 2,
  },
  doctorCard: {
    marginHorizontal: 20,
    marginBottom: 16,
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  doctorHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  doctorAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#E6F7EF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  doctorInfo: {
    flex: 1,
    marginLeft: 12,
  },
  doctorName: {
    fontSize: 17,
    fontWeight: '700',
    color: Colors.light.text,
  },
  doctorHospital: {
    fontSize: 13,
    color: Colors.light.textSecondary,
    marginTop: 2,
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#E6F7EF',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  verifiedText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#00A86B',
  },
  doctorDetails: {
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    paddingTop: 14,
    gap: 10,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailLabel: {
    fontSize: 13,
    color: Colors.light.textSecondary,
  },
  detailValue: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.light.text,
  },
  costSummaryCard: {
    marginHorizontal: 20,
    marginBottom: 20,
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  costSummaryTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.light.text,
    marginBottom: 14,
  },
  costRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  costLabel: {
    fontSize: 14,
    color: Colors.light.textSecondary,
  },
  costBrandValue: {
    fontSize: 14,
    color: Colors.light.textSecondary,
    textDecorationLine: 'line-through',
  },
  costCurrentValue: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.light.text,
  },
  costDivider: {
    height: 1,
    backgroundColor: '#F3F4F6',
    marginVertical: 12,
  },
  savingsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  savingsIconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  savingsLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#00A86B',
  },
  savingsValue: {
    fontSize: 22,
    fontWeight: '800',
    color: '#00A86B',
  },
  savingsPercentBadge: {
    marginTop: 12,
    backgroundColor: '#E6F7EF',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
    alignItems: 'center',
  },
  savingsPercentText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#00A86B',
  },
  medicinesSection: {
    paddingHorizontal: 20,
  },
  medicinesTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.light.text,
    marginBottom: 14,
  },
  medicineCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 18,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  medicineHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  medicineIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#E6F7EF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  medicineNameContainer: {
    flex: 1,
    marginLeft: 12,
  },
  medicineName: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.light.text,
  },
  medicineDosage: {
    fontSize: 14,
    fontWeight: '600',
    color: '#00A86B',
    marginTop: 2,
  },
  dosageInfo: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 14,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  dosageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  dosageText: {
    fontSize: 13,
    color: Colors.light.textSecondary,
  },
  priceSection: {
    marginBottom: 14,
    gap: 6,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceLabel: {
    fontSize: 13,
    color: Colors.light.textSecondary,
  },
  priceValue: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.light.text,
  },
  priceTotalLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.light.text,
  },
  priceTotalValue: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.light.text,
  },
  genericSection: {
    backgroundColor: '#F0FDF4',
    borderRadius: 12,
    padding: 14,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#BBF7D0',
  },
  genericHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 10,
  },
  genericTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#065F46',
    flex: 1,
  },
  savingsBadge: {
    backgroundColor: '#00A86B',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 8,
  },
  savingsBadgeText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#FFF',
    letterSpacing: 0.5,
  },
  genericToggle: {
    flexDirection: 'row',
    backgroundColor: '#E5E7EB',
    borderRadius: 10,
    padding: 3,
  },
  toggleOption: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  toggleOptionActive: {
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  toggleOptionActiveGreen: {
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  toggleOptionText: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.light.textSecondary,
  },
  toggleOptionTextActive: {
    color: Colors.light.text,
  },
  addToCartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#00A86B',
    backgroundColor: '#FFF',
  },
  addedToCartButton: {
    backgroundColor: '#00A86B',
    borderColor: '#00A86B',
  },
  addToCartText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#00A86B',
  },
  addedToCartText: {
    color: '#FFF',
  },
  bottomActions: {
    paddingHorizontal: 20,
    marginTop: 8,
    gap: 12,
  },
  addAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: '#00A86B',
    paddingVertical: 16,
    borderRadius: 14,
    shadowColor: '#00A86B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  addAllButtonDisabled: {
    backgroundColor: '#059669',
    shadowOpacity: 0.15,
  },
  addAllButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFF',
  },
  secondaryActions: {
    flexDirection: 'row',
    gap: 12,
  },
  outlineButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#00A86B',
    backgroundColor: '#FFF',
  },
  outlineButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#00A86B',
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    backgroundColor: '#FFF',
  },
  saveButtonSaved: {
    backgroundColor: '#6B7280',
    borderColor: '#6B7280',
  },
  saveButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  saveButtonTextSaved: {
    color: '#FFF',
  },
  disclaimerSection: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginTop: 20,
    padding: 14,
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    gap: 8,
    alignItems: 'flex-start',
  },
  disclaimerText: {
    flex: 1,
    fontSize: 12,
    color: Colors.light.textSecondary,
    lineHeight: 18,
  },
});
