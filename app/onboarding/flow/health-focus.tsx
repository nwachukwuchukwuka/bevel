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
            icon: <Ionicons name="moon" size={32} color="#A3A3A3" className="bg-blue-50 p-2 rounded-full" />
        },
        {
            id: 'wellbeing',
            label: 'Improved wellbeing',
            desc: 'Eating better, stressing less, and forming habits that help you thrive.',
            icon: <Ionicons name="happy-outline" size={32} color="#86EFAC" className="bg-green-50 p-2 rounded-full" />
        },
        {
            id: 'fitness',
            label: 'Lasting fitness',
            desc: 'Building strength and endurance to be at your best.',
            icon: <Ionicons name="barbell-outline" size={32} color="#D4D4D4" className="bg-neutral-50 p-2 rounded-full" />
        }
    ];

    return (
        <View className="flex-1">
            <View className="mt-6 mb-8 items-center">
                <Text className="text-2xl font-bold text-center text-neutral-900">
                    What is the most important aspect of health for you?
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
                        onSelect={() => setSelected(opt.id)}
                    />
                ))}
            </ScrollView>

            <View className="mt-4 mb-2">
                <ContinueButton
                    enabled={!!selected}
                    onPress={() => router.push('/onboarding/flow/barriers')}
                />
            </View>
        </View>
    );
}