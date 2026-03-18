import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { StepLayout } from './components/StepLayout';

const GOALS = [
    { id: '1', icon: 'barbell', title: 'Get stronger', desc: 'Increase lifting power and strength' },
    { id: '2', icon: 'body', title: 'Build muscle', desc: 'Grow muscle size and definition' },
    { id: '3', icon: 'man', title: 'Improve body composition', desc: 'Increase lean mass and reduce fat' },
    { id: '4', icon: 'scale', title: 'Lose weight', desc: 'Burn fat and slim down' },
];

export default function GoalScreen() {
    const router = useRouter();
    const [selected, setSelected] = useState('1');

    return (
        <StepLayout
            question="What is your training goal?"
            subtitle="The result you're working toward, shaping your exercises, effort, and progress."
            buttonText="Save and continue"
            footerText="All responses are saved and can be updated anytime in Advanced Settings."
            isNextEnabled={!!selected}
            onNext={() => router.push('/generate-template/5-method')}
        >
            <View className="gap-3">
                {GOALS.map(opt => (
                    <TouchableOpacity
                        key={opt.id} onPress={() => setSelected(opt.id)}
                        className={`bg-white p-5 rounded-2xl border-[1.5px] shadow-sm flex-row items-center gap-4 ${selected === opt.id ? 'border-black' : 'border-transparent'}`}
                    >
                        <Ionicons name={opt.icon as any} size={24} color="#6B7280" />
                        <View className="flex-1">
                            <Text className="font-bold text-gray-900 text-[15px]">{opt.title}</Text>
                            <Text className="text-gray-500 text-xs mt-0.5">{opt.desc}</Text>
                        </View>
                        {selected === opt.id && <Ionicons name="checkmark" size={20} color="black" />}
                    </TouchableOpacity>
                ))}
            </View>
        </StepLayout>
    );
}