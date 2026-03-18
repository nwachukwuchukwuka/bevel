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
            icon: <Ionicons name="barbell-outline" size={32} color="#D4D4D4" className="bg-neutral-50 p-2 rounded-full" />
        }
    ];

    const handleContinue = () => {
        router.push('/onboarding/flow/fitness-goals');
    };

    return (
        <View className="flex-1">
            <View className="mt-6 mb-8 items-center">
                <Text className="text-2xl font-bold text-center text-neutral-900 px-4">
                    Is there anything else you’d like to focus on?
                </Text>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
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
            </ScrollView>

            <View className="mt-4 mb-2 gap-3">
                {/* Skip Button */}
                <TouchableOpacity
                    onPress={handleContinue}
                    className="w-full h-14 rounded-full items-center justify-center bg-neutral-100"
                >
                    <Text className="text-base font-bold text-neutral-900">Skip</Text>
                </TouchableOpacity>

                <ContinueButton
                    enabled={!!selected}
                    onPress={handleContinue}
                />
            </View>
        </View>
    );
}