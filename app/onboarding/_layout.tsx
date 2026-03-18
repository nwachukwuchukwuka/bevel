import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';

export default function OnboardingRootLayout() {
    return (
        <View className="flex-1 bg-neutral-50">
            <StatusBar style="dark" />
            <Stack
                screenOptions={{
                    headerShown: false,
                    animation: 'slide_from_right', // iOS style sliding
                    contentStyle: { backgroundColor: '#FAFAFA' },
                }}
            >
                <Stack.Screen name="index" />
                <Stack.Screen name="email" />
                <Stack.Screen name="check-inbox" />
                <Stack.Screen name="privacy" />
                {/* The 'flow' folder will handle its own layout */}
                <Stack.Screen name="flow" options={{ headerShown: false }} />
                <Stack.Screen name="tutorial" options={{ presentation: 'modal', headerShown: false }} />

            </Stack>
        </View>
    );
}