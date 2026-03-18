import { TIMELINE_EVENTS } from '@/constants';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

export const TimelineSection = () => {
    return (
        <View className="mb-8">
            <View className="gap-3">
                {TIMELINE_EVENTS.map((item) => (
                    <TouchableOpacity
                        key={item.id}
                        activeOpacity={0.7}
                        className="flex-row items-center bg-white rounded-[20px] p-4 shadow-sm shadow-black/5 border border-gray-50"
                    >
                        {/* Emoji/Icon with Optional Badge */}
                        <View className="relative mr-4">
                            <View className="w-[52px] h-[52px] bg-gray-50 rounded-[16px] items-center justify-center border border-gray-100">
                                <Text className="text-[26px]">{item.emoji}</Text>
                            </View>
                            {item.score && (
                                <View className={`absolute -bottom-1 -right-2 border border-white rounded-full px-1.5 py-0.5 ${item.scoreType === 'purple' ? 'bg-purple-100' : 'bg-blue-100'}`}>
                                    <Text className={`text-[10px] font-extrabold ${item.scoreType === 'purple' ? 'text-purple-500' : 'text-blue-500'}`}>
                                        {item.score}
                                    </Text>
                                </View>
                            )}
                        </View>

                        {/* Text Info */}
                        <View className="flex-1 gap-1">
                            <Text className="font-bold text-[15px] text-gray-900" numberOfLines={1}>{item.title}</Text>
                            <Text className="text-[12px] font-medium text-gray-400">{item.time}</Text>
                        </View>

                        {/* Chevron */}
                        <Ionicons name="chevron-forward" size={18} color="#D1D5DB" />
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};