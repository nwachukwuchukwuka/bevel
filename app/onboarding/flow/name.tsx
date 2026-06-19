import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import { ContinueButton } from '../../../components/onboarding/ContinueButton';

export default function NameScreen() {
    const router = useRouter();
    const [name, setName] = useState('');

    return (
        <View className="flex-1 flex-col">

            <View className="flex-1 px-1 pt-6">
                <Text className="text-3xl font-bold text-white mb-8">
                    What's your first name?
                </Text>

                <View className="bg-[#151E33] border border-[#1E293B] rounded-2xl p-4 flex-row items-center h-16">
                    <TextInput
                        className="flex-1 font-bold text-slate-100 h-full"
                        placeholder="(e.g. John)"
                        placeholderTextColor="#64748B"
                        value={name}
                        onChangeText={setName}
                        autoFocus
                        selectionColor="#4DB9F2"
                    />
                </View>
            </View>

            <View className="mt-auto pt-4">
                <ContinueButton
                    enabled={name.length > 0}
                    onPress={() => router.push('/onboarding/flow/welcome-interstitial')}
                />
            </View>

        </View>
    );
}