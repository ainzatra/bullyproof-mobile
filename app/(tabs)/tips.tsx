import Header from '@/components/Header';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  LayoutAnimation,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  UIManager,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type TipItem = {
  id: string;
  title: string;
  icon: string;
  summary?: string;
  details?: string;
};

const TIP_ITEMS: TipItem[] = [
  {
    id: '1',
    title: "What to Do If You're Being Bullied Online",
    icon: 'shield-outline',
    details: `Hey, we know how hard it can be when someone hurts you — even more so behind a screen. If you’re experiencing bullying, please remember:

🌱 You deserve kindness and respect. Always.

Here’s what you can do:

• Pause before reacting. It’s okay not to respond — your peace is more important.
• Save the evidence. A screenshot or copy of the message can help later.
• Tell someone you trust. Talk to a friend, teacher, or message us here in the app.
• Use the report button. Let the BullyProof system or Facebook know.
• Block them. You have every right to protect your space.

Believe this: You are strong, and you are never alone.`,
  },
  {
    id: '2',
    title: 'How to Block or Report Someone',
    icon: 'ban-outline',
    details: `If someone’s making you feel unsafe on Facebook:

To block:
• Go to their profile.
• Tap the three dots (•••) in the corner.
• Select “Block”, and breathe easy knowing they won’t reach you.

If you see something on Facebook that feels hurtful, threatening, or just wrong — don’t keep it to yourself. You can take action right inside the BullyProof app:

Here’s how to report it:
• Go to the Report Page in your dashboard.
• Fill out the report form — tell us what happened in your own words.
• Once submitted, our AI will analyze the report and provide scores (toxicity, insult, threat, etc.) to help the Guidance Office understand what’s going on.
• Your report will be sent directly to the school's Guidance Office, and they’ll start the review process.

You’re in control. Reporting doesn’t mean you’re causing trouble — it means you care about your safety and the safety of others. 💛`,
  },
  {
    id: '3',
    title: 'Your School Stands With You – Our Policy on Cyberbullying',
    icon: 'school-outline',
    details: `We believe in a safe, kind, and respectful community — both online and offline. Here’s our promise:

• All students are protected from any form of cyberbullying.
• Every report is treated seriously and confidentially.
• Those who engage in bullying will face proper action — with fairness and guidance.
• Our goal is not just discipline, but to help everyone grow, learn, and understand.

✨ If you speak up, you’re showing courage. That’s something to be proud of.`,
  },
  {
    id: '4',
    title: 'Reach Out to the Guidance Office Anytime',
    icon: 'call-outline',
    details: `Sometimes, just talking makes a big difference. We’re always here for you.

📍 Location: Room 210, 2nd Floor, Main Building
⏰ Hours: 8:00 AM – 5:00 PM, Monday to Friday
📞 Phone: (044) 123-4567
✉️ Email: guidance@office.edu.ph`,
  },
  {
    id: '5',
    title: "In Case of Crisis — You're Not Alone",
    icon: 'megaphone-outline',
    details: `If things feel too heavy or you need urgent help, please know you can reach out to these kind and trained professionals:

• 📞 NCMH Crisis Hotline: Dial 1553 (Landline & Mobile)
• 📱 Hopeline PH:
  • Globe/TM: 0917-558-4673
  • Smart: 0918-873-4673
• 📠 Landline: (02) 8804-4673
• ☎️ Child Helpline: Dial 163
• 🚨 Emergency: Dial 911

These people care, they’re trained, and they want you safe.`,
  },
];

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const ExpandableTipCard: React.FC<{
  title: string;
  icon: string;
  summary?: string;
  children?: React.ReactNode;
}> = ({ title, icon, summary, children }) => {
  const [expanded, setExpanded] = useState(false);

  function toggle() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded((s) => !s);
  }

  return (
    <View className="w-full">
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={toggle}
        className={`w-full rounded-xl border px-4 py-4 mb-4 bg-white`}
        style={[
          styles.card,
          // subtle background tint when expanded
          expanded ? { backgroundColor: '#fff6f4' } : undefined,
        ]}
      >
        <View className="flex-row items-center">
          <View className="w-12 h-12 rounded-full items-center justify-center bg-primary-main/10 mr-3">
            <Ionicons name={icon as any} size={22} color="#063b82" />
          </View>

          <View className="flex-1">
            <Text className="text-sm text-primary-main font-semibold">
              {title}
            </Text>
            {summary ? (
              <Text className="text-xs text-slate-500 mt-1">{summary}</Text>
            ) : null}
          </View>

          <Ionicons
            name="chevron-down"
            size={20}
            color="#9ca3af"
            style={{
              transform: [{ rotate: expanded ? '180deg' : '0deg' }],
            }}
          />
        </View>

        {expanded ? (
          <View className="mt-3 pt-3 border-t border-t-slate-200">
            {children ? (
              <Text className="text-sm text-slate-700">{children}</Text>
            ) : null}
          </View>
        ) : null}
      </TouchableOpacity>
    </View>
  );
};

const Tips = () => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <Header />
      <ScrollView
        contentContainerStyle={{ padding: 20, paddingBottom: 80 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="items-center">
          <View className="w-28 h-28 rounded-full items-center justify-center bg-primary-main/10">
            <Ionicons name="bulb-outline" size={56} color="#063b82" />
          </View>

          <Text className="mt-4 text-2xl text-primary-main font-semibold text-center">
            Digital Safety Tips & Resources
          </Text>
          <Text className="mt-2 text-center text-slate-500 px-6">
            You're not alone — and help is always within reach.
          </Text>
        </View>

        <View className="mt-6">
          {TIP_ITEMS.map((t) => (
            <ExpandableTipCard
              key={t.id}
              title={t.title}
              icon={t.icon}
              summary={t.summary}
            >
              {t.details}
            </ExpandableTipCard>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  card: {
    borderColor: '#e6b7b0',
    borderWidth: 1,
  },
});

export default Tips;
