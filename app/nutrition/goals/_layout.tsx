import { Stack } from 'expo-router';

export default function GoalsLayout() {
    return (
        <Stack screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="macro-setup" options={{ presentation: 'modal' }} />
            <Stack.Screen name="nutrient-setup" options={{ presentation: 'modal' }} />
        </Stack>
    );
}