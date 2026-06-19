import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { ContinueButton } from '../../../components/onboarding/ContinueButton';

export default function UnitsScreen() {
    const router = useRouter();
    const [unit, setUnit] = useState('Imperial');

    return (
        <View className="flex-1 pt-8 pb-4">

            <View className="mb-12">
                <Text className="text-3xl font-bold text-slate-100">
                    How would you like to measure your metrics?
                </Text>
            </View>

            <View className="gap-5">
                <UnitOption
                    label="Imperial"
                    sub="Miles, feet, pounds, Fahrenheit, etc."
                    selected={unit === 'Imperial'}
                    onSelect={() => setUnit('Imperial')}
                    icon="speedometer"
                />
                <UnitOption
                    label="Metric"
                    sub="Kilometers, centimeters, kilograms, etc."
                    selected={unit === 'Metric'}
                    onSelect={() => setUnit('Metric')}
                    icon="globe"
                />
            </View>

            <View className="mt-auto">
                <View className="bg-[#151E33] border border-[#1E293B] rounded-[16px] p-4 mb-8 flex-row items-center gap-4">
                    <View className="w-10 h-10 bg-[#1E293B] border border-[#2D3748] rounded-[12px] items-center justify-center">
                        <Ionicons name="information" size={20} color="#94A3B8" />
                    </View>
                    <Text className="flex-1 text-slate-400 text-[14px] font-medium leading-5 pr-2">
                        This can be readjusted later in Settings.
                    </Text>
                </View>

                <View className="mb-2">
                    <ContinueButton onPress={() => router.push('/onboarding/notifications')} />
                </View>
            </View>

        </View>
    );
}

const UnitOption = ({ label, sub, selected, onSelect, icon }: any) => (
    <TouchableOpacity
        onPress={onSelect}
        activeOpacity={0.8}
        className={`p-6 rounded-[24px] border ${selected
            ? 'bg-[#4DB9F2]/10 border-[#4DB9F2]'
            : 'bg-[#151E33] border-[#1E293B]'
            }`}
    >
        <View className="flex-row items-start justify-between">
            <View className="flex-row items-center gap-4 mb-3">
                <View className={`w-12 h-12 rounded-[14px] items-center justify-center border ${selected
                    ? 'bg-[#4DB9F2] border-[#4DB9F2]'
                    : 'bg-[#1E293B] border-[#2D3748]'
                    }`}>
                    <Ionicons
                        name={icon}
                        size={22}
                        color={selected ? '#090D16' : '#64748B'}
                    />
                </View>
                <Text className={`text-[20px] font-bold ${selected ? 'text-slate-100' : 'text-slate-300'
                    }`}>
                    {label}
                </Text>
            </View>

            {/* Custom Checkbox */}
            <View className={`w-7 h-7 rounded-[8px] border items-center justify-center mt-2 ${selected
                ? 'border-[#4DB9F2] bg-[#4DB9F2]'
                : 'border-[#2D3748] bg-[#090D16]'
                }`}>
                {selected && <Ionicons name="checkmark" size={16} color="#090D16" />}
            </View>
        </View>

        <Text className={`text-[14px] font-medium leading-6 mt-1 ${selected ? 'text-[#4DB9F2]/80' : 'text-slate-500'
            }`}>
            {sub}
        </Text>
    </TouchableOpacity>
);