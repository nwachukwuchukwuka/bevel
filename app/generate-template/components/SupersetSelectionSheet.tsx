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

    const renderBackdrop = useCallback((props: any) => <BottomSheetBackdrop {...props} opacity={0.6} />, []);

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
            backgroundStyle={{ backgroundColor: '#090D16', borderRadius: 32 }}
            enableDynamicSizing={false}
        >
            <View className="flex-1 bg-[#090D16] pt-4">

                <View className="flex-row items-start justify-between px-5 mb-6">
                    <View className="flex-1 mr-4">
                        <Text className="font-bold text-white text-2xl">
                            {mode === 'create' ? 'Create superset/circuit' : 'Edit superset/circuit'}
                        </Text>
                    </View>
                    <TouchableOpacity onPress={() => (ref as any).current?.dismiss()} className="w-10 h-10 border border-[#2D3748] bg-[#151E33] rounded-xl items-center justify-center">
                        <Ionicons name="chevron-back" size={20} color="#94A3B8" />
                    </TouchableOpacity>
                </View>

                <BottomSheetScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 150 }}>
                    {exercises.map((ex) => {
                        const isSelected = selectedIds.includes(ex.id);
                        return (
                            <TouchableOpacity
                                key={ex.id}
                                onPress={() => toggleSelection(ex.id)}
                                className={`flex-row items-center justify-between p-4 mb-3 rounded-2xl border ${isSelected ? 'border-[#4DB9F2] bg-[#4DB9F2]/10' : 'border-[#1E293B] bg-[#151E33]'}`}
                            >
                                <View className="flex-row items-center gap-4">
                                    <View className="w-12 h-12 bg-[#1E293B] rounded-xl items-center justify-center border border-[#2D3748]">
                                        <Text className="text-xl">{ex.icon}</Text>
                                    </View>
                                    <View>
                                        <Text className="font-semibold text-white text-base">{ex.name}</Text>
                                        <Text className="text-slate-400 font-medium text-sm mt-0.5">
                                            {ex.type} • {ex.sets || 1} sets
                                        </Text>
                                    </View>
                                </View>

                                <View className={`w-6 h-6 rounded-lg items-center justify-center border ${isSelected ? 'bg-[#4DB9F2] border-[#4DB9F2]' : 'bg-[#090D16] border-[#2D3748]'}`}>
                                    {isSelected && <Ionicons name="checkmark" size={16} color="#090D16" />}
                                </View>
                            </TouchableOpacity>
                        );
                    })}
                </BottomSheetScrollView>

                <View className="absolute bottom-0 left-0 right-0 bg-[#090D16] px-5 pt-4 pb-8">
                    {mode === 'edit' && (
                        <TouchableOpacity
                            onPress={() => {
                                onUnlink?.();
                                (ref as any).current?.dismiss();
                            }}
                            className="bg-[#EF4444]/10 border border-[#EF4444]/30 py-4 rounded-xl items-center mb-3"
                        >
                            <Text className="text-[#EF4444] font-bold text-base">Unlink</Text>
                        </TouchableOpacity>
                    )}

                    <TouchableOpacity
                        onPress={handleCreate}
                        disabled={selectedIds.length < 2}
                        className={`py-4 rounded-xl items-center border ${selectedIds.length < 2 ? 'bg-[#151E33] border-[#2D3748]' : 'bg-[#4DB9F2] border-[#4DB9F2]'}`}
                    >
                        <Text className={`font-bold text-base ${selectedIds.length < 2 ? 'text-slate-500' : 'text-[#090D16]'}`}>
                            {mode === 'edit' ? 'Save' : 'Create'}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </BottomSheetModal>
    );
});