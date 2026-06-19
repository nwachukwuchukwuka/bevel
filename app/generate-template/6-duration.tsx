import DateTimePicker from '@react-native-community/datetimepicker';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Text, View } from 'react-native';
import { StepLayout } from './components/StepLayout';

export default function DurationScreen() {
    const router = useRouter();
    const [duration, setDuration] = useState(new Date(new Date().setHours(1, 30, 0, 0)));

    return (
        <StepLayout
            rightIcon="settings-sharp"
            question="How much time do you have to train?"
            subtitle="Shorter workouts focus on efficiency, longer ones allow more variety."
            isNextEnabled={true}
            onNext={() => router.push('/generate-template/7-muscles')}
            onRightIconPress={() => router.push('/generate-template/advanced-settings')}
        >
            <View className="bg-[#151E33] border border-[#1E2D4A] rounded-[24px] overflow-hidden mt-6 relative h-[240px] justify-center">
                <DateTimePicker
                    value={duration}
                    mode="time"
                    display="spinner"
                    is24Hour={true}
                    locale="en_GB"
                    onChange={(event, selectedDate) => {
                        if (selectedDate) setDuration(selectedDate);
                    }}
                    textColor="#F1F5F9"
                    style={{ width: '100%', height: 200 }}
                />

                <View className="absolute w-full h-full flex-row justify-center items-center pointer-events-none">
                    <View className="w-1/2 items-end pr-[25%]">
                        <Text className="text-[16px] font-semibold text-[#64748B] mt-1">hr</Text>
                    </View>
                    <View className="w-1/2 items-end pr-[15%]">
                        <Text className="text-[16px] font-semibold text-[#64748B] mt-1">mins</Text>
                    </View>
                </View>

                {/* Center Highlight Bar */}
                {/* <View className="absolute w-full h-[40px] top-[100px] bg-[#38BDF8]/10 pointer-events-none" /> */}
            </View>
        </StepLayout>
    );
}