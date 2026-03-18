import { Ionicons } from '@expo/vector-icons';
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import React, { forwardRef, useMemo, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface NumericKeypadSheetProps {
    title: string;
    onSave: (value: string) => void;
}

export type NumericKeypadSheetRef = BottomSheetModal;

export const NumericKeypadSheet = forwardRef<NumericKeypadSheetRef, NumericKeypadSheetProps>(({ title, onSave }, ref) => {
    const insets = useSafeAreaInsets();
    const snapPoints = useMemo(() => ['65%'], []);
    const [value, setValue] = useState('');
    const [unit, setUnit] = useState('kCal');

    const handlePress = (num: string) => setValue(prev => prev + num);
    const handleDelete = () => setValue(prev => prev.slice(0, -1));

    const handleSave = () => {
        onSave(value);
        if (ref && 'current' in ref && ref.current) ref.current.dismiss();
    };

    const handleCancel = () => {
        if (ref && 'current' in ref && ref.current) ref.current.dismiss();
    };

    return (
        <BottomSheetModal
            ref={ref}
            index={0}
            snapPoints={snapPoints}
            handleComponent={null}
            backgroundStyle={{ backgroundColor: '#F9FAFB', borderRadius: 24 }}
            backdropComponent={(props) => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} opacity={0.4} />}
        >
            <BottomSheetView style={{ paddingBottom: insets.bottom }} className="flex-1 px-5 pt-5">

                {/* Header */}
                <View className="flex-row items-center justify-between mb-4">
                    <TouchableOpacity onPress={handleCancel}><Text className="text-[16px] text-gray-500 font-medium">Cancel</Text></TouchableOpacity>
                    <Text className="text-[16px] font-bold text-gray-900">{title}</Text>
                    <TouchableOpacity onPress={handleSave}><Text className="text-[16px] text-gray-900 font-bold">Save</Text></TouchableOpacity>
                </View>

                {/* Input Display */}
                <View className="h-[56px] border border-gray-200 bg-white rounded-[16px] px-4 justify-center mb-4">
                    <Text className={`text-[18px] font-bold ${value ? 'text-gray-900' : 'text-gray-300'}`}>
                        {value || '—'}
                    </Text>
                </View>

                {/* Unit Toggle */}
                <View className="flex-row gap-2 mb-6">
                    <TouchableOpacity onPress={() => setUnit('kCal')} className={`px-4 py-2 rounded-full ${unit === 'kCal' ? 'bg-[#1C1C1E]' : 'bg-white border border-gray-100'}`}>
                        <Text className={`text-[14px] font-bold ${unit === 'kCal' ? 'text-white' : 'text-gray-500'}`}>kCal</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setUnit('kJ')} className={`px-4 py-2 rounded-full ${unit === 'kJ' ? 'bg-[#1C1C1E]' : 'bg-white border border-gray-100'}`}>
                        <Text className={`text-[14px] font-bold ${unit === 'kJ' ? 'text-white' : 'text-gray-500'}`}>kJ</Text>
                    </TouchableOpacity>
                </View>

                {/* Numpad */}
                <View className="flex-row flex-wrap justify-between gap-y-4">
                    {['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0'].map((btn, idx) => (
                        <View key={idx} style={{ width: '31%' }}>
                            {btn ? (
                                <TouchableOpacity onPress={() => handlePress(btn)} className="bg-white h-[56px] rounded-[14px] items-center justify-center shadow-sm shadow-black/5">
                                    <Text className="text-[24px] font-medium text-gray-900">{btn}</Text>
                                </TouchableOpacity>
                            ) : <View />}
                        </View>
                    ))}
                    {/* Backspace */}
                    <View style={{ width: '31%' }}>
                        <TouchableOpacity onPress={handleDelete} onLongPress={() => setValue('')} className="bg-white h-[56px] rounded-[14px] items-center justify-center shadow-sm shadow-black/5">
                            <Ionicons name="backspace-outline" size={24} color="#111827" />
                        </TouchableOpacity>
                    </View>
                </View>

            </BottomSheetView>
        </BottomSheetModal>
    );
});