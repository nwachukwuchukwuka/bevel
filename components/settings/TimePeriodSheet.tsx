import { BottomSheetBackdrop, BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { Picker } from '@react-native-picker/picker';
import React, { forwardRef, useCallback, useMemo } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export type TimePeriodSheetRef = BottomSheetModal;
interface Props { period: string; setPeriod: (p: string) => void; }

export const TimePeriodSheet = forwardRef<TimePeriodSheetRef, Props>(({ period, setPeriod }, ref) => {
    const insets = useSafeAreaInsets();
    const snapPoints = useMemo(() => ['50%'], []);
    const renderBackdrop = useCallback((props: any) => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} opacity={0.4} />, []);

    const dismiss = () => { (ref as any).current?.dismiss(); };

    return (
        <BottomSheetModal ref={ref} index={0} snapPoints={snapPoints} enableDynamicSizing={false} backdropComponent={renderBackdrop} handleIndicatorStyle={{ display: 'none' }} backgroundStyle={{ backgroundColor: '#FFFFFF', borderRadius: 24 }}>
            <BottomSheetView className="flex-1 px-5 pt-8" style={{ paddingBottom: insets.bottom || 20 }}>

                <View className="flex-1 justify-center">
                    <Picker
                        selectedValue={period}
                        onValueChange={(itemValue) => setPeriod(itemValue)}
                        itemStyle={{ fontSize: 20, fontWeight: 'bold', color: '#111827' }}
                    >
                        <Picker.Item label="1 year" value="1 year" />
                        <Picker.Item label="2 years" value="2 years" />
                        <Picker.Item label="3 years" value="3 years" />
                        <Picker.Item label="4 years" value="4 years" />
                        <Picker.Item label="5 years" value="5 years" />
                    </Picker>
                </View>

                <TouchableOpacity
                    onPress={dismiss}
                    className="bg-[#1C1C1E] h-[56px] rounded-full items-center justify-center w-full mt-4"
                >
                    <Text className="text-white font-semibold text-[16px]">Done</Text>
                </TouchableOpacity>
            </BottomSheetView>
        </BottomSheetModal>
    );
});