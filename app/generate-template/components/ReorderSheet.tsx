import { Ionicons } from '@expo/vector-icons';
import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet';
import React, { forwardRef, useCallback, useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import DraggableFlatList, { RenderItemParams, ScaleDecorator } from 'react-native-draggable-flatlist';

export type SetType = 'normal' | 'warmup' | 'cooldown' | 'failure' | 'dropset';
export type Exercise = {
    id: string;
    name: string;
    type: string;
    sets: number;
    icon: string;
    supersetId?: string;
    setTypes?: SetType[];
    weights?: (string | null)[];
    reps?: (string | null)[];
};

interface ReorderSheetProps {
    exercises: Exercise[];
    onSave: (reordered: Exercise[]) => void;
}

export const ReorderSheet = forwardRef<BottomSheetModal, ReorderSheetProps>(({ exercises, onSave }, ref) => {
    const [data, setData] = useState(exercises);

    // Sync data when sheet opens
    useEffect(() => { setData(exercises); }, [exercises]);

    const handleSave = () => {
        onSave(data);
        (ref as any).current?.dismiss();
    };

    const renderBackdrop = useCallback((props: any) => <BottomSheetBackdrop {...props} opacity={0.4} />, []);

    const renderItem = ({ item, drag, isActive }: RenderItemParams<Exercise>) => {
        return (
            <ScaleDecorator>
                <TouchableOpacity
                    activeOpacity={1}
                    onLongPress={drag}
                    disabled={isActive}
                    className={`flex-row items-center justify-between bg-white p-4 rounded-2xl border border-gray-100 mb-3 mx-5 ${isActive ? 'shadow-lg shadow-black/20 elevation-5' : 'shadow-sm'}`}
                >
                    <View className="flex-row items-center gap-4">
                        <View className="w-12 h-12 bg-gray-50 rounded-xl items-center justify-center border border-gray-100">
                            <Text className="text-xl">{item.icon}</Text>
                        </View>
                        <View>
                            <Text className="font-bold text-gray-900 text-[15px]">{item.name}</Text>
                            <Text className="text-gray-400 text-xs mt-0.5">{item.type} • {item.sets} sets</Text>
                        </View>
                    </View>

                    <TouchableOpacity onPressIn={drag} className="p-2">
                        {/* Grip icon mimicking the screenshot */}
                        <Ionicons name="reorder-four" size={24} color="#D1D5DB" />
                    </TouchableOpacity>
                </TouchableOpacity>
            </ScaleDecorator>
        );
    };

    return (
        <BottomSheetModal ref={ref} snapPoints={['100%']} backgroundStyle={{ backgroundColor: '#F9FAFB' }} backdropComponent={renderBackdrop} handleIndicatorStyle={{ display: 'none' }} enableDynamicSizing={false}>
            <View className="flex-1  rounded-t-3xl ">

                {/* Header */}
                <View className="flex-row justify-center items-center px-5 mb-6 pt-4">
                    <Text className="font-bold text-gray-500 text-sm">Reorder exercises</Text>
                </View>

                {/* Draggable List */}
                <DraggableFlatList
                    data={data}
                    onDragEnd={({ data }) => setData(data)}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                    contentContainerStyle={{ paddingBottom: 100 }}
                    showsVerticalScrollIndicator={false}
                />

                {/* Sticky Save Button */}
                <View className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#F9FAFB] to-transparent pt-10 pb-8 px-5">
                    <TouchableOpacity onPress={handleSave} className="bg-[#1A1A1A] py-4 rounded-full items-center shadow-lg">
                        <Text className="text-white font-bold text-base">Save</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </BottomSheetModal>
    );
});