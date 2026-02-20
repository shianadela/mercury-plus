import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

const FORMS = ['Tablet', 'Capsule', 'Syrup', 'Injection'];
const FREQUENCIES = ['Once daily', 'Twice daily', 'Three times daily', 'Weekly'];

const DEFAULT_TIMES: Record<string, string[]> = {
  'Once daily': ['8:00 AM'],
  'Twice daily': ['8:00 AM', '8:00 PM'],
  'Three times daily': ['8:00 AM', '12:00 PM', '8:00 PM'],
  Weekly: ['8:00 AM'],
};

export default function AddReminderScreen() {
  const [medicineName, setMedicineName] = useState('');
  const [dosage, setDosage] = useState('');
  const [selectedForm, setSelectedForm] = useState('Tablet');
  const [selectedFrequency, setSelectedFrequency] = useState('Once daily');
  const [reminderTimes, setReminderTimes] = useState<string[]>(['8:00 AM']);
  const [startDate, setStartDate] = useState('2026-02-20');
  const [totalQuantity, setTotalQuantity] = useState('');
  const [notes, setNotes] = useState('');

  const handleFrequencyChange = (freq: string) => {
    setSelectedFrequency(freq);
    setReminderTimes(DEFAULT_TIMES[freq] || ['8:00 AM']);
  };

  const updateTime = (index: number, value: string) => {
    setReminderTimes((prev) => {
      const updated = [...prev];
      updated[index] = value;
      return updated;
    });
  };

  const handleSave = () => {
    if (!medicineName.trim()) {
      Alert.alert('Missing Info', 'Please enter a medicine name.');
      return;
    }
    if (!dosage.trim()) {
      Alert.alert('Missing Info', 'Please enter the dosage.');
      return;
    }

    Alert.alert(
      'Reminder Saved',
      `${medicineName} ${dosage} (${selectedForm}) reminder has been set for ${selectedFrequency.toLowerCase()}.`,
      [{ text: 'OK', onPress: () => router.back() }]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.headerButton}>
          <Ionicons name="arrow-back" size={24} color="#1A1A2E" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add Reminder</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Medicine Name */}
        <Text style={styles.inputLabel}>Medicine Name</Text>
        <TextInput
          style={styles.textInput}
          placeholder="e.g., Losartan"
          placeholderTextColor="#9CA3AF"
          value={medicineName}
          onChangeText={setMedicineName}
        />

        {/* Dosage */}
        <Text style={styles.inputLabel}>Dosage</Text>
        <TextInput
          style={styles.textInput}
          placeholder="e.g., 500mg"
          placeholderTextColor="#9CA3AF"
          value={dosage}
          onChangeText={setDosage}
        />

        {/* Form */}
        <Text style={styles.inputLabel}>Form</Text>
        <View style={styles.chipRow}>
          {FORMS.map((form) => (
            <TouchableOpacity
              key={form}
              style={[styles.formChip, selectedForm === form && styles.formChipSelected]}
              onPress={() => setSelectedForm(form)}
            >
              <Text
                style={[
                  styles.formChipText,
                  selectedForm === form && styles.formChipTextSelected,
                ]}
              >
                {form}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Frequency */}
        <Text style={styles.inputLabel}>Frequency</Text>
        <View style={styles.chipRow}>
          {FREQUENCIES.map((freq) => (
            <TouchableOpacity
              key={freq}
              style={[
                styles.frequencyChip,
                selectedFrequency === freq && styles.frequencyChipSelected,
              ]}
              onPress={() => handleFrequencyChange(freq)}
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

        {/* Reminder Times */}
        <Text style={styles.inputLabel}>Reminder Times</Text>
        {reminderTimes.map((time, index) => (
          <View key={index} style={styles.timeRow}>
            <View style={styles.timeLabel}>
              <Ionicons name="alarm-outline" size={18} color="#00A86B" />
              <Text style={styles.timeLabelText}>Dose {index + 1}</Text>
            </View>
            <TextInput
              style={styles.timeInput}
              placeholder="8:00 AM"
              placeholderTextColor="#9CA3AF"
              value={time}
              onChangeText={(val) => updateTime(index, val)}
            />
          </View>
        ))}

        {/* Start Date */}
        <Text style={styles.inputLabel}>Start Date</Text>
        <View style={styles.dateInputRow}>
          <Ionicons name="calendar-outline" size={20} color="#6B7280" style={{ marginRight: 10 }} />
          <TextInput
            style={styles.dateInput}
            placeholder="YYYY-MM-DD"
            placeholderTextColor="#9CA3AF"
            value={startDate}
            onChangeText={setStartDate}
          />
        </View>

        {/* Total Quantity */}
        <Text style={styles.inputLabel}>Total Quantity</Text>
        <TextInput
          style={styles.textInput}
          placeholder="e.g., 30"
          placeholderTextColor="#9CA3AF"
          keyboardType="numeric"
          value={totalQuantity}
          onChangeText={setTotalQuantity}
        />

        {/* Notes */}
        <Text style={styles.inputLabel}>Notes (optional)</Text>
        <TextInput
          style={[styles.textInput, styles.notesInput]}
          placeholder="e.g., Take after meals"
          placeholderTextColor="#9CA3AF"
          multiline
          numberOfLines={3}
          textAlignVertical="top"
          value={notes}
          onChangeText={setNotes}
        />

        {/* Save Button */}
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Ionicons name="checkmark-circle-outline" size={22} color="#FFF" />
          <Text style={styles.saveButtonText}>Save Reminder</Text>
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
    paddingHorizontal: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A2E',
    marginBottom: 8,
    marginTop: 20,
  },
  textInput: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: '#1A1A2E',
  },
  notesInput: {
    minHeight: 80,
    paddingTop: 14,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  formChip: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: '#FFF',
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
  },
  formChipSelected: {
    backgroundColor: '#00A86B',
    borderColor: '#00A86B',
  },
  formChipText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1A1A2E',
  },
  formChipTextSelected: {
    color: '#FFF',
    fontWeight: '600',
  },
  frequencyChip: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: '#FFF',
    borderWidth: 1.5,
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
    fontWeight: '600',
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginBottom: 8,
  },
  timeLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  timeLabelText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  timeInput: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1A1A2E',
    textAlign: 'right',
    minWidth: 100,
  },
  dateInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  dateInput: {
    flex: 1,
    fontSize: 15,
    color: '#1A1A2E',
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00A86B',
    borderRadius: 14,
    paddingVertical: 16,
    marginTop: 28,
    gap: 8,
    shadowColor: '#00A86B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  saveButtonText: {
    fontSize: 17,
    fontWeight: '700',
    color: '#FFF',
  },
});
