import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

type ScheduleStatus = 'taken' | 'upcoming' | 'pending';

interface ScheduleItem {
  id: string;
  time: string;
  medicine: string;
  dosage: string;
  instruction: string;
  status: ScheduleStatus;
}

interface RefillItem {
  id: string;
  medicine: string;
  dosage: string;
  remaining: number;
  total: number;
  refillDate: string;
  isLow: boolean;
}

const SCHEDULE_DATA: ScheduleItem[] = [
  { id: '1', time: '8:00 AM', medicine: 'Losartan', dosage: '50mg', instruction: '1 tablet', status: 'taken' },
  { id: '2', time: '8:00 AM', medicine: 'Atorvastatin', dosage: '20mg', instruction: '1 tablet', status: 'taken' },
  { id: '3', time: '12:00 PM', medicine: 'Metformin', dosage: '500mg', instruction: '1 tablet', status: 'upcoming' },
  { id: '4', time: '6:00 PM', medicine: 'Metformin', dosage: '500mg', instruction: '1 tablet', status: 'pending' },
  { id: '5', time: '9:00 PM', medicine: 'Losartan', dosage: '50mg', instruction: '1 tablet', status: 'pending' },
];

const REFILL_DATA: RefillItem[] = [
  { id: '1', medicine: 'Losartan', dosage: '50mg', remaining: 23, total: 30, refillDate: 'Mar 5, 2026', isLow: false },
  { id: '2', medicine: 'Metformin', dosage: '500mg', remaining: 12, total: 60, refillDate: 'Feb 26, 2026', isLow: true },
  { id: '3', medicine: 'Atorvastatin', dosage: '20mg', remaining: 28, total: 30, refillDate: 'Mar 18, 2026', isLow: false },
];

const FREQUENCIES = ['Once daily', 'Twice daily', 'Three times daily', 'Weekly'];

export default function RemindersScreen() {
  const [schedule, setSchedule] = useState(SCHEDULE_DATA);
  const [showAddModal, setShowAddModal] = useState(false);
  const [medicineName, setMedicineName] = useState('');
  const [dosage, setDosage] = useState('');
  const [selectedFrequency, setSelectedFrequency] = useState('Once daily');
  const [reminderTime, setReminderTime] = useState('8:00 AM');
  const [startDate, setStartDate] = useState('2026-02-20');
  const [totalQuantity, setTotalQuantity] = useState('30');

  const markAsTaken = (id: string) => {
    setSchedule((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: 'taken' as ScheduleStatus } : item))
    );
  };

  const getStatusIcon = (status: ScheduleStatus) => {
    switch (status) {
      case 'taken':
        return <Ionicons name="checkmark-circle" size={22} color="#00A86B" />;
      case 'upcoming':
        return <Ionicons name="time" size={22} color="#F59E0B" />;
      case 'pending':
        return <Ionicons name="ellipse-outline" size={22} color="#D1D5DB" />;
    }
  };

  const getStatusColor = (status: ScheduleStatus) => {
    switch (status) {
      case 'taken':
        return '#00A86B';
      case 'upcoming':
        return '#F59E0B';
      case 'pending':
        return '#D1D5DB';
    }
  };

  const handleSaveReminder = () => {
    if (!medicineName.trim()) {
      Alert.alert('Missing Info', 'Please enter a medicine name.');
      return;
    }
    Alert.alert('Reminder Saved', `${medicineName} ${dosage} reminder has been set.`);
    setShowAddModal(false);
    setMedicineName('');
    setDosage('');
    setSelectedFrequency('Once daily');
    setReminderTime('8:00 AM');
    setStartDate('2026-02-20');
    setTotalQuantity('30');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.headerButton}>
          <Ionicons name="arrow-back" size={24} color="#1A1A2E" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Reminders</Text>
        <TouchableOpacity onPress={() => setShowAddModal(true)} style={styles.headerButton}>
          <Ionicons name="add-circle" size={28} color="#00A86B" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Today's Schedule */}
        <Text style={styles.sectionTitle}>Today's Schedule</Text>
        <View style={styles.timelineContainer}>
          {schedule.map((item, index) => (
            <View key={item.id} style={styles.timelineRow}>
              {/* Time Column */}
              <View style={styles.timeColumn}>
                <Text style={styles.timeText}>{item.time}</Text>
              </View>

              {/* Timeline Line */}
              <View style={styles.timelineDotColumn}>
                <View
                  style={[styles.timelineDot, { backgroundColor: getStatusColor(item.status) }]}
                />
                {index < schedule.length - 1 && (
                  <View style={styles.timelineLine} />
                )}
              </View>

              {/* Medicine Card */}
              <View
                style={[
                  styles.scheduleCard,
                  item.status === 'taken' && styles.scheduleCardTaken,
                  item.status === 'upcoming' && styles.scheduleCardUpcoming,
                ]}
              >
                <View style={styles.scheduleCardTop}>
                  <View style={{ flex: 1 }}>
                    <Text
                      style={[
                        styles.scheduleMedicine,
                        item.status === 'taken' && styles.scheduleMedicineTaken,
                      ]}
                    >
                      {item.medicine} {item.dosage}
                    </Text>
                    <Text style={styles.scheduleInstruction}>{item.instruction}</Text>
                  </View>
                  {getStatusIcon(item.status)}
                </View>
                {(item.status === 'pending' || item.status === 'upcoming') && (
                  <TouchableOpacity
                    style={[
                      styles.takeButton,
                      item.status === 'upcoming' && styles.takeButtonUpcoming,
                    ]}
                    onPress={() => markAsTaken(item.id)}
                  >
                    <Text
                      style={[
                        styles.takeButtonText,
                        item.status === 'upcoming' && styles.takeButtonTextUpcoming,
                      ]}
                    >
                      Take
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          ))}
        </View>

        {/* Refill Predictions */}
        <Text style={styles.sectionTitle}>Refill Predictions</Text>
        {REFILL_DATA.map((item) => (
          <View key={item.id} style={styles.refillCard}>
            <View style={styles.refillHeader}>
              <View style={{ flex: 1 }}>
                <Text style={styles.refillMedicine}>
                  {item.medicine} {item.dosage}
                </Text>
                <Text style={styles.refillRemaining}>
                  {item.remaining} tablets left
                </Text>
              </View>
              {item.isLow && (
                <View style={styles.lowBadge}>
                  <Ionicons name="warning" size={14} color="#F59E0B" />
                  <Text style={styles.lowBadgeText}>Low Supply!</Text>
                </View>
              )}
            </View>

            {/* Progress Bar */}
            <View style={styles.progressBarBg}>
              <View
                style={[
                  styles.progressBarFill,
                  {
                    width: `${(item.remaining / item.total) * 100}%`,
                    backgroundColor: item.isLow ? '#F59E0B' : '#00A86B',
                  },
                ]}
              />
            </View>
            <Text style={styles.refillDate}>
              Refill by: <Text style={{ fontWeight: '600' }}>{item.refillDate}</Text>
            </Text>

            {item.isLow ? (
              <TouchableOpacity style={styles.orderNowButton}>
                <Ionicons name="cart-outline" size={16} color="#FFF" />
                <Text style={styles.orderNowText}>Order Now</Text>
              </TouchableOpacity>
            ) : item.remaining < item.total ? (
              <TouchableOpacity style={styles.orderRefillButton}>
                <Text style={styles.orderRefillText}>Order Refill</Text>
              </TouchableOpacity>
            ) : null}
          </View>
        ))}

        <View style={{ height: 40 }} />
      </ScrollView>

      {/* Add Reminder Modal */}
      <Modal visible={showAddModal} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add Reminder</Text>
              <TouchableOpacity onPress={() => setShowAddModal(false)}>
                <Ionicons name="close" size={24} color="#6B7280" />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.inputLabel}>Medicine Name</Text>
              <TextInput
                style={styles.textInput}
                placeholder="e.g., Losartan"
                placeholderTextColor="#9CA3AF"
                value={medicineName}
                onChangeText={setMedicineName}
              />

              <Text style={styles.inputLabel}>Dosage</Text>
              <TextInput
                style={styles.textInput}
                placeholder="e.g., 50mg"
                placeholderTextColor="#9CA3AF"
                value={dosage}
                onChangeText={setDosage}
              />

              <Text style={styles.inputLabel}>Frequency</Text>
              <View style={styles.frequencyGrid}>
                {FREQUENCIES.map((freq) => (
                  <TouchableOpacity
                    key={freq}
                    style={[
                      styles.frequencyChip,
                      selectedFrequency === freq && styles.frequencyChipSelected,
                    ]}
                    onPress={() => setSelectedFrequency(freq)}
                  >
                    <Text
                      style={[
                        styles.frequencyChipText,
                        selectedFrequency === freq && styles.frequencyChipTextSelected,
                      ]}
                    >
                      {freq}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <Text style={styles.inputLabel}>Reminder Time</Text>
              <TextInput
                style={styles.textInput}
                placeholder="e.g., 8:00 AM"
                placeholderTextColor="#9CA3AF"
                value={reminderTime}
                onChangeText={setReminderTime}
              />

              <Text style={styles.inputLabel}>Start Date</Text>
              <TextInput
                style={styles.textInput}
                placeholder="YYYY-MM-DD"
                placeholderTextColor="#9CA3AF"
                value={startDate}
                onChangeText={setStartDate}
              />

              <Text style={styles.inputLabel}>Total Quantity (tablets)</Text>
              <TextInput
                style={styles.textInput}
                placeholder="30"
                placeholderTextColor="#9CA3AF"
                keyboardType="numeric"
                value={totalQuantity}
                onChangeText={setTotalQuantity}
              />

              <TouchableOpacity style={styles.saveButton} onPress={handleSaveReminder}>
                <Ionicons name="checkmark-circle-outline" size={20} color="#FFF" />
                <Text style={styles.saveButtonText}>Save Reminder</Text>
              </TouchableOpacity>

              <View style={{ height: 20 }} />
            </ScrollView>
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
  headerButton: {
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
    marginBottom: 14,
  },
  timelineContainer: {
    paddingLeft: 4,
  },
  timelineRow: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  timeColumn: {
    width: 70,
    paddingTop: 14,
  },
  timeText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#6B7280',
  },
  timelineDotColumn: {
    width: 24,
    alignItems: 'center',
    paddingTop: 16,
  },
  timelineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    zIndex: 1,
  },
  timelineLine: {
    width: 2,
    flex: 1,
    backgroundColor: '#E5E7EB',
    marginTop: -1,
  },
  scheduleCard: {
    flex: 1,
    backgroundColor: '#FFF',
    borderRadius: 14,
    padding: 14,
    marginLeft: 10,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
    borderLeftWidth: 3,
    borderLeftColor: '#E5E7EB',
  },
  scheduleCardTaken: {
    borderLeftColor: '#00A86B',
    backgroundColor: '#F0FDF9',
  },
  scheduleCardUpcoming: {
    borderLeftColor: '#F59E0B',
    backgroundColor: '#FFFBEB',
  },
  scheduleCardTop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  scheduleMedicine: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1A1A2E',
  },
  scheduleMedicineTaken: {
    color: '#6B7280',
  },
  scheduleInstruction: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 2,
  },
  takeButton: {
    marginTop: 10,
    backgroundColor: '#00A86B',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 20,
    alignSelf: 'flex-start',
  },
  takeButtonUpcoming: {
    backgroundColor: '#F59E0B',
  },
  takeButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFF',
  },
  takeButtonTextUpcoming: {
    color: '#FFF',
  },
  refillCard: {
    backgroundColor: '#FFF',
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  refillHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  refillMedicine: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1A1A2E',
  },
  refillRemaining: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 2,
  },
  lowBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
    gap: 4,
  },
  lowBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#D97706',
  },
  progressBarBg: {
    height: 8,
    backgroundColor: '#F3F4F6',
    borderRadius: 4,
    marginBottom: 8,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: 8,
    borderRadius: 4,
  },
  refillDate: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 10,
  },
  orderNowButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F59E0B',
    borderRadius: 10,
    paddingVertical: 10,
    gap: 6,
  },
  orderNowText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFF',
  },
  orderRefillButton: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    paddingVertical: 10,
    borderWidth: 1.5,
    borderColor: '#00A86B',
  },
  orderRefillText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#00A86B',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    maxHeight: '85%',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A2E',
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A2E',
    marginBottom: 6,
    marginTop: 14,
  },
  textInput: {
    backgroundColor: '#F8FAFB',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: '#1A1A2E',
  },
  frequencyGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  frequencyChip: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: '#F3F4F6',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  frequencyChipSelected: {
    backgroundColor: '#00A86B',
    borderColor: '#00A86B',
  },
  frequencyChipText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#1A1A2E',
  },
  frequencyChipTextSelected: {
    color: '#FFF',
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00A86B',
    borderRadius: 14,
    paddingVertical: 16,
    marginTop: 24,
    gap: 8,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFF',
  },
});
