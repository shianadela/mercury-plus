import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

interface CartItem {
  id: string;
  name: string;
  dosage: string;
  type: string;
  quantity: number;
  unitPrice: number;
}

const INITIAL_CART: CartItem[] = [
  { id: '1', name: 'Losartan', dosage: '50mg', type: 'Generic', quantity: 30, unitPrice: 4.5 },
  { id: '2', name: 'Metformin', dosage: '500mg', type: 'Generic', quantity: 60, unitPrice: 3.0 },
  { id: '3', name: 'Atorvastatin', dosage: '20mg', type: 'Generic', quantity: 30, unitPrice: 7.5 },
];

const TIME_SLOTS = ['ASAP', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM'];

const PAYMENT_METHODS = [
  { id: 'gcash', label: 'GCash', icon: 'wallet-outline' as const, color: '#00B4D8' },
  { id: 'maya', label: 'Maya', icon: 'card-outline' as const, color: '#7B2D8E' },
  { id: 'card', label: 'Credit/Debit Card', icon: 'card-outline' as const, color: '#1A1A2E' },
  { id: 'suki', label: 'Suki Card Wallet', icon: 'star-outline' as const, color: '#00A86B' },
  { id: 'insurance', label: 'Insurance/HMO', icon: 'shield-checkmark-outline' as const, color: '#3B82F6' },
];

export default function CheckoutScreen() {
  const [cart, setCart] = useState<CartItem[]>(INITIAL_CART);
  const [selectedBranch] = useState('Mercury Drug - Makati Ave');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('ASAP');
  const [selectedPayment, setSelectedPayment] = useState('gcash');
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const updateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const subtotal = cart.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
  const serviceFee = 15.0;
  const discount = subtotal * 0.05;
  const total = subtotal + serviceFee - discount;
  const pointsToEarn = Math.floor(total / 10);

  const handlePlaceOrder = () => {
    setIsPlacingOrder(true);
    setTimeout(() => {
      setIsPlacingOrder(false);
      setShowSuccess(true);
    }, 2000);
  };

  const getItemTotal = (item: CartItem) => item.quantity * item.unitPrice;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#1A1A2E" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Checkout</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Cart Items */}
        <Text style={styles.sectionTitle}>Cart Items</Text>
        {cart.map((item) => (
          <View key={item.id} style={styles.cartCard}>
            <View style={styles.cartCardLeft}>
              <Text style={styles.cartItemName}>
                {item.name} {item.dosage}
              </Text>
              <Text style={styles.cartItemType}>({item.type})</Text>
              <Text style={styles.cartItemPrice}>
                {'\u20B1'}
                {getItemTotal(item).toFixed(2)}
              </Text>
            </View>
            <View style={styles.cartCardRight}>
              <TouchableOpacity onPress={() => removeItem(item.id)} style={styles.removeButton}>
                <Ionicons name="close" size={18} color="#EF4444" />
              </TouchableOpacity>
              <View style={styles.quantityRow}>
                <TouchableOpacity
                  onPress={() => updateQuantity(item.id, -1)}
                  style={styles.qtyButton}
                >
                  <Ionicons name="remove" size={16} color="#1A1A2E" />
                </TouchableOpacity>
                <Text style={styles.qtyText}>x{item.quantity}</Text>
                <TouchableOpacity
                  onPress={() => updateQuantity(item.id, 1)}
                  style={styles.qtyButton}
                >
                  <Ionicons name="add" size={16} color="#1A1A2E" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}

        {/* Branch Selection */}
        <Text style={styles.sectionTitle}>Pickup Branch</Text>
        <View style={styles.branchCard}>
          <View style={styles.branchInfo}>
            <Ionicons name="location-outline" size={22} color="#00A86B" />
            <View style={{ marginLeft: 12, flex: 1 }}>
              <Text style={styles.branchName}>{selectedBranch}</Text>
              <Text style={styles.branchAddress}>123 Makati Ave, Makati City</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.changeBranchButton}>
            <Text style={styles.changeBranchText}>Change</Text>
          </TouchableOpacity>
        </View>

        {/* Pickup Time Slot */}
        <Text style={styles.sectionTitle}>Select Pickup Time</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.timeSlotsScroll}
        >
          {TIME_SLOTS.map((slot) => (
            <TouchableOpacity
              key={slot}
              style={[styles.timeChip, selectedTimeSlot === slot && styles.timeChipSelected]}
              onPress={() => setSelectedTimeSlot(slot)}
            >
              <Text
                style={[
                  styles.timeChipText,
                  selectedTimeSlot === slot && styles.timeChipTextSelected,
                ]}
              >
                {slot}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <View style={styles.queueBadge}>
          <Ionicons name="flash-outline" size={16} color="#00A86B" />
          <Text style={styles.queueBadgeText}>Skip-the-line Queue</Text>
          <View style={styles.waitTimeBadge}>
            <Text style={styles.waitTimeText}>~5 min wait</Text>
          </View>
        </View>

        {/* Order Summary */}
        <Text style={styles.sectionTitle}>Order Summary</Text>
        <View style={styles.summaryCard}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal</Text>
            <Text style={styles.summaryValue}>
              {'\u20B1'}
              {subtotal.toFixed(2)}
            </Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Service Fee</Text>
            <Text style={styles.summaryValue}>
              {'\u20B1'}
              {serviceFee.toFixed(2)}
            </Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={[styles.summaryLabel, { color: '#00A86B' }]}>
              Suki Card Discount (5%)
            </Text>
            <Text style={[styles.summaryValue, { color: '#00A86B' }]}>
              -{'\u20B1'}
              {discount.toFixed(2)}
            </Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.summaryRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>
              {'\u20B1'}
              {total.toFixed(2)}
            </Text>
          </View>
          <View style={styles.pointsRow}>
            <Ionicons name="star" size={14} color="#F59E0B" />
            <Text style={styles.pointsText}>+{pointsToEarn} Suki Points</Text>
          </View>
        </View>

        {/* Payment Method */}
        <Text style={styles.sectionTitle}>Payment Method</Text>
        <View style={styles.paymentGrid}>
          {PAYMENT_METHODS.map((method) => (
            <TouchableOpacity
              key={method.id}
              style={[
                styles.paymentCard,
                selectedPayment === method.id && styles.paymentCardSelected,
              ]}
              onPress={() => setSelectedPayment(method.id)}
            >
              <View style={styles.paymentCardInner}>
                <View
                  style={[styles.paymentIconCircle, { backgroundColor: method.color + '15' }]}
                >
                  <Ionicons name={method.icon} size={20} color={method.color} />
                </View>
                <Text
                  style={[
                    styles.paymentLabel,
                    selectedPayment === method.id && styles.paymentLabelSelected,
                  ]}
                  numberOfLines={1}
                >
                  {method.label}
                </Text>
              </View>
              {selectedPayment === method.id && (
                <View style={styles.paymentCheck}>
                  <Ionicons name="checkmark-circle" size={20} color="#00A86B" />
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>

        <View style={{ height: 120 }} />
      </ScrollView>

      {/* Bottom Place Order Button */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.placeOrderButton}
          onPress={handlePlaceOrder}
          disabled={isPlacingOrder || cart.length === 0}
        >
          {isPlacingOrder ? (
            <ActivityIndicator color="#FFF" size="small" />
          ) : (
            <>
              <Ionicons name="cart-outline" size={22} color="#FFF" />
              <Text style={styles.placeOrderText}>Place Order</Text>
              <Text style={styles.placeOrderTotal}>
                {'\u20B1'}
                {total.toFixed(2)}
              </Text>
            </>
          )}
        </TouchableOpacity>
      </View>

      {/* Success Modal */}
      <Modal visible={showSuccess} animationType="fade" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.successModal}>
            <View style={styles.successCheckCircle}>
              <Ionicons name="checkmark" size={48} color="#FFF" />
            </View>
            <Text style={styles.successTitle}>Order Placed Successfully!</Text>
            <Text style={styles.successOrderId}>Order #MP-2026-003</Text>
            <Text style={styles.successBranch}>
              Ready for pickup at{'\n'}Mercury Drug Makati Ave
            </Text>
            <Text style={styles.successEstimate}>Estimated: 15-20 minutes</Text>

            {/* QR Placeholder */}
            <View style={styles.qrPlaceholder}>
              <View style={styles.qrInner}>
                <Ionicons name="qr-code-outline" size={48} color="#6B7280" />
                <Text style={styles.qrText}>QR</Text>
              </View>
            </View>
            <Text style={styles.qrHint}>Show this QR at the counter</Text>

            <TouchableOpacity
              style={styles.viewOrderButton}
              onPress={() => {
                setShowSuccess(false);
                router.push('/checkout/success');
              }}
            >
              <Text style={styles.viewOrderButtonText}>View Order</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.backHomeButton}
              onPress={() => {
                setShowSuccess(false);
                router.replace('/(tabs)');
              }}
            >
              <Text style={styles.backHomeButtonText}>Back to Home</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    paddingVertical: 14,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
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
  scrollContent: {
    flex: 1,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A2E',
    marginTop: 20,
    marginBottom: 12,
  },
  cartCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  cartCardLeft: {
    flex: 1,
  },
  cartItemName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1A1A2E',
  },
  cartItemType: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 2,
  },
  cartItemPrice: {
    fontSize: 15,
    fontWeight: '700',
    color: '#00A86B',
    marginTop: 6,
  },
  cartCardRight: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  removeButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#FEE2E2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  qtyButton: {
    width: 30,
    height: 30,
    borderRadius: 8,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A2E',
    marginHorizontal: 10,
  },
  branchCard: {
    backgroundColor: '#FFF',
    borderRadius: 14,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  branchInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  branchName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1A1A2E',
  },
  branchAddress: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 2,
  },
  changeBranchButton: {
    marginTop: 10,
    alignSelf: 'flex-end',
  },
  changeBranchText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#00A86B',
  },
  timeSlotsScroll: {
    marginBottom: 12,
  },
  timeChip: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#FFF',
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  timeChipSelected: {
    backgroundColor: '#00A86B',
    borderColor: '#00A86B',
  },
  timeChipText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1A1A2E',
  },
  timeChipTextSelected: {
    color: '#FFF',
  },
  queueBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    borderRadius: 12,
    padding: 12,
    marginBottom: 4,
  },
  queueBadgeText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#00A86B',
    marginLeft: 8,
    flex: 1,
  },
  waitTimeBadge: {
    backgroundColor: '#00A86B',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  waitTimeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFF',
  },
  summaryCard: {
    backgroundColor: '#FFF',
    borderRadius: 14,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1A1A2E',
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 8,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A2E',
  },
  totalValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A2E',
  },
  pointsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  pointsText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#F59E0B',
    marginLeft: 6,
  },
  paymentGrid: {
    gap: 10,
    marginBottom: 8,
  },
  paymentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
  },
  paymentCardSelected: {
    borderColor: '#00A86B',
    backgroundColor: '#F0FDF9',
  },
  paymentCardInner: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  paymentIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  paymentLabel: {
    fontSize: 15,
    fontWeight: '500',
    color: '#1A1A2E',
  },
  paymentLabelSelected: {
    fontWeight: '600',
    color: '#00A86B',
  },
  paymentCheck: {
    marginLeft: 8,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFF',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 32,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  placeOrderButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00A86B',
    borderRadius: 14,
    paddingVertical: 16,
    gap: 10,
  },
  placeOrderText: {
    fontSize: 17,
    fontWeight: '700',
    color: '#FFF',
  },
  placeOrderTotal: {
    fontSize: 17,
    fontWeight: '700',
    color: '#FFF',
    opacity: 0.85,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.55)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  successModal: {
    backgroundColor: '#FFF',
    borderRadius: 24,
    padding: 28,
    width: '100%',
    alignItems: 'center',
  },
  successCheckCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#00A86B',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  successTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A2E',
    marginBottom: 6,
  },
  successOrderId: {
    fontSize: 15,
    fontWeight: '600',
    color: '#6B7280',
    marginBottom: 8,
  },
  successBranch: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
  },
  successEstimate: {
    fontSize: 14,
    fontWeight: '600',
    color: '#00A86B',
    marginTop: 6,
    marginBottom: 16,
  },
  qrPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  qrInner: {
    alignItems: 'center',
  },
  qrText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#6B7280',
    marginTop: 4,
  },
  qrHint: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 20,
  },
  viewOrderButton: {
    backgroundColor: '#00A86B',
    borderRadius: 12,
    paddingVertical: 14,
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  viewOrderButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFF',
  },
  backHomeButton: {
    borderRadius: 12,
    paddingVertical: 14,
    width: '100%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  backHomeButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6B7280',
  },
});
