import { Ionicons } from '@expo/vector-icons';
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import React, { forwardRef, useCallback, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

const MUSCLE_GROUPS = ['Abductors', 'Abs', 'Adductors', 'Biceps', 'Calves']; // Truncated for brevity

interface FilterProps {
    onApply: (selected: string[]) => void;
}

export const FilterGroupsSheet = forwardRef<BottomSheetModal, FilterProps>(({ onApply }, ref) => {
    const [selected, setSelected] = useState<string[]>(['All groups']);

    const toggleGroup = (group: string) => {
        if (group === 'All groups') {
            setSelected(['All groups']);
        } else {
            let newSelection = selected.filter(s => s !== 'All groups');
            if (newSelection.includes(group)) {
                newSelection = newSelection.filter(s => s !== group);
            } else {
                newSelection.push(group);
            }
            setSelected(newSelection.length === 0 ? ['All groups'] : newSelection);
        }
    };

    const handleApply = () => {
        onApply(selected);
        (ref as any).current?.dismiss();
    };

    const renderBackdrop = useCallback(
        (props: any) => (
            <BottomSheetBackdrop
                {...props}
                opacity={0.6}
                appearsOnIndex={0}
                disappearsOnIndex={-1}
            />
        ),
        []
    );

    const buttonText = selected.includes('All groups')
        ? 'Filter by "All groups"'
        : `Filter by "${selected.length} muscles"`;

    return (
        <BottomSheetModal
            ref={ref}
            snapPoints={['75%']}
            backdropComponent={renderBackdrop}
            handleIndicatorStyle={{ backgroundColor: '#2D3748', width: 48, height: 4 }}
            backgroundStyle={{ backgroundColor: '#090D16', borderRadius: 32 }}
            enableDynamicSizing={false}
        >
            <View className="flex-1 bg-[#090D16]">
                <View className="px-5 pt-4 pb-6">
                    <Text className="text-white font-bold text-2xl">Filter by muscle group</Text>
                </View>

                <BottomSheetScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 100, gap: 12 }}>
                    {/* All Groups Option */}
                    <TouchableOpacity
                        onPress={() => toggleGroup('All groups')}
                        className={`flex-row justify-between items-center p-4 rounded-2xl border ${selected.includes('All groups') ? 'border-[#4DB9F2] bg-[#4DB9F2]/10' : 'border-[#1E293B] bg-[#151E33]'}`}
                    >
                        <Text className={`font-semibold text-base ${selected.includes('All groups') ? 'text-[#4DB9F2]' : 'text-slate-300'}`}>All groups</Text>
                        <View className={`w-6 h-6 rounded-lg items-center justify-center border ${selected.includes('All groups') ? 'bg-[#4DB9F2] border-[#4DB9F2]' : 'bg-transparent border-[#2D3748]'}`}>
                            {selected.includes('All groups') && <Ionicons name="checkmark" size={16} color="#090D16" />}
                        </View>
                    </TouchableOpacity>

                    {/* Specific Muscle Groups */}
                    {MUSCLE_GROUPS.map(group => {
                        const isSelected = selected.includes(group);
                        return (
                            <TouchableOpacity
                                key={group} onPress={() => toggleGroup(group)}
                                className={`flex-row justify-between items-center p-4 rounded-2xl border ${isSelected ? 'border-[#4DB9F2] bg-[#4DB9F2]/10' : 'border-[#1E293B] bg-[#151E33]'}`}
                            >
                                <Text className={`font-semibold text-base ${isSelected ? 'text-[#4DB9F2]' : 'text-slate-300'}`}>{group}</Text>
                                <View className={`w-6 h-6 rounded-lg items-center justify-center border ${isSelected ? 'bg-[#4DB9F2] border-[#4DB9F2]' : 'bg-transparent border-[#2D3748]'}`}>
                                    {isSelected && <Ionicons name="checkmark" size={16} color="#090D16" />}
                                </View>
                            </TouchableOpacity>
                        )
                    })}
                </BottomSheetScrollView>

                {/* Sticky Bottom Button */}
                <View className="absolute bottom-10 w-full bg-[#090D16] px-5 pt-4 pb-8]">
                    <TouchableOpacity onPress={handleApply} className="bg-[#4DB9F2] py-4 rounded-xl items-center border border-[#4DB9F2]">
                        <Text className="text-[#090D16] font-bold text-base">{buttonText}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </BottomSheetModal>
    );
});