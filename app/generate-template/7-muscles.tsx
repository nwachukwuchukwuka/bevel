import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { StepLayout } from './components/StepLayout';

export default function MusclesScreen() {
    const router = useRouter();
    const [isFullBody, setIsFullBody] = useState(true);

    return (
        <StepLayout
            rightIcon="settings-sharp"
            question="Which muscle groups would you like to focus on?"
            subtitle="Select all that apply."
            isNextEnabled={true}
            onNext={() => router.push('/generate-template/8-intensity')}
            onRightIconPress={() => router.push('/generate-template/advanced-settings')}
        >
            <View className="gap-4">
                <TouchableOpacity
                    onPress={() => setIsFullBody(true)}
                    className={`bg-white p-4 rounded-2xl border-[1.5px] flex-row justify-between items-center shadow-sm ${isFullBody ? 'border-black' : 'border-transparent'}`}
                >
                    <Text className="font-bold text-gray-900 text-base">Full-body</Text>
                    {isFullBody && <Ionicons name="checkmark" size={20} color="black" />}
                </TouchableOpacity>

                {/* Group 1 */}
                <View className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm opacity-50">
                    <View className="flex-row justify-between items-center mb-3">
                        <Text className="font-bold text-gray-900">Arms</Text>
                        <Text className="text-gray-400 text-xs font-semibold">Select all</Text>
                    </View>
                    {['Biceps', 'Forearm', 'Triceps'].map(m => (
                        <View key={m} className="flex-row justify-between items-center py-2">
                            <Text className="text-gray-600 font-medium">{m}</Text>
                            <View className="w-5 h-5 rounded border border-gray-300" />
                        </View>
                    ))}
                </View>

                {/* Group 2 */}
                <View className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm opacity-50">
                    <View className="flex-row justify-between items-center mb-3">
                        <Text className="font-bold text-gray-900">Back</Text>
                        <Text className="text-gray-400 text-xs font-semibold">Select all</Text>
                    </View>
                    {['Lats', 'Lower Back', 'Middle Back', 'Upper Back'].map(m => (
                        <View key={m} className="flex-row justify-between items-center py-2">
                            <Text className="text-gray-600 font-medium">{m}</Text>
                            <View className="w-5 h-5 rounded border border-gray-300" />
                        </View>
                    ))}
                </View>
            </View>
        </StepLayout>
    );
}