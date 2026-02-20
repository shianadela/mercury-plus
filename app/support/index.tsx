import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  ScrollView,
  Linking,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const FAQ_ITEMS: FAQItem[] = [
  {
    id: '1',
    question: 'How do I scan a prescription?',
    answer:
      'To scan a prescription:\n1. Tap the Scanner icon on the home screen\n2. Point your camera at the prescription or barcode\n3. The app will automatically detect and read the prescription\n4. Review the detected medications and confirm\n5. You can then order or reserve the medications directly',
  },
  {
    id: '2',
    question: 'How does Reserve & Pickup work?',
    answer:
      'Reserve & Pickup lets you reserve medicines at your preferred branch:\n1. Search for or scan the medicine you need\n2. Tap "Reserve" and select your preferred branch\n3. Choose a pickup time slot\n4. You\'ll receive a confirmation with a QR code\n5. Visit the branch at your chosen time and show the QR code\n6. Pay and pick up your reserved medicines',
  },
  {
    id: '3',
    question: 'What is the Suki Card?',
    answer:
      'The Suki Card is Mercury Drug\'s loyalty program. As a member, you earn points on every purchase which can be redeemed for discounts. Digital Suki Cards are available in the Mercury+ app. You earn 1 point for every \u20B1200 spent. Points can be redeemed starting at 100 points. Gold members (1,500+ points) get exclusive promotions and priority service.',
  },
  {
    id: '4',
    question: 'How do I link a caregiver?',
    answer:
      'To link a caregiver to your account:\n1. Go to Profile > Family & Caregivers\n2. Tap "Add Caregiver"\n3. Enter the caregiver\'s email or phone number\n4. They will receive an invitation to connect\n5. Once accepted, caregivers can manage medications, view schedules, and order on your behalf',
  },
  {
    id: '5',
    question: 'Are generic medicines safe?',
    answer:
      'Yes, generic medicines are safe and effective. They contain the same active ingredients as branded medicines and are approved by the FDA Philippines. Generic medicines undergo rigorous testing to ensure they meet the same quality standards. They are typically 30-70% cheaper than their branded counterparts. Our Price Scanner helps you compare generic alternatives instantly.',
  },
  {
    id: '6',
    question: 'How do I get a refund?',
    answer:
      'For refund requests:\n1. Contact our support team within 7 days of purchase\n2. Provide your order number and reason for the refund\n3. For defective products, include a photo\n4. Refunds are processed within 5-7 business days\n5. The refund will be credited to your original payment method\n\nNote: Prescription medicines cannot be returned once dispensed, as per FDA regulations.',
  },
  {
    id: '7',
    question: 'How do medication reminders work?',
    answer:
      'Medication reminders help you stay on track:\n1. Add your medications in the Health tab\n2. Set the dosage schedule (time and frequency)\n3. You\'ll receive push notifications at the scheduled times\n4. Mark each dose as taken or skipped\n5. Track your adherence rate over time\n6. Caregivers can also receive alerts if doses are missed',
  },
  {
    id: '8',
    question: 'Is my health data secure?',
    answer:
      'We take your privacy seriously. Your health data is encrypted end-to-end and stored securely in compliance with the Data Privacy Act of 2012 (RA 10173). We never sell your personal health information to third parties. You can control what data is shared in Settings > Privacy. You can also request a complete data export or deletion at any time.',
  },
];

export default function SupportScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filteredFAQs = searchQuery
    ? FAQ_ITEMS.filter(
        (item) =>
          item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : FAQ_ITEMS;

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#1A1A2E" />
        </Pressable>
        <Text style={styles.headerTitle}>Help & Support</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons name="search-outline" size={20} color="#6B7280" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for help..."
            placeholderTextColor="#9CA3AF"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <Pressable onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={20} color="#9CA3AF" />
            </Pressable>
          )}
        </View>

        {/* FAQ Section */}
        <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
        <View style={styles.faqContainer}>
          {filteredFAQs.map((item) => {
            const isExpanded = expandedId === item.id;
            return (
              <Pressable
                key={item.id}
                style={[styles.faqItem, isExpanded && styles.faqItemExpanded]}
                onPress={() => toggleExpand(item.id)}
              >
                <View style={styles.faqHeader}>
                  <View style={styles.faqQuestionRow}>
                    <View style={[styles.faqIconCircle, isExpanded && styles.faqIconCircleExpanded]}>
                      <Ionicons
                        name="help"
                        size={16}
                        color={isExpanded ? '#FFFFFF' : '#00A86B'}
                      />
                    </View>
                    <Text style={[styles.faqQuestion, isExpanded && styles.faqQuestionExpanded]}>
                      {item.question}
                    </Text>
                  </View>
                  <Ionicons
                    name={isExpanded ? 'chevron-up' : 'chevron-down'}
                    size={20}
                    color={isExpanded ? '#00A86B' : '#6B7280'}
                  />
                </View>
                {isExpanded && (
                  <View style={styles.faqAnswerContainer}>
                    <Text style={styles.faqAnswer}>{item.answer}</Text>
                  </View>
                )}
              </Pressable>
            );
          })}
        </View>

        {filteredFAQs.length === 0 && (
          <View style={styles.noResults}>
            <Ionicons name="search-outline" size={40} color="#D1D5DB" />
            <Text style={styles.noResultsText}>No results found</Text>
            <Text style={styles.noResultsSubtext}>Try a different search term</Text>
          </View>
        )}

        {/* Contact Us Section */}
        <Text style={styles.sectionTitle}>Contact Us</Text>
        <View style={styles.contactContainer}>
          <Pressable
            style={styles.contactCard}
            onPress={() => Linking.openURL('tel:+6328911507')}
          >
            <View style={[styles.contactIconCircle, { backgroundColor: '#EFF6FF' }]}>
              <Ionicons name="call-outline" size={22} color="#3B82F6" />
            </View>
            <View style={styles.contactInfo}>
              <Text style={styles.contactLabel}>Call Us</Text>
              <Text style={styles.contactValue}>(02) 8911-5071</Text>
              <Text style={styles.contactSubtext}>Mercury Drug Hotline</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#D1D5DB" />
          </Pressable>

          <Pressable
            style={styles.contactCard}
            onPress={() => Linking.openURL('mailto:support@mercuryplus.ph')}
          >
            <View style={[styles.contactIconCircle, { backgroundColor: '#FEF3C7' }]}>
              <Ionicons name="mail-outline" size={22} color="#F59E0B" />
            </View>
            <View style={styles.contactInfo}>
              <Text style={styles.contactLabel}>Email</Text>
              <Text style={styles.contactValue}>support@mercuryplus.ph</Text>
              <Text style={styles.contactSubtext}>We reply within 24 hours</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#D1D5DB" />
          </Pressable>

          <Pressable style={styles.chatButton}>
            <Ionicons name="chatbubbles-outline" size={22} color="#FFFFFF" />
            <Text style={styles.chatButtonText}>Start Live Chat</Text>
          </Pressable>
        </View>

        {/* App Version */}
        <Text style={styles.versionText}>Mercury+ v1.0.0</Text>
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
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
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
    paddingBottom: 32,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginTop: 16,
    paddingHorizontal: 14,
    height: 48,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    gap: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#1A1A2E',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A2E',
    marginHorizontal: 16,
    marginTop: 24,
    marginBottom: 12,
  },
  faqContainer: {
    paddingHorizontal: 16,
    gap: 8,
  },
  faqItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  faqItemExpanded: {
    borderColor: '#A7F3D0',
    shadowColor: '#00A86B',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  faqHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 14,
  },
  faqQuestionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 8,
  },
  faqIconCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#ECFDF5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  faqIconCircleExpanded: {
    backgroundColor: '#00A86B',
  },
  faqQuestion: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A2E',
    flex: 1,
    lineHeight: 20,
  },
  faqQuestionExpanded: {
    color: '#00A86B',
  },
  faqAnswerContainer: {
    paddingHorizontal: 14,
    paddingBottom: 14,
    paddingTop: 0,
    marginLeft: 38,
  },
  faqAnswer: {
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 22,
  },
  noResults: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  noResultsText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6B7280',
    marginTop: 12,
  },
  noResultsSubtext: {
    fontSize: 14,
    color: '#9CA3AF',
    marginTop: 4,
  },
  contactContainer: {
    paddingHorizontal: 16,
    gap: 10,
  },
  contactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  contactIconCircle: {
    width: 46,
    height: 46,
    borderRadius: 23,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  contactInfo: {
    flex: 1,
  },
  contactLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  contactValue: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1A1A2E',
    marginBottom: 2,
  },
  contactSubtext: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  chatButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#00A86B',
    paddingVertical: 16,
    borderRadius: 14,
    marginTop: 4,
    shadowColor: '#00A86B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  chatButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  versionText: {
    textAlign: 'center',
    fontSize: 13,
    color: '#9CA3AF',
    marginTop: 32,
  },
});
