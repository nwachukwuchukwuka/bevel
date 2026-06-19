import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
    Pressable,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ONBOARDING_DATA } from '../../constants';

export default function OnboardingScreen() {
    const router = useRouter();

    const item = ONBOARDING_DATA[0];

    return (
        <View className="flex-1 bg-[#090D16]">
            <StatusBar style="light" />

            <SafeAreaView className="flex-1" edges={['top', 'bottom']}>

                <View className="flex-1 px-6 pt-10">

                    <Animated.View
                        entering={FadeInDown.duration(800).delay(100)}
                        className="bg-[#151E33] border border-[#1E293B] rounded-[40px] h-[45vh] items-center justify-center mb-10 relative overflow-hidden"
                        style={{ shadowColor: '#4DB9F2', shadowOpacity: 0.1, shadowRadius: 20, elevation: 10 }}
                    >
                        <View className="absolute inset-0 bg-[#090D16]/60" />

                        {/* Matrix Lines */}
                        <View className="w-full flex-row justify-evenly opacity-15 h-full absolute">
                            {[...Array(7)].map((_, i) => (
                                <View key={i} className="w-[1px] h-full bg-[#4DB9F2]" />
                            ))}
                        </View>

                        {/* Radar Circles */}
                        <View className="absolute w-[220px] h-[220px] border-[0.5px] border-[#4DB9F2] rounded-full opacity-20" />
                        <View className="absolute w-[150px] h-[150px] border border-[#4DB9F2] rounded-full opacity-40" />

                        {/* Glowing Center Chip */}
                        <View
                            className="w-[90px] h-[90px] bg-[#090D16] border-2 border-[#4DB9F2] rounded-full items-center justify-center z-10"
                            style={{ shadowColor: '#4DB9F2', shadowOpacity: 0.5, shadowRadius: 15, elevation: 8 }}
                        >
                            <Ionicons name="hardware-chip" size={38} color="#4DB9F2" />
                        </View>
                    </Animated.View>

                    {/* Typography Block */}
                    <View className="flex-1 justify-start">


                        {/* Title */}
                        <Animated.Text
                            entering={FadeInDown.duration(600).delay(300)}
                            className="text-[36px] font-extrabold text-slate-100 leading-[44px] mb-4 tracking-tight"
                        >
                            {item?.title || "Initialize System"}
                        </Animated.Text>

                        {/* Subtitle */}
                        {item?.subtitle ? (
                            <Animated.Text
                                entering={FadeInDown.duration(600).delay(400)}
                                className="text-slate-400 text-3xl  font-medium"
                            >
                                {item.subtitle}
                            </Animated.Text>
                        ) : null}
                    </View>
                </View>

                {/* Bottom Action Area */}
                <View className="px-6 pb-4 bg-[#090D16] pt-4 mt-auto">
                    <View className="flex-col gap-4">
                        <TouchableOpacity
                            activeOpacity={0.8}
                            className="w-full bg-[#1E293B] border border-[#2D3748] h-16 rounded-[20px] flex-row justify-center items-center gap-3"
                        >
                            <Ionicons name="logo-apple" size={22} color="white" />
                            <Text className="text-white font-bold text-[17px]">Continue with Apple</Text>
                        </TouchableOpacity>

                        <Pressable
                            onPress={() => router.push('/onboarding/email')}
                            className="w-full bg-[#4DB9F2] h-16 rounded-[20px] flex-row justify-center items-center"
                            style={({ pressed }) => [
                                { opacity: pressed ? 0.8 : 1 },
                                { shadowColor: '#4DB9F2', shadowOpacity: 0.25, shadowRadius: 10, elevation: 5 }
                            ]}
                        >
                            <Text className="text-[#090D16] font-bold text-[17px]">Use email instead</Text>
                        </Pressable>
                    </View>
                </View>

            </SafeAreaView>
        </View>
    );
}