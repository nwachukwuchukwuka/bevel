import { Stack } from 'expo-router';
import React from 'react';

export default function SleepLayout() {
    return (
        <Stack screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="[id]" options={{ presentation: 'modal' }} />
            <Stack.Screen name="score-details" options={{ presentation: 'modal' }} />
            <Stack.Screen
                name="how-to-alarm"
                options={{
                    presentation: 'modal',
                    animation: 'slide_from_bottom'
                }}
            />
        </Stack>
    );
}