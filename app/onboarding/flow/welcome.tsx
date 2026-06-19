import { useRouter } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';
import { ContinueButton } from '../../../components/onboarding/ContinueButton';
import { Logo } from '../../../components/onboarding/Logo';

export default function WelcomeScreen() {
    const router = useRouter();

    return (
        <View className="flex-1 flex-col">

            <View className="flex-1 justify-center px-1">

                <View className="bg-[#151E33] border border-[#1E293B] rounded-3xl p-8 items-center mb-8 relative overflow-hidden">

                    <View className="w-24 h-24 bg-[#090D16] border border-[#2D3748] rounded-2xl items-center justify-center mb-8">
                        <Logo width={48} height={48} color="#4DB9F2" />
                    </View>

                    <Text className="text-3xl font-bold text-white mb-3 text-center">
                        Welcome to Bevel
                    </Text>

                    <Text className="text-slate-400 text-center leading-6 font-medium px-4">
                        Before you begin, lets take a few minutes to learn more about you!
                    </Text>
                </View>

                <View className="bg-[#1E293B40] border border-[#1E293B] rounded-2xl p-4 flex-row items-center justify-between">
                    <Text className="text-xs font-semibold text-slate-400">Profile configuration</Text>
                    <View className="bg-[#090D16] px-2 py-1 rounded-md border border-[#2D3748]">
                        <Text className="text-[10px] font-bold text-[#4DB9F2]">Pending</Text>
                    </View>
                </View>

            </View>

            <View className="mt-auto pt-4 ">
                <ContinueButton
                    label="Continue"
                    onPress={() => router.push('/onboarding/flow/name')}
                />
            </View>

        </View>
    );
}