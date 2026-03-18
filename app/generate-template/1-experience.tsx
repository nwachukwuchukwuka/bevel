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
            <View className="gap-3">
                {OPTIONS.map(opt => (
                    <TouchableOpacity
                        key={opt.id} onPress={() => setSelected(opt.id)}
                        // className={`bg-white p-5 rounded-2xl border-[1.5px] flex-row justify-between items-center ${selected === opt.id ? 'border-black' : 'border-transparent'}`}
                        className={`bg-white p-5 rounded-2xl border-[1.5px] flex-row justify-between items-center ${selected === opt.id ? 'border-black' : 'border-transparent'}`}
                    >
                        <View className="flex-1 pr-4">
                            <Ionicons name={opt.icon as any} size={20} color="#4B5563" className="mb-2" />
                            <Text className="font-bold text-gray-900 text-base mb-1">{opt.title}</Text>
                            <Text className="text-gray-500 text-sm leading-5">{opt.desc}</Text>
                        </View>
                        {selected === opt.id && <Ionicons name="checkmark" size={24} color="black" />}
                    </TouchableOpacity>
                ))}
            </View>
        </StepLayout>
    );
}