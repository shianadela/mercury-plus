import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  Animated,
  ActivityIndicator,
  ScrollView,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const FRAME_SIZE = SCREEN_WIDTH * 0.65;

interface BranchPrice {
  name: string;
  price: string;
  stock: string;
  bestPrice?: boolean;
}

const DEMO_RESULT = {
  product: 'Biogesic (Paracetamol) 500mg Tablet',
  brandPrice: '5.50',
  generic: {
    name: 'Paracetamol (Generic) 500mg',
    price: '3.00',
    savings: '45',
  },
  branches: [
    { name: 'Mercury Drug Makati', price: '5.50', stock: 'In Stock' },
    { name: 'Mercury Drug BGC', price: '5.25', stock: 'In Stock', bestPrice: true },
    { name: 'Mercury Drug Glorietta', price: '5.50', stock: 'Low Stock' },
  ] as BranchPrice[],
};

export default function ScannerScreen() {
  const [showManualInput, setShowManualInput] = useState(false);
  const [barcode, setBarcode] = useState('');
  const [scanning, setScanning] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const scanLineAnim = useRef(new Animated.Value(0)).current;
  const resultSlideAnim = useRef(new Animated.Value(300)).current;
  const cornerPulse = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Scanning line animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(scanLineAnim, {
          toValue: FRAME_SIZE - 4,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(scanLineAnim, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Corner bracket pulse
    Animated.loop(
      Animated.sequence([
        Animated.timing(cornerPulse, {
          toValue: 0.6,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(cornerPulse, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const handleDemoScan = () => {
    setScanning(true);
    setShowManualInput(false);
    setTimeout(() => {
      setScanning(false);
      setShowResult(true);
      Animated.spring(resultSlideAnim, {
        toValue: 0,
        useNativeDriver: true,
        tension: 50,
        friction: 9,
      }).start();
    }, 1200);
  };

  const handleClose = () => {
    if (showResult) {
      setShowResult(false);
      resultSlideAnim.setValue(300);
    } else {
      router.back();
    }
  };

  const CornerBracket = ({ style }: { style: object }) => (
    <Animated.View style={[styles.cornerBracket, style, { opacity: cornerPulse }]} />
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={handleClose} style={styles.closeButton}>
          <Ionicons name="close" size={28} color="#FFFFFF" />
        </Pressable>
        <Text style={styles.headerTitle}>Price Scanner</Text>
        <View style={{ width: 44 }} />
      </View>

      {/* Viewfinder Area */}
      <View style={styles.viewfinder}>
        <View style={styles.scanFrame}>
          <CornerBracket style={styles.cornerTL} />
          <CornerBracket style={styles.cornerTR} />
          <CornerBracket style={styles.cornerBL} />
          <CornerBracket style={styles.cornerBR} />

          {scanning ? (
            <ActivityIndicator size="large" color="#00A86B" />
          ) : !showResult ? (
            <>
              <Animated.View
                style={[
                  styles.scanLine,
                  { transform: [{ translateY: scanLineAnim }] },
                ]}
              />
              <View style={styles.barcodeIconContainer}>
                <Ionicons name="barcode-outline" size={48} color="rgba(255,255,255,0.4)" />
              </View>
            </>
          ) : null}
        </View>

        {!showResult && !scanning && (
          <Text style={styles.viewfinderText}>Point camera at barcode</Text>
        )}
      </View>

      {/* Action Buttons */}
      {!showResult && !scanning && (
        <View style={styles.actions}>
          {showManualInput && (
            <View style={styles.manualInputContainer}>
              <View style={styles.inputWrapper}>
                <Ionicons name="barcode-outline" size={20} color="#6B7280" style={{ marginRight: 8 }} />
                <TextInput
                  style={styles.manualInput}
                  placeholder="Enter barcode number"
                  placeholderTextColor="#9CA3AF"
                  value={barcode}
                  onChangeText={setBarcode}
                  keyboardType="number-pad"
                  autoFocus
                />
              </View>
              <Pressable
                style={[styles.searchButton, !barcode && styles.searchButtonDisabled]}
                onPress={barcode ? handleDemoScan : undefined}
              >
                <Ionicons name="search" size={20} color="#FFFFFF" />
              </Pressable>
            </View>
          )}

          <Pressable
            style={styles.manualButton}
            onPress={() => setShowManualInput(!showManualInput)}
          >
            <Ionicons name="keypad-outline" size={20} color="#FFFFFF" />
            <Text style={styles.manualButtonText}>Enter Barcode Manually</Text>
          </Pressable>

          <Pressable style={styles.demoButton} onPress={handleDemoScan}>
            <Ionicons name="flash-outline" size={20} color="#00A86B" />
            <Text style={styles.demoButtonText}>Use Demo Barcode</Text>
          </Pressable>
        </View>
      )}

      {/* Scan Result Card */}
      {showResult && (
        <Animated.View
          style={[
            styles.resultContainer,
            { transform: [{ translateY: resultSlideAnim }] },
          ]}
        >
          <ScrollView
            style={styles.resultScroll}
            showsVerticalScrollIndicator={false}
            bounces={false}
          >
            <View style={styles.resultHandle} />

            {/* Product Info */}
            <Text style={styles.resultProductName}>{DEMO_RESULT.product}</Text>
            <Text style={styles.resultBrandPrice}>
              Brand Price: <Text style={styles.priceHighlight}>{'\u20B1'}{DEMO_RESULT.brandPrice}</Text>
            </Text>

            {/* Generic Alternative */}
            <View style={styles.genericCard}>
              <View style={styles.genericHeader}>
                <Ionicons name="leaf-outline" size={18} color="#00A86B" />
                <Text style={styles.genericTitle}>Generic Alternative</Text>
              </View>
              <Text style={styles.genericName}>{DEMO_RESULT.generic.name}</Text>
              <View style={styles.genericPriceRow}>
                <Text style={styles.genericPrice}>{'\u20B1'}{DEMO_RESULT.generic.price}</Text>
                <View style={styles.savingsBadge}>
                  <Ionicons name="trending-down" size={14} color="#FFFFFF" />
                  <Text style={styles.savingsText}>Save {DEMO_RESULT.generic.savings}%!</Text>
                </View>
              </View>
            </View>

            {/* Branch Prices */}
            <Text style={styles.sectionTitle}>Price Comparison</Text>
            {DEMO_RESULT.branches.map((branch, index) => (
              <View
                key={index}
                style={[styles.branchRow, branch.bestPrice && styles.branchRowBest]}
              >
                <View style={styles.branchInfo}>
                  <View style={styles.branchNameRow}>
                    <Ionicons name="location-outline" size={16} color="#6B7280" />
                    <Text style={styles.branchName}>{branch.name}</Text>
                  </View>
                  <Text
                    style={[
                      styles.branchStock,
                      branch.stock === 'Low Stock' && styles.lowStock,
                    ]}
                  >
                    {branch.stock}
                  </Text>
                </View>
                <View style={styles.branchPriceContainer}>
                  <Text style={[styles.branchPrice, branch.bestPrice && styles.bestPriceText]}>
                    {'\u20B1'}{branch.price}
                  </Text>
                  {branch.bestPrice && (
                    <View style={styles.bestPriceBadge}>
                      <Text style={styles.bestPriceBadgeText}>BEST PRICE</Text>
                    </View>
                  )}
                </View>
              </View>
            ))}

            {/* Action Buttons */}
            <View style={styles.resultActions}>
              <Pressable style={styles.addToCartButton} onPress={() => router.back()}>
                <Ionicons name="cart-outline" size={20} color="#FFFFFF" />
                <Text style={styles.addToCartText}>Add to Cart</Text>
              </Pressable>
              <Pressable style={styles.findInStoreButton} onPress={() => router.back()}>
                <Ionicons name="navigate-outline" size={20} color="#00A86B" />
                <Text style={styles.findInStoreText}>Find in Store</Text>
              </Pressable>
            </View>
          </ScrollView>
        </Animated.View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111111',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  closeButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  viewfinder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scanFrame: {
    width: FRAME_SIZE,
    height: FRAME_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  cornerBracket: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderColor: '#00A86B',
  },
  cornerTL: {
    top: 0,
    left: 0,
    borderTopWidth: 3,
    borderLeftWidth: 3,
    borderTopLeftRadius: 12,
  },
  cornerTR: {
    top: 0,
    right: 0,
    borderTopWidth: 3,
    borderRightWidth: 3,
    borderTopRightRadius: 12,
  },
  cornerBL: {
    bottom: 0,
    left: 0,
    borderBottomWidth: 3,
    borderLeftWidth: 3,
    borderBottomLeftRadius: 12,
  },
  cornerBR: {
    bottom: 0,
    right: 0,
    borderBottomWidth: 3,
    borderRightWidth: 3,
    borderBottomRightRadius: 12,
  },
  scanLine: {
    position: 'absolute',
    top: 0,
    left: 20,
    right: 20,
    height: 2,
    backgroundColor: '#00A86B',
    shadowColor: '#00A86B',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 8,
  },
  barcodeIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewfinderText: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 15,
    marginTop: 24,
    fontWeight: '500',
  },
  actions: {
    paddingHorizontal: 24,
    paddingBottom: 32,
    gap: 12,
  },
  manualInputContainer: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  inputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 48,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
  },
  manualInput: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 15,
  },
  searchButton: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#00A86B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchButtonDisabled: {
    opacity: 0.5,
  },
  manualButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: 'rgba(255,255,255,0.12)',
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
  },
  manualButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
  demoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: 'rgba(0,168,107,0.15)',
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(0,168,107,0.4)',
  },
  demoButtonText: {
    color: '#00A86B',
    fontSize: 15,
    fontWeight: '600',
  },
  resultContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    maxHeight: '70%',
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 8,
  },
  resultScroll: {
    paddingHorizontal: 20,
  },
  resultHandle: {
    width: 40,
    height: 4,
    backgroundColor: '#D1D5DB',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 16,
  },
  resultProductName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A2E',
    marginBottom: 4,
  },
  resultBrandPrice: {
    fontSize: 15,
    color: '#6B7280',
    marginBottom: 16,
  },
  priceHighlight: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A2E',
  },
  genericCard: {
    backgroundColor: '#ECFDF5',
    borderRadius: 14,
    padding: 14,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  genericHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 6,
  },
  genericTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#047857',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  genericName: {
    fontSize: 15,
    color: '#1A1A2E',
    fontWeight: '500',
    marginBottom: 8,
  },
  genericPriceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  genericPrice: {
    fontSize: 22,
    fontWeight: '800',
    color: '#00A86B',
  },
  savingsBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#00A86B',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  savingsText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A2E',
    marginBottom: 10,
  },
  branchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 10,
    marginBottom: 6,
    backgroundColor: '#F9FAFB',
  },
  branchRowBest: {
    backgroundColor: '#ECFDF5',
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  branchInfo: {
    flex: 1,
    marginRight: 12,
  },
  branchNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 2,
  },
  branchName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A2E',
  },
  branchStock: {
    fontSize: 12,
    color: '#00A86B',
    marginLeft: 20,
    fontWeight: '500',
  },
  lowStock: {
    color: '#F59E0B',
  },
  branchPriceContainer: {
    alignItems: 'flex-end',
  },
  branchPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A2E',
  },
  bestPriceText: {
    color: '#00A86B',
  },
  bestPriceBadge: {
    backgroundColor: '#00A86B',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    marginTop: 3,
  },
  bestPriceBadgeText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  resultActions: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 18,
    marginBottom: 32,
  },
  addToCartButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: '#00A86B',
    paddingVertical: 14,
    borderRadius: 12,
  },
  addToCartText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  findInStoreButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: '#ECFDF5',
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  findInStoreText: {
    color: '#00A86B',
    fontSize: 15,
    fontWeight: '700',
  },
});
