import { Stack } from 'expo-router';

export default function NutritionLayout() {
    return (
        <Stack screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="my-foods" options={{ presentation: 'modal' }} />
            <Stack.Screen name="import-recipe" options={{ presentation: 'modal' }} />
            <Stack.Screen name="recipe-details" options={{ presentation: 'modal' }} />
            <Stack.Screen name="cgm" options={{ presentation: 'modal' }} />
            <Stack.Screen name="log-details" options={{ presentation: 'modal' }} />
            <Stack.Screen name="goals" options={{ presentation: 'modal' }} />
            <Stack.Screen name="nutritional-details" options={{ presentation: 'modal' }} />
            <Stack.Screen name="trend-details" options={{ presentation: 'modal' }} />


        </Stack>
    );
}