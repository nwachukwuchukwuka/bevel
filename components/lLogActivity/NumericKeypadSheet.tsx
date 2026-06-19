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
    const snapPoints = useMemo(() => ['85%'], []);
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
            backgroundStyle={{ backgroundColor: '#090D16', borderRadius: 32 }}
            backdropComponent={(props) => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} opacity={0.6} />}
            enableDynamicSizing={false}
        >
            <BottomSheetView style={{ paddingBottom: insets.bottom }} className="flex-1 bg-[#090D16] pt-6">

                <View className="flex-row items-start justify-between px-5 mb-6">
                    <View className="flex-1">
                        <Text className="text-2xl font-bold text-white">{title}</Text>
                    </View>
                    <TouchableOpacity
                        onPress={handleCancel}
                        className="bg-[#151E33] border border-[#2D3748] rounded-xl px-4 py-2"
                    >
                        <Text className="text-slate-400 font-medium text-sm">Cancel</Text>
                    </TouchableOpacity>
                </View>

                <View className="px-5 mb-4">
                    <View className="flex-row bg-[#151E33] border border-[#1E293B] rounded-xl p-1.5">
                        <TouchableOpacity
                            onPress={() => setUnit('kCal')}
                            className={`flex-1 items-center justify-center py-2 rounded-lg ${unit === 'kCal' ? 'bg-[#1E293B] border border-[#2D3748]' : 'border border-transparent'}`}
                        >
                            <Text className={`font-semibold text-sm ${unit === 'kCal' ? 'text-white' : 'text-slate-500'}`}>kCal</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => setUnit('kJ')}
                            className={`flex-1 items-center justify-center py-2 rounded-lg ${unit === 'kJ' ? 'bg-[#1E293B] border border-[#2D3748]' : 'border border-transparent'}`}
                        >
                            <Text className={`font-semibold text-sm ${unit === 'kJ' ? 'text-white' : 'text-slate-500'}`}>kJ</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View className="px-5 mb-8">
                    <View className="bg-[#151E33] border border-[#1E293B] rounded-2xl py-3 flex-row items-center justify-center relative">
                        <Text className={`text-4xl font-bold ${value ? 'text-white' : 'text-[#1E293B]'}`}>
                            {value || '—'}
                        </Text>
                    </View>
                </View>

                <View className="flex-row flex-wrap justify-between gap-y-3 px-5 mb-24">
                    {['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0'].map((btn, idx) => (
                        <View key={idx} className="w-[31%] aspect-[1.8]">
                            {btn ? (
                                <TouchableOpacity
                                    onPress={() => handlePress(btn)}
                                    activeOpacity={0.7}
                                    className="flex-1 bg-[#151E33] border border-[#1E293B] rounded-xl items-center justify-center"
                                >
                                    <Text className="text-2xl font-medium text-white">{btn}</Text>
                                </TouchableOpacity>
                            ) : <View className="flex-1" />}
                        </View>
                    ))}
                    <View className="w-[31%] aspect-[1.8]">
                        <TouchableOpacity
                            onPress={handleDelete}
                            onLongPress={() => setValue('')}
                            activeOpacity={0.7}
                            className="flex-1 bg-[#1E293B] border border-[#2D3748] rounded-xl items-center justify-center"
                        >
                            <Ionicons name="backspace" size={24} color="#4DB9F2" />
                        </TouchableOpacity>
                    </View>
                </View>

                <View className="absolute bottom-0 w-full px-5 pb-8 pt-4 bg-[#090D16]">
                    <TouchableOpacity
                        onPress={handleSave}
                        className="bg-[#4DB9F2] py-4 rounded-xl items-center border border-[#4DB9F2]"
                    >
                        <Text className="text-[#090D16] font-bold text-base">Save</Text>
                    </TouchableOpacity>
                </View>

            </BottomSheetView>
        </BottomSheetModal>
    );
});