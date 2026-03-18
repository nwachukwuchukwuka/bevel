import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import { ContinueButton } from '../../../components/onboarding/ContinueButton';

export default function NameScreen() {
    const router = useRouter();
    const [name, setName] = useState('');

    return (
        <View className="flex-1">
            {/* Title */}
            <View className="mt-6 mb-12 items-center">
                <Text className="text-2xl font-bold text-center text-neutral-900">
                    What's your first name?
                </Text>
            </View>

            {/* Input */}
            <View className="flex-1 justify-center -mt-20">
                <TextInput
                    className="text-3xl font-semibold text-center text-neutral-900 pb-4 border-b border-neutral-200 placeholder:text-neutral-300"
                    placeholder="(e.g. John)"
                    value={name}
                    onChangeText={setName}
                    autoFocus
                />
            </View>

            {/* Footer */}
            <View className="mb-2">
                <ContinueButton
                    enabled={name.length > 0}
                    // onPress={() => router.push('/onboarding/flow/health-focus')}
                    onPress={() => router.push('/onboarding/flow/welcome-interstitial')}
                />
            </View>
        </View>
    );
}