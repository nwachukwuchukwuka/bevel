import { Ionicons } from '@expo/vector-icons';
import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet';
import React, { forwardRef, useCallback } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

interface WorkoutPreviewSheetProps {
    exercises: any[];
}

export const WorkoutPreviewSheet = forwardRef<BottomSheetModal, WorkoutPreviewSheetProps>(({ exercises }, ref) => {
    const renderBackdrop = useCallback((props: any) => <BottomSheetBackdrop {...props} opacity={0.4} />, []);

    return (
        <BottomSheetModal
            ref={ref}
            snapPoints={['85%']}
            backdropComponent={renderBackdrop}
            enablePanDownToClose
            handleIndicatorStyle={{ width: 40, backgroundColor: '#D1D5DB' }}
        >
            <View className="flex-1 bg-white px-5 pt-4">
                {/* Header Actions */}
                <View className="flex-row items-center mb-6">
                    <TouchableOpacity onPress={() => (ref as any).current?.dismiss()}>
                        <Ionicons name="chevron-back" size={24} color="#111827" />
                    </TouchableOpacity>
                    <View className="flex-1 items-center">
                        <Text className="text-gray-500 font-semibold text-[13px]">Full Body Workout</Text>
                    </View>
                    <View className="w-6" />
                </View>

                {/* Title */}
                <View className="mb-8">
                    <Text className="text-3xl font-bold text-gray-900 mb-1">Full Body Workout</Text>
                    <Text className="text-gray-500 font-medium">{exercises.length} exercises, 25 sets</Text>
                </View>

                {/* Exercise List */}
                <ScrollView showsVerticalScrollIndicator={false} className="flex-1 mb-24">
                    {exercises.map((ex, index) => (
                        <View key={index} className="flex-row items-center bg-white border border-gray-100 rounded-2xl p-4 mb-3 shadow-sm">
                            <View className="w-12 h-12 bg-gray-50 rounded-xl items-center justify-center border border-gray-100 mr-4">
                                <Text className="text-xl">{ex.icon || '🏋️'}</Text>
                            </View>
                            <View className="flex-1">
                                <Text className="font-bold text-gray-900 text-base">{ex.name}</Text>
                                <Text className="text-gray-400 text-xs capitalize">{ex.type} • {ex.sets} sets</Text>
                            </View>
                        </View>
                    ))}
                </ScrollView>

                {/* Footer Buttons */}
                <View className="absolute bottom-10 left-5 right-5 flex-row gap-3">
                    <TouchableOpacity className="flex-1 bg-gray-50 py-4 rounded-full items-center justify-center flex-row gap-2 border border-gray-100">
                        <Ionicons name="pencil" size={18} color="#111827" />
                        <Text className="text-gray-900 font-bold text-base">Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="flex-[2] bg-[#1A1A1A] py-4 rounded-full items-center justify-center flex-row gap-2 shadow-lg">
                        <Ionicons name="play" size={18} color="white" />
                        <Text className="text-white font-bold text-base">Start</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </BottomSheetModal>
    );
});
