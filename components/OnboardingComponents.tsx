import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';

// --- Layout Wrapper ---
export const StepLayout = ({ children, title, subtitle }: { children: React.ReactNode, title?: string, subtitle?: string }) => (
    <View className="flex-1 px-6 pt-4">
        {title && (
            <Animated.Text entering={FadeInDown.duration(500)} className="text-2xl font-bold text-center text-neutral-900 mb-4 leading-tight">
                {title}
            </Animated.Text>
        )}
        {subtitle && (
            <Animated.Text entering={FadeInDown.duration(500).delay(100)} className="text-center text-neutral-500 text-base mb-8 px-4">
                {subtitle}
            </Animated.Text>
        )}
        <Animated.View entering={FadeIn.delay(200)} className="flex-1">
            {children}
        </Animated.View>
    </View>
);

// --- Selection Card (Single & Multi) ---
interface OptionCardProps {
    title: string;
    subtitle?: string;
    selected: boolean;
    onPress: () => void;
    icon?: keyof typeof Ionicons.glyphMap;
    isMulti?: boolean;
}

export const OptionCard = ({ title, subtitle, selected, onPress, icon, isMulti }: OptionCardProps) => (
    <Pressable
        onPress={onPress}
        className={`w-full p-4 mb-3 rounded-2xl border flex-row items-center justify-between ${selected ? 'border-neutral-900 bg-white shadow-sm' : 'border-neutral-100 bg-white'
            }`}
    >
        <View className="flex-1 pr-4">
            {/* Optional Icon Circle */}
            {icon && (
                <View className="mb-3 w-10 h-10 rounded-full bg-neutral-100 items-center justify-center">
                    <Ionicons name={icon} size={20} color={selected ? "#000" : "#999"} />
                </View>
            )}
            <Text className={`font-semibold text-base ${selected ? 'text-neutral-900' : 'text-neutral-800'}`}>
                {title}
            </Text>
            {subtitle && <Text className="text-sm text-neutral-500 mt-1">{subtitle}</Text>}
        </View>

        {/* Checkbox / Radio Indicator */}
        <View
            className={`w-6 h-6 rounded-${isMulti ? 'md' : 'full'} border items-center justify-center ${selected ? 'bg-neutral-900 border-neutral-900' : 'border-neutral-300 bg-transparent'
                }`}
        >
            {selected && <Ionicons name="checkmark" size={14} color="white" />}
        </View>
    </Pressable>
);

// --- Styled Text Input ---
export const StyledInput = ({
    value,
    onChangeText,
    placeholder,
    autoFocus = false,
    keyboardType = 'default'
}: any) => (
    <View className="mt-8">
        <TextInput
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            placeholderTextColor="#D4D4D4"
            autoFocus={autoFocus}
            keyboardType={keyboardType}
            className="text-3xl font-bold text-center text-neutral-900 pb-4 border-b border-neutral-200"
            selectionColor="#000"
        />
    </View>
);

// --- Progress Bar ---
export const ProgressBar = ({ progress }: { progress: number }) => (
    <View className="w-24 h-1 bg-neutral-200 rounded-full mx-auto mb-6 overflow-hidden">
        <View
            style={{ width: `${progress * 100}%` }}
            className="h-full bg-neutral-900 rounded-full"
        />
    </View>
);