import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { StepLayout } from './components/StepLayout';

export default function MethodScreen() {
    const router = useRouter();
    const [selected, setSelected] = useState('guided');

    return (
        <StepLayout
            title="Preview"
            rightIcon="settings-sharp"
            question="Choose a method"
            subtitle="Select how you would like to generate a new workout template."
            isNextEnabled={!!selected}
            onNext={() => router.push('/generate-template/6-duration')}
            onRightIconPress={() => router.push('/generate-template/advanced-settings')}
        >
            <View className="flex-row justify-between gap-x-4 mt-2">
                {/* Card 1 */}
                <TouchableOpacity
                    onPress={() => setSelected('guided')}
                    className={`flex-1 p-5 rounded-[24px] border justify-between min-h-[220px] ${selected === 'guided' ? 'bg-[#15233A] border-[#38BDF8]' : 'bg-[#151E33] border-[#1E2D4A]'}`}
                >
                    <View className="mb-4">
                        <View className={`w-12 h-12 rounded-full items-center justify-center mb-6 border ${selected === 'guided' ? 'bg-[#38BDF8] border-[#38BDF8]' : 'bg-[#0F172A] border-[#1E2D4A]'}`}>
                            <Ionicons name="compass" size={24} color={selected === 'guided' ? '#090D16' : '#64748B'} />
                        </View>
                        <Text className={`font-bold text-[18px] mb-2 ${selected === 'guided' ? 'text-[#F1F5F9]' : 'text-[#CBD5E1]'}`}>Guided</Text>
                        <Text className="text-[#64748B] leading-5 text-[13px] font-medium">Choose your ideal duration, intensity, focus areas, and equipment.</Text>
                    </View>
                </TouchableOpacity>

                {/* Card 2 */}
                <TouchableOpacity
                    onPress={() => setSelected('freeform')}
                    className={`flex-1 p-5 rounded-[24px] border justify-between min-h-[220px] ${selected === 'freeform' ? 'bg-[#15233A] border-[#38BDF8]' : 'bg-[#151E33] border-[#1E2D4A]'}`}
                >
                    <View className="mb-4">
                        <View className={`w-12 h-12 rounded-full items-center justify-center mb-6 border ${selected === 'freeform' ? 'bg-[#38BDF8] border-[#38BDF8]' : 'bg-[#0F172A] border-[#1E2D4A]'}`}>
                            <Ionicons name="chatbubbles" size={24} color={selected === 'freeform' ? '#090D16' : '#64748B'} />
                        </View>
                        <Text className={`font-bold text-[18px] mb-2 ${selected === 'freeform' ? 'text-[#F1F5F9]' : 'text-[#CBD5E1]'}`}>Freeform</Text>
                        <Text className="text-[#64748B] leading-5 text-[13px] font-medium">Tell us what you're aiming for—we'll create one that fits.</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </StepLayout>
    );
}