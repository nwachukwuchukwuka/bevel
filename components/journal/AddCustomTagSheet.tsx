import { Ionicons } from '@expo/vector-icons';
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import React, { forwardRef, useCallback, useMemo, useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export type AddCustomTagSheetRef = BottomSheetModal;

interface Props {
    onSave: (label: string, logTime: 'Daytime' | 'Nighttime', isPinned: boolean, icon: string) => void;
}

export const AddCustomTagSheet = forwardRef<AddCustomTagSheetRef, Props>(({ onSave }, ref) => {
    const insets = useSafeAreaInsets();
    const snapPoints = useMemo(() => ['65%'], []);
    const [label, setLabel] = useState('');
    const [logTime, setLogTime] = useState<'Daytime' | 'Nighttime'>('Daytime');
    const [isPinned, setIsPinned] = useState(false);
    const [icon, setIcon] = useState('😴'); // Default emoji as per image

    const renderBackdrop = useCallback((props: any) => (
        <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} opacity={0.4} />
    ), []);

    const dismiss = () => (ref as any).current?.dismiss();

    const handleSave = () => {
        if (label.trim()) {
            onSave(label, logTime, isPinned, icon);
            setLabel('');
            setLogTime('Daytime');
            setIsPinned(false);
            dismiss();
        }
    };

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
                <Text className="text-center font-bold text-[15px] text-gray-900 mb-8">Add custom tag</Text>

                <View className="items-center mb-8">
                    <TouchableOpacity className="w-16 h-16 rounded-full bg-gray-50 items-center justify-center border border-gray-100 mb-4">
                        <Text className="text-[32px]">{icon}</Text>
                    </TouchableOpacity>
                    <TextInput
                        value={label}
                        onChangeText={setLabel}
                        placeholder="(e.g. Sleep medication)"
                        placeholderTextColor="#9CA3AF"
                        className="text-[20px] font-bold text-gray-900 text-center w-full"
                    />
                </View>

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
                        onPress={handleSave}
                        disabled={!label.trim()}
                        className={`h-[56px] rounded-full items-center justify-center ${label.trim() ? 'bg-[#1C1C1E]' : 'bg-gray-300'}`}
                    >
                        <Text className="text-white font-semibold text-[16px]">Save</Text>
                    </TouchableOpacity>
                </View>
            </BottomSheetView>
        </BottomSheetModal>
    );
});
