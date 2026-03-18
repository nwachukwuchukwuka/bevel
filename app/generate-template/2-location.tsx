import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { StepLayout } from './components/StepLayout';

const OPTIONS = [
    { id: 'large', icon: 'business', title: 'Large gym', desc: 'Full equipment and machine access' },
    { id: 'small', icon: 'home', title: 'Small gym', desc: 'Limited equipment and machines' },
    { id: 'home', icon: 'home-outline', title: 'Home', desc: 'Minimal equipment and space' },
    { id: 'custom', icon: 'construct', title: 'Custom', desc: 'Specify your equipment and setup' },
];

export default function LocationScreen() {
    const router = useRouter();
    const [selected, setSelected] = useState('');

    return (
        <StepLayout
            question="Where do you like to exercise the most?"
            subtitle="Choose your typical exercise location."
            isNextEnabled={!!selected}
            onNext={() => router.push('/generate-template/3-equipment')}
        >
            <View className="gap-3">
                {OPTIONS.map(opt => (
                    <TouchableOpacity
                        key={opt.id} onPress={() => setSelected(opt.id)}
                        className={`bg-white p-5 rounded-2xl border-[1.5px] flex-row items-center gap-4 ${selected === opt.id ? 'border-black' : 'border-transparent'}`}
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