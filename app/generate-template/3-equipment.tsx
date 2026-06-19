import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { StepLayout } from './components/StepLayout';

const EQUIPMENTS = [
    { id: '1', name: 'Band', details: '' },
    { id: '2', name: 'Barbell', details: 'Bars: 15.0 kg, 20.0 kg. Plates: 1.2...' },
    { id: '3', name: 'Bodyweight', details: '' },
    { id: '4', name: 'Cable', details: '5.0 kg, 10.0 kg, 15.0 k...' },
    { id: '5', name: 'Dumbbell', details: '2.0 kg, 4.0 kg, 6.0 kg,...' },
    { id: '6', name: 'Smith Machine', details: 'Bars: 7.0 kg, 11.0 kg. Plates: 1.25 k...' },
];

export default function EquipmentScreen() {
    const router = useRouter();
    const [selected, setSelected] = useState<string[]>(['2', '3', '4', '5', '6']);

    const toggle = (id: string) => setSelected(p => p.includes(id) ? p.filter(i => i !== id) : [...p, id]);

    return (
        <StepLayout
            question="What kind of equipment is available to you?"
            subtitle="Select all that apply."
            isNextEnabled={selected.length > 0}
            onNext={() => router.push('/generate-template/4-goal')}
        >
            <View className="gap-3 pb-4">
                {EQUIPMENTS.map(item => {
                    const isSel = selected.includes(item.id);
                    return (
                        <TouchableOpacity
                            key={item.id} onPress={() => toggle(item.id)}
                            className={`flex-row items-center p-3 rounded-[16px] border ${isSel ? 'bg-[#15233A] border-[#38BDF8]' : 'bg-[#151E33] border-[#1E2D4A]'}`}
                        >
                            <View className={`w-8 h-8 rounded-[8px] items-center justify-center mr-3 border ${isSel ? 'bg-[#38BDF8] border-[#38BDF8]' : 'bg-[#0F172A] border-[#1E2D4A]'}`}>
                                {isSel && <Ionicons name="checkmark" size={18} color="#090D16" />}
                            </View>

                            <View className="flex-1">
                                <Text className={`font-semibold text-[15px] ${isSel ? 'text-[#F1F5F9]' : 'text-[#CBD5E1]'}`}>
                                    {item.name}
                                </Text>
                                {item.details ? (
                                    <View className="flex-row items-center mt-1 pr-2">
                                        <Text className="text-[#64748B] text-[12px] flex-1 font-medium" numberOfLines={1}>
                                            {item.details}
                                        </Text>
                                        <Text className="text-[#38BDF8] text-[12px] font-bold ml-2">Edit</Text>
                                    </View>
                                ) : null}
                            </View>
                        </TouchableOpacity>
                    );
                })}
            </View>
        </StepLayout>
    );
}