import { Ionicons } from '@expo/vector-icons';
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import React, { forwardRef, useCallback, useEffect, useMemo, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export type TagSettingsSheetRef = BottomSheetModal;

interface Props {
    item: {
        id: string;
        label: string;
        isPinned?: boolean;
        logTime?: 'Daytime' | 'Nighttime';
    } | null;
    onSave: (id: string, logTime: 'Daytime' | 'Nighttime', isPinned: boolean) => void;
}

export const TagSettingsSheet = forwardRef<TagSettingsSheetRef, Props>(({ item, onSave }, ref) => {
    const insets = useSafeAreaInsets();
    const snapPoints = useMemo(() => ['60%'], []);
    const [logTime, setLogTime] = useState<'Daytime' | 'Nighttime'>('Daytime');
    const [isPinned, setIsPinned] = useState(false);

    useEffect(() => {
        if (item) {
            setLogTime(item.logTime || 'Daytime');
            setIsPinned(item.isPinned || false);
        }
    }, [item]);

    const renderBackdrop = useCallback((props: any) => (
        <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} opacity={0.4} />
    ), []);

    const dismiss = () => (ref as any).current?.dismiss();

    if (!item) return null;

    return (
        <BottomSheetModal
            ref={ref}
            index={0}
            snapPoints={snapPoints}
            backdropComponent={renderBackdrop}
            handleIndicatorStyle={{ backgroundColor: '#D1D5DB', width: 36, height: 4, marginTop: 8 }}
            backgroundStyle={{ backgroundColor: '#FFFFFF', borderRadius: 24 }}
            enableDynamicSizing={false}
        >
            <BottomSheetView style={{ paddingBottom: insets.bottom + 20 }} className="flex-1 px-5 pt-4">
                <Text className="text-center font-bold text-[15px] text-gray-900 mb-8">{item.label}</Text>

                <Text className="text-[14px] font-bold text-gray-900 mb-1">Log time</Text>
                <Text className="text-[12px] font-medium text-gray-400 mb-4 leading-5">This organizes your journal and morning reminders but won't impact how insights are calculated.</Text>

                {/* Segmented Control */}
                <View className="flex-row bg-gray-100 p-1 rounded-xl mb-6">
                    <TouchableOpacity
                        onPress={() => setLogTime('Daytime')}
                        className={`flex-1 py-2 items-center rounded-lg ${logTime === 'Daytime' ? 'bg-white ' : ''}`}
                    >
                        <Text className={`text-[13px] font-bold ${logTime === 'Daytime' ? 'text-gray-900' : 'text-gray-500'}`}>Daytime</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => setLogTime('Nighttime')}
                        className={`flex-1 py-2 items-center rounded-lg ${logTime === 'Nighttime' ? 'bg-white ' : ''}`}
                    >
                        <Text className={`text-[13px] font-bold ${logTime === 'Nighttime' ? 'text-gray-900' : 'text-gray-500'}`}>Nighttime</Text>
                    </TouchableOpacity>
                </View>

                <View className="flex-1 justify-end gap-3">
                    <TouchableOpacity
                        onPress={() => setIsPinned(!isPinned)}
                        className="bg-gray-50 h-[56px] rounded-full items-center justify-center flex-row gap-2"
                    >
                        <Text className="text-gray-900 font-semibold text-[16px]">{isPinned ? 'Unpin' : 'Pin'}</Text>
                        <Ionicons name={isPinned ? "pin" : "pin-outline"} size={16} color="#111827" />
                        {isPinned && <Ionicons name="close" size={14} color="#111827" style={{ marginLeft: -4 }} />}
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            onSave(item.id, logTime, isPinned);
                            dismiss();
                        }}
                        className="bg-[#1C1C1E] h-[56px] rounded-full items-center justify-center"
                    >
                        <Text className="text-white font-semibold text-[16px]">Save</Text>
                    </TouchableOpacity>
                </View>
            </BottomSheetView>
        </BottomSheetModal>
    );
});
