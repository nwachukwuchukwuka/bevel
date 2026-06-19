import { Ionicons } from '@expo/vector-icons';
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from '@gorhom/bottom-sheet';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useRef } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LogDetailsScreen() {
    const router = useRouter();
    const infoSheetRef = useRef<BottomSheetModal>(null);

    return (
        <BottomSheetModalProvider>
            <SafeAreaView className="flex-1 bg-[#090D16]" edges={['top']}>

                <View className="px-5 pt-4 pb-6 bg-[#151E33] border-b border-[#1E293B]">
                    <View className="flex-row items-center justify-between mb-6">
                        <TouchableOpacity
                            onPress={() => router.back()}
                            activeOpacity={0.7}
                            className="w-10 h-10 bg-[#1E293B] border border-[#2D3748] rounded-xl items-center justify-center"
                        >
                            <Ionicons name="arrow-back" size={20} color="#4DB9F2" />
                        </TouchableOpacity>

                        <View className="flex-row gap-3">
                            <TouchableOpacity
                                activeOpacity={0.7}
                                className="w-10 h-10 bg-[#1E293B] border border-[#2D3748] rounded-xl items-center justify-center"
                            >
                                <Ionicons name="options-outline" size={20} color="#94A3B8" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View className="flex-row items-center gap-4">
                        <View className="w-16 h-16 bg-emerald-950/20 rounded-2xl items-center justify-center border border-emerald-500/20">
                            <Text className="text-3xl">🥑</Text>
                        </View>
                        <View className="flex-1">
                            <Text className="text-xl font-bold text-slate-100 mb-1 leading-6">Avocado Toast with Fried Egg</Text>
                            <View className="flex-row items-center gap-2">
                                <View className="bg-[#1E293B] px-2 py-0.5 rounded border border-[#2D3748]">
                                    <Text className="text-xs text-slate-400 font-semibold">Common</Text>
                                </View>
                                <Text className="text-xs text-slate-500 font-medium">14 September 2025 at 2.34 PM</Text>
                            </View>
                        </View>
                    </View>
                </View>

                <ScrollView contentContainerStyle={{ paddingBottom: 100 }} showsVerticalScrollIndicator={false}>

                    <View className="mx-5 mt-6 mb-8 flex-row gap-4">
                        <View className="flex-1 bg-[#151E33] border border-[#1E293B] rounded-3xl p-5 flex-col justify-between min-h-[140px]">
                            <Text className="text-sm font-semibold text-slate-400">Nutrition Score</Text>
                            <View>
                                <Text className="text-4xl font-bold text-[#4DB9F2]">63</Text>
                                <Text className="text-xs text-slate-500 font-medium mt-1">out of 100 limit</Text>
                            </View>
                        </View>

                        <View className="flex-[1.2] flex-col gap-4">
                            <View className="bg-[#1E293B40] border border-[#1E293B] rounded-2xl p-4 flex-row items-center justify-between">
                                <View className="flex-row items-center gap-2">
                                    <Ionicons name="pie-chart-outline" size={16} color="#4DB9F2" />
                                    <Text className="text-sm font-medium text-slate-300">Serving</Text>
                                </View>
                                <Text className="font-bold text-white">1 unit</Text>
                            </View>

                            <TouchableOpacity
                                activeOpacity={0.7}
                                className="bg-[#1E293B40] border border-[#1E293B] rounded-2xl p-4 flex-row items-center justify-between"
                            >
                                <View className="flex-row items-center gap-2">
                                    <Ionicons name="document-text-outline" size={16} color="#4DB9F2" />
                                    <Text className="text-sm font-medium text-slate-300">Facts log</Text>
                                </View>
                                <Ionicons name="chevron-forward" size={14} color="#94A3B8" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View className="px-5 mb-8">
                        <Text className="text-lg font-bold text-white mb-4">Macronutrients</Text>

                        <View className="bg-[#151E33] border border-[#1E293B] rounded-2xl overflow-hidden">
                            <GridRow icon="flame-outline" label="Calories" value="279 kcal" color="#F97316" border />
                            <GridRow icon="water-outline" label="Fat" value="17,8g" color="#4DB9F2" border />
                            <GridRow icon="leaf-outline" label="Carbs" value="20,4g" color="#F59E0B" border />
                            <GridRow icon="fitness-outline" label="Protein" value="10,1g" color="#EF4444" />
                        </View>
                    </View>

                    <View className="px-5 mb-8">
                        <View className="flex-row justify-between items-center mb-4">
                            <Text className="text-lg font-bold text-white">Food Quality Contributors</Text>
                            <TouchableOpacity
                                onPress={() => infoSheetRef.current?.present()}
                                className="w-8 h-8 bg-[#1E293B] rounded-lg border border-[#2D3748] items-center justify-center"
                            >
                                <Ionicons name="information" size={16} color="#4DB9F2" />
                            </TouchableOpacity>
                        </View>

                        <View className="bg-[#151E33] border border-[#1E293B] rounded-2xl p-5 gap-6">

                            <View className="flex-col gap-2">
                                <View className="flex-row justify-between items-center">
                                    <View className="flex-row items-center gap-2">
                                        <Ionicons name="pie-chart" size={14} color="#A855F7" />
                                        <Text className="text-sm font-semibold text-slate-300">Macro Balance</Text>
                                    </View>
                                    <Text className="text-sm font-bold text-[#A855F7]">84 / 100</Text>
                                </View>
                                <View className="h-1.5 bg-[#1E293B] rounded-full w-full overflow-hidden">
                                    <LinearGradient colors={['#A855F7', '#818CF8']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} className="h-full" style={{ width: '84%' }} />
                                </View>
                            </View>

                            <View className="flex-col gap-2">
                                <View className="flex-row justify-between items-center">
                                    <View className="flex-row items-center gap-2">
                                        <Ionicons name="medical" size={14} color="#EC4899" />
                                        <Text className="text-sm font-semibold text-slate-300">Sodium</Text>
                                    </View>
                                    <Text className="text-sm font-bold text-[#EC4899]">1 / 100</Text>
                                </View>
                                <View className="h-1.5 bg-[#1E293B] rounded-full w-full overflow-hidden">
                                    <View className="h-full bg-[#EC4899]" style={{ width: '10%' }} />
                                </View>
                            </View>

                            <View className="flex-col gap-2">
                                <View className="flex-row justify-between items-center">
                                    <View className="flex-row items-center gap-2">
                                        <Ionicons name="cube" size={14} color="#64748B" />
                                        <Text className="text-sm font-semibold text-slate-300">Added Sugars</Text>
                                    </View>
                                    <Text className="text-sm font-bold text-slate-500">—</Text>
                                </View>
                                <View className="h-1.5 bg-[#1E293B] rounded-full w-full" />
                            </View>

                        </View>
                    </View>

                    <View className="px-5 mb-8">
                        <Text className="text-lg font-bold text-white mb-4">Constituent ingredients</Text>

                        <View className="gap-3">
                            {[
                                { icon: '🍳', name: 'Egg Fried', amt: '1 egg' },
                                { icon: '🥑', name: 'Avocado Toast', amt: '1 toast' }
                            ].map((ing, i) => (
                                <View key={i} className="bg-[#1E293B40] border border-[#1E293B] rounded-xl p-4 flex-row items-center justify-between">
                                    <View className="flex-row items-center gap-4">
                                        <View className="w-10 h-10 bg-[#1E1E1E] rounded-lg border border-[#2D3748] items-center justify-center">
                                            <Text className="text-lg">{ing.icon}</Text>
                                        </View>
                                        <View>
                                            <Text className="text-sm font-bold text-slate-200 mb-0.5">{ing.name}</Text>
                                            <Text className="text-xs text-slate-500 font-medium">{ing.amt}</Text>
                                        </View>
                                    </View>
                                    <Ionicons name="shield-checkmark" size={16} color="#10B981" />
                                </View>
                            ))}
                        </View>
                    </View>

                    <View className="px-5 flex-row justify-between items-center border-t border-[#1E293B] pt-6">
                        <Text className="text-xs text-slate-500 font-semibold">Telemetry source node</Text>
                        <View className="flex-row items-center gap-1.5 bg-[#1E293B] px-3 py-1.5 rounded-lg border border-[#2D3748]">
                            <Ionicons name="server-outline" size={12} color="#4DB9F2" />
                            <Text className="text-xs font-bold text-[#4DB9F2]">Bevel Database</Text>
                        </View>
                    </View>

                </ScrollView>

                <View className="absolute bottom-6 left-0 right-0 items-center justify-center z-50 pointer-events-none">
                    <View className="bg-amber-950/90 rounded-2xl px-5 py-3.5 flex-row items-center gap-3 border border-amber-500/30 pointer-events-auto">
                        <Text className="text-xs">🍳</Text>
                        <Text className="font-bold text-amber-500 text-sm">Quick & Easy Fuel</Text>
                        <Ionicons name="chevron-up" size={16} color="#F59E0B" />
                    </View>
                </View>

                <BottomSheetModal
                    ref={infoSheetRef}
                    snapPoints={['100%']}
                    backdropComponent={p => <BottomSheetBackdrop {...p} opacity={0.6} />}
                    handleIndicatorStyle={{ backgroundColor: '#1E293B', width: 40, height: 4, marginTop: 8 }}
                    backgroundStyle={{ backgroundColor: '#151E33', borderRadius: 32, borderWidth: 1, borderColor: '#1E293B' }}
                    enableDynamicSizing={false}
                >
                    <BottomSheetView className="flex-1 flex-col">

                        <View className="px-5 pt-4 pb-6 border-b border-[#1E293B] flex-row justify-between items-center">
                            <View>
                                <Text className="text-2xl font-bold text-slate-100">Nutrition metrics</Text>
                                <Text className="text-xs text-slate-400 mt-1">Food Quality Contributors</Text>
                            </View>
                            <TouchableOpacity
                                onPress={() => infoSheetRef.current?.dismiss()}
                                activeOpacity={0.7}
                                className="w-10 h-10 bg-[#1E293B] border border-[#2D3748] rounded-xl items-center justify-center"
                            >
                                <Ionicons name="close" size={20} color="#94A3B8" />
                            </TouchableOpacity>
                        </View>

                        <View className="px-5 py-6">
                            <Text className="text-slate-400 text-sm leading-6 mb-8">
                                Key factors that contribute to your Food Quality score to help you make healthier choices.
                            </Text>

                            <View className="flex-col gap-4">
                                <InfoCard icon="pie-chart" color="#A855F7" title="Macro Balance." desc="The ratio of macronutrients—carbohydrates, proteins, and fats—in your diet." />
                                <InfoCard icon="medical" color="#10B981" title="Sodium." desc="The amount of sodium in your food. Excessive sodium intake can lead to high blood pressure and other health problems." />
                                <InfoCard icon="cube" color="#EF4444" title="Added Sugars." desc="The amount of added sugars in your food. High intake can contribute to obesity and other health problems." />
                            </View>
                        </View>

                    </BottomSheetView>
                </BottomSheetModal>

            </SafeAreaView>
        </BottomSheetModalProvider>
    );
}

const GridRow = ({ icon, value, label, color, border }: any) => (
    <View className={`flex-row items-center justify-between p-4 ${border ? 'border-b border-[#1E293B]' : ''}`}>
        <View className="flex-row items-center gap-3">
            <Ionicons name={icon} size={18} color={color} />
            <Text className="text-sm font-semibold text-slate-300">{label}</Text>
        </View>
        <Text className="font-bold text-white text-base">{value}</Text>
    </View>
);

const InfoCard = ({ icon, color, title, desc }: any) => (
    <View className="bg-[#1E293B40] p-5 rounded-2xl border border-[#1E293B] flex-col gap-3">
        <View className="flex-row items-center gap-2">
            <Ionicons name={icon} size={18} color={color} />
            <Text className="font-bold text-white text-base">{title}</Text>
        </View>
        <Text className="text-slate-400 text-xs leading-5">{desc}</Text>
    </View>
);