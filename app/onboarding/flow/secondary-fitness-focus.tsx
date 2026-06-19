import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { ContinueButton } from '../../../components/onboarding/ContinueButton';
import { SelectionCard } from '../../../components/onboarding/SelectionCard';

export default function SecondaryFitnessFocusScreen() {
    const router = useRouter();
    const [selected, setSelected] = useState<string | null>(null);

    const options = [
        {
            id: 'fitness',
            label: 'Lasting fitness',
            desc: 'Building strength and endurance to be at your best.',
            icon: <Ionicons name="barbell-outline" size={24} color="#F59E0B" />
        }
    ];

    const handleContinue = () => {
        router.push('/onboarding/flow/fitness-goals');
    };

    return (
        <View className="flex-1 flex-col">

            <View className="mb-6">
                <Text className="text-3xl font-bold text-white mb-2 ">
                    Is there anything else you’d like to focus on?
                </Text>
                <Text className="text-sm text-slate-400 font-medium">
                    Optional secondary configuration
                </Text>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
                <View className="flex-col gap-4">
                    {options.map((opt) => (
                        <SelectionCard
                            key={opt.id}
                            label={opt.label}
                            description={opt.desc}
                            icon={opt.icon}
                            selected={selected === opt.id}
                            onSelect={() => setSelected(opt.id === selected ? null : opt.id)}
                        />
                    ))}
                </View>

                {/* Info Block instead of just blank space */}
                <View className="bg-[#1E293B40] border border-[#1E293B] rounded-2xl p-5 flex-row gap-3 mt-4">
                    <Ionicons name="information-circle-outline" size={20} color="#4DB9F2" />
                    <Text className="flex-1 text-xs text-slate-400 leading-5">
                        Selecting secondary modules will calibrate your dashboard to prioritize additional telemetry metrics. You can bypass this step if no secondary focus is required.
                    </Text>
                </View>
            </ScrollView>

            <View className="mt-auto pt-4 flex-row gap-3">
                <TouchableOpacity
                    onPress={handleContinue}
                    activeOpacity={0.7}
                    className="flex-1 h-14 rounded-2xl items-center justify-center bg-[#151E33] border border-[#2D3748]"
                >
                    <Text className="text-slate-300 font-bold text-base">Skip phase</Text>
                </TouchableOpacity>

                <View className="flex-1">
                    <ContinueButton
                        enabled={!!selected}
                        onPress={handleContinue}
                    />
                </View>
            </View>

        </View>
    );
}