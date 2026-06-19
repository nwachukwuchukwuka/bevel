import { Ionicons } from '@expo/vector-icons';
import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet';
import React, { forwardRef, useCallback, useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface SetEditSheetProps {
    mode: 'weight' | 'reps' | 'duration';
    initialValue: string;
    onSave: (value: string, applyToNext: boolean) => void;
}

export const SetEditSheet = forwardRef<BottomSheetModal, SetEditSheetProps>(({ mode, initialValue, onSave }, ref) => {
    const [value, setValue] = useState(initialValue || '');
    const [applyToNext, setApplyToNext] = useState(false);
    const [unit, setUnit] = useState<'kg' | 'lbs'>('kg');
    const [inputMode, setInputMode] = useState<'reps' | 'duration'>(mode === 'duration' ? 'duration' : 'reps');

    useEffect(() => {
        setValue(initialValue || '');
        if (mode === 'duration' || mode === 'reps') {
            setInputMode(mode);
        }
    }, [initialValue, mode]);

    const renderBackdrop = useCallback((props: any) => <BottomSheetBackdrop {...props} opacity={0.6} />, []);

    const handleNumberPress = (num: string) => {
        if (num === ',' && value.includes(',')) return;
        setValue(prev => (prev === '—' || prev === '' ? num : prev + num));
    };

    const handleBackspace = () => {
        setValue(prev => prev.length > 0 ? prev.slice(0, -1) : '');
    };

    const onClear = () => setValue('');

    const handleSave = () => {
        onSave(value, applyToNext);
        (ref as any).current?.dismiss();
    };

    const NumberButton = ({ val }: { val: string }) => (
        <TouchableOpacity
            onPress={() => handleNumberPress(val)}
            activeOpacity={0.7}
            className="w-[31%] aspect-[1.8] bg-[#151E33] border border-[#1E293B] rounded-xl items-center justify-center mb-3"
        >
            <Text className="text-xl font-medium text-white">{val}</Text>
        </TouchableOpacity>
    );

    return (
        <BottomSheetModal
            ref={ref}
            snapPoints={['75%']}
            backdropComponent={renderBackdrop}
            handleIndicatorStyle={{ backgroundColor: '#2D3748', width: 48, height: 4 }}
            backgroundStyle={{ backgroundColor: '#090D16', borderRadius: 32 }}
            enableDynamicSizing={false}
        >
            <View className="flex-1 bg-[#090D16] pt-2">

                {/* Header */}
                <View className="flex-row justify-between items-start px-5 mb-6">
                    <View>
                        <Text className="font-bold text-white text-2xl capitalize">
                            {mode === 'weight' ? 'Weight' : inputMode}
                        </Text>
                        <Text className="text-slate-400 font-medium text-sm mt-1">
                            Update set values
                        </Text>
                    </View>
                    <TouchableOpacity onPress={() => (ref as any).current?.dismiss()} className="w-10 h-10 border border-[#2D3748] bg-[#151E33] rounded-xl items-center justify-center">
                        <Ionicons name="close" size={20} color="#94A3B8" />
                    </TouchableOpacity>
                </View>

                {/* Sub Toggles */}
                <View className="px-5 mb-4">
                    <View className="flex-row bg-[#151E33] border border-[#1E293B] rounded-xl p-1.5">
                        {mode === 'weight' ? (
                            <>
                                <TouchableOpacity
                                    onPress={() => setUnit('lbs')}
                                    className={`flex-1 items-center justify-center py-2 rounded-lg ${unit === 'lbs' ? 'bg-[#1E293B] border border-[#2D3748]' : 'border border-transparent'}`}
                                >
                                    <Text className={`font-semibold text-sm ${unit === 'lbs' ? 'text-white' : 'text-slate-500'}`}>lbs</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => setUnit('kg')}
                                    className={`flex-1 items-center justify-center py-2 rounded-lg ${unit === 'kg' ? 'bg-[#1E293B] border border-[#2D3748]' : 'border border-transparent'}`}
                                >
                                    <Text className={`font-semibold text-sm ${unit === 'kg' ? 'text-white' : 'text-slate-500'}`}>kg</Text>
                                </TouchableOpacity>
                            </>
                        ) : (
                            <>
                                <TouchableOpacity
                                    onPress={() => setInputMode('reps')}
                                    className={`flex-1 items-center justify-center py-2 rounded-lg ${inputMode === 'reps' ? 'bg-[#1E293B] border border-[#2D3748]' : 'border border-transparent'}`}
                                >
                                    <Text className={`font-semibold text-sm ${inputMode === 'reps' ? 'text-white' : 'text-slate-500'}`}>Reps</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => setInputMode('duration')}
                                    className={`flex-1 items-center justify-center py-2 rounded-lg ${inputMode === 'duration' ? 'bg-[#1E293B] border border-[#2D3748]' : 'border border-transparent'}`}
                                >
                                    <Text className={`font-semibold text-sm ${inputMode === 'duration' ? 'text-white' : 'text-slate-500'}`}>Duration</Text>
                                </TouchableOpacity>
                            </>
                        )}
                    </View>
                </View>

                {/* Input Display */}
                <View className="px-5 mb-6">
                    <View className="bg-[#151E33] border border-[#1E293B] rounded-2xl py-2 flex-row items-center justify-center relative">
                        <Text className="text-3xl font-bold text-white">{value || (inputMode === 'duration' ? '00:00' : '—')}</Text>

                        <View className="absolute right-6 bottom-6 flex-row items-center">
                            {mode === 'weight' && <Text className="text-[#4DB9F2] font-semibold text-sm">kg</Text>}
                            {(mode === 'duration' || inputMode === 'duration') && <Text className="text-[#4DB9F2] font-semibold text-xs">min:sec</Text>}
                            {mode === 'reps' && inputMode === 'reps' && <Text className="text-[#4DB9F2] font-semibold text-sm">reps</Text>}
                        </View>
                    </View>
                </View>

                {/* Number Pad */}
                <View className="flex-row flex-wrap justify-between px-5">
                    <NumberButton val="1" />
                    <NumberButton val="2" />
                    <NumberButton val="3" />
                    <NumberButton val="4" />
                    <NumberButton val="5" />
                    <NumberButton val="6" />
                    <NumberButton val="7" />
                    <NumberButton val="8" />
                    <NumberButton val="9" />
                    <NumberButton val="," />
                    <NumberButton val="0" />
                    <TouchableOpacity
                        onPress={handleBackspace}
                        activeOpacity={0.7}
                        className="w-[31%] aspect-[1.8] bg-[#1E293B] border border-[#2D3748] rounded-xl items-center justify-center mb-3"
                    >
                        <Ionicons name="backspace" size={20} color="#4DB9F2" />
                    </TouchableOpacity>
                </View>

                {/* Footer Actions (Sticky Bottom) */}
                <View className="absolute bottom-0 w-full px-5 pb-8 pt-4 bg-[#090D16]">
                    {/* Checkbox */}
                    <TouchableOpacity
                        onPress={() => setApplyToNext(!applyToNext)}
                        activeOpacity={0.8}
                        className="flex-row items-center mb-5 gap-3"
                    >
                        <View className={`w-5 h-5 rounded-md border items-center justify-center ${applyToNext ? 'bg-[#4DB9F2] border-[#4DB9F2]' : 'bg-[#151E33] border-[#2D3748]'}`}>
                            {applyToNext && <Ionicons name="checkmark" size={14} color="#090D16" />}
                        </View>
                        <Text className="text-slate-300 font-medium text-sm">Apply to next set</Text>
                    </TouchableOpacity>

                    {/* Save Button */}
                    <TouchableOpacity
                        onPress={handleSave}
                        className="bg-[#4DB9F2] py-4 rounded-xl items-center border border-[#4DB9F2]"
                    >
                        <Text className="text-[#090D16] font-bold text-base">Save</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </BottomSheetModal>
    );
});