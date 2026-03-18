import { Stack } from 'expo-router';
import React from 'react';

export default function SettingsLayout() {
    return (
        <Stack screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="pro" />
            <Stack.Screen name="account" />
            <Stack.Screen name="appearance" />

            <Stack.Screen name="notifications" />
            <Stack.Screen name="customization" />
            <Stack.Screen name="goals" />
            <Stack.Screen name="unit-of-measurement" />
            <Stack.Screen name="heart-rate-zones" />

            <Stack.Screen name="calculations" />
            <Stack.Screen name="data-loading-window" />
            <Stack.Screen name="nutrition" />
            <Stack.Screen name="shortcuts" />

            <Stack.Screen name="data-sources" />
            <Stack.Screen name="data-source/[id]" />
            <Stack.Screen name="manage-cgm" />
        </Stack>
    );
}