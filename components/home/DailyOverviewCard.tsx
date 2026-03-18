import { RING_DATA } from '@/constants';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface DailyOverviewCardProps {
    onRingPress: (label: string) => void;
}

export const DailyOverviewCard = ({ onRingPress }: DailyOverviewCardProps) => (
    <View className="bg-white rounded-[32px] p-6 shadow-sm border border-gray-50">
        <View className="flex-row justify-between mb-8">
            {RING_DATA.map((ring, index) => (
                <TouchableOpacity
                    key={index}
                    activeOpacity={0.7}
                    onPress={() => onRingPress(ring.label)}
                    className="items-center"
                    style={{ width: '30%' }}
                >
                    <View className="relative w-20 h-20 items-center justify-center">
                        <View className="absolute w-full h-full border-[6px] border-gray-100 rounded-full" />
                        {ring.filled && (
                            <View
                                className="absolute w-full h-full border-[6px] border-blue-400 rounded-full border-l-transparent border-b-transparent -rotate-45"
                                style={{ opacity: 0.6 }}
                            />
                        )}
                        <Text className="text-xl font-bold text-gray-800">{ring.value}</Text>
                    </View>
                    <Text className="text-[11px] font-bold text-gray-400 mt-2 uppercase tracking-tight">{ring.label}</Text>
                </TouchableOpacity>
            ))}
        </View>

        <View className="bg-orange-50/50 rounded-2xl p-4 border border-orange-100">
            <View className="flex-row items-center justify-between mb-2">
                <Text className="font-bold text-gray-800 text-[14px]">💪 Solid Strength Session!</Text>
                <Ionicons name="expand-outline" size={14} color="#9CA3AF" />
            </View>
            <Text className="text-[12px] text-gray-600 leading-5">
                That was a fantastic Strength Training session, adding 55 Strain and bringing your total Strain to 83%. It's impressive how you...
            </Text>
        </View>
    </View>
);
