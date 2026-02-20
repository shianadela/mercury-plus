import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

const ORDER_ITEMS = [
  { name: 'Losartan 50mg (Generic)', qty: 30, price: 135.0 },
  { name: 'Metformin 500mg (Generic)', qty: 60, price: 180.0 },
  { name: 'Atorvastatin 20mg (Generic)', qty: 30, price: 225.0 },
];

export default function CheckoutSuccessScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Green Check Icon */}
        <View style={styles.checkCircle}>
          <Ionicons name="checkmark" size={56} color="#FFF" />
        </View>

        <Text style={styles.title}>Order Confirmed!</Text>
        <Text style={styles.orderId}>Order #MP-2026-003</Text>

        {/* Details Card */}
        <View style={styles.detailsCard}>
          <View style={styles.detailRow}>
            <Ionicons name="location-outline" size={20} color="#00A86B" />
            <View style={styles.detailTextGroup}>
              <Text style={styles.detailLabel}>Branch</Text>
              <Text style={styles.detailValue}>Mercury Drug - Makati Ave</Text>
            </View>
          </View>
          <View style={styles.detailDivider} />
          <View style={styles.detailRow}>
            <Ionicons name="time-outline" size={20} color="#00A86B" />
            <View style={styles.detailTextGroup}>
              <Text style={styles.detailLabel}>Pickup Time</Text>
              <Text style={styles.detailValue}>ASAP (15-20 min)</Text>
            </View>
          </View>
          <View style={styles.detailDivider} />
          <View style={styles.detailRow}>
            <Ionicons name="card-outline" size={20} color="#00A86B" />
            <View style={styles.detailTextGroup}>
              <Text style={styles.detailLabel}>Payment</Text>
              <Text style={styles.detailValue}>GCash</Text>
            </View>
          </View>
        </View>

        {/* Items Summary */}
        <Text style={styles.sectionTitle}>Items Ordered</Text>
        <View style={styles.itemsCard}>
          {ORDER_ITEMS.map((item, index) => (
            <View key={index}>
              <View style={styles.itemRow}>
                <View style={styles.itemInfo}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemQty}>x{item.qty}</Text>
                </View>
                <Text style={styles.itemPrice}>
                  {'\u20B1'}
                  {item.price.toFixed(2)}
                </Text>
              </View>
              {index < ORDER_ITEMS.length - 1 && <View style={styles.itemDivider} />}
            </View>
          ))}
          <View style={styles.itemDivider} />
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total Paid</Text>
            <Text style={styles.totalValue}>{'\u20B1'}528.00</Text>
          </View>
        </View>

        {/* QR Code Area */}
        <Text style={styles.sectionTitle}>Pickup QR Code</Text>
        <View style={styles.qrCard}>
          <View style={styles.qrArea}>
            <View style={styles.qrGrid}>
              {[...Array(16)].map((_, i) => (
                <View
                  key={i}
                  style={[
                    styles.qrBlock,
                    { opacity: [0, 3, 5, 6, 9, 10, 12, 15].includes(i) ? 0.8 : 0.2 },
                  ]}
                />
              ))}
            </View>
          </View>
          <Text style={styles.qrLabel}>SCAN AT COUNTER</Text>
          <Text style={styles.qrHint}>Show this code to the pharmacist for pickup</Text>
        </View>

        {/* Action Buttons */}
        <TouchableOpacity style={styles.trackButton}>
          <Ionicons name="navigate-outline" size={20} color="#FFF" />
          <Text style={styles.trackButtonText}>Track Order</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.homeButton}
          onPress={() => router.replace('/(tabs)')}
        >
          <Ionicons name="home-outline" size={20} color="#6B7280" />
          <Text style={styles.homeButtonText}>Back to Home</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.remindersLink}
          onPress={() => router.push('/reminders')}
        >
          <Ionicons name="notifications-outline" size={18} color="#00A86B" />
          <Text style={styles.remindersLinkText}>Set Medication Reminders</Text>
          <Ionicons name="chevron-forward" size={16} color="#00A86B" />
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFB',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 32,
    alignItems: 'center',
  },
  checkCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#00A86B',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    shadowColor: '#00A86B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1A1A2E',
    marginBottom: 6,
  },
  orderId: {
    fontSize: 15,
    fontWeight: '600',
    color: '#6B7280',
    marginBottom: 24,
  },
  detailsCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 18,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 8,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
  },
  detailTextGroup: {
    marginLeft: 14,
  },
  detailLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
  detailValue: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1A1A2E',
    marginTop: 1,
  },
  detailDivider: {
    height: 1,
    backgroundColor: '#F3F4F6',
    marginVertical: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A2E',
    alignSelf: 'flex-start',
    marginTop: 20,
    marginBottom: 12,
  },
  itemsCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 16,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1A1A2E',
  },
  itemQty: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 2,
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A2E',
    marginLeft: 12,
  },
  itemDivider: {
    height: 1,
    backgroundColor: '#F3F4F6',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A2E',
  },
  totalValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#00A86B',
  },
  qrCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 24,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  qrArea: {
    width: 140,
    height: 140,
    borderRadius: 16,
    backgroundColor: '#F8FAFB',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#E5E7EB',
    marginBottom: 12,
  },
  qrGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 80,
    height: 80,
    gap: 4,
  },
  qrBlock: {
    width: 17,
    height: 17,
    borderRadius: 3,
    backgroundColor: '#1A1A2E',
  },
  qrLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1A1A2E',
    letterSpacing: 1.5,
    marginBottom: 4,
  },
  qrHint: {
    fontSize: 13,
    color: '#6B7280',
    textAlign: 'center',
  },
  trackButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00A86B',
    borderRadius: 14,
    paddingVertical: 16,
    width: '100%',
    marginTop: 24,
    gap: 8,
  },
  trackButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFF',
  },
  homeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
    borderRadius: 14,
    paddingVertical: 16,
    width: '100%',
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    gap: 8,
  },
  homeButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6B7280',
  },
  remindersLink: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    marginTop: 8,
    gap: 6,
  },
  remindersLinkText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#00A86B',
  },
});
