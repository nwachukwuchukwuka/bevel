import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { ContinueButton } from '../../../components/onboarding/ContinueButton';
import { SelectionCard } from '../../../components/onboarding/SelectionCard';

export default function BarriersScreen() {
    const router = useRouter();
    const [selected, setSelected] = useState<string[]>([]);

    const toggle = (id: string) => {
        if (selected.includes(id)) {
            setSelected(selected.filter(i => i !== id));
        } else {
            setSelected([...selected, id]);
        }
    };

    const options = [
        'Unhealthy eating habits',
        'Difficulty managing stress',
        'Poor lifestyle choices',
        'All the above'
    ];

    return (
        <View className="flex-1 flex-col">

            <View className="mb-8">
                <Text className="text-3xl font-bold text-white mb-2">
                    What's holding you back from feeling your best?
                </Text>
                <Text className="text-sm text-slate-400 font-medium">
                    Select limiting factors
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

            <View className="mt-auto pt-4">
                <ContinueButton
                    enabled={selected.length > 0}
                    onPress={() => router.push('/onboarding/nutrition-edu')}
                />
            </View>

        </View>
    );
}