import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface StepLayoutProps {
    isFirstStep?: boolean;
    title?: string;
    question: string;
    subtitle?: string;
    buttonText?: string;
    footerText?: string;
    isNextEnabled: boolean;
    onNext: () => void;
    rightIcon?: string;
    children: React.ReactNode;
    contentContainerStyle?: any;
    onRightIconPress?: () => void;
}

export function StepLayout({
    isFirstStep = false,
    title = "Generate template",
    question,
    subtitle,
    buttonText = "Continue",
    footerText,
    isNextEnabled,
    onNext,
    rightIcon,
    children,
    contentContainerStyle,
    onRightIconPress
}: StepLayoutProps) {
    const router = useRouter();

    return (
        <SafeAreaView className="flex-1 bg-[#090D16]" edges={['top', 'bottom']}>
            {/* Header */}
            <View className="flex-row items-center justify-between px-5 py-4">
                <TouchableOpacity
                    onPress={() => (isFirstStep ? router.dismissAll() : router.back())}
                    className="w-9 h-9 bg-[#151E33] rounded-[10px] items-center justify-center border border-[#1E2D4A]"
                >
                    <Ionicons
                        name={isFirstStep ? "close" : "chevron-back"}
                        size={20}
                        color="#94A3B8"
                    />
                </TouchableOpacity>

                {title === "Preview" ? (
                    <View className="bg-[#1A1708] px-3 py-1 rounded-full flex-row items-center gap-1 border border-[#3D3310]">
                        <Ionicons name="sparkles" size={12} color="#FACC15" />
                        <Text className="text-[12px] font-bold text-[#FACC15]">Preview</Text>
                    </View>
                ) : (
                    <Text className="font-semibold text-[#64748B] text-[13px]">{title}</Text>
                )}

                <View className="w-9 items-end">
                    {rightIcon && (
                        <TouchableOpacity
                            onPress={onRightIconPress}
                            className="w-9 h-9 bg-[#151E33] rounded-[10px] items-center justify-center border border-[#1E2D4A]"
                        >
                            <Ionicons name={rightIcon as any} size={16} color="#94A3B8" />
                        </TouchableOpacity>
                    )}
                </View>
            </View>

            {/* Scroll Content */}
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={[
                    { paddingHorizontal: 20, paddingBottom: 120 },
                    contentContainerStyle
                ]}
            >
                <View className="items-start mt-6 mb-8 px-1">
                    <Text className="text-[26px] font-bold text-[#F1F5F9] leading-9 mb-2">
                        {question}
                    </Text>

                    {subtitle && (
                        <Text className="text-[#64748B] font-medium text-[14px]">
                            {subtitle}
                        </Text>
                    )}
                </View>

                {children}
            </ScrollView>

            {/* Footer */}
            <View className="absolute bottom-0 left-0 right-0 bg-[#090D16] px-5 pt-4 pb-8 border-t border-[#1E2D4A]">
                <TouchableOpacity
                    disabled={!isNextEnabled}
                    onPress={onNext}
                    className={`py-4 rounded-full items-center ${isNextEnabled ? 'bg-[#F1F5F9]' : 'bg-[#151E33] border border-[#1E2D4A]'}`}
                >
                    <Text className={`font-bold text-[16px] ${isNextEnabled ? 'text-[#090D16]' : 'text-[#475569]'}`}>
                        {buttonText}
                    </Text>
                </TouchableOpacity>

                {footerText && (
                    <Text className="text-center text-[#64748B] text-[12px] mt-4 leading-5 px-4">
                        {footerText}
                    </Text>
                )}
            </View>
        </SafeAreaView>
    );
}