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
                opacity={0.6}
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
            handleIndicatorStyle={{ backgroundColor: '#1E2D4A', width: 40, height: 4 }}
            backgroundStyle={{ backgroundColor: '#090D16', borderRadius: 24 }}
            enableDynamicSizing={false}
        >
            <BottomSheetView
                style={{ paddingBottom: insets.bottom + 20 }}
                className="flex-1 px-5 pt-4"
            >
                <MenuProvider skipInstanceCheck>
                    <Text className="text-center font-bold text-[16px] text-[#F1F5F9] mb-6">
                        Workout Templates
                    </Text>

                    <View className="gap-4">
                        <TouchableOpacity
                            onPress={handleAddNew}
                            activeOpacity={0.6}
                            className="flex-row items-center p-4 border border-dashed border-[#1E2D4A] rounded-[20px] bg-[#151E33]"
                        >
                            <View className="w-[42px] h-[42px] bg-[#0F172A] border border-[#1E2D4A] rounded-[14px] items-center justify-center mr-4">
                                <Ionicons name="add" size={20} color="#38BDF8" />
                            </View>
                            <Text className="font-semibold text-[15px] text-[#38BDF8]">
                                Add new workout
                            </Text>
                        </TouchableOpacity>

                        {templates.map((template) => (
                            <View
                                key={template.id}
                                className="flex-row items-center justify-between p-4 bg-[#151E33] rounded-[20px] border border-[#1E2D4A]"
                            >
                                <View className="gap-1.5 flex-1">
                                    <Text className="font-bold text-[16px] text-[#F1F5F9]">
                                        {template.title}
                                    </Text>
                                    <Text className="font-medium text-[13px] text-[#64748B]">
                                        {template.exercisesCount} exercises, {template.setsCount} sets
                                    </Text>
                                </View>

                                <Menu>
                                    {/* The Trigger (Dots icon) */}
                                    <MenuTrigger customStyles={{ triggerWrapper: { padding: 4 } }}>
                                        <View className="w-9 h-9 rounded-[10px] bg-[#0F172A] border border-[#1E2D4A] items-center justify-center">
                                            <Ionicons name="ellipsis-horizontal" size={16} color="#94A3B8" />
                                        </View>
                                    </MenuTrigger>

                                    {/* The Dropdown Menu */}
                                    <MenuOptions customStyles={{ optionsContainer: styles.menuOptionsContainer }}>

                                        {/* Edit Option */}
                                        <MenuOption onSelect={() => console.log('Edit clicked')}>
                                            <View className="flex-row items-center justify-between px-4 py-3.5 border-b border-[#334155]/50">
                                                <Text className="text-[15px] font-medium text-[#F1F5F9]">Edit workout</Text>
                                                <Ionicons name="pencil-outline" size={18} color="#94A3B8" />
                                            </View>
                                        </MenuOption>

                                        {/* Duplicate Option */}
                                        <MenuOption onSelect={() => handleDuplicate(template)}>
                                            <View className="flex-row items-center justify-between px-4 py-3.5 border-b border-[#334155]/50">
                                                <Text className="text-[15px] font-medium text-[#F1F5F9]">Duplicate</Text>
                                                <Ionicons name="copy-outline" size={18} color="#94A3B8" />
                                            </View>
                                        </MenuOption>

                                        {/* Delete Option */}
                                        <MenuOption onSelect={() => handleDelete(template.id)}>
                                            <View className="flex-row items-center justify-between px-4 py-3.5">
                                                <Text className="text-[15px] font-medium text-[#F87171]">Delete</Text>
                                                <Ionicons name="trash-outline" size={18} color="#F87171" />
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
    menuOptionsContainer: {
        borderRadius: 16,
        width: 200,
        backgroundColor: '#1E2D4A',
        borderColor: '#334155',
        borderWidth: 1,
    }
});