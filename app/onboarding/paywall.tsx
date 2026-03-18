import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function PaywallScreen() {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const [selectedPlan, setSelectedPlan] = useState<'yearly' | 'monthly'>('yearly');

    const FEATURES = [
        { icon: 'sparkles', title: 'Access to All Features', desc: 'Nutrition, Journal, Insights, and more' },
        { icon: 'trending-up', title: 'Unlock All Historical Data', desc: 'View all data, insights, and trends' },
        { icon: 'watch', title: 'Native Apple Watch App', desc: 'Access to strength training and smart alarms' },
    ];

    return (
        <View className="flex-1 bg-[#111111]">

            {/* Background Rich Gradient */}
            <LinearGradient
                colors={['#4C1D95', '#065F46', '#111111', '#111111']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '70%', opacity: 0.6 }}
            />

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>

                {/* Header Area */}
                <View className="items-center px-6" style={{ paddingTop: insets.top + 40 }}>

                    {/* App Icon Mock with Glow */}
                    <View className="relative items-center justify-center mb-8">
                        {/* Glow Effect */}
                        <View className="absolute w-24 h-24 bg-white/20 rounded-[32px] blur-xl" />
                        {/* Icon Box */}
                        <LinearGradient
                            colors={['#4B5563', '#1F2937']}
                            style={{ width: 80, height: 80, borderRadius: 24, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)' }}
                        >
                            <Text className="text-white font-bold text-[48px] italic tracking-tighter">B</Text>
                        </LinearGradient>
                    </View>

                    <Text className="text-[28px] font-bold text-white text-center mb-2 shadow-sm shadow-black">
                        Upgrade to Bevel Pro
                    </Text>
                    <Text className="text-[14px] font-medium text-gray-400 text-center mb-10">
                        Max out Bevel's capabilities
                    </Text>
                </View>

                {/* Features List */}
                <View className="px-6 gap-6 mb-12">
                    {FEATURES.map((feature, idx) => (
                        <View key={idx} className="flex-row items-center gap-4">
                            <Ionicons name={feature.icon as any} size={28} color="#D1D5DB" />
                            <View className="flex-1">
                                <Text className="text-[15px] font-bold text-white mb-1">{feature.title}</Text>
                                <Text className="text-[13px] text-gray-400 leading-4">{feature.desc}</Text>
                            </View>
                        </View>
                    ))}
                </View>

                {/* Pricing Toggle */}
                <View className="px-6 flex-row gap-3 mb-8 mt-auto">

                    {/* Yearly Card */}
                    <TouchableOpacity
                        onPress={() => setSelectedPlan('yearly')}
                        className={`flex-1 rounded-[16px] p-4 relative ${selectedPlan === 'yearly' ? 'bg-[#1C1C1E] border border-white' : 'bg-[#1C1C1E]/50 border border-transparent'}`}
                    >
                        {/* Badge */}
                        <View className="absolute -top-3 left-4 bg-[#111111] border border-gray-600 rounded-full px-2 py-0.5 z-10">
                            <Text className="text-white text-[10px] font-bold">Save 30%</Text>
                        </View>

                        <View className="flex-row items-center justify-between mb-4">
                            <Text className={`text-[15px] font-bold ${selectedPlan === 'yearly' ? 'text-white' : 'text-gray-400'}`}>Yearly</Text>
                            {selectedPlan === 'yearly' ? (
                                <View className="w-5 h-5 rounded-full bg-white items-center justify-center">
                                    <Ionicons name="checkmark" size={14} color="#111111" />
                                </View>
                            ) : (
                                <View className="w-5 h-5 rounded-full border-2 border-gray-500" />
                            )}
                        </View>
                        <Text className={`text-[20px] font-bold ${selectedPlan === 'yearly' ? 'text-white' : 'text-gray-500'}`}>
                            $4.17<Text className="text-[13px] font-medium text-gray-500">/mo</Text>
                        </Text>
                    </TouchableOpacity>

                    {/* Monthly Card */}
                    <TouchableOpacity
                        onPress={() => setSelectedPlan('monthly')}
                        className={`flex-1 rounded-[16px] p-4 ${selectedPlan === 'monthly' ? 'bg-[#1C1C1E] border border-white' : 'bg-[#1C1C1E]/50 border border-transparent'}`}
                    >
                        <View className="flex-row items-center justify-between mb-4 mt-2">
                            <Text className={`text-[15px] font-bold ${selectedPlan === 'monthly' ? 'text-white' : 'text-gray-500'}`}>Monthly</Text>
                            {selectedPlan === 'monthly' ? (
                                <View className="w-5 h-5 rounded-full bg-white items-center justify-center">
                                    <Ionicons name="checkmark" size={14} color="#111111" />
                                </View>
                            ) : (
                                <View className="w-5 h-5 rounded-full border-2 border-gray-500" />
                            )}
                        </View>
                        <Text className={`text-[20px] font-bold ${selectedPlan === 'monthly' ? 'text-white' : 'text-gray-600'}`}>
                            $5.99<Text className="text-[13px] font-medium text-gray-600">/mo</Text>
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Footer Button */}
                <View className="px-6 w-full" style={{ paddingBottom: insets.bottom || 20 }}>
                    <TouchableOpacity
                        onPress={() => router.push('/onboarding/tutorial')}
                        className="w-full bg-transparent h-[56px] rounded-full items-center justify-center border border-white mb-4"
                    >
                        <Text className="text-white font-semibold text-[16px]">Continue</Text>
                    </TouchableOpacity>

                    <Text className="text-center text-[12px] text-gray-400">
                        {selectedPlan === 'yearly' ? 'Single payment of $49.99 for 12-months' : 'Billed monthly at $5.99'}
                    </Text>
                </View>

            </ScrollView>
        </View>
    );
}