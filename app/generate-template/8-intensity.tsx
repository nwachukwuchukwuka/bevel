import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Text, View } from 'react-native';
import Slider from '@react-native-community/slider';
import { StepLayout } from './components/StepLayout';

const getIntensityData = (val: number) => {
    if (val < 33) {
        return {
            title: 'Low',
            desc: 'Comfortable pace, focusing on form and gentle movement.',
            color: '#34D399', // emerald
            bgColor: '#34D39920', // tinted dark
            icon: 'arrow-down',
        };
    } else if (val < 66) {
        return {
            title: 'Moderate',
            desc: 'Challenging but manageable, ideal for building endurance and staying active.',
            color: '#FACC15', // yellow
            bgColor: '#FACC1520',
            icon: 'arrow-forward',
        };
    } else {
        return {
            title: 'Max',
            desc: 'Pushing hard, near max effort, designed for maximum strength and conditioning.',
            color: '#F87171', // red
            bgColor: '#F8717120',
            icon: 'flame',
        };
    }
};

export default function IntensityScreen() {
    const router = useRouter();
    const [sliderValue, setSliderValue] = useState(50); // Start at Moderate

    const data = getIntensityData(sliderValue);

    return (
        <StepLayout
            rightIcon="settings-sharp"
            question="What intensity level works best for you?"
            buttonText="Generate"
            isNextEnabled={true}
            onNext={() => router.push('/generate-template/9-generating')}
            contentContainerStyle={{ alignItems: 'center' }}
        >
            {/* Dynamic Card */}
            <View 
                className="w-full mt-6 rounded-[24px] border items-center justify-center p-8 mb-10"
                style={{ backgroundColor: data.bgColor, borderColor: `${data.color}40` }}
            >
                <View className="w-24 h-24 rounded-full items-center justify-center mb-6" style={{ backgroundColor: `${data.color}20`, borderWidth: 1, borderColor: `${data.color}50` }}>
                    <Ionicons name={data.icon as any} size={48} color={data.color} />
                </View>

                <Text className="text-[28px] font-bold mb-3" style={{ color: data.color }}>{data.title}</Text>
                <Text className="text-center text-[#94A3B8] leading-5 font-medium px-2">{data.desc}</Text>
            </View>

            {/* Slider container */}
            <View className="w-full bg-[#151E33] border border-[#1E2D4A] rounded-[20px] p-5">
                <View className="flex-row items-center justify-between mb-4 px-2">
                    <Text className="text-[#64748B] text-[13px] font-semibold">Low</Text>
                    <Text className="text-[#F1F5F9] text-[15px] font-bold">{Math.round(sliderValue)}%</Text>
                    <Text className="text-[#64748B] text-[13px] font-semibold">Max</Text>
                </View>
                
                <Slider
                    style={{ width: '100%', height: 40 }}
                    minimumValue={0}
                    maximumValue={100}
                    value={sliderValue}
                    onValueChange={setSliderValue}
                    minimumTrackTintColor={data.color}
                    maximumTrackTintColor="#1E2D4A"
                    thumbTintColor={data.color}
                />
            </View>
        </StepLayout>
    );
}