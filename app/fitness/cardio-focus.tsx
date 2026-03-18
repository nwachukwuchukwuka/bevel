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

    // Helper to get the display label for dynamically selected items
    const getSelectedLabel = () => {
        return FILTER_TYPES.find(t => t.id === selectedType)?.label || 'Selected';
    };

    // Determine if the selected type is a custom one not in the default quick list
    const isCustomTypeSelected = selectedType !== 'all' && selectedType !== 'strength_training' && selectedType !== 'mixed_cardio';

    return (
        <BottomSheetModalProvider>
            <View className="flex-1 bg-[#F9FAFB]">
                {/* Drag Handle Mock */}
                <View className="items-center py-3"><View className="w-10 h-1 bg-gray-300 rounded-full" /></View>

                <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>

                    <View className="flex-row items-center gap-2 mb-4">
                        <Ionicons name="layers" size={18} color="#9CA3AF" />
                        <Text className="text-[16px] font-bold text-gray-500">Cardio Focus</Text>
                    </View>

                    <View className="flex-row justify-between items-end mb-6">
                        <View>
                            <Text className="text-[32px] font-bold text-gray-900 tracking-tight">Low Aerobic</Text>
                            <Text className="text-[13px] font-medium text-gray-500 mt-1">14 Sep 2025</Text>
                        </View>
                        <Text className="text-[16px] font-bold text-teal-400">100%</Text>
                    </View>

                    {/* Interactive Filter Strip */}
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-8">
                        <TouchableOpacity
                            onPress={() => filterSheetRef.current?.present()}
                            className="bg-white border border-gray-200 rounded-full w-8 h-8 items-center justify-center shadow-sm mr-2"
                        >
                            <Ionicons name="list" size={16} color="#4B5563" />
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => setSelectedType('all')}
                            className={`rounded-full px-4 py-1.5 justify-center mr-2 ${selectedType === 'all' ? 'bg-[#111827]' : 'bg-gray-100'}`}
                        >
                            <Text className={`text-[13px] font-bold ${selectedType === 'all' ? 'text-white' : 'text-gray-500'}`}>All</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => setSelectedType('strength_training')}
                            className={`rounded-full px-4 py-1.5 justify-center mr-2 ${selectedType === 'strength_training' ? 'bg-[#111827]' : 'bg-gray-100'}`}
                        >
                            <Text className={`text-[13px] font-bold ${selectedType === 'strength_training' ? 'text-white' : 'text-gray-500'}`}>Strength Training</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => setSelectedType('mixed_cardio')}
                            className={`rounded-full px-4 py-1.5 justify-center mr-2 ${selectedType === 'mixed_cardio' ? 'bg-[#111827]' : 'bg-gray-100'}`}
                        >
                            <Text className={`text-[13px] font-bold ${selectedType === 'mixed_cardio' ? 'text-white' : 'text-gray-500'}`}>Mixed Cardio</Text>
                        </TouchableOpacity>

                        {/* Append the custom selected filter from the bottom sheet if it's not a default one */}
                        {isCustomTypeSelected && (
                            <TouchableOpacity className="rounded-full px-4 py-1.5 justify-center mr-2 bg-[#111827]">
                                <Text className="text-[13px] font-bold text-white">{getSelectedLabel()}</Text>
                            </TouchableOpacity>
                        )}
                    </ScrollView>

                    {/* Bar Chart Mock */}
                    <View className="h-56 relative justify-end pb-6 border-b-2 border-emerald-400 mb-6">
                        <View className="absolute right-0 top-0 bottom-6 justify-between items-end z-0 opacity-40">
                            <Text className="text-[10px] font-bold text-gray-400">24</Text>
                            <Text className="text-[10px] font-bold text-gray-400 border-b border-dashed w-full text-right border-gray-200">16</Text>
                            <Text className="text-[10px] font-bold text-gray-400 border-b border-dashed w-full text-right border-gray-200">8</Text>
                            <Text className="text-[10px] font-bold text-gray-400">0</Text>
                        </View>
                        <View className="absolute bottom-6 left-0 right-10 h-full flex-row items-end justify-end gap-1">
                            {/* Dynamically adjust bars based on selected type to simulate filtering visually */}
                            {selectedType === 'all' && <View className="w-1.5 h-[30%] bg-teal-400 rounded-t-sm" />}
                            <View className={`w-1.5 ${selectedType === 'all' ? 'h-[60%]' : 'h-[40%]'} bg-teal-400 rounded-t-sm`} />
                        </View>
                    </View>

                    {/* X-Axis Labels */}
                    <View className="flex-row justify-between pr-8 mb-6">
                        <Text className="text-[10px] font-bold text-gray-400">15 Aug</Text>
                        <Text className="text-[10px] font-bold text-gray-400">22 Aug</Text>
                        <Text className="text-[10px] font-bold text-gray-400">30 Aug</Text>
                        <Text className="text-[10px] font-bold text-gray-400">6 Sep</Text>
                        <Text className="text-[10px] font-bold text-gray-400">14 Sep</Text>
                    </View>

                    {/* Timeframe Selector */}
                    <View className="flex-row items-center justify-between mb-10">
                        <TouchableOpacity className="w-8 h-8 rounded-full bg-white border border-gray-100 shadow-sm items-center justify-center">
                            <Ionicons name="chevron-back" size={16} color="#9CA3AF" />
                        </TouchableOpacity>
                        <View className="flex-row items-center gap-1">
                            {['1M', '3M', '6M', '1Y'].map(t => (
                                <TouchableOpacity
                                    key={t}
                                    onPress={() => setTimeframe(t)}
                                    className={`w-10 h-8 items-center justify-center rounded-full ${timeframe === t ? 'bg-white border border-gray-200 shadow-sm' : ''}`}
                                >
                                    <Text className={`text-[12px] font-bold ${timeframe === t ? 'text-gray-900' : 'text-gray-400'}`}>{t}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                        <View className="flex-row gap-2">
                            <TouchableOpacity className="w-8 h-8 rounded-full bg-white border border-gray-100 shadow-sm items-center justify-center">
                                <Ionicons name="calendar-outline" size={14} color="#9CA3AF" />
                            </TouchableOpacity>
                            <TouchableOpacity className="w-8 h-8 rounded-full bg-white border border-gray-100 shadow-sm items-center justify-center">
                                <Ionicons name="chevron-forward" size={16} color="#9CA3AF" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Breakdown List */}
                    <Text className="text-[16px] font-bold text-gray-900 mb-4">Cardio Focus Breakdown</Text>
                    <View className="bg-white rounded-[20px] p-2 border border-gray-100 shadow-sm shadow-black/5">
                        <View className="flex-row justify-between px-4 py-3 border-b border-gray-50">
                            <Text className="text-[11px] font-bold text-gray-400 w-1/3">Status</Text>
                            <Text className="text-[11px] font-bold text-gray-400 w-1/3 text-center">Value</Text>
                            <Text className="text-[11px] font-bold text-gray-400 w-1/3 text-right">%</Text>
                        </View>
                        <View className="flex-row items-center justify-between px-4 py-4 border-b border-gray-50">
                            <Text className="text-[13px] font-bold text-gray-900 w-1/3">Low Aerobic</Text>
                            <Text className="text-[13px] font-bold text-teal-400 w-1/3 text-center">{selectedType === 'all' ? '+20' : '+12'}</Text>
                            <Text className="text-[13px] font-bold text-gray-900 w-1/3 text-right">100%</Text>
                        </View>
                        <View className="flex-row items-center justify-between px-4 py-4">
                            <Text className="text-[13px] font-bold text-gray-900 w-1/3">High Aerobic</Text>
                            <Text className="text-[13px] font-bold text-gray-400 w-1/3 text-center">0</Text>
                            <Text className="text-[13px] font-bold text-gray-900 w-1/3 text-right">0%</Text>
                        </View>
                    </View>
                </ScrollView>

                {/* Floating Feedback Button */}
                <View className="absolute bottom-10 self-center">
                    <TouchableOpacity activeOpacity={0.8} className="bg-white/95 px-5 py-3.5 rounded-full flex-row items-center shadow-lg shadow-black/10 border border-gray-100">
                        <Ionicons name="sync" size={16} color="#3B82F6" className="mr-2" />
                        <Text className="font-bold text-[14px] text-gray-900 mr-2">
                            {/* Dynamically switch text based on selection matching screenshot behavior */}
                            {selectedType === 'all' ? 'Low Aerobic Dominance' : 'Low Aerobic Focus'}
                        </Text>
                        <Ionicons name="chevron-up" size={16} color="#9CA3AF" />
                    </TouchableOpacity>
                </View>

                {/* Bottom Sheet Filter */}
                <TypeFilterSheet
                    ref={filterSheetRef}
                    selectedType={selectedType}
                    onSelect={setSelectedType}
                />
            </View>
        </BottomSheetModalProvider>
    );
}