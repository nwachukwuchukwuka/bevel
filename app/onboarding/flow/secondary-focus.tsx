import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { ContinueButton } from '../../../components/onboarding/ContinueButton';
import { SelectionCard } from '../../../components/onboarding/SelectionCard';

export default function SecondaryFocusScreen() {
    const router = useRouter();
    const [selected, setSelected] = useState<string | null>(null);

    const options = [
        {
            id: 'sleep',
            label: 'Better sleep',
            desc: 'Feeling rested every night and maintaining good sleep habits.',
            icon: <Ionicons name="moon-outline" size={24} color="#818CF8" />
        },
        {
            id: 'fitness',
            label: 'Lasting fitness',
            desc: 'Building strength and endurance to be at your best.',
            icon: <Ionicons name="barbell-outline" size={24} color="#F59E0B" />
        }
    ];

    const handleContinue = () => {
        router.push('/onboarding/flow/sleep-goals');
    };

    return (
        <View className="flex-1 flex-col">

            <View className="mb-6">
                <Text className="text-3xl font-bold text-white mb-2">
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