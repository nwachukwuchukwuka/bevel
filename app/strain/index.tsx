import { TargetStrainSheet, TargetStrainSheetRef } from '@/components/strain/TargetStrainSheet';
import { HR_ZONES, STRAIN_TRENDS } from '@/constants';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useRef } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function StrainScreen() {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const infoSheetRef = useRef<TargetStrainSheetRef>(null);

    return (
        <View className="flex-1 bg-[#F9FAFB]">
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>

                {/* Top Gradient Header Area */}
                <LinearGradient
                    colors={['#FEE2E2', '#FFEDD5', '#F9FAFB']}
                    style={{
                        paddingHorizontal: 15,
                        // paddingBottom: 24,
                        borderBottomLeftRadius: 40,
                        borderBottomRightRadius: 40,
                    }}
                >
                    <View style={{ paddingTop: insets.top }} className="flex-row items-center justify-between mb-8">
                        <TouchableOpacity onPress={() => router.back()} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                            <Ionicons name="chevron-back" size={24} color="#111827" />
                        </TouchableOpacity>
                        <View className="items-center">
                            <Text className="text-[18px] font-bold text-gray-900">Strain</Text>
                            <View className="flex-row items-center gap-1">
                                <Text className="text-[12px] font-medium text-gray-500">Today, 14 September</Text>
                                <Ionicons name="chevron-down" size={12} color="#6B7280" />
                            </View>
                        </View>
                        <TouchableOpacity onPress={() => infoSheetRef.current?.present()} className="w-8 h-8 bg-white/50 rounded-full items-center justify-center">
                            <Ionicons name="information-circle-outline" size={20} color="#4B5563" />
                        </TouchableOpacity>
                    </View>

                    {/* Big Ring Mock */}
                    <View className="items-center justify-center mb-8">
                        <View className="w-40 h-40 bg-white rounded-full shadow-lg shadow-black/10 items-center justify-center relative">
                            <View className="absolute w-full h-full border-[12px] border-gray-100 rounded-full" />
                            <View className="absolute w-full h-full border-[12px] border-orange-400 rounded-full border-l-transparent border-t-transparent -rotate-45" />
                            <View className="items-center">
                                <Text className="text-[36px] font-bold text-orange-500">38<Text className="text-[20px]">%</Text></Text>
                                <Text className="text-[12px] font-bold text-gray-400 uppercase tracking-widest">Strain</Text>
                            </View>
                        </View>
                    </View>

                    {/* Quick Stats */}
                    <View className="flex-row gap-3 mb-4">
                        <View className="flex-1 bg-white/60 rounded-[20px] p-4 border border-white">
                            <View className="flex-row items-center gap-1.5 mb-2">
                                <Ionicons name="time-outline" size={14} color="#9CA3AF" />
                                <Text className="text-[12px] font-medium text-gray-500">Duration</Text>
                            </View>
                            <Text className="text-[24px] font-bold text-gray-900">53m</Text>
                        </View>
                        <View className="flex-1 bg-white/60 rounded-[20px] p-4 border border-white">
                            <View className="flex-row items-center gap-1.5 mb-2">
                                <Ionicons name="flame-outline" size={14} color="#9CA3AF" />
                                <Text className="text-[12px] font-medium text-gray-500">Total Energy</Text>
                            </View>
                            <Text className="text-[24px] font-bold text-gray-900">882 <Text className="text-[14px] text-gray-400 font-medium">kCal</Text></Text>
                        </View>
                    </View>

                    {/* Insight Card */}
                    <View className="bg-yellow-50/80 rounded-[20px] p-4 border border-yellow-100">
                        <View className="flex-row items-center justify-between mb-2">
                            <Text className="text-[13px] font-bold text-gray-900">⚡ Efficient Morning Workout!</Text>
                            <Ionicons name="expand-outline" size={14} color="#9CA3AF" />
                        </View>
                        <Text className="text-[13px] text-gray-700 leading-5 font-medium">That 45-minute Indoor Walk was a great way to start your Sunday, bringing your Strain to 38% and keeping you within your normal range.</Text>
                    </View>
                </LinearGradient>

                <View className="px-5 mt-6 gap-6">
                    {/* Timeline */}
                    <View>
                        <Text className="text-[16px] font-bold text-gray-900 mb-3">Timeline</Text>
                        <TouchableOpacity onPress={() => router.push('/strain/activity/1')} className="flex-row items-center justify-between bg-white p-4 rounded-[20px] border border-gray-100 shadow-sm shadow-black/5 mb-3">
                            <View className="flex-row items-center gap-4">
                                <View className="w-12 h-12 bg-gray-50 rounded-[14px] border border-gray-100 items-center justify-center relative">
                                    <Ionicons name="walk" size={24} color="#F59E0B" />
                                    <View className="absolute -bottom-1 -right-1 bg-yellow-100 border border-white rounded-full px-1">
                                        <Text className="text-[9px] font-bold text-yellow-600">31</Text>
                                    </View>
                                </View>
                                <View>
                                    <Text className="font-bold text-[15px] text-gray-900">Indoor Walk</Text>
                                    <Text className="text-[12px] font-medium text-gray-400">14/09/25 at 8.22 AM</Text>
                                </View>
                            </View>
                            <Ionicons name="chevron-forward" size={18} color="#D1D5DB" />
                        </TouchableOpacity>
                    </View>

                    {/* Heart Rate Zones */}
                    <View>
                        <Text className="text-[16px] font-bold text-gray-900 mb-3">Heart Rate Zones</Text>
                        <View className="bg-white rounded-[24px] p-2 border border-gray-100 shadow-sm shadow-black/5">
                            {HR_ZONES.map((zone, idx) => (
                                <View key={zone.zone} className={`flex-row items-center justify-between p-3 ${idx !== HR_ZONES.length - 1 ? 'border-b border-gray-50' : ''}`}>
                                    <View className="flex-row items-center gap-3 w-1/3">
                                        <Text className="text-[13px] font-bold text-gray-400">{zone.zone}</Text>
                                        <View className={`w-3 h-1.5 rounded-full ${zone.color}`} />
                                    </View>
                                    <Text className={`text-[13px] font-bold w-1/3 text-center ${zone.zone === 0 ? 'text-gray-300' : 'text-gray-900'}`}>{zone.duration}</Text>
                                    <Text className="text-[12px] font-medium text-gray-400 w-1/3 text-right">{zone.range}</Text>
                                </View>
                            ))}
                        </View>
                    </View>

                    {/* Trends */}
                    <View>
                        <Text className="text-[16px] font-bold text-gray-900 mb-3">Trends</Text>
                        <View className="gap-3">
                            {STRAIN_TRENDS.map((trend, idx) => (
                                <TouchableOpacity
                                    key={trend.id}
                                    onPress={() => idx === 0 ? router.push('/strain/score-details') : null}
                                    className="bg-white rounded-[20px] p-5 border border-gray-100 shadow-sm shadow-black/5 flex-row justify-between items-center"
                                >
                                    <View className="gap-2">
                                        <View className="flex-row items-center gap-1.5">
                                            <Ionicons name="analytics-outline" size={14} color="#9CA3AF" />
                                            <Text className="text-[13px] font-bold text-gray-500">{trend.title}</Text>
                                        </View>
                                        <Text className="text-[24px] font-bold text-gray-900 tracking-tight">{trend.value} <Text className="text-[14px] text-gray-400 font-medium">{trend.unit}</Text></Text>
                                        <View className="flex-row items-center gap-1">
                                            <Ionicons name="arrow-up-circle" size={14} color="#3B82F6" />
                                            <Text className="text-[12px] font-bold text-blue-500">{trend.status}</Text>
                                        </View>
                                    </View>

                                    {/* Mock Sparkline Graph */}
                                    <View className="w-24 h-12 relative items-end justify-end">
                                        <Ionicons name="pulse" size={40} color="#F59E0B" style={{ opacity: 0.8 }} />
                                        <View className="absolute right-0 top-2 w-2 h-2 rounded-full bg-orange-500 border border-white" />
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                </View>
            </ScrollView>

            <TargetStrainSheet ref={infoSheetRef} />
        </View>
    );
}