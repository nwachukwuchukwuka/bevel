import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

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

    const baseClass = "w-full h-14 rounded-full items-center justify-center mb-2";
    const bgClass = !enabled
        ? "bg-neutral-400"
        : isPrimary ? "bg-neutral-900" : "bg-neutral-200";

    const textClass = !enabled
        ? "text-neutral-200"
        : isPrimary ? "text-white" : "text-neutral-900";

    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={!enabled}
            activeOpacity={0.8}
            className={`${baseClass} ${bgClass}`}
        >
            <Text className={`text-base font-bold ${textClass}`}>{label}</Text>
        </TouchableOpacity>
    );
};