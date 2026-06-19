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
            <View className="flex-row flex-wrap justify-between gap-y-4">
                {OPTIONS.map(opt => {
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