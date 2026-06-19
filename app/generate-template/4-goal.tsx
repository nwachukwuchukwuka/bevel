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
            <View className="flex-row flex-wrap justify-between gap-y-4">
                {GOALS.map(opt => {
                    const isSelected = selected === opt.id;
                    return (
                        <TouchableOpacity
                            key={opt.id}
                            onPress={() => setSelected(opt.id)}
                            className={`w-[48%] p-4 rounded-[20px] border items-start ${isSelected ? 'bg-[#15233A] border-[#38BDF8]' : 'bg-[#151E33] border-[#1E2D4A]'}`}
                        >
                            <View className="flex-row w-full justify-between items-start mb-3">
                                <View className={`w-10 h-10 rounded-[10px] items-center justify-center border ${isSelected ? 'bg-[#1C2F4D] border-[#38BDF8]/30' : 'bg-[#0F172A] border-[#1E2D4A]'}`}>
                                    <Ionicons name={opt.icon as any} size={20} color={isSelected ? '#38BDF8' : '#94A3B8'} />
                                </View>
                                {isSelected && (
                                    <View className="w-5 h-5 rounded-full bg-[#38BDF8] items-center justify-center">
                                        <Ionicons name="checkmark" size={14} color="#090D16" />
                                    </View>
                                )}
                            </View>
                            <Text className={`font-bold text-[15px] mb-1.5 ${isSelected ? 'text-[#F1F5F9]' : 'text-[#CBD5E1]'}`}>
                                {opt.title}
                            </Text>
                            <Text className="text-[#64748B] text-[12px] font-medium leading-4">
                                {opt.desc}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
        </StepLayout>
    );
}