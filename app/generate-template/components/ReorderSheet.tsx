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

    useEffect(() => { setData(exercises); }, [exercises]);

    const handleSave = () => {
        onSave(data);
        (ref as any).current?.dismiss();
    };

    const renderBackdrop = useCallback((props: any) => <BottomSheetBackdrop {...props} opacity={0.6} />, []);

    const renderItem = ({ item, drag, isActive }: RenderItemParams<Exercise>) => {
        return (
            <ScaleDecorator>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onLongPress={drag}
                    disabled={isActive}
                    className={`flex-row items-center justify-between p-4 mb-3 mx-5 rounded-2xl border ${isActive ? 'border-[#4DB9F2] bg-[#4DB9F2]/10' : 'border-[#1E293B] bg-[#151E33]'}`}
                >
                    <View className="flex-row items-center gap-4">
                        <View className="w-12 h-12 bg-[#1E293B] rounded-xl items-center justify-center border border-[#2D3748]">
                            <Text className="text-xl">{item.icon}</Text>
                        </View>
                        <View>
                            <Text className="font-semibold text-white text-base">{item.name}</Text>
                            <Text className="text-slate-400 font-medium text-sm mt-0.5">
                                {item.type} • {item.sets} sets
                            </Text>
                        </View>
                    </View>

                    <View
                        onTouchStart={drag}
                        className={`w-10 h-10 rounded-xl items-center justify-center border ${isActive ? 'bg-[#4DB9F2] border-[#4DB9F2]' : 'bg-[#1E293B] border-[#2D3748]'}`}
                    >
                        <Ionicons name="swap-vertical" size={20} color={isActive ? '#090D16' : '#4DB9F2'} />
                    </View>
                </TouchableOpacity>
            </ScaleDecorator>
        );
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
                    <View className="flex-1">
                        <Text className="text-3xl font-bold text-white mb-2">Reorder exercises</Text>
                    </View>
                    <TouchableOpacity onPress={() => (ref as any).current?.dismiss()} className="w-10 h-10 border border-[#2D3748] bg-[#151E33] rounded-xl items-center justify-center mt-1">
                        <Ionicons name="close" size={20} color="#94A3B8" />
                    </TouchableOpacity>
                </View>

                <DraggableFlatList
                    data={data}
                    onDragEnd={({ data }) => setData(data)}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                    contentContainerStyle={{ paddingBottom: 140 }}
                    showsVerticalScrollIndicator={false}
                />

                <View className="absolute bottom-0 left-0 right-0 bg-[#090D16] px-5 pt-4 pb-8">
                    <TouchableOpacity onPress={handleSave} className="bg-[#4DB9F2] py-4 rounded-xl items-center border border-[#4DB9F2]">
                        <Text className="text-[#090D16] font-bold text-base">Save</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </BottomSheetModal>
    );
});