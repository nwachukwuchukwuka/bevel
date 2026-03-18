import { INSIGHTS_LOCKED_TAGS } from '@/constants';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

export default function InsightsModal() {
    const [tab, setTab] = useState<'Recovery' | 'Sleep'>('Sleep'); // Default to Sleep to match screenshot

    return (
        <View className="flex-1 bg-[#F9FAFB]">
            {/* Dynamic Background Image Mock */}
            <LinearGradient
                colors={tab === 'Recovery' ? ['#FDE047', '#E0F2FE', '#F9FAFB'] : ['#1E1B4B', '#1E3A8A', '#F9FAFB']}
                style={{ position: 'absolute', width: '100%', height: 350, top: 0 }}
            />

            {/* Stars/Moon Mock for Sleep Tab */}
            {tab === 'Sleep' && (
                <View className="absolute top-10 right-10 w-6 h-6 border-l-2 border-b-2 border-white rounded-full -rotate-45" />
            )}

            <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingTop: 60, paddingBottom: 40 }}>

                <View className="flex-row items-center gap-1.5 mb-2">
                    <Ionicons name="sparkles" size={16} color="white" />
                    <Text className="text-[13px] font-bold text-white">Insights</Text>
                </View>

                <Text className="text-[28px] font-bold text-white mb-2 ">{tab} score</Text>
                <Text className="text-[14px] text-white/90 leading-5 mb-10 pr-10">An analysis of how your daily behaviors and habits affect your {tab.toLowerCase()}.</Text>

                {/* Tabs */}
                <View className="flex-row gap-2 mb-10">
                    <TouchableOpacity onPress={() => setTab('Recovery')} className={`flex-1 py-3 rounded-full items-center ${tab === 'Recovery' ? 'bg-white ' : 'bg-white/20'}`}>
                        <Text className={`text-[15px] font-bold ${tab === 'Recovery' ? 'text-gray-900' : 'text-white/60'}`}>Recovery</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setTab('Sleep')} className={`flex-1 py-3 rounded-full items-center ${tab === 'Sleep' ? 'bg-white ' : 'bg-white/20'}`}>
                        <Text className={`text-[15px] font-bold ${tab === 'Sleep' ? 'text-gray-900' : 'text-white/60'}`}>Sleep</Text>
                    </TouchableOpacity>
                </View>

                {/* Content */}
                <Text className="text-[16px] font-bold text-gray-900 mb-1">Locked tags</Text>
                <Text className="text-[13px] text-gray-500 mb-6">Record at least 5 yes's and 5 no's in the last 90 days to unlock impact analysis.</Text>

                <View className="gap-3">
                    {INSIGHTS_LOCKED_TAGS.map(tag => (
                        <View key={tag.id} className="bg-white rounded-[20px] p-4 flex-row items-center justify-between border border-gray-100 ">
                            <View className="flex-row items-center gap-3">
                                <Ionicons name={tag.icon as any} size={20} color={tag.id === '1' ? '#3B82F6' : tag.id === '2' ? '#8B5CF6' : tag.id === '3' ? '#EF4444' : '#111827'} />
                                <Text className="text-[14px] font-bold text-gray-900">{tag.label}</Text>
                            </View>
                            <View className="flex-row gap-4">
                                <View className="flex-row items-center gap-1.5">
                                    <View className="w-6 h-6 bg-red-50 rounded-md items-center justify-center border border-red-100">
                                        <Ionicons name="close" size={14} color="#EF4444" />
                                    </View>
                                    <Text className="text-[14px] font-bold text-gray-500">{tag.id === '3' ? 6 : tag.noCount}</Text>
                                </View>
                                <View className="flex-row items-center gap-1.5">
                                    <View className={`w-6 h-6 rounded-md items-center justify-center ${tag.id === '3' ? 'bg-blue-50 border border-blue-100' : 'bg-blue-400'}`}>
                                        <Ionicons name="checkmark" size={14} color={tag.id === '3' ? '#93C5FD' : 'white'} />
                                    </View>
                                    <Text className="text-[14px] font-bold text-gray-900">{tag.id === '2' ? 7 : tag.id === '3' ? 0 : 6}</Text>
                                </View>
                            </View>
                        </View>
                    ))}
                </View>

            </ScrollView>
        </View>
    );
}