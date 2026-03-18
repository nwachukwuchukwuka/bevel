import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


const TrendCard = ({ title, value, subtitle, subtitleColor, icon, showSparkline, showBars, isEmpty, onPress }: any) => (
    <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.8}
        className="bg-white rounded-[24px] p-5 shadow-sm border border-gray-50 flex-row justify-between items-center"
        style={styles.shadow}
    >
        <View className="flex-1">
            <View className="flex-row items-center gap-2 mb-3">
                <Ionicons name={isEmpty ? "cube-outline" : (title === "Nutrition Score" ? "restaurant-outline" : title === "Macro Balance" ? "pie-chart-outline" : "add-circle-outline")} size={16} color="#9CA3AF" />
                <Text className="text-gray-400 font-bold text-[15px]">{title}</Text>
            </View>
            <Text className={`text-[34px] font-bold ${isEmpty ? 'text-gray-300' : 'text-gray-900'} mb-1`}>{value}</Text>
            {subtitle && (
                <View className="flex-row items-center gap-1">
                    {icon && !isEmpty && (
                        <View className="w-5 h-5 bg-blue-100 rounded-full items-center justify-center">
                            <Ionicons name={icon} size={12} color="#3B82F6" />
                        </View>
                    )}
                    {isEmpty && <Ionicons name="close-circle" size={12} color="#D1D5DB" />}
                    <Text className={`text-[14px] font-bold ${subtitleColor}`}>{subtitle}</Text>
                </View>
            )}
        </View>

        <View className="flex-1 items-end relative h-full justify-between min-h-[80px]">
            <Ionicons name="arrow-forward" size={18} color="#9CA3AF" className="absolute -top-1 -right-1" />

            {/* Graphics */}
            {showSparkline && (
                <View className="w-24 h-16 items-end justify-center mt-4">
                    <View className="w-full h-full">
                        <View className="absolute bottom-4 left-0 w-4 h-2 bg-blue-100 rounded-full opacity-40 rotate-[30deg]" />
                        <View className="absolute bottom-6 left-4 w-6 h-3 bg-blue-200 rounded-full opacity-50 -rotate-[10deg]" />
                        <View className="absolute bottom-2 left-10 w-4 h-8 bg-blue-300 rounded-full opacity-60 rotate-[45deg]" />
                        <View className="absolute top-2 right-2 w-1 h-12 bg-blue-500 rounded-full rotate-[15deg] shadow-lg shadow-blue-400" />
                        <View className="absolute top-0 right-1 w-4 h-4 rounded-full bg-indigo-500/20 items-center justify-center">
                            <View className="w-2.5 h-2.5 rounded-full bg-indigo-100 border-2 border-indigo-400" />
                            <View className="absolute inset-0 bg-indigo-400 rounded-full opacity-20" />
                        </View>
                    </View>
                </View>
            )}

            {showBars && title === "Macro Balance" && (
                <View className="flex-row items-end gap-[4px] h-14 mt-4">
                    {[{ h: [10, 5, 5] }, { h: [15, 8, 12] }, { h: [12, 20, 10] }, { h: [8, 10, 5] }, { h: [20, 15, 10] }, { h: [10, 5, 8] }].map((bar, i) => (
                        <View key={i} className="w-2.5 gap-[1px]">
                            <View className="bg-pink-400 rounded-t-sm" style={{ height: bar.h[2] }} />
                            <View className="bg-yellow-400" style={{ height: bar.h[1] }} />
                            <View className="bg-blue-400 rounded-b-sm" style={{ height: bar.h[0] }} />
                        </View>
                    ))}
                </View>
            )}

            {showBars && title === "Net Energy" && (
                <View className="flex-row items-end gap-[4px] h-14 mt-4">
                    {Array.from({ length: 9 }).map((_, i) => (
                        <View key={i} className="flex-row gap-[2px]">
                            {i % 3 === 0 ? (
                                <View className="w-1.5 bg-blue-400 rounded-sm" style={{ height: 30 + Math.random() * 20 }} />
                            ) : (
                                <View className="w-1.5 bg-orange-400 rounded-sm" style={{ height: 40 + Math.random() * 20 }} />
                            )}
                        </View>
                    ))}
                </View>
            )}
        </View>
    </TouchableOpacity>
);

export default function NutritionDashboard() {
    const router = useRouter();

    const renderDotMatrix = (color: string, count: number, total: number = 40) => (
        <View className="flex-row flex-wrap w-[28%] gap-[3px]">
            {Array.from({ length: total }).map((_, i) => (
                <View key={i} className={`w-[4px] h-[4px] rounded-full ${i < count ? color : 'bg-gray-100'}`} />
            ))}
        </View>
    );

    return (
        <View className="flex-1 bg-[#F4F5F9]">
            {/* Dynamic Background Gradient */}
            <LinearGradient colors={['#F3E8FF', '#F4F5F9']} className="absolute top-0 w-full h-96 opacity-60" />

            <SafeAreaView className="flex-1" edges={['top']}>
                {/* Header */}
                <View className="flex-row justify-between items-center px-5 py-2">
                    <TouchableOpacity onPress={() => router.back()} className="w-10">
                        <Ionicons name="chevron-back" size={28} color="#111827" />
                    </TouchableOpacity>
                    <View className="items-center">
                        <Text className="font-bold text-gray-900 text-lg">Nutrition</Text>
                        <View className="flex-row items-center gap-1 mt-0.5">
                            <Text className="text-gray-500 font-medium text-xs">Today, 14 September</Text>
                            <Ionicons name="chevron-down" size={12} color="#6B7280" />
                        </View>
                    </View>
                    <TouchableOpacity className="w-8 h-8 bg-white rounded-full items-center justify-center shadow-sm">
                        <Ionicons name="ellipsis-horizontal" size={16} color="#4B5563" />
                    </TouchableOpacity>
                </View>

                <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 100 }} showsVerticalScrollIndicator={false}>
                    {/* Hero Score */}
                    <View className="items-center my-8 relative">
                        <View className="absolute left-10 top-8 opacity-20"><Ionicons name="restaurant" size={60} color="#9CA3AF" /></View>
                        <View className="absolute right-10 top-8 opacity-20" style={{ transform: [{ scaleX: -1 }] }}><Ionicons name="restaurant" size={60} color="#9CA3AF" /></View>
                        <View className="w-48 h-48 bg-white rounded-full shadow-2xl shadow-purple-200 items-center justify-center border-4 border-white">
                            <View className="w-[170px] h-[170px] rounded-full border-4 border-dashed border-blue-100 items-center justify-center relative">
                                <View className="absolute inset-0 border-4 border-blue-500 rounded-full border-r-transparent border-b-transparent -rotate-45" />
                                <Text className="text-5xl font-bold text-gray-900">83</Text>
                                <Text className="text-blue-500 font-bold text-sm">optimal</Text>
                            </View>
                        </View>
                    </View>

                    {/* Quick Actions */}
                    <View className="flex-row justify-between gap-3 mb-6">
                        {['Describe', 'Capture', 'Search'].map((action, i) => (
                            <TouchableOpacity key={action} className="flex-1 bg-white rounded-2xl p-4 items-center justify-center shadow-sm">
                                <Ionicons name={i === 0 ? 'text' : i === 1 ? 'camera' : 'search'} size={24} color="#111827" className="mb-2" />
                                <Text className="font-bold text-gray-900 text-[13px]">{action}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Mini Scores */}
                    <View className="flex-row gap-3 mb-6">
                        <View className="flex-1 bg-white rounded-2xl p-4 shadow-sm border border-gray-50">
                            <View className="flex-row items-center gap-1 mb-2">
                                <Ionicons name="medal-outline" size={14} color="#9CA3AF" />
                                <Text className="text-gray-400 font-semibold text-xs">Food Quality</Text>
                            </View>
                            <Text className="text-2xl font-bold text-gray-900">83</Text>
                            <Text className="text-blue-500 font-bold text-xs mt-1">Optimal</Text>
                        </View>
                        <View className="flex-1 bg-white rounded-2xl p-4 shadow-sm border border-gray-50">
                            <View className="flex-row items-center gap-1 mb-2">
                                <Ionicons name="cube-outline" size={14} color="#9CA3AF" />
                                <Text className="text-gray-400 font-semibold text-xs">Glucose Impact</Text>
                            </View>
                            <Text className="text-2xl font-bold text-gray-300">-</Text>
                        </View>
                    </View>

                    {/* My Foods Link */}
                    <TouchableOpacity
                        onPress={() => router.push('/nutrition/my-foods')}
                        className="bg-white rounded-2xl p-5 shadow-sm border border-gray-50 flex-row justify-between items-center mb-6"
                    >
                        <View>
                            <Text className="font-bold text-gray-900 text-base mb-1">My Foods</Text>
                            <Text className="text-gray-500 text-xs font-medium">0 favorites • 0 recipes • <Text className="font-bold">2 foods</Text></Text>
                        </View>
                        <Ionicons name="arrow-forward" size={20} color="#9CA3AF" />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => router.push('/nutrition/goals')} className="bg-white rounded-[24px] p-6 shadow-sm border border-gray-50 mb-6 relative overflow-hidden items-center">

                        {/* Faint Background Icon Pattern */}
                        <View
                            className="absolute inset-0 flex-row flex-wrap justify-center items-center gap-6 z-0"
                            style={{ opacity: 0.03, transform: [{ scale: 1.2 }] }}
                        >
                            {Array.from({ length: 15 }).map((_, i) => (
                                <Ionicons
                                    key={i}
                                    name={['fast-food', 'leaf', 'water', 'nutrition', 'egg'][i % 5] as any}
                                    size={32}
                                    color="#000"
                                />
                            ))}
                        </View>

                        {/* Top Right Arrow */}
                        <TouchableOpacity className="absolute top-5 right-5 z-20">
                            <Ionicons name="arrow-forward" size={20} color="#9CA3AF" />
                        </TouchableOpacity>

                        {/* Multi-color Ring Graphic */}
                        <View className="w-[72px] h-[72px] mb-4 z-10 relative mt-2">
                            {/* Top Half - Orange */}
                            <View className="absolute top-0 w-full h-[36px] overflow-hidden">
                                <View className="w-[72px] h-[72px] rounded-full border-[6px] border-[#FBBF24] absolute top-0" />
                            </View>

                            {/* Bottom Left Quarter - Blue */}
                            <View className="absolute bottom-0 left-0 w-[36px] h-[36px] overflow-hidden">
                                <View className="w-[72px] h-[72px] rounded-full border-[6px] border-[#818CF8] absolute bottom-0 left-0" />
                            </View>

                            {/* Bottom Right Quarter - Pink */}
                            <View className="absolute bottom-0 right-0 w-[36px] h-[36px] overflow-hidden">
                                <View className="w-[72px] h-[72px] rounded-full border-[6px] border-[#F472B6] absolute bottom-0 right-0" />
                            </View>
                        </View>

                        {/* Text Content */}
                        <Text className="text-[17px] font-bold text-gray-900 mb-1 z-10">
                            Goals for nutrition
                        </Text>
                        <Text className="text-[13.5px] text-gray-500 text-center leading-5 px-4 mb-6 z-10 font-medium">
                            Set your daily goals for your calories and macros, and more
                        </Text>

                        {/* Action Button */}
                        <TouchableOpacity className="w-full py-3.5 rounded-xl border border-gray-200 items-center bg-white z-10 shadow-sm">
                            <Text className="font-bold text-gray-600 text-[15px]">Disable</Text>
                        </TouchableOpacity>
                    </TouchableOpacity>

                    {/* Nutritional Details Card */}
                    <TouchableOpacity onPress={() => router.push('/nutrition/nutritional-details')}
                        className="bg-white rounded-3xl p-5 shadow-sm border border-gray-50 mb-6">
                        <View className="flex-row justify-between items-center mb-6">
                            <Text className="font-bold text-gray-900 text-base">Nutritional Details</Text>
                            <View className="flex-row gap-2 items-center">
                                <View className="bg-gray-100 rounded-lg flex-row px-1 py-0.5">
                                    <View className="bg-white rounded px-2 py-1 shadow-sm"><Text className="font-bold text-xs">g</Text></View>
                                    <View className="px-2 py-1"><Text className="font-bold text-xs text-gray-500">%</Text></View>
                                </View>
                                <Ionicons name="arrow-forward" size={16} color="#9CA3AF" />
                            </View>
                        </View>
                        <View className="flex-row justify-between mb-4">
                            {renderDotMatrix('bg-blue-400', 12)}
                            {renderDotMatrix('bg-yellow-400', 35)}
                            {renderDotMatrix('bg-pink-400', 18)}
                        </View>
                        <View className="flex-row justify-between mb-6">
                            <View><Text className="font-bold text-gray-900">38,3g</Text><Text className="text-blue-400 text-xs font-bold">Fat</Text></View>
                            <View><Text className="font-bold text-gray-900">94,7g</Text><Text className="text-yellow-400 text-xs font-bold">Carbs</Text></View>
                            <View><Text className="font-bold text-gray-900">27g</Text><Text className="text-pink-400 text-xs font-bold">Protein</Text></View>
                        </View>
                        <View className="h-[1px] bg-gray-100 w-full mb-6" />
                        <View>
                            <View className="flex-row justify-between items-end mb-4">
                                <View><Text className="font-bold text-gray-900 text-lg">-483 kcal</Text><Text className="text-gray-400 text-xs">Net Energy</Text></View>
                                <View className="flex-row gap-3">
                                    <View className="flex-row items-center gap-1"><Ionicons name="flame" size={14} color="#F97316" /><Text className="font-bold text-gray-900 text-xs">1.182</Text></View>
                                    <View className="flex-row items-center gap-1"><Ionicons name="nutrition" size={14} color="#3B82F6" /><Text className="font-bold text-gray-900 text-xs">699</Text></View>
                                </View>
                            </View>
                            <View className="relative justify-center h-4 mb-2">
                                <LinearGradient colors={['#EF4444', '#F97316', '#EAB308', '#3B82F6', '#8B5CF6']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={{ height: 8, borderRadius: 4, width: '100%' }} />
                                <View className="absolute left-[35%] w-4 h-4 bg-white border-[3px] border-orange-500 rounded-full shadow-sm" />
                            </View>
                            <View className="flex-row justify-between">
                                {['-500', '-250', '0', '250', '500'].map(val => <Text key={val} className="text-[10px] text-gray-400 font-medium">{val}</Text>)}
                            </View>
                        </View>
                    </TouchableOpacity>

                    <View className="bg-white rounded-[24px] p-6 shadow-sm border border-gray-50 mb-6 relative overflow-hidden">
                        <View className="absolute right-0 top-0 w-40 h-40 bg-blue-50 rounded-full -mr-16 -mt-16 opacity-50" />
                        <Text className="font-bold text-gray-900 text-lg mb-1">Connect CGM</Text>
                        <Text className="text-gray-500 text-sm leading-5 mb-6 w-[80%]">Get personalized nutrition scores with glucose data.</Text>
                        <View className="flex-row gap-3">
                            <TouchableOpacity className="flex-1 py-3.5 rounded-xl border border-gray-200 items-center bg-white">
                                <Text className="font-bold text-gray-700">Disable</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => router.push('/nutrition/cgm')}
                                className="flex-1 py-3.5 rounded-xl bg-[#1A1A1A] items-center"
                            >
                                <Text className="font-bold text-white">Connect</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Timeline */}
                    <View className="mb-8">
                        <View className="flex-row items-center justify-between mb-4 px-2">
                            <Text className="text-lg font-bold text-gray-900">Timeline</Text>
                            <TouchableOpacity><Ionicons name="add" size={24} color="#9CA3AF" /></TouchableOpacity>
                        </View>
                        <View className="gap-3">
                            {[
                                { icon: '🥑', name: 'Avocado Toast with Fried Egg', time: '14/09/25 at 12.48 PM', score: '88', color: 'bg-purple-100 border-purple-300 text-purple-700' },
                                { icon: '☕️', name: 'Coffee Latte', time: '14/09/25 at 12.48 PM', score: '61', color: 'bg-blue-100 border-blue-300 text-blue-700' }
                            ].map((item, i) => (
                                <TouchableOpacity
                                    key={i}
                                    onPress={() => router.push('/nutrition/log-details')}
                                    className="bg-white rounded-2xl p-4 shadow-sm border border-gray-50 flex-row items-center justify-between"
                                >
                                    <View className="flex-row items-center gap-4">
                                        <View className="relative">
                                            <View className="w-12 h-12 bg-gray-50 rounded-xl items-center justify-center border border-gray-100"><Text className="text-2xl">{item.icon}</Text></View>
                                            <View className={`absolute -bottom-2 -right-2 px-1.5 py-0.5 rounded-md border ${item.color}`}><Text className="text-[10px] font-bold">{item.score}</Text></View>
                                        </View>
                                        <View><Text className="font-bold text-gray-900 text-[15px] mb-0.5">{item.name}</Text><Text className="text-gray-400 text-xs font-medium">{item.time}</Text></View>
                                    </View>
                                    <Ionicons name="arrow-forward" size={16} color="#9CA3AF" />
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>

                    <View className="mb-6">
                        <Text className="text-lg font-bold text-gray-900 mb-4 px-2">Trends</Text>
                        <View className="gap-3">
                            {/* Nutrition Score Card */}
                            <TrendCard
                                title="Nutrition Score" value="83" subtitle="Above normal" subtitleColor="text-blue-500" icon="arrow-up" showSparkline
                                onPress={() => router.push({ pathname: '/nutrition/trend-details', params: { type: 'score' } })}
                            />
                            <TrendCard
                                title="Macro Balance" value="160 g" showBars
                                onPress={() => router.push({ pathname: '/nutrition/trend-details', params: { type: 'macro' } })}
                            />
                            <TrendCard
                                title="Net Energy" value="-483 kCal" subtitle="Deficit" subtitleColor="text-red-500" showBars
                                onPress={() => router.push({ pathname: '/nutrition/trend-details', params: { type: 'energy' } })}
                            />
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}


const styles = StyleSheet.create({
    shadow: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 3,
    }
});