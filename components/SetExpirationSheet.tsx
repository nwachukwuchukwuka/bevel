import { Ionicons } from '@expo/vector-icons';
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import DateTimePicker from '@react-native-community/datetimepicker';
import React, { forwardRef, useCallback, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface SetExpirationSheetProps {
    activeItem: any;
    onSave: (id: string, date: string) => void;
}

export const SetExpirationSheet = forwardRef<BottomSheetModal, SetExpirationSheetProps>(({ activeItem, onSave }, ref) => {
    const [date, setDate] = useState(new Date());

    const renderBackdrop = useCallback(
        (props: any) => <BottomSheetBackdrop {...props} opacity={0.4} appearsOnIndex={0} disappearsOnIndex={-1} />,
        []
    );

    const handleDismiss = () => {
        (ref as any).current?.dismiss();
    };

    const handleSave = () => {
        if (activeItem) {
            // Format options: 'Sep 15, 2025'
            const formattedDate = date.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
            });
            onSave(activeItem.id, formattedDate);
        }
        handleDismiss();
    };

    return (
        <BottomSheetModal
            ref={ref}
            snapPoints={activeItem ? ['50%'] : ['55%']}
            backdropComponent={renderBackdrop}
            handleIndicatorStyle={{ display: 'none' }}
            enableDynamicSizing={false}
        >
            <BottomSheetView className="flex-1 px-5 pt-2">
                {/* Header */}
                <View className="flex-row items-center justify-center mb-4 relative">
                    <TouchableOpacity onPress={handleDismiss} className="absolute left-0">
                        <Ionicons name="close" size={24} color="#9CA3AF" />
                    </TouchableOpacity>
                    <Text className="font-bold text-gray-900 text-base">Set expiration</Text>
                </View>


                {/* Actual Picker View */}
                <View className="flex-1 items-center justify-center ">
                    <DateTimePicker
                        value={date}
                        mode="date"
                        display="spinner"
                        onChange={(event, selectedDate) => {
                            const currentDate = selectedDate || date;
                            setDate(currentDate);
                        }}
                        textColor="#111827"
                        style={{ width: '100%', height: 180 }}
                    />
                </View>

                <TouchableOpacity
                    onPress={handleSave}
                    className="bg-[#1A1A1A] py-4 rounded-full items-center mb-10 mt-4"
                >
                    <Text className="text-white font-bold text-base">Save</Text>
                </TouchableOpacity>
            </BottomSheetView>
        </BottomSheetModal>
    );
});
