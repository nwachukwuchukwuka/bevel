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

    // const renderBackdrop = useCallback((props: any) => <BottomSheetBackdrop {...props} opacity={0.4} />, []);
    const renderBackdrop = useCallback(
        (props: any) => (
            <BottomSheetBackdrop
                {...props}
                opacity={0.4}
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
        <BottomSheetModal ref={ref} snapPoints={['75%']} backdropComponent={renderBackdrop} handleIndicatorStyle={{ display: 'none' }} enableDynamicSizing={false}>
            <View className="flex-1 bg-white rounded-t-3xl pt-2">
                <Text className="text-center font-bold text-gray-900 text-[13px] my-4 mb-6">Filter by muscle group</Text>

                <BottomSheetScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 100, gap: 10 }}>
                    {/* All Groups Option */}
                    <TouchableOpacity
                        onPress={() => toggleGroup('All groups')}
                        className={`flex-row justify-between items-center p-4 rounded-2xl border ${selected.includes('All groups') ? 'border-black bg-white' : 'border-gray-100 bg-gray-50/50'}`}
                    >
                        <Text className="font-bold text-gray-900">All groups</Text>
                        <View className={`w-5 h-5 rounded items-center justify-center border ${selected.includes('All groups') ? 'bg-black border-black' : 'bg-white border-gray-300'}`}>
                            {selected.includes('All groups') && <Ionicons name="checkmark" size={14} color="white" />}
                        </View>
                    </TouchableOpacity>

                    {/* Specific Muscle Groups */}
                    {MUSCLE_GROUPS.map(group => {
                        const isSelected = selected.includes(group);
                        return (
                            <TouchableOpacity
                                key={group} onPress={() => toggleGroup(group)}
                                className={`flex-row justify-between items-center p-4 rounded-2xl border ${isSelected ? 'border-black bg-white' : 'border-gray-100 bg-gray-50/50'}`}
                            >
                                <Text className="font-bold text-gray-900">{group}</Text>
                                <View className={`w-5 h-5 rounded items-center justify-center border ${isSelected ? 'bg-black border-black' : 'bg-white border-gray-300'}`}>
                                    {isSelected && <Ionicons name="checkmark" size={14} color="white" />}
                                </View>
                            </TouchableOpacity>
                        )
                    })}
                </BottomSheetScrollView>

                {/* Sticky Bottom Button */}
                <View className="absolute bottom-0 w-full bg-white px-5 pt-4 pb-8 border-t border-white">
                    <TouchableOpacity onPress={handleApply} className="bg-[#1A1A1A] py-4 rounded-full items-center">
                        <Text className="text-white font-bold text-base">{buttonText}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </BottomSheetModal>
    );
});