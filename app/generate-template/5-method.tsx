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
            <View className="gap-4">
                {/* Card 1 */}
                <TouchableOpacity
                    onPress={() => setSelected('guided')}
                    className={`bg-white p-5 rounded-3xl border-[1.5px] shadow-sm ${selected === 'guided' ? 'border-black' : 'border-transparent'}`}
                >
                    <View className="h-28 bg-gray-50 rounded-xl mb-4 items-end justify-center px-4 border border-gray-100">
                        <View className="w-8 h-8 rounded-full bg-black items-center justify-center"><Text className="text-white">✓</Text></View>
                    </View>
                    <Text className="font-bold text-gray-900 text-lg mb-1">Guided template</Text>
                    <Text className="text-gray-500 leading-5 text-[13px]">Choose your ideal duration, intensity, focus areas, and equipment.</Text>
                </TouchableOpacity>

                {/* Card 2 */}
                <TouchableOpacity
                    onPress={() => setSelected('freeform')}
                    className={`bg-white p-5 rounded-3xl border-[1.5px] shadow-sm ${selected === 'freeform' ? 'border-black' : 'border-transparent'}`}
                >
                    <View className="h-28 bg-gray-50 rounded-xl mb-4 justify-center px-6 border border-gray-100">
                        <Text className="text-gray-300 font-bold text-xs mb-1">What kind of workout do you want today?</Text>
                        <Text className="font-bold text-gray-800">30 min all core—no</Text>
                    </View>
                    <Text className="font-bold text-gray-900 text-lg mb-1">Freeform template</Text>
                    <Text className="text-gray-500 leading-5 text-[13px]">Tell us what you're aiming for in your routine—we'll help create one that fits.</Text>
                </TouchableOpacity>
            </View>
        </StepLayout>
    );
}