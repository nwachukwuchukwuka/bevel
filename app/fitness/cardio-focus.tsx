import { TypeFilterSheet, TypeFilterSheetRef } from '@/components/fitness/TypeFilterSheet';
import { FILTER_TYPES } from '@/constants';
import { Ionicons } from '@expo/vector-icons';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import React, { useRef, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

export default function CardioFocusModal() {
    const filterSheetRef = useRef<TypeFilterSheetRef>(null);
    const [selectedType, setSelectedType] = useState('all');
    const [timeframe, setTimeframe] = useState('1M');

    const getSelectedLabel = () => {
        return FILTER_TYPES.find(t => t.id === selectedType)?.label || 'Selected';
    };

    const isCustomTypeSelected = selectedType !== 'all' && selectedType !== 'strength_training' && selectedType !== 'mixed_cardio';

    return (
        <BottomSheetModalProvider>
            <View className="flex-1 bg-[#090D16]">

                {/* Custom Modal Handle */}
                <View className="items-center py-3">
                    <View className="w-10 h-1 bg-[#1E293B] rounded-full" />
                </View>

                {/* Custom Header */}
                <View className="px-5 pb-5 flex-row items-center justify-between border-b border-[#1E293B]">
                    <View className="flex-row items-center gap-3">
                        <View className="w-10 h-10 bg-[#1E1E1E] rounded-xl items-center justify-center border border-[#2D3748]">
                            <Ionicons name="layers-outline" size={18} color="#4DB9F2" />
                        </View>
                        <Text className="text-xl font-bold text-slate-100">Cardio focus</Text>
                    </View>
                </View>

                <View className="px-5 py-4 bg-[#151E33] border-b border-[#1E293B] flex-row items-center justify-between">
                    <View className="flex-row gap-2 bg-[#090D16] p-1 rounded-xl border border-[#1E293B]">
                        {['1M', '3M', '6M', '1Y'].map((t) => {
                            const isActive = timeframe === t;
                            return (
                                <TouchableOpacity
                                    key={t}
                                    onPress={() => setTimeframe(t)}
                                    className={`px-3 py-1.5 rounded-lg border ${isActive ? 'bg-[#1E1E1E] border-[#2C2C2C]' : 'border-transparent'
                                        }`}
                                >
                                    <Text className={`text-xs font-bold ${isActive ? 'text-[#4DB9F2]' : 'text-slate-400'}`}>
                                        {t}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })}
                    </View>

                    <View className="flex-row gap-2">
                        <TouchableOpacity className="w-8 h-8 rounded-lg bg-[#1E1E1E] border border-[#2D3748] items-center justify-center">
                            <Ionicons name="chevron-back" size={16} color="#94A3B8" />
                        </TouchableOpacity>
                        <TouchableOpacity className="w-8 h-8 rounded-lg bg-[#1E1E1E] border border-[#2D3748] items-center justify-center">
                            <Ionicons name="calendar-outline" size={14} color="#94A3B8" />
                        </TouchableOpacity>
                        <TouchableOpacity className="w-8 h-8 rounded-lg bg-[#1E1E1E] border border-[#2D3748] items-center justify-center">
                            <Ionicons name="chevron-forward" size={16} color="#94A3B8" />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Filters Area (Directly below Timeframe) */}
                <View className="px-5 py-3 border-b border-[#1E293B] bg-[#090D16]">
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8 }}>
                        <TouchableOpacity
                            onPress={() => filterSheetRef.current?.present()}
                            activeOpacity={0.7}
                            className="bg-[#1E1E1E] border border-[#2C2C2C] rounded-xl w-9 h-9 items-center justify-center"
                        >
                            <Ionicons name="list" size={14} color="#4DB9F2" />
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => setSelectedType('all')}
                            activeOpacity={0.7}
                            className={`rounded-xl px-4 py-2 justify-center border ${selectedType === 'all' ? 'bg-[#1E293B] border-[#4DB9F2]' : 'bg-[#1E1E1E] border-[#2C2C2C]'
                                }`}
                        >
                            <Text className={`text-xs font-semibold ${selectedType === 'all' ? 'text-[#4DB9F2]' : 'text-slate-400'}`}>All</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => setSelectedType('strength_training')}
                            activeOpacity={0.7}
                            className={`rounded-xl px-4 py-2 justify-center border ${selectedType === 'strength_training' ? 'bg-[#1E293B] border-[#4DB9F2]' : 'bg-[#1E1E1E] border-[#2C2C2C]'
                                }`}
                        >
                            <Text className={`text-xs font-semibold ${selectedType === 'strength_training' ? 'text-[#4DB9F2]' : 'text-slate-400'}`}>Strength</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => setSelectedType('mixed_cardio')}
                            activeOpacity={0.7}
                            className={`rounded-xl px-4 py-2 justify-center border ${selectedType === 'mixed_cardio' ? 'bg-[#1E293B] border-[#4DB9F2]' : 'bg-[#1E1E1E] border-[#2C2C2C]'
                                }`}
                        >
                            <Text className={`text-xs font-semibold ${selectedType === 'mixed_cardio' ? 'text-[#4DB9F2]' : 'text-slate-400'}`}>Mixed Cardio</Text>
                        </TouchableOpacity>

                        {isCustomTypeSelected && (
                            <TouchableOpacity className="rounded-xl px-4 py-2 justify-center border bg-[#1E293B] border-[#4DB9F2]">
                                <Text className="text-xs font-semibold text-[#4DB9F2]">{getSelectedLabel()}</Text>
                            </TouchableOpacity>
                        )}
                    </ScrollView>
                </View>

                <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>

                    {/* Highly Structured Technical Chart Panel */}
                    <View className="mx-5 mt-6 bg-[#151E33] border border-[#1E293B] rounded-2xl p-5">
                        <View className="flex-row justify-between items-center mb-4">
                            <Text className="text-sm font-semibold text-slate-400">Cardio index chart</Text>
                            <View className="flex-row items-center gap-1.5">
                                <View className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
                                <Text className="text-xs text-slate-400">Aerobic index</Text>
                            </View>
                        </View>

                        <View className="h-44 relative justify-end mt-4">
                            {/* Flat scale lines */}
                            <View className="absolute inset-0 justify-between">
                                <View className="w-full h-[1px] bg-[#1E293B] flex-row justify-between"><Text className="text-[10px] text-slate-500 -mt-2">24 max</Text></View>
                                <View className="w-full h-[1px] bg-[#1E293B] flex-row justify-between"><Text className="text-[10px] text-slate-500 -mt-2">16 avg</Text></View>
                                <View className="w-full h-[1px] bg-[#1E293B] flex-row justify-between"><Text className="text-[10px] text-slate-500 -mt-2">0 min</Text></View>
                            </View>

                            {/* Solid bar chart readout */}
                            <View className="absolute bottom-0 left-0 right-0 h-32 flex-row items-end justify-end gap-1">
                                {selectedType === 'all' && <View className="w-1.5 h-[30%] bg-teal-400 rounded-t-sm" />}
                                <View className={`w-1.5 ${selectedType === 'all' ? 'h-[60%]' : 'h-[40%]'} bg-[#10B981] rounded-t-sm`} />
                            </View>
                        </View>

                        <View className="flex-row justify-between mt-4 pt-3 border-t border-[#1E293B] pr-8">
                            <Text className="text-[10px] font-bold text-slate-500">15 Aug</Text>
                            <Text className="text-[10px] font-bold text-slate-500">30 Aug</Text>
                            <Text className="text-[10px] font-bold text-slate-500">14 Sep</Text>
                        </View>
                    </View>

                    {/* Integrated Summary Card (Positioned below the chart for layout difference) */}
                    <View className="mx-5 mt-4 bg-[#151E33] border border-[#1E293B] rounded-2xl p-5 flex-row justify-between items-center">
                        <View className="flex-col">
                            <Text className="text-xs text-slate-400 mb-1">Focus state</Text>
                            <Text className="text-2xl font-bold text-white">Low Aerobic</Text>
                            <Text className="text-[10px] text-[#4DB9F2] mt-1">14 Sep 2025</Text>
                        </View>
                        <View className="h-8 w-[1px] bg-[#1E293B]" />
                        <View className="flex-col items-end">
                            <Text className="text-xs text-slate-400 mb-1">Target achieved</Text>
                            <Text className="text-2xl font-bold text-[#10B981]">100%</Text>
                            <Text className="text-[10px] text-slate-500 mt-1">Optimal recovery</Text>
                        </View>
                    </View>

                    {/* Integrated Success Tag Indicator */}
                    <View className="mx-5 mt-4 bg-emerald-950/20 border border-emerald-500/10 rounded-2xl p-4 flex-row items-center justify-between">
                        <View className="flex-row items-center gap-3">
                            <View className="w-8 h-8 rounded-lg bg-emerald-500/10 items-center justify-center">
                                <Ionicons name="sync" size={16} color="#10B981" />
                            </View>
                            <Text className="text-sm font-semibold text-white">
                                {selectedType === 'all' ? 'Low Aerobic Dominance' : 'Low Aerobic Focus'}
                            </Text>
                        </View>
                        <Ionicons name="chevron-forward" size={16} color="#10B981" />
                    </View>

                    {/* Cardio Focus Breakdown (Modular Grid Cards) */}
                    <View className="px-5 mt-8 mb-24">
                        <Text className="text-lg font-bold text-white mb-4">Focus breakdown</Text>

                        <View className="gap-3">
                            <View className="bg-[#151E33] border border-[#1E293B] p-5 rounded-2xl flex-row justify-between items-center">
                                <View className="flex-row items-center gap-3">
                                    <View className="w-10 h-10 bg-[#1E1E1E] rounded-xl border border-[#2D3748] items-center justify-center">
                                        <Ionicons name="pulse" size={20} color="#10B981" />
                                    </View>
                                    <View>
                                        <Text className="font-bold text-base text-white">Low Aerobic</Text>
                                        <Text className="text-xs text-slate-400 mt-0.5">Value rating</Text>
                                    </View>
                                </View>
                                <View className="items-end">
                                    <Text className="text-lg font-bold text-[#10B981]">{selectedType === 'all' ? '+20' : '+12'}</Text>
                                    <Text className="text-xs text-slate-500 mt-0.5">100% distribution</Text>
                                </View>
                            </View>

                            <View className="bg-[#151E33] border border-[#1E293B] p-5 rounded-2xl flex-row justify-between items-center">
                                <View className="flex-row items-center gap-3">
                                    <View className="w-10 h-10 bg-[#1E1E1E] rounded-xl border border-[#2D3748] items-center justify-center">
                                        <Ionicons name="flash-outline" size={20} color="#64748B" />
                                    </View>
                                    <View>
                                        <Text className="font-bold text-base text-slate-400">High Aerobic</Text>
                                        <Text className="text-xs text-slate-500 mt-0.5">Value rating</Text>
                                    </View>
                                </View>
                                <View className="items-end">
                                    <Text className="text-lg font-bold text-slate-500">0</Text>
                                    <Text className="text-xs text-slate-500 mt-0.5">0% distribution</Text>
                                </View>
                            </View>
                        </View>
                    </View>

                </ScrollView>

                <TypeFilterSheet
                    ref={filterSheetRef}
                    selectedType={selectedType}
                    onSelect={setSelectedType}
                />
            </View>
        </BottomSheetModalProvider>
    );
}