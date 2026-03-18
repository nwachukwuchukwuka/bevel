import { Stack } from 'expo-router';

export default function GenerateTemplateLayout() {
    return (
        <Stack screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
            <Stack.Screen name="1-experience" />
            <Stack.Screen name="2-location" />
            <Stack.Screen name="3-equipment" />
            <Stack.Screen name="4-goal" />
            <Stack.Screen name="5-method" />
            <Stack.Screen name="6-duration" />
            <Stack.Screen name="7-muscles" />
            <Stack.Screen name="8-intensity" />
            <Stack.Screen name="9-generating" options={{ animation: 'fade' }} />
            <Stack.Screen name="10-result" options={{ animation: 'fade' }} />
            <Stack.Screen name="advanced-settings" options={{ presentation: 'modal' }} />
            <Stack.Screen name="exercise-details" options={{ presentation: 'modal' }} />
            <Stack.Screen name="report-issue" options={{ presentation: 'modal' }} />

        </Stack>
    );
}