import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Switch,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

const HEALTH_CONDITIONS = [
  'Diabetes',
  'Hypertension',
  'Asthma',
  'Allergies',
  'Heart Disease',
  'Arthritis',
  'None',
];

const BRANCHES = [
  { id: '1', name: 'Mercury Drug Makati', address: 'Ayala Ave, Makati City' },
  { id: '2', name: 'Mercury Drug BGC', address: '5th Ave, Taguig City' },
  { id: '3', name: 'Mercury Drug Glorietta', address: 'Glorietta Mall, Makati City' },
  { id: '4', name: 'Mercury Drug SM Megamall', address: 'EDSA, Mandaluyong City' },
];

const NOTIFICATION_OPTIONS = [
  { key: 'medication', label: 'Medication Reminders', icon: 'alarm-outline' as const },
  { key: 'refill', label: 'Refill Alerts', icon: 'refresh-outline' as const },
  { key: 'promotions', label: 'Promotions', icon: 'pricetag-outline' as const },
  { key: 'orders', label: 'Order Updates', icon: 'cube-outline' as const },
];

export default function OnboardingScreen() {
  const [step, setStep] = useState(1);
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);
  const [selectedBranch, setSelectedBranch] = useState<string | null>(null);
  const [notifications, setNotifications] = useState<Record<string, boolean>>({
    medication: true,
    refill: true,
    promotions: false,
    orders: true,
  });

  const totalSteps = 3;

  const toggleCondition = (condition: string) => {
    if (condition === 'None') {
      setSelectedConditions(
        selectedConditions.includes('None') ? [] : ['None']
      );
      return;
    }
    setSelectedConditions((prev) => {
      const filtered = prev.filter((c) => c !== 'None');
      if (filtered.includes(condition)) {
        return filtered.filter((c) => c !== condition);
      }
      return [...filtered, condition];
    });
  };

  const toggleNotification = (key: string) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      router.replace('/(tabs)');
    }
  };

  const handleSkip = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      router.replace('/(tabs)');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Step Indicator */}
      <View style={styles.stepIndicator}>
        {[1, 2, 3].map((s) => (
          <View key={s} style={styles.stepDotRow}>
            <View style={[styles.stepDot, step >= s && styles.stepDotActive]} />
            {s < 3 && (
              <View style={[styles.stepLine, step > s && styles.stepLineActive]} />
            )}
          </View>
        ))}
      </View>
      <Text style={styles.stepLabel}>Step {step} of {totalSteps}</Text>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Step 1: Health Preferences */}
        {step === 1 && (
          <View style={styles.stepContent}>
            <View style={styles.stepIconCircle}>
              <Ionicons name="heart-outline" size={32} color="#00A86B" />
            </View>
            <Text style={styles.stepTitle}>Health Preferences</Text>
            <Text style={styles.stepSubtitle}>
              Select any health conditions to personalize your experience
            </Text>
            <View style={styles.chipsContainer}>
              {HEALTH_CONDITIONS.map((condition) => {
                const isSelected = selectedConditions.includes(condition);
                return (
                  <Pressable
                    key={condition}
                    style={[styles.chip, isSelected && styles.chipSelected]}
                    onPress={() => toggleCondition(condition)}
                  >
                    {isSelected && (
                      <Ionicons name="checkmark" size={16} color="#FFFFFF" style={{ marginRight: 4 }} />
                    )}
                    <Text style={[styles.chipText, isSelected && styles.chipTextSelected]}>
                      {condition}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>
        )}

        {/* Step 2: Your Pharmacy */}
        {step === 2 && (
          <View style={styles.stepContent}>
            <View style={styles.stepIconCircle}>
              <Ionicons name="location-outline" size={32} color="#00A86B" />
            </View>
            <Text style={styles.stepTitle}>Your Pharmacy</Text>
            <Text style={styles.stepSubtitle}>
              Select your preferred Mercury Drug branch
            </Text>
            <View style={styles.branchList}>
              {BRANCHES.map((branch) => {
                const isSelected = selectedBranch === branch.id;
                return (
                  <Pressable
                    key={branch.id}
                    style={[styles.branchCard, isSelected && styles.branchCardSelected]}
                    onPress={() => setSelectedBranch(branch.id)}
                  >
                    <View style={[styles.branchRadio, isSelected && styles.branchRadioSelected]}>
                      {isSelected && <View style={styles.branchRadioDot} />}
                    </View>
                    <View style={styles.branchInfo}>
                      <Text style={[styles.branchName, isSelected && styles.branchNameSelected]}>
                        {branch.name}
                      </Text>
                      <Text style={styles.branchAddress}>{branch.address}</Text>
                    </View>
                    <Ionicons name="navigate-outline" size={18} color="#6B7280" />
                  </Pressable>
                );
              })}
            </View>
          </View>
        )}

        {/* Step 3: Notifications */}
        {step === 3 && (
          <View style={styles.stepContent}>
            <View style={styles.stepIconCircle}>
              <Ionicons name="notifications-outline" size={32} color="#00A86B" />
            </View>
            <Text style={styles.stepTitle}>Notifications</Text>
            <Text style={styles.stepSubtitle}>
              Choose which notifications you'd like to receive
            </Text>
            <View style={styles.notificationList}>
              {NOTIFICATION_OPTIONS.map((option) => (
                <View key={option.key} style={styles.notificationRow}>
                  <View style={styles.notificationIconCircle}>
                    <Ionicons name={option.icon} size={22} color="#00A86B" />
                  </View>
                  <Text style={styles.notificationLabel}>{option.label}</Text>
                  <Switch
                    value={notifications[option.key]}
                    onValueChange={() => toggleNotification(option.key)}
                    trackColor={{ false: '#D1D5DB', true: '#86EFAC' }}
                    thumbColor={notifications[option.key] ? '#00A86B' : '#F9FAFB'}
                    ios_backgroundColor="#D1D5DB"
                  />
                </View>
              ))}
            </View>
          </View>
        )}
      </ScrollView>

      {/* Bottom Buttons */}
      <View style={styles.bottomActions}>
        <Pressable style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>
            {step === totalSteps ? 'Get Started' : 'Next'}
          </Text>
          <Ionicons
            name={step === totalSteps ? 'checkmark' : 'arrow-forward'}
            size={20}
            color="#FFFFFF"
          />
        </Pressable>
        <Pressable onPress={handleSkip} style={styles.skipButton}>
          <Text style={styles.skipText}>Skip</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFB',
  },
  stepIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
    paddingHorizontal: 60,
  },
  stepDotRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  stepDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#D1D5DB',
  },
  stepDotActive: {
    backgroundColor: '#00A86B',
    shadowColor: '#00A86B',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  stepLine: {
    flex: 1,
    height: 2,
    backgroundColor: '#D1D5DB',
    marginHorizontal: 4,
  },
  stepLineActive: {
    backgroundColor: '#00A86B',
  },
  stepLabel: {
    textAlign: 'center',
    fontSize: 13,
    color: '#6B7280',
    fontWeight: '500',
    marginTop: 8,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 16,
    flexGrow: 1,
  },
  stepContent: {
    marginTop: 28,
    alignItems: 'center',
  },
  stepIconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#ECFDF5',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  stepTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1A1A2E',
    marginBottom: 8,
  },
  stepSubtitle: {
    fontSize: 15,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 28,
    paddingHorizontal: 8,
  },
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
    width: '100%',
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 25,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
  },
  chipSelected: {
    backgroundColor: '#00A86B',
    borderColor: '#00A86B',
  },
  chipText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A2E',
  },
  chipTextSelected: {
    color: '#FFFFFF',
  },
  branchList: {
    width: '100%',
    gap: 10,
  },
  branchCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
  },
  branchCardSelected: {
    borderColor: '#00A86B',
    backgroundColor: '#F0FDF9',
  },
  branchRadio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  branchRadioSelected: {
    borderColor: '#00A86B',
  },
  branchRadioDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#00A86B',
  },
  branchInfo: {
    flex: 1,
  },
  branchName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1A1A2E',
    marginBottom: 2,
  },
  branchNameSelected: {
    color: '#00A86B',
  },
  branchAddress: {
    fontSize: 13,
    color: '#6B7280',
  },
  notificationList: {
    width: '100%',
    gap: 6,
  },
  notificationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  notificationIconCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#ECFDF5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  notificationLabel: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: '#1A1A2E',
  },
  bottomActions: {
    paddingHorizontal: 24,
    paddingBottom: 16,
    gap: 10,
  },
  nextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#00A86B',
    paddingVertical: 16,
    borderRadius: 14,
    shadowColor: '#00A86B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  skipButton: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  skipText: {
    fontSize: 15,
    color: '#6B7280',
    fontWeight: '600',
  },
});
