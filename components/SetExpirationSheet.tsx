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
        (props: any) => <BottomSheetBackdrop {...props} opacity={0.7} appearsOnIndex={0} disappearsOnIndex={-1} />,
        []
    );

    const handleDismiss = () => {
        (ref as any).current?.dismiss();
    };

    const handleSave = () => {
        if (activeItem) {
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
            snapPoints={activeItem ? ['65%'] : ['65%']}
            backdropComponent={renderBackdrop}
            backgroundStyle={{ backgroundColor: '#090D16' }}
            handleIndicatorStyle={{ backgroundColor: '#1E293B', width: 40 }}
            enableDynamicSizing={false}
        >
            <BottomSheetView className="flex-1 px-5 pt-4 pb-8">
                <View className="flex-row items-center justify-between mb-8">
                    <View>
                        <Text className="text-[24px] font-bold text-slate-100">Set expiration</Text>
                    </View>
                    <TouchableOpacity
                        onPress={handleDismiss}
                        className="w-10 h-10 bg-[#151E33] border border-[#1E293B] rounded-[12px] items-center justify-center"
                    >
                        <Ionicons name="close" size={20} color="#94A3B8" />
                    </TouchableOpacity>
                </View>

                {/* Framed Data Container */}
                <View className="flex-1">
                    <View className="bg-[#151E33] border border-[#1E293B] rounded-[24px] items-center justify-center py-4">
                        <DateTimePicker
                            value={date}
                            mode="date"
                            display="spinner"
                            onChange={(event, selectedDate) => {
                                const currentDate = selectedDate || date;
                                setDate(currentDate);
                            }}
                            textColor="#F8FAFC"
                            themeVariant="dark"
                            style={{ width: '100%', height: 180 }}
                        />
                    </View>
                </View>

                <TouchableOpacity
                    onPress={handleSave}
                    className="bg-[#4DB9F2] py-4 rounded-[16px] items-center border border-[#4DB9F2] mt-6"
                >
                    <Text className="text-[#090D16] font-bold text-[16px]">Save</Text>
                </TouchableOpacity>
            </BottomSheetView>
        </BottomSheetModal>
    );
});