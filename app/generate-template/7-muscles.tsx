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
                    className={`p-4 rounded-[16px] border flex-row items-center gap-4 ${isFullBody ? 'bg-[#15233A] border-[#38BDF8]' : 'bg-[#151E33] border-[#1E2D4A]'}`}
                >
                    <View className={`w-6 h-6 rounded border items-center justify-center ${isFullBody ? 'bg-[#38BDF8] border-[#38BDF8]' : 'bg-[#0F172A] border-[#1E2D4A]'}`}>
                        {isFullBody && <Ionicons name="checkmark" size={16} color="#090D16" />}
                    </View>
                    <Text className={`font-semibold text-[16px] ${isFullBody ? 'text-[#F1F5F9]' : 'text-[#CBD5E1]'}`}>Full-body</Text>
                </TouchableOpacity>

                {/* Group 1 */}
                <View className="bg-[#151E33] rounded-[20px] p-4 border border-[#1E2D4A]">
                    <View className="flex-row justify-between items-center mb-4 pb-2 border-b border-[#1E2D4A]">
                        <Text className="font-bold text-[15px] text-[#F1F5F9]">Arms</Text>
                        <Text className="text-[#38BDF8] text-[13px] font-semibold">Select all</Text>
                    </View>
                    {['Biceps', 'Forearm', 'Triceps'].map(m => (
                        <View key={m} className="flex-row items-center gap-4 py-3">
                            <View className="w-5 h-5 rounded-[4px] border border-[#334155] bg-[#090D16]" />
                            <Text className="text-[#94A3B8] font-medium text-[15px]">{m}</Text>
                        </View>
                    ))}
                </View>

                {/* Group 2 */}
                <View className="bg-[#151E33] rounded-[20px] p-4 border border-[#1E2D4A]">
                    <View className="flex-row justify-between items-center mb-4 pb-2 border-b border-[#1E2D4A]">
                        <Text className="font-bold text-[15px] text-[#F1F5F9]">Back</Text>
                        <Text className="text-[#38BDF8] text-[13px] font-semibold">Select all</Text>
                    </View>
                    {['Lats', 'Lower Back', 'Middle Back', 'Upper Back'].map(m => (
                        <View key={m} className="flex-row items-center gap-4 py-3">
                            <View className="w-5 h-5 rounded-[4px] border border-[#334155] bg-[#090D16]" />
                            <Text className="text-[#94A3B8] font-medium text-[15px]">{m}</Text>
                        </View>
                    ))}
                </View>
            </View>
        </StepLayout>
    );
}