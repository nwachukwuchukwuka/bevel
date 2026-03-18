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
                            className={`bg-white p-4 rounded-2xl border-[1.5px] shadow-sm flex-row justify-between items-center ${isSel ? 'border-black' : 'border-transparent'}`}
                        >
                            <View className="flex-1">
                                <Text className="font-bold text-gray-900 text-[15px]">{item.name}</Text>
                                {item.details ? (
                                    <Text className="text-gray-400 text-xs mt-1">
                                        {item.details} <Text className="underline">Edit</Text>
                                    </Text>
                                ) : null}
                            </View>
                            <View className={`w-5 h-5 rounded items-center justify-center border ${isSel ? 'bg-black border-black' : 'bg-white border-gray-300'}`}>
                                {isSel && <Ionicons name="checkmark" size={14} color="white" />}
                            </View>
                        </TouchableOpacity>
                    )
                })}
            </View>
        </StepLayout>
    );
}