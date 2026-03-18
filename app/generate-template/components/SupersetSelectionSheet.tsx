import { Ionicons } from '@expo/vector-icons';
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import React, { forwardRef, useCallback, useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Exercise } from './ReorderSheet';

interface SupersetSelectionSheetProps {
    exercises: Exercise[];
    onSave: (selectedIds: string[]) => void;
    onUnlink?: () => void;
    initialSelectedIds?: string[];
    mode?: 'create' | 'edit';
}

export const SupersetSelectionSheet = forwardRef<BottomSheetModal, SupersetSelectionSheetProps>(({
    exercises,
    onSave,
    onUnlink,
    initialSelectedIds = [],
    mode = 'create'
}, ref) => {
    const [selectedIds, setSelectedIds] = useState<string[]>(initialSelectedIds);

    useEffect(() => {
        setSelectedIds(initialSelectedIds);
    }, [initialSelectedIds]);

    const renderBackdrop = useCallback((props: any) => <BottomSheetBackdrop {...props} opacity={0.4} />, []);

    const toggleSelection = (id: string) => {
        setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
    };

    const handleCreate = () => {
        onSave(selectedIds);
        (ref as any).current?.dismiss();
    };

    return (
        <BottomSheetModal
            ref={ref}
            snapPoints={['100%']}
            backdropComponent={renderBackdrop}
            handleIndicatorStyle={{ display: 'none' }}
            enableDynamicSizing={false}
        >
            <View className="flex-1 bg-white pt-2 rounded-t-3xl">
                {/* Header */}
                <View className="flex-row justify-between items-center px-5 mb-4 pt-2">
                    <TouchableOpacity onPress={() => (ref as any).current?.dismiss()}>
                        <Ionicons name="chevron-back" size={24} color="#111827" />
                    </TouchableOpacity>
                    <Text className="font-bold text-gray-900 text-base">
                        {mode === 'create' ? 'Create superset/circuit' : 'Edit superset/circuit'}
                    </Text>
                    <View className="w-10" />
                </View>

                <BottomSheetScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 150 }}>
                    {exercises.map((ex) => {
                        const isSelected = selectedIds.includes(ex.id);
                        return (
                            <TouchableOpacity
                                key={ex.id}
                                onPress={() => toggleSelection(ex.id)}
                                className={`flex-row items-center justify-between p-4 mb-3 rounded-2xl border ${isSelected ? 'bg-white border-gray-200' : 'bg-gray-50 border-transparent'}`}
                            >
                                <View className="flex-row items-center gap-3">
                                    <View className="w-10 h-10 bg-white rounded-xl items-center justify-center border border-gray-100 shadow-sm">
                                        <Text className="text-xl">{ex.icon}</Text>
                                    </View>
                                    <View>
                                        <Text className="font-bold text-gray-900 text-[15px]">{ex.name}</Text>
                                        <Text className="text-gray-400 text-xs mt-0.5">{ex.type} • {ex.sets || 1} sets</Text>
                                    </View>
                                </View>

                                {/* Custom Checkbox */}
                                <View className={`w-6 h-6 rounded-md border-2 items-center justify-center ${isSelected ? 'bg-black border-black' : 'border-gray-200 bg-white'}`}>
                                    {isSelected && <Ionicons name="checkmark" size={14} color="white" />}
                                </View>
                            </TouchableOpacity>
                        );
                    })}
                </BottomSheetScrollView>

                {/* Footer Actions */}
                <View className="absolute bottom-0 left-0 right-0 bg-white px-5 pt-4 pb-10 gap-3">
                    {mode === 'edit' && (
                        <TouchableOpacity
                            onPress={() => {
                                onUnlink?.();
                                (ref as any).current?.dismiss();
                            }}
                            className="py-4 items-center"
                        >
                            <Text className="text-red-500 font-bold text-base">Unlink</Text>
                        </TouchableOpacity>
                    )}

                    <TouchableOpacity
                        onPress={handleCreate}
                        disabled={selectedIds.length < 2}
                        className={`py-4 rounded-full items-center shadow-lg ${selectedIds.length < 2 ? 'bg-gray-300' : 'bg-[#1A1A1A]'}`}
                    >
                        <Text className="text-white font-bold text-base">
                            {mode === 'edit' ? 'Save' : 'Create'}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </BottomSheetModal>
    );
});
