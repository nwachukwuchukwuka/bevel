import { TIMELINE_EVENTS } from '@/constants';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { ScrollView } from 'react-native';

export const TimelineSection = () => {
    return (
        <View className="mb-6">
            <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 20, gap: 16 }}
            >
                {TIMELINE_EVENTS.map((item) => (
                    <View key={item.id} className="w-48 relative">
                        {/* Event Details Card */}
                        <TouchableOpacity
                            activeOpacity={0.7}
                            className="w-full bg-[#151E33] rounded-2xl p-4 border border-slate-800/80 gap-2"
                        >
                            <View className="flex-row items-center justify-between">
                                <View className="flex-row items-center flex-1 mr-1 gap-1.5">
                                    <Text className="text-[15px]">{item.emoji}</Text>
                                    <Text className="font-bold text-[13px] text-slate-100 flex-1" numberOfLines={1}>
                                        {item.title}
                                    </Text>
                                </View>
                                {item.score && (
                                    <View className={`px-2 py-0.5 rounded-full ${item.scoreType === 'purple' ? 'bg-purple-950/60 border border-purple-800/30' : 'bg-blue-950/60 border border-blue-800/30'}`}>
                                        <Text className={`text-[8px] font-bold ${item.scoreType === 'purple' ? 'text-purple-400' : 'text-blue-400'}`}>
                                            {item.score}
                                        </Text>
                                    </View>
                                )}
                            </View>
                            <Text className="text-[10px] font-medium text-slate-400">{item.time.split(' at ')[1] || item.time}</Text>
                            <View className="flex-row items-center gap-1 mt-1 justify-end">
                                <Text className="text-[10px] font-bold text-blue-400">View</Text>
                                <Ionicons name="chevron-forward" size={10} color="#3B82F6" />
                            </View>
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};
