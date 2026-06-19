import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { ContinueButton } from '../../../components/onboarding/ContinueButton';
import { SelectionCard } from '../../../components/onboarding/SelectionCard';

export default function HealthFocusScreen() {
    const router = useRouter();
    const [selected, setSelected] = useState<string | null>(null);

    const options = [
        {
            id: 'sleep',
            label: 'Better sleep',
            desc: 'Feeling rested every night and maintaining good sleep habits.',
            icon: <Ionicons name="moon-outline" size={24} color="#4DB9F2" />
        },
        {
            id: 'wellbeing',
            label: 'Improved wellbeing',
            desc: 'Eating better, stressing less, and forming habits that help you thrive.',
            icon: <Ionicons name="leaf-outline" size={24} color="#10B981" />
        },
        {
            id: 'fitness',
            label: 'Lasting fitness',
            desc: 'Building strength and endurance to be at your best.',
            icon: <Ionicons name="barbell-outline" size={24} color="#F59E0B" />
        }
    ];

    return (
        <View className="flex-1 flex-col">

            <View className="mb-6">
                <Text className="text-3xl font-bold text-white mb-2 ">
                    What is the most important aspect of health for you?
                </Text>
                <Text className="text-sm text-slate-400 font-medium">
                    Select primary tracking objective
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
                            onSelect={() => setSelected(opt.id)}
                        />
                    ))}
                </View>
            </ScrollView>

            <View className="mt-auto pt-4">
                <ContinueButton
                    enabled={!!selected}
                    onPress={() => router.push('/onboarding/flow/barriers')}
                />
            </View>

        </View>
    );
}