import { Ionicons } from '@expo/vector-icons';
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetScrollView, BottomSheetView } from '@gorhom/bottom-sheet';
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

    const renderBackdrop = useCallback((props: any) => <BottomSheetBackdrop {...props} opacity={0.4} />, []);

    return (
        <BottomSheetModal ref={ref} snapPoints={['100%']} backdropComponent={renderBackdrop} handleIndicatorStyle={{ display: 'none' }} enableDynamicSizing={false}>
            <BottomSheetView className="flex-1 pt-2">

                {/* Header */}
                <View className="flex-row justify-between items-center px-5 mb-4">
                    <TouchableOpacity onPress={() => (ref as any).current?.dismiss()}>
                        <Text className="text-gray-500 font-medium text-base">Cancel</Text>
                    </TouchableOpacity>
                    <Text className="font-bold text-gray-900 text-base">Library</Text>
                    <TouchableOpacity onPress={handleExclude} disabled={selectedIds.length === 0}>
                        <Text className={`font-bold text-base ${selectedIds.length > 0 ? 'text-gray-900' : 'text-gray-300'}`}>Exclude</Text>
                    </TouchableOpacity>
                </View>

                {/* Search & Filters */}
                <View className="px-5 mb-4">
                    <View className="flex-row items-center bg-gray-50 rounded-xl px-4 py-3 mb-3">
                        <Ionicons name="search" size={20} color="#9CA3AF" />
                        <TextInput placeholder="Search" placeholderTextColor="#9CA3AF" className="flex-1 ml-2 font-medium text-gray-900 text-[15px]" />
                    </View>

                    <View className="flex-row gap-3">
                        <TouchableOpacity className="flex-row items-center border border-gray-200 rounded-full px-4 py-2 bg-white ">
                            <Ionicons name="options-outline" size={16} color="#4B5563" />
                            <Text className="font-semibold text-gray-700 ml-2 mr-1">All groups</Text>
                            <Ionicons name="chevron-forward" size={14} color="#9CA3AF" />
                        </TouchableOpacity>
                        <TouchableOpacity className="flex-row items-center border border-gray-200 rounded-full px-4 py-2 bg-white ">
                            <Ionicons name="options-outline" size={16} color="#4B5563" />
                            <Text className="font-semibold text-gray-700 ml-2 mr-1">All equipment</Text>
                            <Ionicons name="chevron-forward" size={14} color="#9CA3AF" />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Custom Exercise Button */}
                <View className="px-5 mb-2">
                    <Text className="text-gray-400 font-bold text-xs uppercase mb-2">Custom</Text>
                    <TouchableOpacity className="flex-row items-center gap-3 py-3">
                        <View className="w-8 h-8 bg-gray-100 rounded-full items-center justify-center">
                            <Ionicons name="add" size={18} color="#4B5563" />
                        </View>
                        <Text className="font-semibold text-gray-700 text-[15px]">Add custom exercise</Text>
                    </TouchableOpacity>
                </View>

                <View className="h-[1px] bg-gray-100 w-full mb-2" />

                {/* List */}
                <BottomSheetScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40 }}>
                    <Text className="text-gray-400 font-bold text-xs uppercase mb-3">A</Text>
                    {DUMMY_EXERCISES.map((ex, index) => {
                        const isSelected = selectedIds.includes(ex.id);
                        return (
                            <View key={ex.id} className={`flex-row items-center justify-between py-3 ${index !== DUMMY_EXERCISES.length - 1 ? 'border-b border-gray-50' : ''}`}>
                                <View className="flex-row items-center gap-3">
                                    <View className="w-10 h-10 bg-gray-50 rounded-xl items-center justify-center border border-gray-100">
                                        <Text className="text-lg">{ex.icon}</Text>
                                    </View>
                                    <View>
                                        <Text className="font-bold text-gray-900 text-[15px]">{ex.name}</Text>
                                        <Text className="text-gray-400 text-xs">{ex.type}</Text>
                                    </View>
                                </View>

                                <View className="flex-row items-center gap-3">
                                    <Ionicons name="information-circle-outline" size={20} color="#D1D5DB" />
                                    <TouchableOpacity
                                        onPress={() => toggleSelect(ex.id)}
                                        className={`w-8 h-8 rounded-lg items-center justify-center border ${isSelected ? 'bg-gray-900 border-gray-900' : 'bg-white border-gray-200 '}`}
                                    >
                                        <Ionicons name={isSelected ? "checkmark" : "add"} size={18} color={isSelected ? "white" : "#6B7280"} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )
                    })}
                </BottomSheetScrollView>
            </BottomSheetView>
        </BottomSheetModal>
    );
});