import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { Pressable, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

interface ServingInputModalProps {
    isVisible: boolean;
    initialValue: string;
    unit: string;
    onClose: () => void;
    onSave: (newValue: string) => void;
}

export const ServingInputModal = ({ isVisible, initialValue, unit, onClose, onSave }: ServingInputModalProps) => {
    const [value, setValue] = useState(initialValue);

    // Reset value when opening
    useEffect(() => {
        if (isVisible) setValue(initialValue);
    }, [isVisible]);

    const handlePress = (key: string) => {
        if (value === '0' && key !== ',') {
            setValue(key);
        } else {
            setValue(prev => prev + key);
        }
    };

    const handleBackspace = () => {
        setValue(prev => (prev.length > 1 ? prev.slice(0, -1) : '0'));
    };

    const handleSave = () => {
        onSave(value);
        onClose();
    };

    if (!isVisible) return null;

    return (
        <View className="absolute top-0 left-0 right-0 bottom-0 z-50 justify-end">
            {/* Backdrop */}
            <Animated.View
                entering={FadeIn}
                exiting={FadeOut}
                className="absolute inset-0 bg-black/60"
            >
                <Pressable className="flex-1" onPress={onClose} />
            </Animated.View>

            {/* Keyboard Container */}
            <Animated.View
                entering={FadeIn.duration(300)}
                exiting={FadeOut.duration(300)}
                className="bg-[#F2F3F7] rounded-t-[32px] p-4 pb-10"
            >
                {/* Input Display Area */}
                <View className="bg-white rounded-xl h-14 flex-row items-center px-4 mb-4 shadow-sm border border-gray-100">
                    <Text className="text-xl font-semibold text-gray-900 flex-1">{value}</Text>
                    <Text className="text-gray-400 text-base font-medium">{unit}</Text>
                </View>

                {/* Custom Keypad Grid */}
                <View className="flex-row gap-3 h-64">
                    {/* Left Side: Numbers (3x4 Grid) */}
                    <View className="flex-[3] flex-row flex-wrap gap-2">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                            <KeyButton key={num} label={num.toString()} onPress={() => handlePress(num.toString())} />
                        ))}
                        <KeyButton label="," onPress={() => handlePress('.')} />
                        <KeyButton label="0" onPress={() => handlePress('0')} />
                        <KeyButton label="/" onPress={() => { }} />
                    </View>

                    {/* Right Side: Actions (Backspace & Done) */}
                    <View className="flex-1 gap-2">
                        {/* Backspace Button */}
                        <TouchableOpacity
                            onPress={handleBackspace}
                            className="bg-white rounded-xl flex-1 items-center justify-center shadow-sm active:bg-gray-50"
                        >
                            <Ionicons name="backspace-outline" size={24} color="#1F2937" />
                        </TouchableOpacity>

                        {/* Done Button (Taller, spans 2 rows approx) */}
                        <TouchableOpacity
                            onPress={handleSave}
                            className="bg-[#1A1A1A] rounded-xl flex-[2] items-center justify-center shadow-md active:bg-gray-800"
                        >
                            <Text className="text-white font-bold text-lg">Done</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Animated.View>
        </View>
    );
};

// Helper Component for Keys
const KeyButton = ({ label, onPress }: { label: string, onPress: () => void }) => (
    <TouchableOpacity
        onPress={onPress}
        className="bg-white rounded-xl w-[31%] h-[23%] items-center justify-center shadow-sm active:bg-gray-50 mb-1"
    >
        <Text className="text-2xl font-semibold text-gray-900">{label}</Text>
    </TouchableOpacity>
);