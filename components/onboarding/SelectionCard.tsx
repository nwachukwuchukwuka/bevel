import { Ionicons } from '@expo/vector-icons';
import clsx from 'clsx';
import React from 'react';
import { Pressable, Text, View } from 'react-native';

interface SelectionCardProps {
    label: string;
    description?: string;
    selected: boolean;
    onSelect: () => void;
    icon?: React.ReactNode;
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
                    "flex-row items-center justify-between p-4 mb-3 rounded-2xl border",
                    selected ? "bg-[#1E293B] border-[#4DB9F2]" : "bg-[#151E33] border-[#1E293B]"
                )}
            >
                <Text className={clsx(
                    "font-semibold text-base flex-1 mr-4",
                    selected ? "text-white" : "text-slate-300"
                )}>
                    {label}
                </Text>

                <View className={clsx(
                    "w-6 h-6 rounded-md border items-center justify-center",
                    selected ? "bg-[#4DB9F2] border-[#4DB9F2]" : "border-[#2D3748] bg-[#090D16]"
                )}>
                    {selected && <Ionicons name="checkmark" size={16} color="#090D16" />}
                </View>
            </Pressable>
        );
    }

    return (
        <Pressable
            onPress={onSelect}
            className={clsx(
                "flex-row items-center p-5 mb-4 rounded-3xl border min-h-[120px]",
                selected ? "bg-[#1E293B] border-[#4DB9F2]" : "bg-[#151E33] border-[#1E293B]"
            )}
        >
            <View className="flex-1 pr-6 flex-col justify-center">
                <View className="flex-row items-center gap-2 mb-2">
                    <View className={clsx(
                        "w-2 h-2 rounded-full",
                        selected ? "bg-[#4DB9F2]" : "bg-slate-600"
                    )} />
                    <Text className={clsx(
                        "font-bold text-lg",
                        selected ? "text-white" : "text-slate-200"
                    )}>
                        {label}
                    </Text>
                </View>

                {description && (
                    <Text className="text-sm text-slate-400 leading-5">
                        {description}
                    </Text>
                )}
            </View>

            <View className="w-16 h-16 bg-[#090D16] border border-[#2D3748] rounded-2xl items-center justify-center relative overflow-hidden">
                {icon}

                {selected && (
                    <View className="absolute inset-0 bg-[#4DB9F2]/20 items-center justify-center border border-[#4DB9F2] rounded-2xl">
                        <Ionicons name="checkmark" size={24} color="#4DB9F2" />
                    </View>
                )}
            </View>
        </Pressable>
    );
};