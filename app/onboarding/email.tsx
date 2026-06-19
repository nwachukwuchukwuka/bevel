import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import { ContinueButton } from '../../components/onboarding/ContinueButton';
import { OnboardingLayout } from '../../components/onboarding/OnboardingLayout';

export default function EmailScreen() {
    const router = useRouter();
    const [email, setEmail] = useState('');

    return (
        <OnboardingLayout title="What is your email address?" showBack>

            <View className="flex-1 px-1 pt-6">
                <Text className="text-sm font-semibold text-slate-500 mb-2">Authentication required</Text>

                <View className="bg-[#151E33] border border-[#1E293B] rounded-2xl p-4 flex-row items-center h-16">
                    <TextInput
                        className="flex-1  font-bold text-slate-100 h-full"
                        placeholder="john.smith@domain.com"
                        placeholderTextColor="#64748B"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrect={false}
                        autoFocus
                        selectionColor="#4DB9F2"
                    />
                </View>
            </View>

            <View className="mt-auto pt-4">
                <ContinueButton
                    enabled={email.length > 5}
                    onPress={() => router.push('/onboarding/check-inbox')}
                />
            </View>

        </OnboardingLayout>
    );
}