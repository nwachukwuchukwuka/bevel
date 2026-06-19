import { INSIGHTS_LOCKED_TAGS } from '@/constants';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

export default function InsightsModal() {
    const [tab, setTab] = useState<'Recovery' | 'Sleep'>('Sleep'); // Default to Sleep to match screenshot

    return (
        <View className="flex-1 bg-[#090D16]">
            {/* Dynamic Background Image Mock */}
            <LinearGradient
                colors={tab === 'Recovery' ? ['#064E3B', '#090D16', '#090D16'] : ['#1E1B4B', '#090D16', '#090D16']}
                style={{ position: 'absolute', width: '100%', height: 400, top: 0, opacity: 0.6 }}
            />

            {/* Stars/Moon Mock for Sleep Tab */}
            {tab === 'Sleep' && (
                <View className="absolute top-12 right-10 w-8 h-8 border-l-4 border-b-4 border-[#F1F5F9] rounded-full -rotate-45 opacity-80" />
            )}

            <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingTop: 60, paddingBottom: 40 }}>

                <View className="flex-row items-center gap-2 mb-3">
                    <View className="w-8 h-8 bg-[#0F172A] border border-[#1E2D4A] rounded-[10px] items-center justify-center">
                        <Ionicons name="sparkles" size={16} color="#4DB9F2" />
                    </View>
                    <Text className="text-[15px]  text-[#F1F5F9]">Insights</Text>
                </View>

                <Text className="text-[32px]  text-[#F1F5F9] mb-3">{tab} score</Text>
                <Text className="text-[15px] text-[#94A3B8] leading-6 mb-10 pr-10 font-medium">An analysis of how your daily behaviors and habits affect your {tab.toLowerCase()}.</Text>

                {/* Tabs */}
                <View className="flex-row bg-[#151E33] p-1.5 rounded-[16px] border border-[#1E2D4A] mb-10">
                    <TouchableOpacity onPress={() => setTab('Recovery')} className={`flex-1 py-3 rounded-[12px] items-center ${tab === 'Recovery' ? 'bg-[#4DB9F2]' : 'bg-transparent'}`}>
                        <Text className={`text-[15px]  ${tab === 'Recovery' ? 'text-[#090D16]' : 'text-[#64748B]'}`}>Recovery</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setTab('Sleep')} className={`flex-1 py-3 rounded-[12px] items-center ${tab === 'Sleep' ? 'bg-[#4DB9F2]' : 'bg-transparent'}`}>
                        <Text className={`text-[15px]  ${tab === 'Sleep' ? 'text-[#090D16]' : 'text-[#64748B]'}`}>Sleep</Text>
                    </TouchableOpacity>
                </View>

                {/* Content */}
                <Text className="text-[18px]  text-[#F1F5F9] mb-2">Locked tags</Text>
                <Text className="text-[14px] font-medium text-[#64748B] mb-8 leading-5">Record at least 5 yes's and 5 no's in the last 90 days to unlock impact analysis.</Text>

                <View className="gap-4">
                    {INSIGHTS_LOCKED_TAGS.map(tag => (
                        <View key={tag.id} className="bg-[#151E33] rounded-[24px] p-5 flex-row items-center justify-between border border-[#1E2D4A]">
                            <View className="flex-row items-center gap-4">
                                <View className="w-12 h-12 bg-[#0F172A] rounded-[14px] items-center justify-center border border-[#1E2D4A]">
                                    <Ionicons name={tag.icon as any} size={24} color="#4DB9F2" />
                                </View>
                                <Text className="text-[16px]  text-[#F1F5F9]">{tag.label}</Text>
                            </View>

                            <View className="flex-row gap-2">
                                <View className="flex-row items-center gap-1.5 bg-[#0F172A] px-3 py-2 rounded-[12px] border border-[#1E2D4A]">
                                    <Ionicons name="close" size={14} color="#F87171" />
                                    <Text className="text-[14px]  text-[#F1F5F9]">{tag.id === '3' ? 6 : tag.noCount}</Text>
                                </View>
                                <View className="flex-row items-center gap-1.5 bg-[#0F172A] px-3 py-2 rounded-[12px] border border-[#1E2D4A]">
                                    <Ionicons name="checkmark" size={14} color="#4DB9F2" />
                                    <Text className="text-[14px]  text-[#F1F5F9]">{tag.id === '2' ? 7 : tag.id === '3' ? 0 : 6}</Text>
                                </View>
                            </View>
                        </View>
                    ))}
                </View>

            </ScrollView>
        </View>
    );
}