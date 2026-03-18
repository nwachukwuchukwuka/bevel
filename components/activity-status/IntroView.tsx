import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface Props {
    onContinue: () => void;
    onClose: () => void;
}

const GlowIcon = ({ name, bgColor, shadowColor }: { name: any, bgColor: string, shadowColor: string }) => (
    <View className="m-2 relative">
        {/* Glow Background Mock using shadows */}
        <View
            className={`absolute inset-0 rounded-full ${bgColor}`}
            style={[styles.glow, { shadowColor }]}
        />
        {/* Actual Icon */}
        <View className={`w-16 h-16 rounded-full ${bgColor} items-center justify-center z-10`}>
            <Ionicons name={name} size={32} color="white" />
        </View>
    </View>
);

export const IntroView = ({ onContinue, onClose }: Props) => {
    return (
        <View className="px-5 pt-2  items-center">
            {/* Header / Close */}
            <View className="w-full flex-row justify-start mb-8">
                <TouchableOpacity onPress={onClose} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                    <Ionicons name="close" size={24} color="#9CA3AF" />
                </TouchableOpacity>
            </View>

            {/* Glowing Icons Grid */}
            <View className="mb-8 items-center justify-center">
                <View className="flex-row gap-2">
                    <GlowIcon name="walk" bgColor="bg-emerald-400" shadowColor="#34D399" />
                    <GlowIcon name="bandage" bgColor="bg-red-400" shadowColor="#F87171" />
                </View>
                <View className="flex-row gap-2">
                    <GlowIcon name="bed" bgColor="bg-yellow-400" shadowColor="#FACC15" />
                    <GlowIcon name="umbrella" bgColor="bg-blue-400" shadowColor="#60A5FA" />
                </View>
            </View>

            {/* Text Content */}
            <Text className="text-[22px] font-bold text-gray-900 mb-3 text-center">Activity Status</Text>
            <Text className="text-[14px] font-medium text-gray-500 text-center leading-5 mb-8 px-2">
                Set your Activity status to Active, Sick, Injured, or On a Break. Bevel will adjust recommendations to match how you feel.
            </Text>

            {/* Continue Button */}
            <TouchableOpacity
                onPress={onContinue}
                className="w-full bg-[#1C1C1E] h-[56px] rounded-full items-center justify-center"
            >
                <Text className="text-white font-semibold text-[16px]">Continue</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    glow: {
        transform: [{ scale: 1.2 }],
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.6,
        shadowRadius: 15,
        elevation: 10,
        opacity: 0.5,
    }
});