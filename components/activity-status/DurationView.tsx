import { STATUS_DURATIONS } from '@/constants';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface Props {
    selectedDuration: string;
    setSelectedDuration: (duration: string) => void;
    onOpenCustom: () => void;
    onBack: () => void;
    onSave: () => void;
}

export const DurationView = ({ selectedDuration, setSelectedDuration, onOpenCustom, onBack, onSave }: Props) => {
    return (
        <View className="px-5 pt-2 ">
            {/* Header */}
            <View className="flex-row items-center justify-between mb-6">
                <TouchableOpacity onPress={onBack} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                    <Ionicons name="chevron-back" size={24} color="#9CA3AF" />
                </TouchableOpacity>
                <Text className="text-[16px] font-bold text-gray-900">Keep status</Text>
                <View className="w-6" />
            </View>

            <View className="bg-white border border-gray-100 rounded-[20px] mb-8 shadow-sm shadow-black/5 overflow-hidden">
                {STATUS_DURATIONS.map((duration, index) => {
                    const isSelected = selectedDuration.startsWith(duration) || (duration === 'Custom' && selectedDuration.startsWith('Until '));
                    const isLast = index === STATUS_DURATIONS.length - 1;

                    return (
                        <TouchableOpacity
                            key={duration}
                            onPress={() => duration === 'Custom' ? onOpenCustom() : setSelectedDuration(duration)}
                            className={`flex-row items-center justify-between p-5 ${!isLast ? 'border-b border-gray-50' : ''}`}
                        >
                            <View className="flex-row items-center gap-3">
                                {duration === 'Custom' && <Ionicons name="calendar-outline" size={20} color="#6B7280" />}
                                <Text className="text-[15px] font-bold text-gray-900">
                                    {duration === 'Custom' && selectedDuration.includes('/') ? selectedDuration : duration}
                                </Text>
                            </View>

                            {/* Custom Radio Button */}
                            <View className={`w-[22px] h-[22px] rounded-full border-[1.5px] items-center justify-center ${isSelected ? 'border-gray-900' : 'border-gray-300'}`}>
                                {isSelected && <View className="w-3 h-3 rounded-full bg-gray-900" />}
                            </View>
                        </TouchableOpacity>
                    );
                })}
            </View>

            {/* Save Button */}
            <TouchableOpacity onPress={onSave} className="bg-[#1C1C1E] h-[56px] rounded-full items-center justify-center">
                <Text className="text-white font-semibold text-[16px]">Save</Text>
            </TouchableOpacity>
        </View>
    );
};