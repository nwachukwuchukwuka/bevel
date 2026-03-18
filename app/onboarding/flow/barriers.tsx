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
        <View className="flex-1">
            <View className="mt-6 mb-8 items-center">
                <Text className="text-2xl font-bold text-center text-neutral-900">
                    What's holding you back from feeling your best?
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
                    onPress={() => router.push('/onboarding/nutrition-edu')}
                />
            </View>
        </View>
    );
}