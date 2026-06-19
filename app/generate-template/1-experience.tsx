import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { StepLayout } from './components/StepLayout';

const OPTIONS = [
    { id: 'expert', icon: 'barbell', title: 'Expert', desc: 'Years of consistent training. Confident with advanced lifts and programming.' },
    { id: 'intermediate', icon: 'body', title: 'Intermediate', desc: 'Train regularly with good form and follow a structured routine.' },
    { id: 'beginner', icon: 'leaf', title: 'Beginner', desc: 'Learning form and building consistency, or getting back into it.' },
];

export default function ExperienceScreen() {
    const router = useRouter();
    const [selected, setSelected] = useState('');

    return (
        <StepLayout
            isFirstStep
            question="How experienced are you with strength training?"
            subtitle="Your comfort with exercises and routines."
            isNextEnabled={!!selected}
            onNext={() => router.push('/generate-template/2-location')}
        >
            <View className="gap-4">
                {OPTIONS.map(opt => {
                    const isSelected = selected === opt.id;
                    return (
                        <TouchableOpacity
                            key={opt.id}
                            onPress={() => setSelected(opt.id)}
                            className={`flex-row items-center p-4 rounded-[20px] border ${isSelected ? 'bg-[#15233A] border-[#38BDF8]' : 'bg-[#151E33] border-[#1E2D4A]'}`}
                        >
                            <View className={`w-12 h-12 rounded-[12px] items-center justify-center border ${isSelected ? 'bg-[#1C2F4D] border-[#38BDF8]/30' : 'bg-[#0F172A] border-[#1E2D4A]'}`}>
                                <Ionicons name={opt.icon as any} size={22} color={isSelected ? '#38BDF8' : '#64748B'} />
                            </View>

                            <View className="flex-1 ml-4">
                                <Text className={`text-[16px] font-bold mb-1 ${isSelected ? 'text-[#F1F5F9]' : 'text-[#CBD5E1]'}`}>
                                    {opt.title}
                                </Text>
                                <Text className="text-[13px] text-[#64748B] leading-5 font-medium">
                                    {opt.desc}
                                </Text>
                            </View>

                            <View className="ml-2 w-6 h-6 items-center justify-center">
                                {isSelected ? (
                                    <Ionicons name="radio-button-on" size={24} color="#38BDF8" />
                                ) : (
                                    <Ionicons name="radio-button-off" size={24} color="#334155" />
                                )}
                            </View>
                        </TouchableOpacity>
                    );
                })}
            </View>
        </StepLayout>
    );
}