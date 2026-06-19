import { DUMMY_EXERCISES, ExerciseDefinition } from '@/constants';
import { Ionicons } from '@expo/vector-icons';
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import React, { forwardRef, useCallback, useMemo, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
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
            <BottomSheetBackdrop {...backdropProps} disappearsOnIndex={-1} appearsOnIndex={0} opacity={0.6} />
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
            backgroundStyle={{ backgroundColor: '#090D16', borderRadius: 24 }}
            enableDynamicSizing={false}
        >
            {/* Custom Header Area */}
            <View className="flex-row items-center justify-between px-5 pt-5 pb-4 bg-[#090D16] rounded-t-[24px]">
                <TouchableOpacity onPress={handleClose} className="w-9 h-9 bg-[#151E33] border border-[#1E2D4A] rounded-[10px] items-center justify-center">
                    <Ionicons name="close" size={20} color="#94A3B8" />
                </TouchableOpacity>
                <Text className="font-semibold text-[13px] text-[#64748B]">Add workout template</Text>
                <View className="w-9" />
            </View>

            <BottomSheetScrollView contentContainerStyle={{ paddingBottom: insets.bottom + 120 }} showsVerticalScrollIndicator={false}>
                <View className="px-5">

                    {/* Workout Title Area */}
                    <View className="flex-row items-center justify-between mb-8 mt-2">
                        <View className="gap-1">
                            <Text className="text-[28px] font-bold text-[#F1F5F9]">{title}</Text>
                            <Text className="text-[14px] text-[#64748B] font-medium">
                                {exercises.length} exercises, {totalSets} sets
                            </Text>
                        </View>
                        <TouchableOpacity className="w-10 h-10 bg-[#151E33] border border-[#1E2D4A] rounded-[12px] items-center justify-center">
                            <Ionicons name="pencil" size={18} color="#94A3B8" />
                        </TouchableOpacity>
                    </View>

                    {/* Exercises Header */}
                    <View className="flex-row items-center justify-between mb-6">
                        <Text className="text-[18px] font-bold text-[#F1F5F9]">Exercises</Text>
                        <View className="flex-row items-center gap-2">
                            {exercises.length > 0 && (
                                <TouchableOpacity className="w-10 h-10 bg-[#151E33] border border-[#1E2D4A] rounded-[12px] items-center justify-center">
                                    <Ionicons name="list" size={20} color="#94A3B8" />
                                </TouchableOpacity>
                            )}
                            <TouchableOpacity className="w-10 h-10 bg-[#151E33] border border-[#1E2D4A] rounded-[12px] items-center justify-center">
                                <Ionicons name="add" size={22} color="#94A3B8" />
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
                                    <View key={i} className="bg-[#151E33] rounded-[24px] p-5 border border-[#1E2D4A]">
                                        <View className="flex-row gap-4 mb-5 items-center">
                                            <View className="w-12 h-12 bg-[#0F172A] border border-[#1E2D4A] rounded-[12px]" />
                                            <View className="gap-3 justify-center flex-1">
                                                <View className="w-3/5 h-3.5 bg-[#1E2D4A] rounded-full" />
                                                <View className="w-1/3 h-2.5 bg-[#0F172A] rounded-full" />
                                            </View>
                                            <View className="w-8 h-8 bg-[#0F172A] rounded-[8px]" />
                                        </View>
                                        <View className="flex-row gap-3">
                                            <View className="flex-1 h-12 bg-[#0F172A] border border-[#1E2D4A] rounded-[12px]" />
                                            <View className="flex-1 h-12 bg-[#0F172A] border border-[#1E2D4A] rounded-[12px]" />
                                        </View>
                                    </View>
                                ))}
                            </View>

                            {/* Overlay Content */}
                            <View className="absolute inset-0 items-center justify-center px-4">
                                <View className="bg-[#090D16]/80 p-6 rounded-[24px] items-center w-full">
                                    <Text className="text-[18px] font-bold text-[#F1F5F9] mb-2">No exercises added</Text>
                                    <Text className="text-[14px] text-[#94A3B8] text-center mb-6 leading-5">
                                        Tap the add button to start building your workout template.
                                    </Text>
                                    <TouchableOpacity
                                        onPress={toggleExercises}
                                        activeOpacity={0.8}
                                        className="bg-[#38BDF8] px-6 py-4 rounded-[16px] flex-row items-center gap-2"
                                    >
                                        <Ionicons name="add" size={18} color="#090D16" />
                                        <Text className="text-[#090D16] font-bold text-[15px]">Add exercises</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    ) : (
                        /* FILLED STATE */
                        <View className="gap-5">
                            {exercises.map((exercise) => (
                                <View key={exercise.id} className="bg-[#151E33] rounded-[24px] border border-[#1E2D4A] overflow-hidden">

                                    {/* Card Header */}
                                    <View className="p-5 flex-row items-center justify-between border-b border-[#1E2D4A]">
                                        <View className="flex-row items-center gap-4">
                                            <View className="w-12 h-12 bg-[#0F172A] rounded-[12px] border border-[#1E2D4A] items-center justify-center">
                                                <Ionicons name="barbell-outline" size={24} color="#94A3B8" />
                                            </View>
                                            <View className="gap-1">
                                                <Text className="font-bold text-[16px] text-[#F1F5F9]">{exercise.name}</Text>
                                                <Text className="text-[13px] text-[#64748B] font-medium">{exercise.category}</Text>
                                            </View>
                                        </View>
                                        <TouchableOpacity className="w-8 h-8 rounded-[8px] bg-[#0F172A] border border-[#1E2D4A] items-center justify-center">
                                            <Ionicons name="ellipsis-horizontal" size={16} color="#94A3B8" />
                                        </TouchableOpacity>
                                    </View>

                                    {/* Sets List */}
                                    <View className="p-5 gap-3">
                                        {exercise.sets.map((set, index) => (
                                            <View key={set.id} className="flex-row items-center gap-3">
                                                {/* Set Indicator */}
                                                <View className={`w-10 h-10 rounded-[10px] items-center justify-center border ${set.type === 'warmup' ? 'border-[#FB923C] bg-[#FB923C]/10' : 'border-[#1E2D4A] bg-[#0F172A]'}`}>
                                                    {set.type === 'warmup' ? (
                                                        <Ionicons name="flame" size={16} color="#FB923C" />
                                                    ) : (
                                                        <Text className="text-[14px] font-bold text-[#F1F5F9]">{index + 1}</Text>
                                                    )}
                                                </View>

                                                {/* Weight Input Mock */}
                                                <View className="flex-1 flex-row items-center justify-between border border-[#1E2D4A] rounded-[12px] px-4 py-3 bg-[#0F172A]">
                                                    <Text className="text-[16px] font-bold text-[#F1F5F9]">{set.weight}</Text>
                                                    <Text className="text-[13px] text-[#64748B] font-medium">kg</Text>
                                                </View>

                                                {/* Reps Input Mock */}
                                                <View className="flex-1 flex-row items-center justify-between border border-[#1E2D4A] rounded-[12px] px-4 py-3 bg-[#0F172A]">
                                                    <Text className="text-[16px] font-bold text-[#F1F5F9]">{set.reps}</Text>
                                                    <Text className="text-[13px] text-[#64748B] font-medium">reps</Text>
                                                </View>

                                                {/* Remove Icon */}
                                                <TouchableOpacity className="p-1" hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                                                    <Ionicons name="remove-circle" size={24} color="#475569" />
                                                </TouchableOpacity>
                                            </View>
                                        ))}
                                    </View>

                                    {/* Card Footer Options */}
                                    <View className="flex-row border-t border-[#1E2D4A]">
                                        <TouchableOpacity className="flex-1 py-4 flex-row items-center justify-center gap-2 border-r border-[#1E2D4A]">
                                            <Ionicons name="link" size={16} color="#64748B" />
                                            <Text className="text-[14px] font-medium text-[#94A3B8]">Superset</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity className="flex-1 py-4 flex-row items-center justify-center gap-2">
                                            <Ionicons name="add" size={16} color="#64748B" />
                                            <Text className="text-[14px] font-medium text-[#94A3B8]">Add set</Text>
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
                className="absolute bottom-0 left-0 right-0 px-5 bg-[#090D16] border-t border-[#1E2D4A]"
                style={{ paddingBottom: insets.bottom > 0 ? insets.bottom + 10 : 30, paddingTop: 16 }}
            >
                <TouchableOpacity
                    activeOpacity={0.8}
                    disabled={exercises.length === 0}
                    className={`h-[56px] rounded-[16px] items-center justify-center ${exercises.length === 0 ? 'bg-[#151E33] border border-[#1E2D4A]' : 'bg-[#4DB9F2]'}`}
                >
                    <Text className={`font-semibold text-[16px] ${exercises.length === 0 ? 'text-[#475569]' : 'text-[#090D16]'}`}>Save</Text>
                </TouchableOpacity>
            </View>

        </BottomSheetModal>
    );
});