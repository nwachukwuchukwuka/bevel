import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { ContinueButton } from '../../../components/onboarding/ContinueButton';
import { SelectionCard } from '../../../components/onboarding/SelectionCard';

export default function SleepGoalsScreen() {
    const router = useRouter();
    const [selected, setSelected] = useState<string[]>([]);

    const toggle = (id: string) => {
        if (id === 'All the above') {
            if (selected.includes('All the above')) {
                setSelected([]);
            } else {
                setSelected(['Build a consistent sleep schedule', 'Improve sleep quality', 'Fall asleep faster', 'All the above']);
            }
            return;
        }

        // Normal toggle behavior
        let newSelection = selected.includes(id)
            ? selected.filter(i => i !== id)
            : [...selected, id];

        // Handle unchecking "All" if one is unchecked
        if (selected.includes('All the above') && newSelection.length < 4) {
            newSelection = newSelection.filter(i => i !== 'All the above');
        }

        setSelected(newSelection);
    };

    const options = [
        'Build a consistent sleep schedule',
        'Improve sleep quality',
        'Fall asleep faster',
        'All the above'
    ];

    return (
        <View className="flex-1">
            <View className="mt-6 mb-8 items-center">
                <Text className="text-2xl font-bold text-center text-neutral-900 px-2">
                    What would you like to improve about your sleep?
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
                    onPress={() => router.push('/onboarding/sleep-edu')}
                />
            </View>
        </View>
    );
}