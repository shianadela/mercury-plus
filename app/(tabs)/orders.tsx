import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/Colors';

type OrderStatus = 'Preparing' | 'Ready for Pickup' | 'Completed' | 'Cancelled';

interface Order {
  id: string;
  orderNumber: string;
  branch: string;
  status: OrderStatus;
  itemCount: number;
  total: number;
  date: string;
  items: string[];
}

const activeOrders: Order[] = [
  {
    id: '1',
    orderNumber: 'MP-2026-001',
    branch: 'Mercury Drug Makati Ave',
    status: 'Ready for Pickup',
    itemCount: 3,
    total: 245.50,
    date: 'Feb 20, 2026',
    items: ['Biogesic 500mg x5', 'Solmux 500mg x3', 'Cetirizine 10mg x10'],
  },
  {
    id: '2',
    orderNumber: 'MP-2026-002',
    branch: 'Mercury Drug BGC',
    status: 'Preparing',
    itemCount: 1,
    total: 120.00,
    date: 'Feb 20, 2026',
    items: ['Robitussin DM Syrup 120ml x1'],
  },
];

const completedOrders: Order[] = [
  {
    id: '3',
    orderNumber: 'MP-2026-098',
    branch: 'Mercury Drug Glorietta',
    status: 'Completed',
    itemCount: 5,
    total: 487.25,
    date: 'Feb 18, 2026',
    items: ['Losartan 50mg x30', 'Metformin 500mg x30', 'Enervon-C x30', 'Kremil-S x10', 'Biogesic x10'],
  },
  {
    id: '4',
    orderNumber: 'MP-2026-085',
    branch: 'Mercury Drug Makati Ave',
    status: 'Completed',
    itemCount: 2,
    total: 156.00,
    date: 'Feb 15, 2026',
    items: ['Centrum Advance x5', 'Bioflora x3'],
  },
  {
    id: '5',
    orderNumber: 'MP-2026-072',
    branch: 'Mercury Drug BGC',
    status: 'Completed',
    itemCount: 1,
    total: 62.50,
    date: 'Feb 10, 2026',
    items: ['Flanax 550mg x5'],
  },
];

const cancelledOrders: Order[] = [
  {
    id: '6',
    orderNumber: 'MP-2026-091',
    branch: 'Mercury Drug Ayala',
    status: 'Cancelled',
    itemCount: 4,
    total: 320.00,
    date: 'Feb 17, 2026',
    items: ['Amoxicillin 500mg x14', 'Dolfenal 500mg x10', 'Neozep Forte x5', 'Diatabs x5'],
  },
];

const tabs = ['Active', 'Completed', 'Cancelled'] as const;

const statusColors: Record<OrderStatus, { bg: string; text: string }> = {
  'Preparing': { bg: '#DBEAFE', text: '#2563EB' },
  'Ready for Pickup': { bg: '#D1FAE5', text: '#059669' },
  'Completed': { bg: '#F3F4F6', text: '#6B7280' },
  'Cancelled': { bg: '#FEE2E2', text: '#DC2626' },
};

export default function OrdersScreen() {
  const [activeTab, setActiveTab] = useState<typeof tabs[number]>('Active');
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  const getOrders = () => {
    switch (activeTab) {
      case 'Active': return activeOrders;
      case 'Completed': return completedOrders;
      case 'Cancelled': return cancelledOrders;
    }
  };

  const orders = getOrders();

  const handleOrderPress = (order: Order) => {
    setExpandedOrder(expandedOrder === order.id ? null : order.id);
  };

  const renderStatusIcon = (status: OrderStatus) => {
    switch (status) {
      case 'Preparing': return 'timer-outline' as const;
      case 'Ready for Pickup': return 'checkmark-circle-outline' as const;
      case 'Completed': return 'checkmark-done-circle-outline' as const;
      case 'Cancelled': return 'close-circle-outline' as const;
    }
  };

  const renderOrderCard = (order: Order) => {
    const isExpanded = expandedOrder === order.id;
    const colors = statusColors[order.status];

    return (
      <Pressable
        key={order.id}
        style={styles.orderCard}
        onPress={() => handleOrderPress(order)}
      >
        <View style={styles.orderTop}>
          <View style={styles.orderLeft}>
            <View style={[styles.statusIconContainer, { backgroundColor: colors.bg }]}>
              <Ionicons name={renderStatusIcon(order.status)} size={22} color={colors.text} />
            </View>
            <View style={styles.orderInfo}>
              <Text style={styles.orderNumber}>#{order.orderNumber}</Text>
              <Text style={styles.orderBranch}>{order.branch}</Text>
              <Text style={styles.orderDate}>{order.date}</Text>
            </View>
          </View>
          <View style={styles.orderRight}>
            <View style={[styles.statusBadge, { backgroundColor: colors.bg }]}>
              <Text style={[styles.statusText, { color: colors.text }]}>{order.status}</Text>
            </View>
          </View>
        </View>

        <View style={styles.orderBottom}>
          <Text style={styles.orderItems}>
            {order.itemCount} item{order.itemCount !== 1 ? 's' : ''}
          </Text>
          <Text style={styles.orderTotal}>{'\u20B1'}{order.total.toFixed(2)}</Text>
        </View>

        {isExpanded && (
          <View style={styles.orderDetails}>
            <View style={styles.detailsDivider} />
            <Text style={styles.detailsTitle}>Order Items</Text>
            {order.items.map((item, index) => (
              <View key={index} style={styles.detailItem}>
                <Ionicons name="medical-outline" size={14} color={Colors.light.textSecondary} />
                <Text style={styles.detailItemText}>{item}</Text>
              </View>
            ))}
            {order.status === 'Ready for Pickup' && (
              <Pressable
                style={styles.pickupButton}
                onPress={() => Alert.alert('Pickup Directions', `Navigate to ${order.branch} to collect your order.`)}
              >
                <Ionicons name="navigate-outline" size={16} color="#FFFFFF" />
                <Text style={styles.pickupButtonText}>Get Directions</Text>
              </Pressable>
            )}
            {order.status === 'Preparing' && (
              <View style={styles.preparingNote}>
                <Ionicons name="information-circle-outline" size={16} color="#2563EB" />
                <Text style={styles.preparingNoteText}>
                  We'll notify you when your order is ready for pickup.
                </Text>
              </View>
            )}
            {order.status === 'Completed' && (
              <Pressable
                style={styles.reorderButton}
                onPress={() => Alert.alert('Reorder', 'Items added to cart for reorder.')}
              >
                <Ionicons name="refresh-outline" size={16} color={Colors.light.tint} />
                <Text style={styles.reorderButtonText}>Reorder</Text>
              </Pressable>
            )}
          </View>
        )}

        <View style={styles.expandHint}>
          <Ionicons
            name={isExpanded ? 'chevron-up' : 'chevron-down'}
            size={16}
            color={Colors.light.textSecondary}
          />
        </View>
      </Pressable>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>My Orders</Text>
        </View>

        {/* Tab Switcher */}
        <View style={styles.tabContainer}>
          {tabs.map((tab) => (
            <Pressable
              key={tab}
              style={[styles.tab, activeTab === tab && styles.tabActive]}
              onPress={() => {
                setActiveTab(tab);
                setExpandedOrder(null);
              }}
            >
              <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
                {tab}
              </Text>
              {tab === 'Active' && activeOrders.length > 0 && (
                <View style={[styles.tabBadge, activeTab === tab && styles.tabBadgeActive]}>
                  <Text style={[styles.tabBadgeText, activeTab === tab && styles.tabBadgeTextActive]}>
                    {activeOrders.length}
                  </Text>
                </View>
              )}
            </Pressable>
          ))}
        </View>

        {/* Orders List */}
        {orders.length > 0 ? (
          <ScrollView
            style={styles.ordersList}
            contentContainerStyle={styles.ordersContent}
            showsVerticalScrollIndicator={false}
          >
            {orders.map(renderOrderCard)}
          </ScrollView>
        ) : (
          <View style={styles.emptyState}>
            <View style={styles.emptyIcon}>
              <Ionicons name="receipt-outline" size={56} color={Colors.light.border} />
            </View>
            <Text style={styles.emptyTitle}>No {activeTab.toLowerCase()} orders</Text>
            <Text style={styles.emptySubtitle}>
              {activeTab === 'Active'
                ? 'Your active orders will appear here when you place one.'
                : activeTab === 'Completed'
                ? 'Your completed orders will show here.'
                : 'You have no cancelled orders.'}
            </Text>
          </View>
        )}
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
  tabContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginTop: 8,
    marginBottom: 16,
    backgroundColor: Colors.light.card,
    borderRadius: 12,
    padding: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 10,
    gap: 6,
  },
  tabActive: {
    backgroundColor: Colors.light.tint,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.light.textSecondary,
  },
  tabTextActive: {
    color: '#FFFFFF',
  },
  tabBadge: {
    backgroundColor: Colors.light.border,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  tabBadgeActive: {
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  tabBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.light.textSecondary,
  },
  tabBadgeTextActive: {
    color: '#FFFFFF',
  },
  ordersList: {
    flex: 1,
  },
  ordersContent: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  orderCard: {
    backgroundColor: Colors.light.card,
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 3,
  },
  orderTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  orderLeft: {
    flexDirection: 'row',
    flex: 1,
  },
  statusIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  orderInfo: {
    marginLeft: 12,
    flex: 1,
  },
  orderNumber: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.light.text,
  },
  orderBranch: {
    fontSize: 13,
    color: Colors.light.textSecondary,
    marginTop: 2,
  },
  orderDate: {
    fontSize: 12,
    color: Colors.light.textSecondary,
    marginTop: 2,
  },
  orderRight: {
    marginLeft: 8,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '700',
  },
  orderBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 14,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.light.border,
  },
  orderItems: {
    fontSize: 13,
    color: Colors.light.textSecondary,
  },
  orderTotal: {
    fontSize: 17,
    fontWeight: '700',
    color: Colors.light.text,
  },
  orderDetails: {
    marginTop: 4,
  },
  detailsDivider: {
    height: 1,
    backgroundColor: Colors.light.border,
    marginBottom: 12,
  },
  detailsTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.light.text,
    marginBottom: 8,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
  },
  detailItemText: {
    fontSize: 13,
    color: Colors.light.textSecondary,
  },
  pickupButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: Colors.light.tint,
    borderRadius: 10,
    paddingVertical: 10,
    marginTop: 12,
  },
  pickupButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  preparingNote: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#EFF6FF',
    borderRadius: 8,
    padding: 10,
    marginTop: 12,
  },
  preparingNoteText: {
    flex: 1,
    fontSize: 12,
    color: '#2563EB',
  },
  reorderButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    borderWidth: 1.5,
    borderColor: Colors.light.tint,
    borderRadius: 10,
    paddingVertical: 10,
    marginTop: 12,
  },
  reorderButtonText: {
    color: Colors.light.tint,
    fontSize: 14,
    fontWeight: '600',
  },
  expandHint: {
    alignItems: 'center',
    marginTop: 8,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingBottom: 60,
  },
  emptyIcon: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.light.text,
  },
  emptySubtitle: {
    fontSize: 14,
    color: Colors.light.textSecondary,
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 20,
  },
});
