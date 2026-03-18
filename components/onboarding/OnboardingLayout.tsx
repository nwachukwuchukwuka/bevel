import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface OnboardingLayoutProps {
    children: React.ReactNode;
    title?: string;
    subtitle?: string;
    showBack?: boolean;
    progress?: number; // 0 to 1
    darkTheme?: boolean; // For the sleep education screen
}

export const OnboardingLayout: React.FC<OnboardingLayoutProps> = ({
    children,
    title,
    subtitle,
    showBack = true,
    progress,
    darkTheme = false,
}) => {
    const router = useRouter();
    const textColor = darkTheme ? 'text-white' : 'text-neutral-900';
    const subTextColor = darkTheme ? 'text-neutral-400' : 'text-neutral-500';
    const iconColor = darkTheme ? 'white' : 'black';

    return (
        <View className={`flex-1 ${darkTheme ? 'bg-[#1C1C1E]' : 'bg-[#FAFAFA]'}`}>
            <StatusBar style={darkTheme ? 'light' : 'dark'} />
            <SafeAreaView className="flex-1" edges={['top', 'bottom']}>

                {/* Header */}
                <View className="flex-row items-center justify-between px-4 h-12">
                    {showBack ? (
                        <TouchableOpacity onPress={() => router.back()} className="p-2">
                            <Ionicons name="chevron-back" size={24} color={iconColor} />
                        </TouchableOpacity>
                    ) : <View className="w-10" />}

                    {/* Progress Bar */}
                    {progress !== undefined && (
                        <View className="flex-1 mx-4 h-1 bg-neutral-200 rounded-full overflow-hidden">
                            <View
                                className={`h-full ${darkTheme ? 'bg-blue-500' : 'bg-neutral-900'}`}
                                style={{ width: `${progress * 100}%` }}
                            />
                        </View>
                    )}

                    {/* Spacer to balance Back button */}
                    <View className="w-10" />
                </View>

                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    className="flex-1"
                >
                    <ScrollView
                        contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 24, paddingBottom: 20 }}
                        showsVerticalScrollIndicator={false}
                    >
                        {/* Title Section */}
                        {(title || subtitle) && (
                            <View className="mt-6 mb-8 items-center">
                                {title && (
                                    <Text className={`text-2xl font-bold text-center mb-3 ${textColor}`}>
                                        {title}
                                    </Text>
                                )}
                                {subtitle && (
                                    <Text className={`text-base text-center leading-6 ${subTextColor}`}>
                                        {subtitle}
                                    </Text>
                                )}
                            </View>
                        )}

                        {children}
                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </View>
    );
};