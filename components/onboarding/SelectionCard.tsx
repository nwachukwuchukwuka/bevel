import { Ionicons } from '@expo/vector-icons';
import clsx from 'clsx';
import React from 'react';
import { Pressable, Text, View } from 'react-native';

interface SelectionCardProps {
    label: string;
    description?: string;
    selected: boolean;
    onSelect: () => void;
    icon?: React.ReactNode; // For the large graphics on the right
    type?: 'card' | 'checkbox';
}

export const SelectionCard: React.FC<SelectionCardProps> = ({
    label,
    description,
    selected,
    onSelect,
    icon,
    type = 'card'
}) => {
    if (type === 'checkbox') {
        return (
            <Pressable
                onPress={onSelect}
                className={clsx(
                    "flex-row items-center justify-between p-4 mb-3 rounded-2xl border bg-white",
                    selected ? "border-neutral-900" : "border-transparent"
                )}
            >
                <Text className="font-semibold text-neutral-800 text-base flex-1 mr-4">{label}</Text>
                <View className={clsx(
                    "w-6 h-6 rounded-md border items-center justify-center",
                    selected ? "bg-neutral-900 border-neutral-900" : "border-neutral-300 bg-white"
                )}>
                    {selected && <Ionicons name="checkmark" size={16} color="white" />}
                </View>
            </Pressable>
        );
    }

    // Large Card Style
    return (
        <Pressable
            onPress={onSelect}
            className={clsx(
                "flex-row items-center p-5 mb-4 rounded-3xl bg-white border shadow-sm",
                selected ? "border-neutral-900" : "border-white"
            )}
        >
            <View className="flex-1 pr-4">
                <Text className="font-bold text-lg text-neutral-900 mb-1">{label}</Text>
                {description && (
                    <Text className="text-sm text-neutral-500 leading-5">{description}</Text>
                )}
            </View>

            {/* Visual / Icon Container */}
            <View className="w-16 h-16 items-center justify-center">
                {selected ? (
                    <View className="absolute top-0 right-0">
                        <Ionicons name="checkmark-circle" size={24} color="black" />
                    </View>
                ) : null}
                {icon}
            </View>
        </Pressable>
    );
};