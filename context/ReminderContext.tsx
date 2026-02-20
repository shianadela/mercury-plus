import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// --- Types ---

export type ReminderFrequency = 'daily' | 'twice_daily' | 'thrice_daily' | 'weekly';

export interface Reminder {
  id: string;
  medicineName: string;
  dosage: string;
  frequency: ReminderFrequency;
  times: string[]; // e.g. ['08:00', '20:00']
  startDate: string; // ISO date string
  endDate?: string; // ISO date string
  quantity: number; // total pills/units
  quantityRemaining: number;
  refillDate?: string; // ISO date string - predicted date when refill is needed
}

interface ReminderContextType {
  reminders: Reminder[];
  addReminder: (reminder: Omit<Reminder, 'id' | 'refillDate'>) => void;
  removeReminder: (id: string) => void;
  updateReminder: (id: string, data: Partial<Omit<Reminder, 'id'>>) => void;
  getRefillPrediction: (reminder: Reminder) => { daysRemaining: number; refillDate: Date } | null;
}

// --- Constants ---

const REMINDERS_STORAGE_KEY = '@mercury_plus_reminders';

// --- Helpers ---

function generateId(): string {
  return `rem_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Calculate how many doses are taken per day based on frequency.
 */
function getDosesPerDay(frequency: ReminderFrequency): number {
  switch (frequency) {
    case 'daily':
      return 1;
    case 'twice_daily':
      return 2;
    case 'thrice_daily':
      return 3;
    case 'weekly':
      return 1 / 7;
    default:
      return 1;
  }
}

/**
 * Predict refill date based on remaining quantity and frequency.
 * Returns null if quantity remaining is 0 or negative.
 */
function calculateRefillPrediction(
  quantityRemaining: number,
  frequency: ReminderFrequency
): { daysRemaining: number; refillDate: Date } | null {
  if (quantityRemaining <= 0) return null;

  const dosesPerDay = getDosesPerDay(frequency);
  const daysRemaining = Math.floor(quantityRemaining / dosesPerDay);
  const refillDate = new Date();
  refillDate.setDate(refillDate.getDate() + daysRemaining);

  return { daysRemaining, refillDate };
}

/**
 * Compute the refill date ISO string for storage.
 */
function computeRefillDateString(
  quantityRemaining: number,
  frequency: ReminderFrequency
): string | undefined {
  const prediction = calculateRefillPrediction(quantityRemaining, frequency);
  return prediction ? prediction.refillDate.toISOString() : undefined;
}

// --- Context ---

const ReminderContext = createContext<ReminderContextType | undefined>(undefined);

export function ReminderProvider({ children }: { children: React.ReactNode }) {
  const [reminders, setReminders] = useState<Reminder[]>([]);

  // Load persisted reminders on mount
  useEffect(() => {
    loadStoredReminders();
  }, []);

  // Persist whenever reminders change
  useEffect(() => {
    persistReminders(reminders);
  }, [reminders]);

  async function loadStoredReminders() {
    try {
      const stored = await AsyncStorage.getItem(REMINDERS_STORAGE_KEY);
      if (stored) {
        setReminders(JSON.parse(stored));
      }
    } catch (error) {
      console.warn('Failed to load stored reminders:', error);
    }
  }

  async function persistReminders(data: Reminder[]) {
    try {
      await AsyncStorage.setItem(REMINDERS_STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.warn('Failed to persist reminders:', error);
    }
  }

  const addReminder = useCallback((reminderData: Omit<Reminder, 'id' | 'refillDate'>) => {
    const refillDate = computeRefillDateString(
      reminderData.quantityRemaining,
      reminderData.frequency
    );
    const newReminder: Reminder = {
      ...reminderData,
      id: generateId(),
      refillDate,
    };
    setReminders((prev) => [...prev, newReminder]);
  }, []);

  const removeReminder = useCallback((id: string) => {
    setReminders((prev) => prev.filter((r) => r.id !== id));
  }, []);

  const updateReminder = useCallback((id: string, data: Partial<Omit<Reminder, 'id'>>) => {
    setReminders((prev) =>
      prev.map((r) => {
        if (r.id !== id) return r;
        const updated = { ...r, ...data };
        // Recalculate refill date if quantity or frequency changed
        if (data.quantityRemaining !== undefined || data.frequency !== undefined) {
          updated.refillDate = computeRefillDateString(
            updated.quantityRemaining,
            updated.frequency
          );
        }
        return updated;
      })
    );
  }, []);

  const getRefillPrediction = useCallback(
    (reminder: Reminder) => {
      return calculateRefillPrediction(reminder.quantityRemaining, reminder.frequency);
    },
    []
  );

  const value: ReminderContextType = {
    reminders,
    addReminder,
    removeReminder,
    updateReminder,
    getRefillPrediction,
  };

  return <ReminderContext.Provider value={value}>{children}</ReminderContext.Provider>;
}

export function useReminders(): ReminderContextType {
  const context = useContext(ReminderContext);
  if (context === undefined) {
    throw new Error('useReminders must be used within a ReminderProvider');
  }
  return context;
}
