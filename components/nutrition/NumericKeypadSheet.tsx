import { Ionicons } from '@expo/vector-icons';
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import React, { forwardRef, useCallback, useEffect, useMemo, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export type NumericKeypadSheetRef = BottomSheetModal;

interface Props {
    title: string;
    unit: string;
    initialValue: string;
    onSave: (value: string) => void;
}

export const NumericKeypadSheet = forwardRef<NumericKeypadSheetRef, Props>(({ title, unit, initialValue, onSave }, ref) => {
    const insets = useSafeAreaInsets();
    const snapPoints = useMemo(() => ['75%'], []);
    const [value, setValue] = useState(initialValue);

    useEffect(() => {
        setValue(initialValue);
    }, [initialValue]);

    const renderBackdrop = useCallback((props: any) => (
        <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} opacity={0.4} />
    ), []);

    const handlePress = (num: string) => {
        if (num === 'back') {
            setValue(prev => prev.slice(0, -1));
        } else if (num === ',') {
            if (!value.includes(',')) {
                setValue(prev => prev + ',');
            }
        } else {
            // Avoid leading zeros unless it's for a decimal
            if (value === '0' && num !== ',') {
                setValue(num);
            } else {
                setValue(prev => prev + num);
            }
        }
    };

    const handleSave = () => {
        onSave(value);
        (ref as any).current?.dismiss();
    };

    return (
        <BottomSheetModal
            ref={ref}
            index={0}
            snapPoints={snapPoints}
            backdropComponent={renderBackdrop}
            handleIndicatorStyle={{ display: 'none' }}
            backgroundStyle={{ backgroundColor: '#F9FAFB', borderRadius: 32 }}
            stackBehavior='push'

        >
            <BottomSheetView style={{ flex: 1, paddingBottom: insets.bottom }}>
                {/* Header */}
                <View className="flex-row items-center justify-between px-6 py-4">
                    <TouchableOpacity onPress={() => (ref as any).current?.dismiss()}>
                        <Text className="text-gray-400 font-bold text-base">Cancel</Text>
                    </TouchableOpacity>
                    <Text className="font-bold text-[15px] text-gray-900">{title}</Text>
                    <TouchableOpacity onPress={handleSave}>
                        <Text className="text-gray-900 font-bold text-base">Save</Text>
                    </TouchableOpacity>
                </View>

                <View className="px-6 flex-1">
                    {/* Display Area */}
                    <View className="bg-white border border-gray-100 rounded-2xl px-5 py-4 flex-row items-center justify-between mb-8 shadow-sm shadow-black/5 mt-4">
                        <Text className="text-[20px] font-bold text-gray-900">{value || '0'}</Text>
                        <Text className="text-gray-400 font-medium">{unit}</Text>
                    </View>

                    {/* Keypad */}
                    <View className="flex-1 justify-center space-y-4">
                        <View className="flex-row justify-between">
                            <Key num="1" onPress={handlePress} />
                            <Key num="2" onPress={handlePress} />
                            <Key num="3" onPress={handlePress} />
                        </View>
                        <View className="flex-row justify-between">
                            <Key num="4" onPress={handlePress} />
                            <Key num="5" onPress={handlePress} />
                            <Key num="6" onPress={handlePress} />
                        </View>
                        <View className="flex-row justify-between">
                            <Key num="7" onPress={handlePress} />
                            <Key num="8" onPress={handlePress} />
                            <Key num="9" onPress={handlePress} />
                        </View>
                        <View className="flex-row justify-between">
                            <Key num="," onPress={handlePress} />
                            <Key num="0" onPress={handlePress} />
                            <TouchableOpacity
                                onPress={() => handlePress('back')}
                                className="w-[30%] h-16 items-center justify-center rounded-2xl"
                            >
                                <Ionicons name="backspace-outline" size={24} color="#1A1A1A" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </BottomSheetView>
        </BottomSheetModal>
    );
});

const Key = ({ num, onPress }: { num: string, onPress: (n: string) => void }) => (
    <TouchableOpacity
        onPress={() => onPress(num)}
        className="w-[30%] h-16 items-center justify-center bg-white rounded-2xl border border-gray-50 shadow-sm shadow-black/5"
    >
        <Text className="text-2xl font-bold text-gray-900">{num}</Text>
    </TouchableOpacity>
);
