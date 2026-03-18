import { LIBRARY } from '@/constants';
import { Ionicons } from '@expo/vector-icons';
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import React, { forwardRef, useCallback, useEffect, useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { CustomExercise } from './CustomExerciseSheet';
import { Exercise } from './ReorderSheet';

interface AddSheetProps {
    onAdd: (exercise: Exercise) => void;
    onOpenFilter: () => void;
    filterLabels: string[];
    onOpenCustom: () => void;
    customExercises: CustomExercise[];

    selectionMode?: 'add' | 'copy' | 'replace';
    onSelectForCopy?: (exercise: Exercise) => void;
    onReplace?: (exercise: Exercise) => void;
    onPreviewExercise?: (exercise: CustomExercise) => void;
    onInfoPress?: (exercise: Exercise) => void;
}

export const AddExerciseSheet = forwardRef<BottomSheetModal, AddSheetProps>(({
    onAdd,
    onOpenFilter,
    filterLabels,
    onOpenCustom,
    customExercises,
    selectionMode = 'add',
    onSelectForCopy,
    onReplace,
    onPreviewExercise,
    onInfoPress
}, ref) => {
    const [search, setSearch] = useState('');
    const [selectedCopyId, setSelectedCopyId] = useState<string | null>(null);

    // Reset selection when sheet opens
    useEffect(() => { setSelectedCopyId(null); }, [selectionMode]);



    const renderBackdrop = useCallback((props: any) => <BottomSheetBackdrop {...props} opacity={0.4} />, []);
    const filterText = filterLabels.includes('All groups') ? 'All groups' : `${filterLabels.length} groups`;
    const isFilterActive = !filterLabels.includes('All groups');

    const handleItemPress = (ex: any, isCustom: boolean = false) => {
        if (selectionMode === 'copy' || selectionMode === 'replace') {
            setSelectedCopyId(ex.id);
        } else {
            if (isCustom && onPreviewExercise) {
                onPreviewExercise(ex);
            }
        }
    };

    return (
        <BottomSheetModal ref={ref} snapPoints={['100%']} backdropComponent={renderBackdrop} handleIndicatorStyle={{ display: 'none' }} enableDynamicSizing={false}>
            <View className="flex-1 bg-white pt-2 rounded-t-3xl">

                {/* Dynamic Header based on selectionMode */}
                <View className="flex-row justify-between items-center px-5 mb-4 pt-2">
                    <TouchableOpacity onPress={() => (ref as any).current?.dismiss()}>
                        <Text className="text-gray-500 font-medium text-base">Cancel</Text>
                    </TouchableOpacity>
                    <Text className="font-bold text-gray-900 text-base">Library</Text>

                    {selectionMode === 'copy' || selectionMode === 'replace' ? (
                        <TouchableOpacity
                            disabled={!selectedCopyId}
                            onPress={() => {
                                const selectedEx = [...LIBRARY.flatMap(s => s.items), ...customExercises].find(i => i.id === selectedCopyId);
                                if (selectedEx) {
                                    if (selectionMode === 'copy' && onSelectForCopy) onSelectForCopy(selectedEx as any);
                                    if (selectionMode === 'replace' && onReplace) onReplace(selectedEx as any);
                                }
                                (ref as any).current?.dismiss();
                            }}
                        >
                            <Text className={`font-bold text-base ${selectedCopyId ? 'text-gray-900' : 'text-gray-300'}`}>
                                {selectionMode === 'replace' ? 'Replace' : 'Save'}
                            </Text>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity>
                            <Text className="font-bold text-gray-300 text-base">Add</Text>
                        </TouchableOpacity>
                    )}
                </View>

                <View className="px-5 mb-4">
                    {/* Search */}
                    <View className="flex-row items-center bg-gray-50 rounded-xl px-4 py-3 mb-3">
                        <Ionicons name="search" size={20} color="#9CA3AF" />
                        <TextInput value={search} onChangeText={setSearch} placeholder="Search" placeholderTextColor="#9CA3AF" className="flex-1 ml-2 font-medium text-gray-900 text-[15px]" />
                    </View>

                    {/* Filters */}
                    <View className="flex-row gap-3">
                        <TouchableOpacity
                            onPress={onOpenFilter}
                            className={`flex-row items-center rounded-full px-4 py-2  ${isFilterActive ? 'bg-[#1A1A1A]' : 'bg-white border border-gray-200'}`}
                        >
                            <Ionicons name="options-outline" size={16} color={isFilterActive ? "white" : "#4B5563"} />
                            <Text className={`font-semibold ml-2 mr-1 ${isFilterActive ? 'text-white' : 'text-gray-700'}`}>{filterText}</Text>
                            <Ionicons name="chevron-forward" size={14} color={isFilterActive ? "white" : "#9CA3AF"} />
                        </TouchableOpacity>
                        <TouchableOpacity className="flex-row items-center border border-gray-200 rounded-full px-4 py-2 bg-white ">
                            <Ionicons name="options-outline" size={16} color="#4B5563" />
                            <Text className="font-semibold text-gray-700 ml-2 mr-1">All equipment</Text>
                            <Ionicons name="chevron-forward" size={14} color="#9CA3AF" />
                        </TouchableOpacity>
                    </View>
                </View>

                <BottomSheetScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40 }}>

                    {/* Custom Section */}
                    {true && (
                        <View className="mb-4">
                            <Text className="text-gray-300 font-bold text-xs uppercase mb-2">Custom</Text>

                            {customExercises.map((ex) => (
                                <View key={ex.id} className="flex-row items-center justify-between py-3 border-b border-gray-50">
                                    <TouchableOpacity onPress={() => handleItemPress(ex, true)} className="flex-row items-center gap-3 flex-1">
                                        <View className="w-10 h-10 bg-gray-50 rounded-xl items-center justify-center border border-gray-100">
                                            <Text className="text-lg">{ex.icon}</Text>
                                        </View>
                                        <View>
                                            <Text className="font-bold text-gray-900 text-[15px]">{ex.name}</Text>
                                            <Text className="text-gray-400 text-xs">{ex.equipment}</Text>
                                        </View>
                                    </TouchableOpacity>

                                    {/* Add Button for Custom Exercise */}
                                    <View className="flex-row items-center gap-3">
                                        <TouchableOpacity onPress={() => onInfoPress && onInfoPress(ex as any)}>
                                            <Ionicons name="information-circle-outline" size={20} color="#D1D5DB" />
                                        </TouchableOpacity>

                                        {selectionMode === 'copy' || selectionMode === 'replace' ? (
                                            <TouchableOpacity onPress={() => setSelectedCopyId(ex.id)} className={`w-8 h-8 rounded-lg items-center justify-center ${selectedCopyId === ex.id ? 'bg-black' : 'bg-gray-100'}`}>
                                                <Ionicons name={selectedCopyId === ex.id ? (selectionMode === 'replace' ? "sync" : "link") : (selectionMode === 'replace' ? "sync-outline" : "link-outline")} size={18} color={selectedCopyId === ex.id ? "white" : "#6B7280"} />
                                            </TouchableOpacity>
                                        ) : (
                                            <TouchableOpacity onPress={() => onAdd(ex as any)} className="w-8 h-8 rounded-lg items-center justify-center border bg-white border-gray-200 ">
                                                <Ionicons name="add" size={18} color="#6B7280" />
                                            </TouchableOpacity>
                                        )}
                                    </View>
                                </View>
                            ))}

                            {selectionMode === 'add' && (
                                <TouchableOpacity onPress={onOpenCustom} className="flex-row items-center gap-3 py-2">
                                    <View className="w-8 h-8 bg-gray-50 rounded-xl border border-gray-100 items-center justify-center">
                                        <Ionicons name="add" size={18} color="#4B5563" />
                                    </View>
                                    <Text className="font-semibold text-gray-700 text-[15px]">Add custom exercise</Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    )}

                    {/* Library Mapping */}
                    {LIBRARY.map(section => (
                        <View key={section.letter} className="mb-4">
                            <Text className="text-gray-300 font-bold text-xs uppercase mb-2">{section.letter}</Text>
                            {section.items.map((ex, index) => (
                                <View key={ex.id} className={`flex-row items-center justify-between py-3 ${index !== section.items.length - 1 ? 'border-b border-gray-50' : ''}`}>
                                    <TouchableOpacity onPress={() => handleItemPress(ex)} className="flex-row items-center gap-3 flex-1">
                                        <View className="w-10 h-10 bg-gray-50 rounded-xl items-center justify-center border border-gray-100"><Text className="text-lg">{ex.icon}</Text></View>
                                        <View>
                                            <Text className="font-bold text-gray-900 text-[15px]">{ex.name}</Text>
                                            <Text className="text-gray-400 text-xs">{ex.type}</Text>
                                        </View>
                                    </TouchableOpacity>

                                    <View className="flex-row items-center gap-3">
                                        {/* <Ionicons name="information-circle-outline" size={20} color="#D1D5DB" /> */}
                                        <TouchableOpacity onPress={() => onInfoPress && onInfoPress(ex as any)}>
                                            <Ionicons name="information-circle-outline" size={20} color="#D1D5DB" />
                                        </TouchableOpacity>

                                        {selectionMode === 'copy' || selectionMode === 'replace' ? (
                                            <TouchableOpacity onPress={() => setSelectedCopyId(ex.id)} className={`w-8 h-8 rounded-lg items-center justify-center ${selectedCopyId === ex.id ? 'bg-black' : 'bg-gray-100'}`}>
                                                <Ionicons name={selectedCopyId === ex.id ? (selectionMode === 'replace' ? "sync" : "link") : (selectionMode === 'replace' ? "sync-outline" : "link-outline")} size={18} color={selectedCopyId === ex.id ? "white" : "#6B7280"} />
                                            </TouchableOpacity>
                                        ) : (
                                            <TouchableOpacity onPress={() => onAdd(ex as any)} className="w-8 h-8 rounded-lg items-center justify-center border bg-white border-gray-200 ">
                                                <Ionicons name="add" size={18} color="#6B7280" />
                                            </TouchableOpacity>
                                        )}
                                    </View>
                                </View>
                            ))}
                        </View>
                    ))}
                </BottomSheetScrollView>
            </View>
        </BottomSheetModal>
    );
});