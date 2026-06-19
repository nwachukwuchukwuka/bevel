import { Ionicons } from '@expo/vector-icons';
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import React, { forwardRef, useCallback, useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';

type Exercise = { id: string; name: string; type: string; icon: string };

const DUMMY_EXERCISES: Exercise[] = [
    { id: '1', name: 'Ab Crunch Machine', type: 'Machine', icon: '💺' },
    { id: '2', name: 'Ab Roller', type: 'Other', icon: '🛼' },
    { id: '3', name: 'Ab Rollout', type: 'TRX', icon: '🦯' },
    { id: '4', name: 'Alternating Waves', type: 'Rope', icon: '〰️' },
    { id: '5', name: 'Anti Rotation', type: 'Landmine', icon: '🏋️' },
    { id: '6', name: 'Arm Bar', type: 'Kettlebell (Single)', icon: '💪' },
];

interface LibrarySheetProps {
    onExclude: (exercises: Exercise[]) => void;
}

export const LibrarySheet = forwardRef<BottomSheetModal, LibrarySheetProps>(({ onExclude }, ref) => {
    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    const toggleSelect = (id: string) => {
        setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
    };

    const handleExclude = () => {
        const selectedExercises = DUMMY_EXERCISES.filter(ex => selectedIds.includes(ex.id));
        onExclude(selectedExercises);
        (ref as any).current?.dismiss();
        setSelectedIds([]);
    };

    const handleDismiss = () => {
        (ref as any).current?.dismiss();
        setSelectedIds([]);
    };

    const renderBackdrop = useCallback(
        (props: any) => <BottomSheetBackdrop {...props} opacity={0.7} appearsOnIndex={0} disappearsOnIndex={-1} />,
        []
    );

    const hasSelection = selectedIds.length > 0;

    return (
        <BottomSheetModal
            ref={ref}
            snapPoints={['95%']}
            backdropComponent={renderBackdrop}
            backgroundStyle={{ backgroundColor: '#090D16' }}
            handleIndicatorStyle={{ backgroundColor: '#1E293B', width: 40 }}
            enableDynamicSizing={false}
        >
            <View className="flex-1">
                <View className="flex-row justify-between items-start px-5 pt-4 pb-2">
                    <View className="flex-1 pr-4">
                        <Text className="text-[28px] font-bold text-slate-100 mb-1">Library</Text>
                        <Text className="text-[13px] font-medium text-slate-400">Select exercises to modify</Text>
                    </View>
                    <View className="flex-row items-center gap-3">
                        <TouchableOpacity
                            onPress={handleDismiss}
                            className="w-12 h-12 bg-[#151E33] border border-[#1E293B] rounded-[16px] items-center justify-center"
                        >
                            <Ionicons name="close" size={20} color="#94A3B8" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={handleExclude}
                            disabled={!hasSelection}
                            className={`h-12 px-5 items-center justify-center rounded-[16px] border ${hasSelection
                                ? 'bg-[#4DB9F2] border-[#4DB9F2]'
                                : 'bg-[#151E33] border-[#1E293B]'
                                }`}
                        >
                            <Text className={`font-bold text-[15px] ${hasSelection ? 'text-[#090D16]' : 'text-slate-500'
                                }`}>
                                Exclude {hasSelection ? `(${selectedIds.length})` : ''}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Compact Search & Filter Block */}
                <View className="px-5 pt-2 pb-4 z-10">
                    <View className="flex-row items-center bg-[#151E33] border border-[#1E293B] rounded-[16px] px-4 py-3.5 mb-3">
                        <Ionicons name="search" size={20} color="#4DB9F2" />
                        <TextInput
                            placeholder="Search library..."
                            placeholderTextColor="#64748B"
                            className="flex-1 ml-3 font-medium text-slate-100 text-[15px]"
                        />
                    </View>
                    <View className="flex-row gap-3">
                        <TouchableOpacity className="flex-1 flex-row items-center justify-between border border-[#1E293B] rounded-[12px] py-3 px-4 bg-[#151E33]">
                            <Text className="font-semibold text-slate-300 text-[13px]">All groups</Text>
                            <Ionicons name="chevron-down" size={14} color="#64748B" />
                        </TouchableOpacity>
                        <TouchableOpacity className="flex-1 flex-row items-center justify-between border border-[#1E293B] rounded-[12px] py-3 px-4 bg-[#151E33]">
                            <Text className="font-semibold text-slate-300 text-[13px]">All equipment</Text>
                            <Ionicons name="chevron-down" size={14} color="#64748B" />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Vertical Scroll Area with Grid Layout */}
                <BottomSheetScrollView className="flex-1" contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 60, paddingTop: 10 }}>

                    {/* Custom Exercise Block */}
                    <TouchableOpacity className="border border-dashed border-[#4DB9F2]/40 bg-[#4DB9F2]/5 rounded-[20px] p-4 flex-row items-center gap-4 mb-8">
                        <View className="w-12 h-12 bg-[#4DB9F2]/10 rounded-[14px] items-center justify-center border border-[#4DB9F2]/20">
                            <Ionicons name="add" size={24} color="#4DB9F2" />
                        </View>
                        <View>
                            <Text className="font-bold text-[#4DB9F2] text-[16px] mb-0.5">Custom</Text>
                            <Text className="font-medium text-[#4DB9F2]/70 text-[13px]">Add custom exercise</Text>
                        </View>
                    </TouchableOpacity>

                    <Text className="text-slate-500 font-bold text-[14px] mb-4">A</Text>

                    {/* New Grid Layout (2 Columns) */}
                    <View className="flex-row flex-wrap justify-between">
                        {DUMMY_EXERCISES.map((ex) => {
                            const isSelected = selectedIds.includes(ex.id);

                            return (
                                <TouchableOpacity
                                    key={ex.id}
                                    onPress={() => toggleSelect(ex.id)}
                                    activeOpacity={0.7}
                                    className={`w-[48%] mb-4 p-4 rounded-[24px] border ${isSelected
                                        ? 'bg-[#4DB9F2]/10 border-[#4DB9F2]/50'
                                        : 'bg-[#151E33] border-[#1E293B]'
                                        }`}
                                >
                                    <View className="flex-row justify-between items-start mb-6">
                                        <View className="w-12 h-12 bg-[#1E293B] border border-[#2D3748] rounded-[14px] items-center justify-center">
                                            <Text className="text-[20px]">{ex.icon}</Text>
                                        </View>

                                        <View
                                            className={`w-6 h-6 rounded-full border items-center justify-center ${isSelected
                                                ? 'bg-[#4DB9F2] border-[#4DB9F2]'
                                                : 'bg-[#1E293B] border-[#2D3748]'
                                                }`}
                                        >
                                            {isSelected && (
                                                <Ionicons name="checkmark" size={14} color="#090D16" />
                                            )}
                                        </View>
                                    </View>

                                    <Text
                                        className="font-bold text-slate-100 text-[15px] mb-1.5 leading-5"
                                        numberOfLines={2}
                                    >
                                        {ex.name}
                                    </Text>
                                    <Text className="text-slate-500 text-[12px] font-medium">
                                        {ex.type}
                                    </Text>
                                </TouchableOpacity>
                            )
                        })}
                    </View>
                </BottomSheetScrollView>

            </View>
        </BottomSheetModal>
    );
});