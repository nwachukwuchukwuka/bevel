import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { ContinueButton } from '../../../components/onboarding/ContinueButton';
import { SelectionCard } from '../../../components/onboarding/SelectionCard';

export default function UnitsScreen() {
    const router = useRouter();
    const [unit, setUnit] = useState('Imperial');

    return (
        <View className="flex-1">
            <View className="mt-6 mb-8 items-center">
                <Text className="text-2xl font-bold text-center text-neutral-900 px-6">
                    How would you like to measure your metrics?
                </Text>
            </View>

            <View className="mt-4">
                <UnitOption
                    label="Imperial"
                    sub="Miles, feet, pounds, Fahrenheit, etc."
                    selected={unit === 'Imperial'}
                    onSelect={() => setUnit('Imperial')}
                />
                <UnitOption
                    label="Metric"
                    sub="Kilometers, centimeters, kilograms, etc."
                    selected={unit === 'Metric'}
                    onSelect={() => setUnit('Metric')}
                />
            </View>

            <Text className="text-center text-neutral-400 text-xs mt-6">
                This can be readjusted later in Settings.
            </Text>

            <View className="mt-auto mb-2">
                <ContinueButton onPress={() => router.push('/onboarding/notifications')} />
            </View>
        </View>
    );
}

const UnitOption = ({ label, sub, selected, onSelect }: any) => (
    <SelectionCard
        label={label}
        description={sub}
        selected={selected}
        onSelect={onSelect}
        type="checkbox" // Using checkbox style for radio layout reuse
    />
);