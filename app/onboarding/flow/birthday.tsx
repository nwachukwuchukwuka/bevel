import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Platform, Text, View } from 'react-native';
import { ContinueButton } from '../../../components/onboarding/ContinueButton';

export default function BirthdayScreen() {
    const router = useRouter();
    const [date, setDate] = useState(new Date(1995, 0, 1));
    const [show, setShow] = useState(true);

    const onChange = (event: any, selectedDate?: Date) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    };

    return (
        <View className="flex-1 flex-col">
            <View className="mb-8 flex-col gap-2">
                <Text className="text-3xl font-bold text-white ">
                    When's your birthday?
                </Text>
                <Text className="text-sm font-medium text-slate-400">
                    Baseline demographic data input
                </Text>
            </View>

            <View className="flex-1 px-1">

                <View className="bg-[#151E33] border border-[#1E293B] rounded-3xl p-6 items-center justify-center min-h-[300px]">
                    <View className="w-12 h-12 rounded-xl bg-[#1E293B] border border-[#2D3748] items-center justify-center mb-6">
                        <Ionicons name="calendar-outline" size={24} color="#4DB9F2" />
                    </View>

                    <View className="w-full bg-[#090D16] border border-[#1E293B] rounded-2xl p-4 items-center justify-center">
                        <DateTimePicker
                            value={date}
                            mode="date"
                            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                            onChange={onChange}
                            maximumDate={new Date()}
                            textColor="#FFFFFF"
                            themeVariant="dark"
                            style={{ height: 180, width: '100%', paddingHorizontal: 10 }}
                        />
                    </View>
                </View>

                <View className="bg-[#1E293B40] border border-[#1E293B] rounded-2xl p-4 flex-row items-center gap-3 mt-6">
                    <Ionicons name="information-circle" size={20} color="#10B981" />
                    <Text className="flex-1 text-xs text-slate-400 leading-5">
                        Age tracking is required to accurately calibrate your physiological baselines and telemetry insights.
                    </Text>
                </View>

            </View>

            <View className="mt-auto pt-4">
                <ContinueButton onPress={() => router.push('/onboarding/flow/units')} />
            </View>
        </View>
    );
}