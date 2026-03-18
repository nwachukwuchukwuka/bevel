import { RECOVERY_METRICS } from '@/constants';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

export default function RecoveryScreen() {
    const router = useRouter();
    const insets = useSafeAreaInsets();

    return (
        <View className="flex-1 bg-[#F9FAFB]">
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>

                {/* Hero Header */}
                <LinearGradient
                    colors={['#E0F2FE', '#ECFDF5', '#F9FAFB']}
                    style={{
                        paddingTop: 16,
                        paddingHorizontal: 20,
                        paddingBottom: 24,
                    }}
                >
                    <SafeAreaView>
                        <View className="flex-row items-center justify-between mb-8">
                            <TouchableOpacity onPress={() => router.back()} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                                <Ionicons name="chevron-back" size={24} color="#111827" />
                            </TouchableOpacity>
                            <View className="items-center">
                                <Text className="text-[18px] font-bold text-gray-900">Recovery</Text>
                                <View className="flex-row items-center gap-1">
                                    <Text className="text-[12px] font-medium text-gray-500">Today, 14 September</Text>
                                    <Ionicons name="chevron-down" size={12} color="#6B7280" />
                                </View>
                            </View>
                            <TouchableOpacity className="w-8 h-8 bg-white/50 rounded-full items-center justify-center">
                                <Ionicons name="information-circle-outline" size={20} color="#4B5563" />
                            </TouchableOpacity>
                        </View>

                        {/* Big Ring Mock */}
                        <View className="items-center justify-center mb-8">
                            <View className="w-40 h-40 bg-white rounded-full shadow-lg shadow-black/10 items-center justify-center relative">
                                <View className="absolute w-full h-full border-[12px] border-gray-100 rounded-full" />
                                <View className="absolute w-full h-full border-[12px] border-green-500 rounded-full border-l-transparent border-t-transparent rotate-45" />
                                <View className="items-center mt-2">
                                    <Text className="text-[36px] font-bold text-green-500">77<Text className="text-[20px]">%</Text></Text>
                                    <Text className="text-[10px]  text-gray-400 ">Recovered</Text>
                                </View>
                            </View>
                        </View>

                        {/* Quick Stats */}
                        <View className="flex-row gap-3 mb-4">
                            <View className="flex-1 bg-white/80 rounded-[20px] p-4 border border-white shadow-sm shadow-black/5">
                                <View className="flex-row items-center gap-1.5 mb-2">
                                    <Ionicons name="pulse" size={14} color="#9CA3AF" />
                                    <Text className="text-[12px] font-medium text-gray-500">Resting HRV</Text>
                                </View>
                                <Text className="text-[24px] font-bold text-gray-900">55,2 <Text className="text-[14px] text-gray-400 font-medium">ms</Text></Text>
                            </View>
                            <View className="flex-1 bg-white/80 rounded-[20px] p-4 border border-white shadow-sm shadow-black/5">
                                <View className="flex-row items-center gap-1.5 mb-2">
                                    <Ionicons name="heart" size={14} color="#9CA3AF" />
                                    <Text className="text-[12px] font-medium text-gray-500">Resting HR</Text>
                                </View>
                                <Text className="text-[24px] font-bold text-gray-900">62,0 <Text className="text-[14px] text-gray-400 font-medium">bpm</Text></Text>
                            </View>
                        </View>

                        {/* Insight Card */}
                        <View className="bg-white rounded-[20px] p-4 shadow-sm shadow-black/5 border border-red-50 mb-3 relative overflow-hidden">
                            <View className="absolute top-0 left-0 w-1 h-full bg-red-400" />
                            <View className="flex-row items-center justify-between mb-2 pl-2">
                                <Text className="text-[13px] font-bold text-gray-900">😴 Getting Enough Sleep Is Key</Text>
                                <Ionicons name="expand-outline" size={14} color="#9CA3AF" />
                            </View>
                            <Text className="text-[13px] text-gray-700 leading-5 font-medium pl-2">It looks like your Sleep Score dipped to 67% last night, a bit lower than yesterday's 77%. While your time asleep was a healthy 6 hours...</Text>
                        </View>

                        <TouchableOpacity className="bg-white rounded-[20px] p-4 flex-row items-center justify-between shadow-sm shadow-black/5">
                            <View className="flex-row items-center gap-2">
                                <Ionicons name="sparkles" size={16} color="#4B5563" />
                                <Text className="font-bold text-[14px] text-gray-900">View insights</Text>
                            </View>
                            <Ionicons name="chevron-forward" size={16} color="#9CA3AF" />
                        </TouchableOpacity>

                    </SafeAreaView>
                </LinearGradient>

                <View className="px-5 gap-6">
                    {/* Timeline */}
                    <View>
                        <Text className="text-[16px] font-bold text-gray-900 mb-3">Timeline</Text>
                        <TouchableOpacity onPress={() => router.push('/sleep/primary')} className="flex-row items-center justify-between bg-white p-4 rounded-[20px] border border-gray-100 shadow-sm shadow-black/5 mb-3">
                            <View className="flex-row items-center gap-4">
                                <View className="w-12 h-12 bg-indigo-50 rounded-[14px] border border-indigo-100 items-center justify-center relative">
                                    <Ionicons name="moon" size={24} color="#818CF8" />
                                    <View className="absolute -bottom-1 -right-1 bg-indigo-100 border border-white rounded-full px-1">
                                        <Text className="text-[9px] font-bold text-indigo-600">67</Text>
                                    </View>
                                </View>
                                <View>
                                    <Text className="font-bold text-[15px] text-gray-900">Primary sleep</Text>
                                    <Text className="text-[12px] font-medium text-gray-400">14/09/25 at 1.01 AM</Text>
                                </View>
                            </View>
                            <Ionicons name="chevron-forward" size={18} color="#D1D5DB" />
                        </TouchableOpacity>
                    </View>

                    {/* Metrics List */}
                    <View className="gap-3">
                        {RECOVERY_METRICS.map((metric) => (
                            <View key={metric.id} className="bg-white rounded-[20px] p-5 border border-gray-100 shadow-sm shadow-black/5 flex-row justify-between items-center">
                                <View className="gap-2">
                                    <View className="flex-row items-center gap-1.5">
                                        <Ionicons name="leaf-outline" size={14} color="#9CA3AF" />
                                        <Text className="text-[13px] font-bold text-gray-500">{metric.title}</Text>
                                    </View>
                                    <Text className="text-[24px] font-bold text-gray-900 tracking-tight">{metric.value} <Text className="text-[14px] text-gray-400 font-medium">{metric.unit}</Text></Text>
                                    <View className="flex-row items-center gap-1">
                                        <Ionicons name={metric.statusType === 'normal' ? 'checkmark-circle' : 'arrow-down-circle'} size={14} color={metric.statusType === 'normal' ? '#22C55E' : '#F97316'} />
                                        <Text className={`text-[12px] font-bold ${metric.statusType === 'normal' ? 'text-green-500' : 'text-orange-500'}`}>{metric.status}</Text>
                                    </View>
                                </View>

                                {/* Mock Area Chart Sparkline */}
                                <View className="w-24 h-12 relative items-end justify-end overflow-hidden">
                                    <View className={`w-full h-8 absolute bottom-0 rounded-t-lg opacity-20 ${metric.statusType === 'normal' ? 'bg-green-400' : 'bg-red-400'}`} />
                                    <Ionicons name="pulse" size={40} color={metric.statusType === 'normal' ? '#22C55E' : '#F97316'} />
                                    <View className={`absolute right-0 top-3 w-2 h-2 rounded-full border border-white ${metric.statusType === 'normal' ? 'bg-green-500' : 'bg-orange-500'}`} />
                                </View>
                            </View>
                        ))}
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}