import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { ContinueButton } from '../../../components/onboarding/ContinueButton';
import { SelectionCard } from '../../../components/onboarding/SelectionCard';

export default function FitnessGoalsScreen() {
    const router = useRouter();
    const [selected, setSelected] = useState<string[]>([]);

    const toggle = (id: string) => {
        if (id === 'All the above') {
            if (selected.includes('All the above')) setSelected([]);
            else setSelected(['Improve cardio capacity', 'Establish a consistent training routine', 'Build muscular strength', 'All the above']);
            return;
        }
        let newSelection = selected.includes(id) ? selected.filter(i => i !== id) : [...selected, id];
        if (selected.includes('All the above') && newSelection.length < 3) {
            newSelection = newSelection.filter(i => i !== 'All the above');
        }
        setSelected(newSelection);
    };

    const options = [
        'Improve cardio capacity',
        'Establish a consistent training routine',
        'Build muscular strength',
        'All the above'
    ];

    return (
        <View className="flex-1">
            <View className="mt-6 mb-8 items-center">
                <Text className="text-2xl font-bold text-center text-neutral-900 px-4">
                    What part of fitness do you want to improve?
                </Text>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                {options.map((opt) => (
                    <SelectionCard
                        key={opt}
                        type="checkbox"
                        label={opt}
                        selected={selected.includes(opt)}
                        onSelect={() => toggle(opt)}
                    />
                ))}
            </ScrollView>

            <View className="mt-4 mb-2">
                <ContinueButton
                    enabled={selected.length > 0}
                    onPress={() => router.push('/onboarding/cardio-edu')}
                />
            </View>
        </View>
    );
}