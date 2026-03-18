import { Stack } from 'expo-router';

export default function CGMLayout() {
    return (
        <Stack screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
            {/* New Initial Screen: Choose Sensor */}
            <Stack.Screen name="index" options={{ presentation: 'modal' }} />

            {/* Old Initial Screen (Renamed) */}
            <Stack.Screen name="sync-method" />

            {/* Dexcom Setup Flow */}
            <Stack.Screen name="dexcom-step-1" />
            <Stack.Screen name="dexcom-step-2" />
            <Stack.Screen name="dexcom-login" />

            {/* Existing Screens */}
            <Stack.Screen name="apple-health-error" options={{ presentation: 'modal' }} />
            <Stack.Screen name="manage" />
        </Stack>
    );
}