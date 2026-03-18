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
            <View className="h-64 justify-center items-center mt-10 relative">
                <DateTimePicker
                    value={duration}
                    mode="time"
                    display="spinner"
                    is24Hour={true}
                    locale="en_GB"
                    onChange={(event, selectedDate) => {
                        if (selectedDate) setDuration(selectedDate);
                    }}
                    textColor="#111827"
                    style={{ width: '100%', height: 200 }}
                />

                {/* Overlay labels for "hr" and "mins" beside the native spinner columns */}
                <View className="absolute w-full h-full flex-row justify-center items-center" pointerEvents="none">
                    {/* Positioned roughly to the right of the hours and minutes number wheels */}
                    <View className="w-1/2 items-end pr-20">
                        <Text className=" text-lg text-gray-800 tracking-wide mt-1">hr</Text>
                    </View>
                    <View className="w-1/2 items-end pr-20">
                        <Text className=" text-lg text-gray-800 tracking-wide mt-1">mins</Text>
                    </View>
                </View>
            </View>
        </StepLayout>
    );
}