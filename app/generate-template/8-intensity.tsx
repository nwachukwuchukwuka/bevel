import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
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
            color: '#10B981', // emerald-500
            bgColor: '#D1FAE5', // emerald-100
            icon: 'arrow-down',
        };
    } else if (val < 66) {
        return {
            title: 'Moderate',
            desc: 'Challenging but manageable, ideal for building endurance and staying active.',
            color: '#F59E0B', // amber-500
            bgColor: '#FEF3C7', // amber-100
            icon: 'arrow-forward',
        };
    } else {
        return {
            title: 'Max',
            desc: 'Pushing hard, near max effort, designed for maximum strength and conditioning.',
            color: '#EF4444', // red-500
            bgColor: '#FEE2E2', // red-100
            icon: 'flame',
        };
    }
};

export default function IntensityScreen() {
    const router = useRouter();
    const [sliderValue, setSliderValue] = useState(50); // Start at Moderate

    const data = getIntensityData(sliderValue);

    // Dynamic rotation for the graphic based on slider 0-100 mapping to an angle
    // At 50%, angle is -45 degrees (like original Moderate).
    // At 0%, we can make it point further down (-135 degrees).
    // At 100%, we point it up (45 degrees).
    const angle = -135 + (sliderValue / 100) * 180;

    return (
        <StepLayout
            rightIcon="settings-sharp"
            question="What intensity level works best for you?"
            buttonText="Generate"
            isNextEnabled={true}
            onNext={() => router.push('/generate-template/9-generating')}
            contentContainerStyle={{ alignItems: 'center' }}
        >
            {/* Glow Background Dynamic */}
            <View className="absolute top-20 w-[150%] h-[400px] -z-10 opacity-30">
                <LinearGradient colors={[data.bgColor, 'transparent']} className="flex-1 rounded-full" />
            </View>

            {/* Circular Graphic */}
            <View 
                className="w-48 h-48 rounded-full border-[16px] items-center justify-center mt-10 mb-12 relative"
                style={{ borderColor: data.bgColor }}
            >
                <View 
                    className="absolute inset-0 border-[16px] rounded-full" 
                    style={{ 
                        borderTopColor: data.color, 
                        borderRightColor: data.color, 
                        borderBottomColor: 'transparent', 
                        borderLeftColor: 'transparent', 
                        transform: [{ rotate: `${angle}deg` }] 
                    }} 
                />
                <View className="w-20 h-20 bg-white rounded-full items-center justify-center shadow-md">
                    <Ionicons name={data.icon as any} size={40} color={data.color} />
                </View>
            </View>

            <Text className="text-2xl font-bold text-gray-900 mb-2">{data.title}</Text>
            <Text className="text-center text-gray-500 mb-12 px-8 h-12">{data.desc}</Text>

            {/* Slider */}
            <View className="w-full px-6 flex-row items-center justify-between mb-2">
                <Text className="text-gray-400 text-xs font-medium">Low</Text>
                <Slider
                    style={{ flex: 1, height: 40, marginHorizontal: 16 }}
                    minimumValue={0}
                    maximumValue={100}
                    value={sliderValue}
                    onValueChange={setSliderValue}
                    minimumTrackTintColor={data.color}
                    maximumTrackTintColor="#F3F4F6"
                    thumbTintColor="#FFFFFF"
                />
                <Text className="text-gray-400 text-xs font-medium">Max</Text>
            </View>
        </StepLayout>
    );
}