import AuthGuard from '@/components/AuthGuard';
import Slide from '@/components/Slide';
import { images } from '@/constants/images';
import { useUser } from '@/stores/useUserStore';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

/**
 * Onboarding (refactored to use nativewind-style className props)
 * - smaller components defined in-file for simplicity
 * - uses placeholders for images (replace with real images in assets and import them)
 *
 * Note: This file assumes nativewind is configured so `className` works on RN components.
 */

const { width } = Dimensions.get('window');

const slides = [
  {
    title: 'You are Safe with BULLYproof',
    description:
      "The internet should be a place of connection, not harm. You're not alone — we're here to help you feel safe, supported, and in control.",
    bgColor: 'bg-primary-main',
    image: images.onboard1,
  },
  {
    title: 'Real - Time Protection',
    description:
      'We gently flag harmful messages, so you can navigate the online world with confidence.',
    bgColor: 'bg-[#01437c]',
    image: images.onboard2,
  },
  {
    title: 'Emotion - Aware Insights',
    description:
      'Understand the tone of conversations and keep your space positive and uplifting.',
    bgColor: 'bg-[#078315]',
    image: images.onboard3,
  },
  {
    title: 'Smart Reports, Simple Insights',
    description:
      'Stay informed with easy-to-read trends that help you recognize risks early.',
    bgColor: 'bg-[#db9426]',
    image: images.onboard4,
  },
  {
    title: 'Instant Alerts, Empowered Choices',
    description:
      "Get notified and take action when it matters most—you're always in control.",
    bgColor: 'bg-[#b90909]',
    image: images.onboard5,
  },
  {
    title: 'Seamless Multi-Platform Support',
    description:
      "Whether you're on social media or messaging apps, we're right there with you.",
    bgColor: 'bg-[#d93d66]',
    image: images.onboard6,
  },
];

const Onboarding = () => {
  const router = useRouter();
  const user = useUser();
  const scrollRef = useRef<ScrollView | null>(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    // If the user exists and is explicitly unverified, navigate to the dynamic verify route
    if (!user) return;
    if (user.isVerified === false) {
      if (user.email) {
        router.replace({
          pathname: '/verify/[email]',
          params: { email: user.email },
        });
      } else {
        // fallback if email is missing
        router.replace('/login');
      }
    }
  }, [user]);

  const onScroll = (e: any) => {
    const x = e.nativeEvent.contentOffset.x;
    const active = Math.round(x / width);
    setIndex(active);
  };

  const goNext = () => {
    if (index < slides.length - 1) {
      scrollRef.current?.scrollTo({ x: width * (index + 1), animated: true });
    } else {
      router.replace('/home');
    }
  };

  const onSkip = () => {
    router.replace('/home');
  };

  return (
    <AuthGuard>
      <SafeAreaView className="flex-1 bg-primary-main">
        <View className="items-end p-4 mt-10 me-5">
          <TouchableOpacity onPress={onSkip}>
            <Text className="text-white text-2xl">Skip</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          ref={scrollRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={onScroll}
          scrollEventThrottle={16}
          contentContainerStyle={{ alignItems: 'center' }}
        >
          {slides.map((sld, i) => (
            <Slide
              key={i}
              title={sld.title}
              description={sld.description}
              index={i}
              total={slides.length}
              onSkip={onSkip}
              onNext={goNext}
              width={width}
              bgColor={sld.bgColor || 'bg-primary-main'}
              image={sld.image}
            />
          ))}
        </ScrollView>
      </SafeAreaView>
    </AuthGuard>
  );
};

export default Onboarding;
