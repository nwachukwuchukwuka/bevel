import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const TrendCard = ({ title, value, subtitle, subtitleColor, icon, showSparkline, showBars, isEmpty, onPress }: any) => (
    <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.8}
        className="w-[300px] bg-[#1E293B] border border-[#2D3748] rounded-2xl p-5 mr-4 flex-col justify-between min-h-[160px]"
    >
        <View className="flex-row items-center justify-between mb-2">
            <View className="flex-row items-center gap-2">
                <Ionicons name={isEmpty ? "cube-outline" : (title === "Nutrition Score" ? "restaurant-outline" : title === "Macro Balance" ? "pie-chart-outline" : "add-circle-outline")} size={16} color="#4DB9F2" />
                <Text className="text-slate-400 font-semibold text-sm">{title}</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color="#94A3B8" />
        </View>

        <View className="flex-row items-end justify-between flex-1">
            <View className="flex-col">
                <Text className={`text-3xl font-bold mb-1 ${isEmpty ? 'text-slate-500' : 'text-slate-100'}`}>
                    {value}
                </Text>
                {subtitle && (
                    <View className="flex-row items-center gap-1 mt-1">
                        {icon && !isEmpty && <Ionicons name={icon} size={14} color="#4DB9F2" />}
                        {isEmpty && <Ionicons name="close-circle" size={14} color="#64748B" />}
                        <Text className={`text-xs font-semibold ${subtitleColor}`}>{subtitle}</Text>
                    </View>
                )}
            </View>

            <View className="w-16 h-12 justify-end items-end pb-1">
                {showSparkline && (
                    <View className="w-full h-full relative">
                        <View className="absolute bottom-2 left-0 w-2 h-4 bg-emerald-500 rounded-sm" />
                        <View className="absolute bottom-2 left-3 w-2 h-6 bg-emerald-500 rounded-sm" />
                        <View className="absolute bottom-2 left-6 w-2 h-3 bg-emerald-500 rounded-sm" />
                        <View className="absolute bottom-2 left-9 w-2 h-8 bg-emerald-500 rounded-sm" />
                        <View className="absolute bottom-2 left-12 w-2 h-10 bg-[#4DB9F2] rounded-sm" />
                    </View>
                )}

                {showBars && title === "Macro Balance" && (
                    <View className="w-full h-full flex-row items-end justify-end gap-1">
                        {[10, 15, 8, 20].map((h, i) => (
                            <View key={i} className="w-2 rounded-t-sm bg-[#4DB9F2]" style={{ height: h }} />
                        ))}
                    </View>
                )}

                {showBars && title === "Net Energy" && (
                    <View className="w-full h-full flex-row items-end justify-end gap-1">
                        {[15, 25, 10, 30].map((h, i) => (
                            <View key={i} className="w-2 rounded-t-sm bg-rose-500" style={{ height: h }} />
                        ))}
                    </View>
                )}
            </View>
        </View>
    </TouchableOpacity>
);

export default function NutritionDashboard() {
    const router = useRouter();

    const renderDotMatrix = (color: string, count: number, total: number = 24) => (
        <View className="flex-row flex-wrap w-[30%] gap-1">
            {Array.from({ length: total }).map((_, i) => (
                <View key={i} className={`w-1.5 h-1.5 rounded-sm ${i < count ? color : 'bg-[#1E293B]'}`} />
            ))}
        </View>
    );

    return (
        <View className="flex-1 bg-[#090D16]">
            <SafeAreaView className="flex-1" edges={['top']}>

                <View className="px-5 pt-4 pb-6 flex-row items-center justify-between">
                    <View>
                        <Text className="text-2xl font-bold text-slate-100">Nutrition metrics</Text>
                        <Text className="text-xs text-slate-400 mt-1">Today, 14 September</Text>
                    </View>
                    <View className="flex-row items-center gap-3">
                        <TouchableOpacity
                            onPress={() => router.back()}
                            activeOpacity={0.7}
                            className="w-10 h-10 bg-[#1E293B] border border-[#2D3748] rounded-xl items-center justify-center"
                        >
                            <Ionicons name="arrow-back" size={20} color="#4DB9F2" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.7}
                            className="w-10 h-10 bg-[#1E293B] border border-[#2D3748] rounded-xl items-center justify-center"
                        >
                            <Ionicons name="settings-outline" size={20} color="#94A3B8" />
                        </TouchableOpacity>
                    </View>
                </View>

                <ScrollView contentContainerStyle={{ paddingBottom: 100 }} showsVerticalScrollIndicator={false}>

                    <View className="mx-5 mb-6 bg-[#151E33] border border-[#1E293B] rounded-3xl p-6">
                        <View className="flex-row justify-between items-center mb-6">
                            <Text className="text-sm font-semibold text-slate-400">Daily nutrition score</Text>
                            <View className="bg-emerald-950/20 px-3 py-1 rounded-lg border border-emerald-500/20">
                                <Text className="text-xs font-bold text-emerald-500">optimal</Text>
                            </View>
                        </View>

                        <View className="flex-row items-baseline gap-3">
                            <Text className="text-6xl font-bold text-[#4DB9F2]">83</Text>
                            <Text className="text-sm font-semibold text-slate-500">/ 100 max</Text>
                        </View>

                        <View className="mt-8 flex-row gap-3">
                            {['Describe', 'Capture', 'Search'].map((action, i) => (
                                <TouchableOpacity
                                    key={action}
                                    activeOpacity={0.8}
                                    className="flex-1 bg-[#1E293B] border border-[#2D3748] rounded-xl py-3 flex-row justify-center items-center gap-2"
                                >
                                    <Ionicons name={i === 0 ? 'text' : i === 1 ? 'camera' : 'search'} size={14} color="#4DB9F2" />
                                    <Text className="font-semibold text-slate-200 text-xs">{action}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>

                    <View className="px-5 flex-row gap-4 mb-8">
                        <View className="flex-1 bg-[#151E33] border border-[#1E293B] rounded-2xl p-5">
                            <Text className="text-xs font-semibold text-slate-400 mb-2">Food Quality</Text>
                            <Text className="text-2xl font-bold text-slate-100 mb-1">83</Text>
                            <Text className="text-[10px] font-bold text-[#4DB9F2]">Optimal</Text>
                        </View>
                        <View className="flex-1 bg-[#151E33] border border-[#1E293B] rounded-2xl p-5">
                            <Text className="text-xs font-semibold text-slate-400 mb-2">Glucose Impact</Text>
                            <Text className="text-2xl font-bold text-slate-500 mb-1">-</Text>
                            <Text className="text-[10px] font-bold text-slate-600">No data</Text>
                        </View>
                    </View>

                    <View className="pl-5 mb-8">
                        <Text className="text-lg font-bold text-white mb-4">Metric trends</Text>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingRight: 20 }}>
                            <TrendCard
                                title="Nutrition Score" value="83" subtitle="Above normal" subtitleColor="text-[#4DB9F2]" icon="trending-up" showSparkline
                                onPress={() => router.push({ pathname: '/nutrition/trend-details', params: { type: 'score' } })}
                            />
                            <TrendCard
                                title="Macro Balance" value="160 g" showBars
                                onPress={() => router.push({ pathname: '/nutrition/trend-details', params: { type: 'macro' } })}
                            />
                            <TrendCard
                                title="Net Energy" value="-483 kCal" subtitle="Deficit" subtitleColor="text-rose-500" showBars
                                onPress={() => router.push({ pathname: '/nutrition/trend-details', params: { type: 'energy' } })}
                            />
                        </ScrollView>
                    </View>

                    <View className="px-5 mb-8">
                        <TouchableOpacity
                            onPress={() => router.push('/nutrition/nutritional-details')}
                            activeOpacity={0.8}
                            className="bg-[#151E33] border border-[#1E293B] rounded-3xl p-6"
                        >
                            <View className="flex-row justify-between items-center mb-6">
                                <Text className="font-bold text-slate-100 text-lg">Nutritional Details</Text>
                                <View className="flex-row items-center gap-3">
                                    <View className="flex-row bg-[#090D16] rounded-lg border border-[#1E293B] p-0.5">
                                        <View className="bg-[#1E293B] px-2 py-1 rounded-md"><Text className="text-[10px] font-bold text-slate-200">g</Text></View>
                                        <View className="px-2 py-1"><Text className="text-[10px] font-bold text-slate-500">%</Text></View>
                                    </View>
                                    <Ionicons name="chevron-forward" size={16} color="#94A3B8" />
                                </View>
                            </View>

                            <View className="flex-row justify-between mb-4">
                                {renderDotMatrix('bg-[#4DB9F2]', 10)}
                                {renderDotMatrix('bg-[#F59E0B]', 18)}
                                {renderDotMatrix('bg-rose-500', 8)}
                            </View>

                            <View className="flex-row justify-between mb-6 pb-6 border-b border-[#1E293B]">
                                <View><Text className="font-bold text-white text-base">38.3 g</Text><Text className="text-[#4DB9F2] text-xs font-semibold mt-1">Fat</Text></View>
                                <View><Text className="font-bold text-white text-base">94.7 g</Text><Text className="text-[#F59E0B] text-xs font-semibold mt-1">Carbs</Text></View>
                                <View><Text className="font-bold text-white text-base">27.0 g</Text><Text className="text-rose-500 text-xs font-semibold mt-1">Protein</Text></View>
                            </View>

                            <View className="flex-row justify-between items-center mb-4">
                                <View>
                                    <Text className="text-xs text-slate-400 font-semibold mb-1">Net Energy</Text>
                                    <Text className="font-bold text-white text-xl">-483 kCal</Text>
                                </View>
                                <View className="flex-row gap-4">
                                    <View className="flex-row items-center gap-1.5"><Ionicons name="flame" size={12} color="#F97316" /><Text className="font-semibold text-slate-300 text-sm">1,182</Text></View>
                                    <View className="flex-row items-center gap-1.5"><Ionicons name="nutrition" size={12} color="#10B981" /><Text className="font-semibold text-slate-300 text-sm">699</Text></View>
                                </View>
                            </View>

                            <View className="h-2 w-full bg-[#1E293B] rounded-full overflow-hidden flex-row">
                                <View className="h-full bg-[#4DB9F2]" style={{ width: '20%' }} />
                                <View className="h-full bg-[#10B981]" style={{ width: '30%' }} />
                                <View className="h-full bg-rose-500" style={{ width: '15%' }} />
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View className="px-5 mb-8">
                        <View className="flex-row justify-between items-center mb-4">
                            <Text className="text-lg font-bold text-white">Event timeline</Text>
                            <TouchableOpacity className="w-8 h-8 bg-[#1E293B] border border-[#2D3748] rounded-lg items-center justify-center">
                                <Ionicons name="add" size={16} color="#4DB9F2" />
                            </TouchableOpacity>
                        </View>

                        <View className="gap-3">
                            {[
                                { icon: '🥑', name: 'Avocado Toast with Fried Egg', time: '14/09/25 at 12:48 PM', score: '88', color: 'bg-emerald-950/30 border-emerald-500/30 text-emerald-400' },
                                { icon: '☕️', name: 'Coffee Latte', time: '14/09/25 at 12:48 PM', score: '61', color: 'bg-amber-950/30 border-amber-500/30 text-amber-400' }
                            ].map((item, i) => (
                                <TouchableOpacity
                                    key={i}
                                    onPress={() => router.push('/nutrition/log-details')}
                                    activeOpacity={0.8}
                                    className="bg-[#151E33] border border-[#1E293B] rounded-2xl p-4 flex-row items-center justify-between"
                                >
                                    <View className="flex-row items-center gap-4 flex-1">
                                        <View className="w-12 h-12 bg-[#1E293B] rounded-xl items-center justify-center border border-[#2D3748] relative">
                                            <Text className="text-2xl">{item.icon}</Text>
                                        </View>
                                        <View className="flex-1 pr-2">
                                            <Text className="font-bold text-slate-100 text-sm mb-1" numberOfLines={1}>{item.name}</Text>
                                            <Text className="text-slate-500 text-[10px] font-medium">{item.time}</Text>
                                        </View>
                                    </View>
                                    <View className={`px-2 py-1 rounded border ${item.color}`}>
                                        <Text className="text-xs font-bold text-white">{item.score}</Text>
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>

                    <View className="px-5 flex-row gap-4 mb-6">
                        <TouchableOpacity
                            onPress={() => router.push('/nutrition/my-foods')}
                            activeOpacity={0.8}
                            className="flex-1 bg-[#151E33] border border-[#1E293B] rounded-2xl p-5 justify-between min-h-[120px]"
                        >
                            <Ionicons name="fast-food-outline" size={20} color="#4DB9F2" className="mb-2" />
                            <View>
                                <Text className="font-bold text-slate-100 text-base mb-1">My Foods</Text>
                                <Text className="text-slate-500 text-[10px] font-medium">0 favorites • 2 entries</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => router.push('/nutrition/goals')}
                            activeOpacity={0.8}
                            className="flex-1 bg-[#151E33] border border-[#1E293B] rounded-2xl p-5 justify-between min-h-[120px]"
                        >
                            <Ionicons name="flag-outline" size={20} color="#4DB9F2" className="mb-2" />
                            <View>
                                <Text className="font-bold text-slate-100 text-base mb-1">Goals</Text>
                                <Text className="text-slate-500 text-[10px] font-medium">Caloric & macro targets</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View className="px-5">
                        <TouchableOpacity
                            onPress={() => router.push('/nutrition/cgm')}
                            activeOpacity={0.8} className="bg-[#1E293B40] border border-[#1E293B] rounded-2xl p-6 flex-row items-center justify-between">
                            <View className="flex-1 pr-4">
                                <Text className="font-bold text-slate-100 text-base mb-1">Connect CGM device</Text>
                                <Text className="text-slate-400 text-xs leading-5">Enable personalized nutrition scoring driven by real-time glucose telemetry.</Text>
                            </View>
                            <Ionicons name="hardware-chip-outline" size={32} color="#94A3B8" />
                        </TouchableOpacity>
                    </View>

                </ScrollView>
            </SafeAreaView>
        </View>
    );
}