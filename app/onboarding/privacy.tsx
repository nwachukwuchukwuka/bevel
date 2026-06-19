import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { ContinueButton } from '../../components/onboarding/ContinueButton';
import { OnboardingLayout } from '../../components/onboarding/OnboardingLayout';

export default function PrivacyScreen() {
    const router = useRouter();

    return (
        <OnboardingLayout showBack={false}>
            <View className="flex-1 justify-center px-1">

                <View className="bg-[#151E33] border border-[#1E293B] rounded-3xl p-6 mb-8 flex-row items-center gap-5">
                    <View className="w-16 h-16 bg-[#1E293B] rounded-2xl items-center justify-center border border-[#2D3748]">
                        <Ionicons name="lock-closed" size={28} color="#10B981" />
                    </View>
                    <View className="flex-1">
                        <Text className="text-xl font-bold text-white mb-1">Privacy by design</Text>
                        <Text className="text-sm text-slate-400 leading-5">Security architecture</Text>
                    </View>
                </View>

                <View className="bg-[#1E293B40] border border-[#1E293B] rounded-2xl p-5 mb-8">
                    <Text className="text-sm text-slate-300 leading-6">
                        All health data is stored and processed locally. We never sell or share your information with third parties.
                    </Text>
                </View>

                <View className="flex-col gap-4 mb-10">
                    <PrivacyItem icon="document-text" label="Terms of Service" />
                    <PrivacyItem icon="shield-checkmark" label="Privacy Policy" />
                </View>

            </View>

            <View className="mt-auto pt-4">
                <ContinueButton
                    label="Accept and continue"
                    onPress={() => router.push('/onboarding/flow/welcome')}
                />
                <Text className="text-center text-xs text-slate-500 mt-4 px-2 leading-5">
                    By tapping on "Accept and continue", you agree to our Terms of Service and Privacy Policy.
                </Text>
            </View>
        </OnboardingLayout>
    );
}

const PrivacyItem = ({ icon, label }: { icon: any, label: string }) => (
    <TouchableOpacity
        activeOpacity={0.7}
        className="flex-row items-center bg-[#151E33] p-4 rounded-xl border border-[#1E293B] justify-between"
    >
        <View className="flex-row items-center gap-4">
            <Ionicons name={icon} size={20} color="#4DB9F2" />
            <Text className="text-white font-bold text-sm">{label}</Text>
        </View>
        <Ionicons name="open-outline" size={16} color="#94A3B8" />
    </TouchableOpacity>
);