import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';
import { ContinueButton } from '../../components/onboarding/ContinueButton';
import { OnboardingLayout } from '../../components/onboarding/OnboardingLayout';

export default function SleepEduScreen() {
    const router = useRouter();

    return (
        <View className="flex-1 bg-[#1C1C1E]">
            <LinearGradient
                colors={['#2E335A', '#1C1C1E']}
                style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                }}
            />

            <OnboardingLayout showBack={false} darkTheme>
                <View className="flex-1 items-center justify-center w-full">

                    {/* Mock Sleep Stats Card */}
                    <View className="w-full bg-white/10 rounded-3xl p-6 border border-white/10 mb-10 gap-6">
                        <SleepBar label="Sleep efficiency" value="Fair" color="bg-yellow-400" width="w-3/4" />
                        <SleepBar label="Time asleep" value="Good" color="bg-green-400" width="w-2/3" />
                        <SleepBar label="Deep sleep" value="Excellent" color="bg-blue-400" width="w-full" />
                    </View>

                    <Text className="text-2xl font-bold text-white mb-4 text-center">Understand your sleep quality</Text>
                    <Text className="text-center text-neutral-400 leading-6 px-4">
                        Bevel breaks down your sleep stages, heart rate trends, and efficiency to help you rest deeper.
                    </Text>
                </View>

                <View className="mb-4">
                    <ContinueButton
                        label="Continue"
                        variant="primary" // In dark mode, primary is typically white/bright, but sticking to black pill or adjust styling for dark mode
                        onPress={() => router.push('/onboarding/wind-down')}
                    />
                    {/* Custom styling for button in dark mode context if needed */}
                </View>
            </OnboardingLayout>
        </View>
    );
}

const SleepBar = ({ label, value, color, width }: any) => (
    <View>
        <View className="flex-row justify-between mb-2">
            <Text className="text-neutral-300 text-sm font-medium">{label}</Text>
            <Text className={`text-sm font-bold ${color.replace('bg-', 'text-')}`}>{value}</Text>
        </View>
        <View className="h-1.5 bg-white/10 rounded-full w-full">
            <View className={`h-full rounded-full ${color} ${width}`} />
        </View>
    </View>
);