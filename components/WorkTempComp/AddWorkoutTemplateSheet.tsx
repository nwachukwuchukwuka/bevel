import { DUMMY_EXERCISES, ExerciseDefinition } from '@/constants';
import { Ionicons } from '@expo/vector-icons';
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import React, { forwardRef, useCallback, useMemo, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export type AddWorkoutTemplateSheetRef = BottomSheetModal;

export const AddWorkoutTemplateSheet = forwardRef<AddWorkoutTemplateSheetRef>((props, ref) => {
    const insets = useSafeAreaInsets();
    const snapPoints = useMemo(() => ['90%'], []);

    // State to toggle between Empty and Filled for demonstration
    const [exercises, setExercises] = useState<ExerciseDefinition[]>([]);

    const handleClose = () => {
        if (ref && 'current' in ref && ref.current) {
            ref.current.dismiss();
        }
    };

    const toggleExercises = () => {
        setExercises(exercises.length > 0 ? [] : DUMMY_EXERCISES);
    };

    const totalSets = exercises.reduce((acc, ex) => acc + ex.sets.length, 0);
    const title = exercises.length > 0 ? 'Core' : 'New Workout';

    const renderBackdrop = useCallback(
        (backdropProps: any) => (
            <BottomSheetBackdrop {...backdropProps} disappearsOnIndex={-1} appearsOnIndex={0} opacity={0.5} />
        ),
        []
    );

    return (
        <BottomSheetModal
            ref={ref}
            index={0}
            snapPoints={snapPoints}
            backdropComponent={renderBackdrop}
            handleComponent={null} // Hide default handle for a custom header
            backgroundStyle={{ backgroundColor: '#FDFDFD', borderRadius: 24 }}
            enableDynamicSizing={false}
        >
            {/* Custom Header Area */}
            <View className="flex-row items-center justify-between px-5 pt-5 pb-4 bg-[#FDFDFD] rounded-t-[24px]">
                <TouchableOpacity onPress={handleClose} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                    <Ionicons name="close" size={24} color="#111827" />
                </TouchableOpacity>
                <Text className="font-medium text-[15px] text-gray-600">Add workout template</Text>
                <View className="w-6" />
            </View>

            <BottomSheetScrollView contentContainerStyle={{ paddingBottom: insets.bottom + 100 }} showsVerticalScrollIndicator={false}>
                <View className="px-5">

                    {/* Workout Title Area */}
                    <View className="flex-row items-center justify-between mb-8">
                        <View className="gap-1">
                            <Text className="text-[22px] font-bold text-gray-900">{title}</Text>
                            <Text className="text-[13px] text-gray-500 font-medium">
                                {exercises.length} exercises, {totalSets} sets
                            </Text>
                        </View>
                        <TouchableOpacity className="w-[34px] h-[34px] bg-gray-100 rounded-full items-center justify-center">
                            <Ionicons name="pencil" size={16} color="#6B7280" />
                        </TouchableOpacity>
                    </View>

                    {/* Exercises Header */}
                    <View className="flex-row items-center justify-between mb-4">
                        <Text className="text-[16px] font-bold text-gray-900">Exercises</Text>
                        <View className="flex-row items-center gap-3">
                            {exercises.length > 0 && (
                                <TouchableOpacity className="w-8 h-8 rounded-full bg-gray-100 items-center justify-center">
                                    <Ionicons name="list" size={18} color="#4B5563" />
                                </TouchableOpacity>
                            )}
                            <TouchableOpacity className="w-8 h-8 rounded-full bg-gray-100 items-center justify-center">
                                <Ionicons name="add" size={20} color="#4B5563" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* --- CONTENT AREA --- */}
                    {exercises.length === 0 ? (
                        /* EMPTY STATE */
                        <View className="relative mt-2">
                            {/* Background Skeleton */}
                            <View className="opacity-30 gap-4" pointerEvents="none">
                                {[1, 2].map((i) => (
                                    <View key={i} className="bg-white rounded-[16px] p-4 border border-gray-100" style={styles.shadow}>
                                        <View className="flex-row gap-3 mb-4">
                                            <View className="w-10 h-10 bg-gray-100 rounded-lg" />
                                            <View className="gap-2 justify-center flex-1">
                                                <View className="w-3/5 h-3 bg-gray-100 rounded-full" />
                                                <View className="w-1/3 h-2 bg-gray-100 rounded-full" />
                                            </View>
                                            <View className="w-6 h-6 bg-gray-100 rounded-full" />
                                        </View>
                                        <View className="flex-row gap-2">
                                            <View className="flex-1 h-10 bg-gray-100 rounded-xl" />
                                            <View className="flex-1 h-10 bg-gray-100 rounded-xl" />
                                        </View>
                                    </View>
                                ))}
                            </View>

                            {/* Overlay Content */}
                            <View className="absolute inset-0 items-center justify-center px-4">
                                <Text className="text-[16px] font-bold text-gray-900 mb-2">No exercises added</Text>
                                <Text className="text-[13px] text-gray-500 text-center mb-6 leading-5">
                                    Tap the " <Ionicons name="add" size={12} color="#6B7280" /> " to start adding exercises to your template.
                                </Text>
                                <TouchableOpacity
                                    onPress={toggleExercises}
                                    activeOpacity={0.8}
                                    className="bg-[#1C1C1E] px-6 py-3.5 rounded-full flex-row items-center gap-2"
                                >
                                    <Ionicons name="add" size={18} color="#FFFFFF" />
                                    <Text className="text-white font-semibold text-[14px]">Add exercises</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ) : (
                        /* FILLED STATE */
                        <View className="gap-4">
                            {exercises.map((exercise) => (
                                <View key={exercise.id} className="bg-white rounded-[16px] border border-gray-200 shadow-sm overflow-hidden" style={styles.shadow}>

                                    {/* Card Header */}
                                    <View className="p-4 flex-row items-center justify-between border-b border-gray-50">
                                        <View className="flex-row items-center gap-3">
                                            <View className="w-10 h-10 bg-gray-50 rounded-lg border border-gray-100 items-center justify-center">
                                                <Ionicons name="barbell-outline" size={20} color="#9CA3AF" />
                                            </View>
                                            <View className="gap-0.5">
                                                <Text className="font-bold text-[14px] text-gray-900">{exercise.name}</Text>
                                                <Text className="text-[12px] text-gray-400 font-medium">{exercise.category}</Text>
                                            </View>
                                        </View>
                                        <TouchableOpacity className="w-8 h-8 rounded-full bg-gray-50 items-center justify-center">
                                            <Ionicons name="ellipsis-horizontal" size={16} color="#9CA3AF" />
                                        </TouchableOpacity>
                                    </View>

                                    {/* Sets List */}
                                    <View className="p-4 gap-3">
                                        {exercise.sets.map((set, index) => (
                                            <View key={set.id} className="flex-row items-center gap-3">
                                                {/* Set Indicator */}
                                                <View className={`w-7 h-7 rounded-full items-center justify-center border ${set.type === 'warmup' ? 'border-orange-400 bg-orange-50' : 'border-gray-200 bg-gray-50'}`}>
                                                    {set.type === 'warmup' ? (
                                                        <Ionicons name="flame" size={14} color="#F97316" />
                                                    ) : (
                                                        <Text className="text-[12px] font-bold text-gray-700">{index}</Text>
                                                    )}
                                                </View>

                                                {/* Weight Input Mock */}
                                                <View className="flex-1 flex-row items-center justify-between border border-gray-200 rounded-xl px-4 py-3 bg-white">
                                                    <Text className="text-[15px] font-bold text-gray-900">{set.weight}</Text>
                                                    <Text className="text-[13px] text-gray-400 font-medium">kg</Text>
                                                </View>

                                                {/* Reps Input Mock */}
                                                <View className="flex-1 flex-row items-center justify-between border border-gray-200 rounded-xl px-4 py-3 bg-white">
                                                    <Text className="text-[15px] font-bold text-gray-900">{set.reps}</Text>
                                                    <Text className="text-[13px] text-gray-400 font-medium">reps</Text>
                                                </View>

                                                {/* Remove Icon */}
                                                <TouchableOpacity hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                                                    <Ionicons name="remove-circle-outline" size={24} color="#EF4444" />
                                                </TouchableOpacity>
                                            </View>
                                        ))}
                                    </View>

                                    {/* Card Footer Options */}
                                    <View className="flex-row border-t border-gray-100">
                                        <TouchableOpacity className="flex-1 py-3.5 flex-row items-center justify-center gap-2 border-r border-gray-100 bg-gray-50/50">
                                            <Ionicons name="link" size={16} color="#9CA3AF" />
                                            <Text className="text-[13px] font-medium text-gray-500">Superset</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity className="flex-1 py-3.5 flex-row items-center justify-center gap-2 bg-gray-50/50">
                                            <Ionicons name="add" size={16} color="#9CA3AF" />
                                            <Text className="text-[13px] font-medium text-gray-500">Add set</Text>
                                        </TouchableOpacity>
                                    </View>

                                </View>
                            ))}
                        </View>
                    )}

                </View>
            </BottomSheetScrollView>

            {/* Sticky Bottom Save Button */}
            <View
                className="absolute bottom-14 left-0 right-0 px-5 bg-[#FDFDFD]"
                style={{ paddingBottom: insets.bottom > 0 ? insets.bottom : 20, paddingTop: 16 }}
            >
                <TouchableOpacity
                    activeOpacity={0.8}
                    disabled={exercises.length === 0}
                    className={`h-[56px] rounded-full items-center justify-center ${exercises.length === 0 ? 'bg-[#9CA3AF]' : 'bg-[#1C1C1E]'}`}
                >
                    <Text className="text-white font-semibold text-[16px]">Save</Text>
                </TouchableOpacity>
            </View>

        </BottomSheetModal>
    );
});

const styles = StyleSheet.create({
    shadow: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.03,
        shadowRadius: 8,
        elevation: 1,
    }
});