import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
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
        <SafeAreaView style={styles.container} edges={['top', 'bottom']}>

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => (isFirstStep ? router.dismissAll() : router.back())}
                    style={styles.headerLeft}
                >
                    <Ionicons
                        name={isFirstStep ? "close" : "chevron-back"}
                        size={24}
                        color="#111827"
                    />
                </TouchableOpacity>

                {title === "Preview" ? (
                    <View style={styles.previewBadge}>
                        <Ionicons name="sparkles" size={12} color="#F59E0B" />
                        <Text style={styles.previewText}>Preview</Text>
                    </View>
                ) : (
                    <Text style={styles.title}>{title}</Text>
                )}

                <View style={styles.headerRight}>
                    {/* {rightIcon && (
                        <TouchableOpacity style={styles.rightIconButton}>
                            <Ionicons name={rightIcon as any} size={16} color="#4B5563" />
                        </TouchableOpacity>
                    )} */}
                    {rightIcon && (
                        <TouchableOpacity
                            onPress={onRightIconPress}
                            style={styles.rightIconButton}
                        >
                            <Ionicons name={rightIcon as any} size={16} color="#4B5563" />
                        </TouchableOpacity>
                    )}

                </View>
            </View>

            {/* Scroll Content */}
            <ScrollView
                contentContainerStyle={[
                    styles.scrollContent,
                    contentContainerStyle
                ]}
            >
                <View style={styles.titleContainer}>
                    <Text style={styles.question}>{question}</Text>

                    {subtitle && (
                        <Text style={styles.subtitle}>{subtitle}</Text>
                    )}
                </View>

                {children}
            </ScrollView>

            {/* Footer */}
            <View style={styles.footer}>
                <TouchableOpacity
                    disabled={!isNextEnabled}
                    onPress={onNext}
                    style={[
                        styles.button,
                        isNextEnabled ? styles.buttonActive : styles.buttonDisabled
                    ]}
                >
                    <Text style={styles.buttonText}>{buttonText}</Text>
                </TouchableOpacity>

                {footerText && (
                    <Text style={styles.footerText}>{footerText}</Text>
                )}
            </View>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9FAFB'
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 16
    },

    headerLeft: {
        width: 40
    },

    headerRight: {
        width: 40,
        alignItems: 'flex-end'
    },

    title: {
        fontWeight: '600',
        color: '#6B7280',
        fontSize: 13
    },

    previewBadge: {
        backgroundColor: '#FFF7ED',
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 999,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        borderWidth: 1,
        borderColor: '#FED7AA'
    },

    previewText: {
        fontSize: 12,
        fontWeight: '700',
        color: '#1F2937'
    },

    rightIconButton: {
        width: 32,
        height: 32,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center'
    },

    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 100
    },

    titleContainer: {
        alignItems: 'center',
        marginTop: 24,
        marginBottom: 32,
        paddingHorizontal: 16
    },

    question: {
        fontSize: 24,
        fontWeight: '700',
        textAlign: 'center',
        color: '#111827',
        lineHeight: 32,
        marginBottom: 8
    },

    subtitle: {
        color: '#6B7280',
        fontWeight: '500',
        textAlign: 'center',
        fontSize: 13
    },

    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#F9FAFB',
        paddingHorizontal: 20,
        paddingTop: 16,
        paddingBottom: 32
    },

    button: {
        paddingVertical: 16,
        borderRadius: 999,
        alignItems: 'center'
    },

    buttonActive: {
        backgroundColor: '#1A1A1A'
    },

    buttonDisabled: {
        backgroundColor: '#9CA3AF'
    },

    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16
    },

    footerText: {
        textAlign: 'center',
        color: '#9CA3AF',
        fontSize: 12,
        marginTop: 12,
        lineHeight: 16,
        paddingHorizontal: 16
    }
});