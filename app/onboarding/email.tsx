import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { TextInput, View } from 'react-native';
import { ContinueButton } from '../../components/onboarding/ContinueButton';
import { OnboardingLayout } from '../../components/onboarding/OnboardingLayout';

export default function EmailScreen() {
    const router = useRouter();
    const [email, setEmail] = useState('');

    return (
        <OnboardingLayout title="What is your email address?" showBack>
            <View className="flex-1 justify-center -mt-20">
                <TextInput
                    className="text-3xl font-semibold text-center text-neutral-900 pb-4 border-b border-neutral-200 placeholder:text-neutral-300"
                    placeholder="john.smith@gmail.com"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    autoFocus
                />
            </View>

            <View className="justify-end mb-4">
                <ContinueButton
                    enabled={email.length > 5}
                    onPress={() => router.push('/onboarding/check-inbox')}
                />
            </View>
        </OnboardingLayout>
    );
}