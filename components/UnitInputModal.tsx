import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { Pressable, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeIn, FadeOut, SlideInDown, SlideOutDown } from 'react-native-reanimated';

interface UnitInputModalProps {
    isVisible: boolean;
    initialValue: string;
    initialUnit: string;
    availableUnits: string[];
    onClose: () => void;
    onSave: (val: string, unit: string) => void;
}

export const UnitInputModal = ({ isVisible, initialValue, initialUnit, availableUnits, onClose, onSave }: UnitInputModalProps) => {
    const [value, setValue] = useState(initialValue);
    const [unit, setUnit] = useState(initialUnit);

    useEffect(() => {
        if (isVisible) {
            setValue(initialValue);
            setUnit(initialUnit);
        }
    }, [isVisible]);

    const handlePress = (key: string) => {
        if (value === '0' && key !== ',') setValue(key);
        else setValue(prev => prev + key);
    };

    const handleBackspace = () => setValue(prev => (prev.length > 1 ? prev.slice(0, -1) : '0'));

    const handleSave = () => {
        onSave(value, unit);
        onClose();
    };

    if (!isVisible) return null;

    return (
        <View className="absolute top-0 left-0 right-0 bottom-0 z-50 justify-end">
            <Animated.View entering={FadeIn} exiting={FadeOut} className="absolute inset-0 bg-black/60">
                <Pressable className="flex-1" onPress={onClose} />
            </Animated.View>

            <Animated.View 
                entering={FadeIn.duration(300)} 
                exiting={FadeOut.duration(300)} 
                className="bg-[#F2F3F7] rounded-t-[32px] p-4 pb-10"
            >

                {/* Input Display Area */}
                <View className="bg-white rounded-xl h-14 flex-row items-center px-4 mb-4 shadow-sm border border-gray-100">
                    <Text className="text-xl font-semibold text-gray-900">{value}</Text>
                    {/* Blinking cursor simulation */}
                    <View className="w-[2px] h-6 bg-blue-500 ml-1 rounded-full opacity-80" />
                    <View className="flex-1" />
                    <Text className="text-gray-400 text-base font-medium">{unit} <Ionicons name="chevron-forward" size={14} /></Text>
                </View>

                {/* Unit Selector Row */}
                <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-4" contentContainerStyle={{ gap: 8 }}>
                    {availableUnits.map(u => (
                        <TouchableOpacity
                            key={u}
                            onPress={() => setUnit(u)}
                            className={`px-4 py-2 rounded-full ${unit === u ? 'bg-[#1A1A1A]' : 'bg-white'}`}
                        >
                            <Text className={`font-semibold ${unit === u ? 'text-white' : 'text-gray-800'}`}>{u}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                {/* Keypad */}
                <View className="flex-row gap-3 h-64">
                    <View className="flex-[3] flex-row flex-wrap gap-2">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                            <KeyButton key={num} label={num.toString()} onPress={() => handlePress(num.toString())} />
                        ))}
                        <KeyButton label="," onPress={() => handlePress('.')} />
                        <KeyButton label="0" onPress={() => handlePress('0')} />
                        <KeyButton label="/" onPress={() => { }} />
                    </View>
                    <View className="flex-1 gap-2">
                        <TouchableOpacity onPress={handleBackspace} className="bg-white rounded-xl flex-1 items-center justify-center shadow-sm">
                            <Ionicons name="backspace-outline" size={24} color="#1F2937" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleSave} className="bg-[#1A1A1A] rounded-xl flex-[2] items-center justify-center shadow-md">
                            <Text className="text-white font-bold text-lg">Done</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Animated.View>
        </View>
    );
};

const KeyButton = ({ label, onPress }: { label: string, onPress: () => void }) => (
    <TouchableOpacity onPress={onPress} className="bg-white rounded-xl w-[31%] h-[23%] items-center justify-center shadow-sm mb-1">
        <Text className="text-2xl font-semibold text-gray-900">{label}</Text>
    </TouchableOpacity>
);