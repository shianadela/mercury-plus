import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  TextInput,
  Dimensions,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/Colors';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 52) / 2;

interface HealthTool {
  id: string;
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  route?: string;
}

const healthTools: HealthTool[] = [
  { id: 'bmi', title: 'BMI Calculator', icon: 'body', color: '#00A86B' },
  { id: 'calories', title: 'Calorie Counter', icon: 'restaurant', color: '#F59E0B' },
  { id: 'steps', title: 'Step Counter', icon: 'footsteps', color: '#3B82F6' },
  { id: 'reminders', title: 'Med Reminders', icon: 'alarm', color: '#8B5CF6', route: '/reminders' },
  { id: 'aichat', title: 'AI Health Chat', icon: 'chatbubble-ellipses', color: '#EF4444', route: '/chat' },
  { id: 'vaccines', title: 'Vaccine Info', icon: 'bandage', color: '#0EA5E9' },
];

const foodItems = [
  { name: 'Rice (1 cup)', calories: 206 },
  { name: 'Chicken Adobo', calories: 350 },
  { name: 'Sinigang', calories: 150 },
  { name: 'Lumpia (2 pcs)', calories: 190 },
  { name: 'Banana', calories: 89 },
  { name: 'Egg (1 pc)', calories: 78 },
];

const vaccines = [
  { name: 'COVID-19 Booster', status: 'Available', date: 'Walk-in accepted' },
  { name: 'Flu Vaccine 2026', status: 'Available', date: 'Seasonal' },
  { name: 'Pneumococcal', status: 'By appointment', date: 'For seniors 60+' },
  { name: 'Hepatitis B', status: 'Available', date: '3-dose series' },
  { name: 'HPV Vaccine', status: 'Available', date: 'Ages 9-45' },
];

export default function HealthScreen() {
  const [activeTool, setActiveTool] = useState<string | null>(null);

  // BMI Calculator state
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmiResult, setBmiResult] = useState<{ value: number; category: string; color: string } | null>(null);

  // Calorie Counter state
  const [loggedFoods, setLoggedFoods] = useState<{ name: string; calories: number }[]>([]);

  const calculateBMI = () => {
    const h = parseFloat(height) / 100;
    const w = parseFloat(weight);
    if (!h || !w || h <= 0 || w <= 0) {
      Alert.alert('Invalid Input', 'Please enter valid height and weight values.');
      return;
    }
    const bmi = w / (h * h);
    let category = '';
    let color = '';
    if (bmi < 18.5) { category = 'Underweight'; color = '#F59E0B'; }
    else if (bmi < 25) { category = 'Normal'; color = '#059669'; }
    else if (bmi < 30) { category = 'Overweight'; color = '#F59E0B'; }
    else { category = 'Obese'; color = '#EF4444'; }
    setBmiResult({ value: Math.round(bmi * 10) / 10, category, color });
  };

  const addFood = (food: { name: string; calories: number }) => {
    setLoggedFoods([...loggedFoods, food]);
  };

  const totalCalories = loggedFoods.reduce((sum, f) => sum + f.calories, 0);

  const handleToolPress = (tool: HealthTool) => {
    if (tool.route) {
      router.push(tool.route as any);
      return;
    }
    setActiveTool(activeTool === tool.id ? null : tool.id);
  };

  const renderCircularStat = (label: string, value: string, subtext: string, color: string, progress: number) => (
    <View style={styles.statItem}>
      <View style={[styles.statCircle, { borderColor: color }]}>
        <View style={[styles.statCircleProgress, { borderColor: color, transform: [{ rotate: `${progress * 360}deg` }] }]} />
        <Text style={[styles.statValue, { color }]}>{value}</Text>
      </View>
      <Text style={styles.statLabel}>{label}</Text>
      <Text style={styles.statSubtext}>{subtext}</Text>
    </View>
  );

  const renderStepCounter = () => {
    const steps = 6234;
    const goal = 10000;
    const progress = steps / goal;
    const circumference = 2 * Math.PI * 45;
    const strokeDashoffset = circumference * (1 - progress);

    return (
      <View style={styles.toolContent}>
        <View style={styles.stepCounterContainer}>
          <View style={styles.stepCircle}>
            <View style={styles.stepCircleInner}>
              <Ionicons name="footsteps" size={24} color="#3B82F6" />
              <Text style={styles.stepCount}>{steps.toLocaleString()}</Text>
              <Text style={styles.stepLabel}>steps today</Text>
            </View>
            <View style={[styles.stepProgressBg]} />
            <View style={[styles.stepProgressFill, { transform: [{ rotate: '-90deg' }] }]}>
              <View style={[styles.stepProgressArc, { width: `${progress * 100}%` }]} />
            </View>
          </View>
          <View style={styles.stepStats}>
            <View style={styles.stepStatRow}>
              <Ionicons name="flame-outline" size={18} color="#F59E0B" />
              <Text style={styles.stepStatText}>312 calories burned</Text>
            </View>
            <View style={styles.stepStatRow}>
              <Ionicons name="location-outline" size={18} color="#3B82F6" />
              <Text style={styles.stepStatText}>4.2 km distance</Text>
            </View>
            <View style={styles.stepStatRow}>
              <Ionicons name="trophy-outline" size={18} color="#00A86B" />
              <Text style={styles.stepStatText}>{Math.round(progress * 100)}% of daily goal</Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>My Health</Text>
        </View>

        {/* Health Summary Card */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Today's Summary</Text>
          <View style={styles.statsRow}>
            {renderCircularStat('Steps', '6,234', '/ 10,000', '#3B82F6', 0.62)}
            {renderCircularStat('Water', '5', '/ 8 glasses', '#0EA5E9', 0.625)}
            {renderCircularStat('Meds', '2', '/ 3 taken', '#00A86B', 0.67)}
          </View>
        </View>

        {/* Health Tools Grid */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Health Tools</Text>
          <View style={styles.toolsGrid}>
            {healthTools.map((tool) => (
              <Pressable
                key={tool.id}
                style={[
                  styles.toolCard,
                  activeTool === tool.id && styles.toolCardActive,
                ]}
                onPress={() => handleToolPress(tool)}
              >
                <View style={[styles.toolIcon, { backgroundColor: tool.color + '15' }]}>
                  <Ionicons name={tool.icon} size={28} color={tool.color} />
                </View>
                <Text style={styles.toolTitle}>{tool.title}</Text>
                {tool.route && (
                  <Ionicons name="chevron-forward" size={14} color={Colors.light.textSecondary} style={styles.toolChevron} />
                )}
              </Pressable>
            ))}
          </View>
        </View>

        {/* BMI Calculator (inline) */}
        {activeTool === 'bmi' && (
          <View style={styles.inlinePanel}>
            <View style={styles.panelHeader}>
              <Text style={styles.panelTitle}>BMI Calculator</Text>
              <Pressable onPress={() => { setActiveTool(null); setBmiResult(null); }}>
                <Ionicons name="close" size={22} color={Colors.light.textSecondary} />
              </Pressable>
            </View>
            <View style={styles.bmiInputRow}>
              <View style={styles.bmiInputGroup}>
                <Text style={styles.bmiLabel}>Height (cm)</Text>
                <TextInput
                  style={styles.bmiInput}
                  placeholder="170"
                  placeholderTextColor={Colors.light.textSecondary}
                  keyboardType="numeric"
                  value={height}
                  onChangeText={setHeight}
                />
              </View>
              <View style={styles.bmiInputGroup}>
                <Text style={styles.bmiLabel}>Weight (kg)</Text>
                <TextInput
                  style={styles.bmiInput}
                  placeholder="70"
                  placeholderTextColor={Colors.light.textSecondary}
                  keyboardType="numeric"
                  value={weight}
                  onChangeText={setWeight}
                />
              </View>
            </View>
            <Pressable style={styles.calculateButton} onPress={calculateBMI}>
              <Text style={styles.calculateButtonText}>Calculate BMI</Text>
            </Pressable>
            {bmiResult && (
              <View style={[styles.bmiResult, { borderLeftColor: bmiResult.color }]}>
                <View style={styles.bmiResultRow}>
                  <Text style={styles.bmiResultLabel}>Your BMI</Text>
                  <Text style={[styles.bmiResultValue, { color: bmiResult.color }]}>{bmiResult.value}</Text>
                </View>
                <View style={[styles.bmiCategoryBadge, { backgroundColor: bmiResult.color + '15' }]}>
                  <Text style={[styles.bmiCategoryText, { color: bmiResult.color }]}>{bmiResult.category}</Text>
                </View>
                <View style={styles.bmiScale}>
                  <View style={[styles.bmiScaleSegment, { backgroundColor: '#F59E0B', flex: 18.5 }]} />
                  <View style={[styles.bmiScaleSegment, { backgroundColor: '#059669', flex: 6.5 }]} />
                  <View style={[styles.bmiScaleSegment, { backgroundColor: '#F59E0B', flex: 5 }]} />
                  <View style={[styles.bmiScaleSegment, { backgroundColor: '#EF4444', flex: 10 }]} />
                </View>
                <View style={styles.bmiScaleLabels}>
                  <Text style={styles.bmiScaleLabel}>Underweight</Text>
                  <Text style={styles.bmiScaleLabel}>Normal</Text>
                  <Text style={styles.bmiScaleLabel}>Over</Text>
                  <Text style={styles.bmiScaleLabel}>Obese</Text>
                </View>
              </View>
            )}
          </View>
        )}

        {/* Calorie Counter (inline) */}
        {activeTool === 'calories' && (
          <View style={styles.inlinePanel}>
            <View style={styles.panelHeader}>
              <Text style={styles.panelTitle}>Calorie Counter</Text>
              <Pressable onPress={() => { setActiveTool(null); setLoggedFoods([]); }}>
                <Ionicons name="close" size={22} color={Colors.light.textSecondary} />
              </Pressable>
            </View>
            <View style={styles.calorieHeader}>
              <View style={styles.calorieTotalCircle}>
                <Text style={styles.calorieTotalValue}>{totalCalories}</Text>
                <Text style={styles.calorieTotalLabel}>kcal today</Text>
              </View>
              <Text style={styles.calorieGoal}>Goal: 2,000 kcal</Text>
            </View>
            <Text style={styles.foodListTitle}>Add Food</Text>
            {foodItems.map((food, index) => (
              <Pressable key={index} style={styles.foodItem} onPress={() => addFood(food)}>
                <View style={styles.foodInfo}>
                  <Text style={styles.foodName}>{food.name}</Text>
                  <Text style={styles.foodCalories}>{food.calories} kcal</Text>
                </View>
                <Ionicons name="add-circle" size={24} color={Colors.light.tint} />
              </Pressable>
            ))}
            {loggedFoods.length > 0 && (
              <View style={styles.loggedSection}>
                <Text style={styles.foodListTitle}>Today's Log</Text>
                {loggedFoods.map((food, index) => (
                  <View key={index} style={styles.loggedItem}>
                    <Ionicons name="checkmark-circle" size={16} color={Colors.light.tint} />
                    <Text style={styles.loggedItemText}>{food.name}</Text>
                    <Text style={styles.loggedItemCal}>{food.calories} kcal</Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        )}

        {/* Step Counter (inline) */}
        {activeTool === 'steps' && (
          <View style={styles.inlinePanel}>
            <View style={styles.panelHeader}>
              <Text style={styles.panelTitle}>Step Counter</Text>
              <Pressable onPress={() => setActiveTool(null)}>
                <Ionicons name="close" size={22} color={Colors.light.textSecondary} />
              </Pressable>
            </View>
            {renderStepCounter()}
          </View>
        )}

        {/* Vaccine Info (inline) */}
        {activeTool === 'vaccines' && (
          <View style={styles.inlinePanel}>
            <View style={styles.panelHeader}>
              <Text style={styles.panelTitle}>Available Vaccines</Text>
              <Pressable onPress={() => setActiveTool(null)}>
                <Ionicons name="close" size={22} color={Colors.light.textSecondary} />
              </Pressable>
            </View>
            {vaccines.map((vaccine, index) => (
              <View key={index} style={styles.vaccineItem}>
                <View style={styles.vaccineIcon}>
                  <Ionicons name="shield-checkmark" size={20} color="#0EA5E9" />
                </View>
                <View style={styles.vaccineInfo}>
                  <Text style={styles.vaccineName}>{vaccine.name}</Text>
                  <Text style={styles.vaccineDate}>{vaccine.date}</Text>
                </View>
                <View style={[
                  styles.vaccineStatus,
                  { backgroundColor: vaccine.status === 'Available' ? '#D1FAE5' : '#FEF3C7' },
                ]}>
                  <Text style={[
                    styles.vaccineStatusText,
                    { color: vaccine.status === 'Available' ? '#059669' : '#92400E' },
                  ]}>
                    {vaccine.status}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        )}

        <View style={{ height: 30 }} />
      </ScrollView>
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
  summaryCard: {
    marginHorizontal: 20,
    marginTop: 8,
    backgroundColor: Colors.light.card,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.light.text,
    marginBottom: 16,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.light.background,
  },
  statCircleProgress: {
    position: 'absolute',
    width: 72,
    height: 72,
    borderRadius: 36,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
  },
  statLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.light.text,
    marginTop: 8,
  },
  statSubtext: {
    fontSize: 11,
    color: Colors.light.textSecondary,
    marginTop: 2,
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.light.text,
    marginBottom: 14,
  },
  toolsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  toolCard: {
    width: CARD_WIDTH,
    backgroundColor: Colors.light.card,
    borderRadius: 14,
    padding: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 3,
  },
  toolCardActive: {
    borderWidth: 2,
    borderColor: Colors.light.tint,
  },
  toolIcon: {
    width: 52,
    height: 52,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  toolTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.light.text,
  },
  toolChevron: {
    position: 'absolute',
    top: 18,
    right: 16,
  },
  inlinePanel: {
    marginHorizontal: 20,
    marginTop: 16,
    backgroundColor: Colors.light.card,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  panelHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  panelTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.light.text,
  },
  // BMI Calculator
  bmiInputRow: {
    flexDirection: 'row',
    gap: 12,
  },
  bmiInputGroup: {
    flex: 1,
  },
  bmiLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.light.textSecondary,
    marginBottom: 6,
  },
  bmiInput: {
    backgroundColor: Colors.light.background,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    fontWeight: '600',
    color: Colors.light.text,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  calculateButton: {
    backgroundColor: Colors.light.tint,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 16,
  },
  calculateButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  bmiResult: {
    marginTop: 16,
    padding: 16,
    backgroundColor: Colors.light.background,
    borderRadius: 12,
    borderLeftWidth: 4,
  },
  bmiResultRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  bmiResultLabel: {
    fontSize: 14,
    color: Colors.light.textSecondary,
    fontWeight: '500',
  },
  bmiResultValue: {
    fontSize: 32,
    fontWeight: '700',
  },
  bmiCategoryBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 8,
    marginBottom: 12,
  },
  bmiCategoryText: {
    fontSize: 14,
    fontWeight: '700',
  },
  bmiScale: {
    flexDirection: 'row',
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
    gap: 2,
  },
  bmiScaleSegment: {
    borderRadius: 4,
  },
  bmiScaleLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  bmiScaleLabel: {
    fontSize: 9,
    color: Colors.light.textSecondary,
  },
  // Calorie Counter
  calorieHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  calorieTotalCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 6,
    borderColor: '#F59E0B',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFBEB',
    marginBottom: 8,
  },
  calorieTotalValue: {
    fontSize: 28,
    fontWeight: '700',
    color: '#F59E0B',
  },
  calorieTotalLabel: {
    fontSize: 11,
    color: Colors.light.textSecondary,
  },
  calorieGoal: {
    fontSize: 13,
    color: Colors.light.textSecondary,
    fontWeight: '500',
  },
  foodListTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.light.text,
    marginBottom: 10,
  },
  foodItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.border,
  },
  foodInfo: {
    flex: 1,
  },
  foodName: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.light.text,
  },
  foodCalories: {
    fontSize: 12,
    color: Colors.light.textSecondary,
    marginTop: 2,
  },
  loggedSection: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.light.border,
  },
  loggedItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  loggedItemText: {
    flex: 1,
    fontSize: 13,
    color: Colors.light.text,
  },
  loggedItemCal: {
    fontSize: 13,
    color: Colors.light.textSecondary,
    fontWeight: '500',
  },
  // Step Counter
  toolContent: {
    marginTop: 4,
  },
  stepCounterContainer: {
    alignItems: 'center',
  },
  stepCircle: {
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 8,
    borderColor: '#DBEAFE',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
    marginBottom: 20,
    position: 'relative',
  },
  stepCircleInner: {
    alignItems: 'center',
  },
  stepCount: {
    fontSize: 32,
    fontWeight: '700',
    color: '#3B82F6',
    marginTop: 4,
  },
  stepLabel: {
    fontSize: 12,
    color: Colors.light.textSecondary,
  },
  stepProgressBg: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 80,
  },
  stepProgressFill: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 80,
  },
  stepProgressArc: {
    height: '100%',
    backgroundColor: '#3B82F6',
    borderRadius: 80,
  },
  stepStats: {
    alignSelf: 'stretch',
    gap: 10,
  },
  stepStatRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: Colors.light.background,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 10,
  },
  stepStatText: {
    fontSize: 14,
    color: Colors.light.text,
    fontWeight: '500',
  },
  // Vaccine Info
  vaccineItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.border,
  },
  vaccineIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#E0F2FE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  vaccineInfo: {
    flex: 1,
    marginLeft: 12,
  },
  vaccineName: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.light.text,
  },
  vaccineDate: {
    fontSize: 12,
    color: Colors.light.textSecondary,
    marginTop: 2,
  },
  vaccineStatus: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  vaccineStatusText: {
    fontSize: 11,
    fontWeight: '600',
  },
});
