import { ACTIVITY_STATUSES, ActivityStatus } from '@/constants';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface Props {
    selectedStatus: ActivityStatus;
    setSelectedStatus: (status: ActivityStatus) => void;
    currentDuration: string;
    onOpenDuration: () => void;
    onUpdate: () => void;
    onBack?: () => void;
}

export const StatusMainView = ({ selectedStatus, setSelectedStatus, currentDuration, onOpenDuration, onUpdate, onBack }: Props) => {
    return (
        <View className="px-5 pt-2 ">
            {/* Header */}
            <View className="flex-row items-center justify-between mb-6">
                <TouchableOpacity onPress={onBack} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                    <Ionicons name="chevron-back" size={24} color="#9CA3AF" />
                </TouchableOpacity>
                <Text className="text-[16px] font-bold text-gray-900">Activity Status</Text>
                <View className="w-6" />
            </View>

            {/* Status List */}
            <View className="gap-3 mb-6">
                {ACTIVITY_STATUSES.map((status) => {
                    const isSelected = selectedStatus.id === status.id;
                    return (
                        <TouchableOpacity
                            key={status.id}
                            onPress={() => setSelectedStatus(status)}
                            activeOpacity={0.7}
                            className="flex-row items-center justify-between bg-white border border-gray-100 rounded-[20px] p-4 shadow-sm shadow-black/5"
                        >
                            <View className="flex-row items-center gap-4">
                                <View className={`w-[42px] h-[42px] rounded-full items-center justify-center ${status.bgColor}`}>
                                    <Ionicons name={status.icon} size={20} color={status.iconColor} />
                                </View>
                                <View>
                                    <Text className="text-[15px] font-bold text-gray-900">{status.title}</Text>
                                    <Text className="text-[13px] font-medium text-gray-500">{status.subtitle}</Text>
                                </View>
                            </View>

                            {/* Custom Radio Button */}
                            <View className={`w-[22px] h-[22px] rounded-full border-[1.5px] items-center justify-center ${isSelected ? 'border-gray-900' : 'border-gray-300'}`}>
                                {isSelected && <View className="w-3 h-3 rounded-full bg-gray-900" />}
                            </View>
                        </TouchableOpacity>
                    );
                })}
            </View>

            {/* Keep Status Row */}
            <TouchableOpacity
                onPress={onOpenDuration}
                className="flex-row items-center justify-between bg-white border border-gray-100 rounded-[20px] p-5 mb-8 shadow-sm shadow-black/5"
            >
                <View className="flex-row items-center gap-2">
                    <Ionicons name="time-outline" size={20} color="#9CA3AF" />
                    <Text className="text-[15px] font-bold text-gray-900">Keep status</Text>
                </View>
                <View className="flex-row items-center gap-1">
                    <Text className={`text-[15px] font-medium ${currentDuration !== 'Until changed' ? 'text-gray-900 font-bold' : 'text-gray-400'}`}>
                        {currentDuration}
                    </Text>
                    <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
                </View>
            </TouchableOpacity>

            {/* Update Button */}
            <TouchableOpacity onPress={onUpdate} className="bg-[#1C1C1E] h-[56px] rounded-full items-center justify-center">
                <Text className="text-white font-semibold text-[16px]">Update</Text>
            </TouchableOpacity>
        </View>
    );
};