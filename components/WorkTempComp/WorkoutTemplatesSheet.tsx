import { WORKOUT_TEMPLATES } from '@/constants';
import { Ionicons } from '@expo/vector-icons';
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import React, { forwardRef, useCallback, useMemo, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Menu, MenuOption, MenuOptions, MenuProvider, MenuTrigger } from 'react-native-popup-menu';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export type WorkoutTemplatesSheetRef = BottomSheetModal;

export interface WorkoutTemplatesSheetProps {
    onAddNewWorkout: () => void;
}

export const WorkoutTemplatesSheet = forwardRef<WorkoutTemplatesSheetRef, WorkoutTemplatesSheetProps>((props, ref) => {
    const insets = useSafeAreaInsets();

    const [templates, setTemplates] = useState(WORKOUT_TEMPLATES);

    const snapPoints = useMemo(() => ['50%', '75%'], []);

    const renderBackdrop = useCallback(
        (backdropProps: any) => (
            <BottomSheetBackdrop
                {...backdropProps}
                disappearsOnIndex={-1}
                appearsOnIndex={0}
                opacity={0.4}
            />
        ),
        []
    );

    const handleAddNew = useCallback(() => {
        if (ref && 'current' in ref && ref.current) {
            ref.current.dismiss();
        }
        setTimeout(() => {
            props.onAddNewWorkout();
        }, 150);
    }, [ref, props]);

    const handleDuplicate = (template: any) => {
        const newTemplate = {
            ...template,
            id: Math.random().toString(), // Generate a new unique ID
            title: `${template.title} copy`, // Append "copy" to the title
        };

        // Insert the duplicate directly below the original one
        const index = templates.findIndex(t => t.id === template.id);
        const updatedTemplates = [...templates];
        updatedTemplates.splice(index + 1, 0, newTemplate);

        setTemplates(updatedTemplates);
    };

    const handleDelete = (id: string) => {
        setTemplates(templates.filter(t => t.id !== id));
    };

    return (
        <BottomSheetModal
            ref={ref}
            index={0}
            snapPoints={snapPoints}
            backdropComponent={renderBackdrop}
            handleIndicatorStyle={{ backgroundColor: '#D1D5DB', width: 36, height: 4 }}
            backgroundStyle={{ backgroundColor: '#FFFFFF', borderRadius: 24 }}
            enableDynamicSizing={false}
        >
            <BottomSheetView
                style={{ paddingBottom: insets.bottom + 20 }}
                className="flex-1 px-5 pt-2"
            >
                <MenuProvider>
                    <Text className="text-center font-semibold text-[15px] text-gray-800 mb-6">
                        Workout Templates
                    </Text>

                    <View className="gap-4">
                        <TouchableOpacity
                            onPress={handleAddNew}
                            activeOpacity={0.6}
                            className="flex-row items-center p-4 border border-dashed border-gray-300 rounded-[20px] bg-white"
                        >
                            <View className="w-[42px] h-[42px] border border-gray-200 rounded-2xl items-center justify-center mr-4">
                                <Ionicons name="add" size={20} color="#4B5563" />
                            </View>
                            <Text className="font-semibold text-[15px] text-gray-700">
                                Add new workout
                            </Text>
                        </TouchableOpacity>

                        {templates.map((template) => (
                            <View
                                key={template.id}
                                className="flex-row items-center justify-between p-[18px] bg-white rounded-[20px] border border-gray-50"
                                style={styles.cardShadow}
                            >
                                <View className="gap-1">
                                    <Text className="font-bold text-[15px] text-gray-900 tracking-tight">
                                        {template.title}
                                    </Text>
                                    <Text className="font-medium text-[13px] text-gray-400">
                                        {template.exercisesCount} exercises, {template.setsCount} sets
                                    </Text>
                                </View>

                                <Menu>
                                    {/* The Trigger (Dots icon) */}
                                    <MenuTrigger customStyles={{ triggerWrapper: { padding: 8, marginRight: -8 } }}>
                                        <View className="w-8 h-8 rounded-full bg-gray-100 items-center justify-center">
                                            <Ionicons name="ellipsis-horizontal" size={16} color="#9CA3AF" />
                                        </View>
                                    </MenuTrigger>

                                    {/* The Dropdown Menu */}
                                    <MenuOptions customStyles={{ optionsContainer: styles.menuOptionsContainer }}>

                                        {/* Edit Option */}
                                        <MenuOption onSelect={() => console.log('Edit clicked')}>
                                            <View className="flex-row items-center justify-between px-4 py-3.5 border-b border-gray-100">
                                                <Text className="text-[15px] text-gray-900">Edit workout</Text>
                                                <Ionicons name="pencil-outline" size={18} color="#111827" />
                                            </View>
                                        </MenuOption>

                                        {/* Duplicate Option */}
                                        <MenuOption onSelect={() => handleDuplicate(template)}>
                                            <View className="flex-row items-center justify-between px-4 py-3.5 border-b border-gray-100">
                                                <Text className="text-[15px] text-gray-900">Duplicate</Text>
                                                <Ionicons name="copy-outline" size={18} color="#111827" />
                                            </View>
                                        </MenuOption>

                                        {/* Delete Option */}
                                        <MenuOption onSelect={() => handleDelete(template.id)}>
                                            <View className="flex-row items-center justify-between px-4 py-3.5">
                                                <Text className="text-[15px] text-red-500">Delete</Text>
                                                <Ionicons name="trash-outline" size={18} color="#EF4444" />
                                            </View>
                                        </MenuOption>

                                    </MenuOptions>
                                </Menu>
                            </View>
                        ))}

                    </View>
                </MenuProvider>
            </BottomSheetView>

        </BottomSheetModal>
    );
});

const styles = StyleSheet.create({
    cardShadow: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.04,
        shadowRadius: 12,
        elevation: 2,
    },
    // --- Change 9: Added custom styling for the popup  container to match the design ---
    menuOptionsContainer: {
        borderRadius: 14,
        width: 200,
        backgroundColor: '#FFFFFF',
        marginTop: 34, // Push down below the trigger
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.1,
        shadowRadius: 14,
        elevation: 6,
    }
});