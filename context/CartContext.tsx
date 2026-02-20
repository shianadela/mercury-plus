import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// --- Types ---

export interface Medicine {
  id: string;
  name: string;
  genericName: string;
  brand: string;
  dosage: string;
  form: string;
  price: number;
  requiresPrescription: boolean;
  category: string;
  description: string;
  imageUrl?: string;
  inStock: boolean;
}

export interface CartItem {
  medicine: Medicine;
  quantity: number;
  branchId: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (medicine: Medicine, branchId: string, quantity?: number) => void;
  removeItem: (medicineId: string) => void;
  updateQuantity: (medicineId: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
  itemCount: number;
  selectedBranch: string | null;
  setSelectedBranch: (branchId: string | null) => void;
  pickupTime: string | null;
  setPickupTime: (time: string | null) => void;
}

// --- Constants ---

const CART_STORAGE_KEY = '@mercury_plus_cart';
const BRANCH_STORAGE_KEY = '@mercury_plus_selected_branch';
const PICKUP_TIME_STORAGE_KEY = '@mercury_plus_pickup_time';

// --- Context ---

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [selectedBranch, setSelectedBranchState] = useState<string | null>(null);
  const [pickupTime, setPickupTimeState] = useState<string | null>(null);

  // Load persisted cart on mount
  useEffect(() => {
    loadStoredCart();
  }, []);

  // Persist cart whenever items change
  useEffect(() => {
    persistCart(items);
  }, [items]);

  async function loadStoredCart() {
    try {
      const [storedCart, storedBranch, storedTime] = await Promise.all([
        AsyncStorage.getItem(CART_STORAGE_KEY),
        AsyncStorage.getItem(BRANCH_STORAGE_KEY),
        AsyncStorage.getItem(PICKUP_TIME_STORAGE_KEY),
      ]);
      if (storedCart) {
        setItems(JSON.parse(storedCart));
      }
      if (storedBranch) {
        setSelectedBranchState(storedBranch);
      }
      if (storedTime) {
        setPickupTimeState(storedTime);
      }
    } catch (error) {
      console.warn('Failed to load stored cart:', error);
    }
  }

  async function persistCart(cartItems: CartItem[]) {
    try {
      await AsyncStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch (error) {
      console.warn('Failed to persist cart:', error);
    }
  }

  const addItem = useCallback((medicine: Medicine, branchId: string, quantity: number = 1) => {
    setItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.medicine.id === medicine.id && item.branchId === branchId
      );
      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity,
        };
        return updated;
      }
      return [...prev, { medicine, quantity, branchId }];
    });
  }, []);

  const removeItem = useCallback((medicineId: string) => {
    setItems((prev) => prev.filter((item) => item.medicine.id !== medicineId));
  }, []);

  const updateQuantity = useCallback((medicineId: string, quantity: number) => {
    if (quantity <= 0) {
      setItems((prev) => prev.filter((item) => item.medicine.id !== medicineId));
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.medicine.id === medicineId ? { ...item, quantity } : item
      )
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
    setPickupTimeState(null);
    AsyncStorage.removeItem(PICKUP_TIME_STORAGE_KEY).catch(() => {});
  }, []);

  const setSelectedBranch = useCallback((branchId: string | null) => {
    setSelectedBranchState(branchId);
    if (branchId) {
      AsyncStorage.setItem(BRANCH_STORAGE_KEY, branchId).catch(() => {});
    } else {
      AsyncStorage.removeItem(BRANCH_STORAGE_KEY).catch(() => {});
    }
  }, []);

  const setPickupTime = useCallback((time: string | null) => {
    setPickupTimeState(time);
    if (time) {
      AsyncStorage.setItem(PICKUP_TIME_STORAGE_KEY, time).catch(() => {});
    } else {
      AsyncStorage.removeItem(PICKUP_TIME_STORAGE_KEY).catch(() => {});
    }
  }, []);

  const total = useMemo(
    () => items.reduce((sum, item) => sum + item.medicine.price * item.quantity, 0),
    [items]
  );

  const itemCount = useMemo(
    () => items.reduce((count, item) => count + item.quantity, 0),
    [items]
  );

  const value: CartContextType = {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    total,
    itemCount,
    selectedBranch,
    setSelectedBranch,
    pickupTime,
    setPickupTime,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextType {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
