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

    const renderBackdrop = useCallback((props: any) => <BottomSheetBackdrop {...props} opacity={0.4} />, []);

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
            activeOpacity={0.6}
            className="w-[30%] aspect-[1.8] bg-gray-50 rounded-2xl items-center justify-center mb-1.5"
        >
            <Text className="text-xl font-normal text-gray-900">{val}</Text>
        </TouchableOpacity>
    );

    return (
        <BottomSheetModal
            ref={ref}
            snapPoints={['60%']}
            backdropComponent={renderBackdrop}
            handleIndicatorStyle={{ width: 32, backgroundColor: '#E5E7EB', height: 4 }}
            enableDynamicSizing={false}
        >
            <View className="flex-1 bg-white pt-1 rounded-t-3xl">
                {/* Header */}
                <View className="flex-row justify-between items-center px-6 mb-2.5 pt-0.5">
                    <TouchableOpacity onPress={() => (ref as any).current?.dismiss()}>
                        <Text className="text-gray-400 text-[13px] font-normal">Cancel</Text>
                    </TouchableOpacity>
                    <Text className="font-medium text-gray-900 text-sm capitalize">{mode === 'weight' ? 'Weight' : inputMode}</Text>
                    <TouchableOpacity onPress={handleSave}>
                        <Text className="text-black font-semibold text-sm">Save</Text>
                    </TouchableOpacity>
                </View>

                {/* Input Display */}
                <View className="px-6 mb-2.5">
                    <View className="border border-gray-100 bg-gray-50 rounded-2xl p-3 flex-row items-center justify-between">
                        <Text className="text-[20px] font-medium text-gray-900">{value || (inputMode === 'duration' ? '00:00' : '—')}</Text>
                        <View className="flex-row items-center gap-2">
                            {mode === 'weight' && <Text className="text-gray-400 text-sm font-normal">kg</Text>}
                            {(mode === 'duration' || inputMode === 'duration') && <Text className="text-gray-400 text-[10px] font-normal">minutes and seconds</Text>}
                            {mode === 'reps' && inputMode === 'reps' && <Text className="text-gray-400 text-sm font-normal">reps</Text>}
                        </View>
                    </View>
                </View>

                {/* Sub Toggles */}
                <View className="flex-row px-6 mb-3 gap-2">
                    {mode === 'weight' ? (
                        <View className="flex-row bg-gray-50 p-1 rounded-xl">
                            <TouchableOpacity
                                onPress={() => setUnit('lbs')}
                                className={`px-4 py-1 rounded-lg ${unit === 'lbs' ? 'bg-[#1A1A1A]' : ''}`}
                            >
                                <Text className={`font-medium text-[12px] ${unit === 'lbs' ? 'text-white' : 'text-gray-400'}`}>lbs</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => setUnit('kg')}
                                className={`px-4 py-1 rounded-lg ${unit === 'kg' ? 'bg-[#1A1A1A]' : ''}`}
                            >
                                <Text className={`font-medium text-[12px] ${unit === 'kg' ? 'text-white' : 'text-gray-400'}`}>kg</Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <View className="flex-row bg-gray-50 p-1 rounded-xl">
                            <TouchableOpacity
                                onPress={() => setInputMode('reps')}
                                className={`px-4 py-1 rounded-lg ${inputMode === 'reps' ? 'bg-[#1A1A1A]' : ''}`}
                            >
                                <Text className={`font-medium text-[12px] ${inputMode === 'reps' ? 'text-white' : 'text-gray-400'}`}>Reps</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => setInputMode('duration')}
                                className={`px-4 py-1 rounded-lg ${inputMode === 'duration' ? 'bg-[#1A1A1A]' : ''}`}
                            >
                                <Text className={`font-medium text-[12px] ${inputMode === 'duration' ? 'text-white' : 'text-gray-400'}`}>Duration</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>

                {/* Number Pad */}
                <View className="flex-row flex-wrap justify-between px-6 mb-2">
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
                        activeOpacity={0.6}
                        className="w-[30%] aspect-[1.8] bg-gray-50 rounded-2xl items-center justify-center mb-1"
                    >
                        <Ionicons name="backspace-outline" size={18} color="#4B5563" />
                    </TouchableOpacity>
                </View>

                {/* Footer Checkbox */}
                <TouchableOpacity
                    onPress={() => setApplyToNext(!applyToNext)}
                    activeOpacity={0.8}
                    className="flex-row items-center justify-center mb-4 gap-2.5"
                >
                    <Text className="text-gray-900 font-medium text-[13px]">Apply to next set</Text>
                    <View className={`w-4 h-4 rounded-full border items-center justify-center ${applyToNext ? 'bg-black border-black' : 'border-gray-300'}`} style={{ width: 16, height: 16 }}>
                        {applyToNext ? (
                            <Ionicons name="checkmark" size={10} color="white" />
                        ) : null}
                    </View>
                </TouchableOpacity>
            </View>
        </BottomSheetModal>
    );
});
