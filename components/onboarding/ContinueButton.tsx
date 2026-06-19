import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface ContinueButtonProps {
    onPress: () => void;
    label?: string;
    enabled?: boolean;
    variant?: 'primary' | 'secondary';
}

export const ContinueButton: React.FC<ContinueButtonProps> = ({
    onPress,
    label = "Continue",
    enabled = true,
    variant = 'primary'
}) => {
    const isPrimary = variant === 'primary';

    const bgClass = !enabled
        ? "bg-[#1E293B]"
        : isPrimary ? "bg-[#4DB9F2]" : "bg-[#151E33]";

    const borderClass = !enabled
        ? "border-[#2D3748]"
        : isPrimary ? "border-[#4DB9F2]" : "border-[#1E293B]";

    const textClass = !enabled
        ? "text-slate-500"
        : isPrimary ? "text-[#090D16]" : "text-white";

    const iconColor = !enabled
        ? "#64748B"
        : isPrimary ? "#090D16" : "#4DB9F2";

    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={!enabled}
            activeOpacity={0.8}
            className={`w-full h-14 rounded-2xl flex-row items-center justify-between px-5 border ${bgClass} ${borderClass}`}
        >
            <View className="flex-row items-center gap-3">
                <View className="w-2 h-2 rounded-full" style={{ backgroundColor: iconColor, opacity: enabled ? 1 : 0.3 }} />
                <Text className={`text-base font-bold ${textClass}`}>{label}</Text>
            </View>
            <Ionicons name="arrow-forward" size={18} color={iconColor} />
        </TouchableOpacity>
    );
};