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

        let newSelection = selected.includes(id)
            ? selected.filter(i => i !== id)
            : [...selected, id];

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
        <View className="flex-1 flex-col">

            <View className="mb-8">
                <Text className="text-3xl font-bold text-white mb-2 ">
                    What would you like to improve about your sleep?
                </Text>
                <Text className="text-sm text-slate-400 font-medium">
                    Configure sleep tracking parameters
                </Text>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
                <View className="flex-col gap-3">
                    {options.map((opt) => (
                        <SelectionCard
                            key={opt}
                            type="checkbox"
                            label={opt}
                            selected={selected.includes(opt)}
                            onSelect={() => toggle(opt)}
                        />
                    ))}
                </View>
            </ScrollView>

            <View className="mt-auto pt-4 ">
                <ContinueButton
                    enabled={selected.length > 0}
                    onPress={() => router.push('/onboarding/flow/secondary-fitness-focus')}

                />
            </View>

        </View>
    );
}