import { Stack } from 'expo-router';
import React from 'react';

export default function StrainLayout() {
    return (
        <Stack screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="activity/[id]" options={{
                presentation: 'modal',
                animation: 'slide_from_bottom'
            }} />
            {/* Strain Score Modal */}
            <Stack.Screen
                name="score-details"
                options={{
                    presentation: 'modal',
                    animation: 'slide_from_bottom'
                }}
            />
        </Stack>
    );
}