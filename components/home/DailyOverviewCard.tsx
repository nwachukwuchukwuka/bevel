import { RING_DATA } from '@/constants';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface DailyOverviewCardProps {
    onRingPress: (label: string) => void;
}

export const DailyOverviewCard = ({ onRingPress }: DailyOverviewCardProps) => (
    <View className="bg-[#151E33] rounded-[24px] p-6 border border-slate-800/80">
        {/* Header Alert Session */}
        <View className="bg-orange-950/20 rounded-2xl p-4 border border-orange-900/20 mb-6">
            <View className="flex-row items-center justify-between mb-2">
                <Text className="font-bold text-slate-200 text-[14px]">💪 Solid Strength Session!</Text>
                <Ionicons name="expand-outline" size={14} color="#94A3B8" />
            </View>
            <Text className="text-[12px] text-slate-400 leading-5">
                That was a fantastic Strength Training session, adding 55 Strain and bringing your total Strain to 83%. It's impressive how you...
            </Text>
        </View>

        {/* Vertical Progress Bars */}
        <View className="gap-4">
            {RING_DATA.map((ring, index) => {
                let fillPercent = 0;
                let valueText = ring.value;
                if (ring.label === 'Strain') {
                    fillPercent = 83;
                    valueText = '83%';
                } else if (ring.label === 'Recovery') {
                    fillPercent = 61;
                    valueText = '61%';
                } else if (ring.label === 'Sleep') {
                    fillPercent = 67;
                    valueText = '67%';
                }

                return (
                    <TouchableOpacity
                        key={index}
                        activeOpacity={0.7}
                        onPress={() => onRingPress(ring.label)}
                        className="flex-row items-center justify-between py-1"
                    >
                        <Text className="text-sm font-semibold text-slate-300 w-20">{ring.label}</Text>
                        <View className="flex-1 bg-slate-800 h-2.5 rounded-full mx-4 overflow-hidden relative">
                            <View 
                                className="h-full rounded-full" 
                                style={{ 
                                    width: `${fillPercent}%`,
                                    backgroundColor: ring.label === 'Strain' ? '#F97316' : ring.label === 'Recovery' ? '#10B981' : '#3B82F6'
                                }} 
                            />
                        </View>
                        <Text className="text-sm font-bold text-slate-100 w-12 text-right">{valueText}</Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    </View>
);
