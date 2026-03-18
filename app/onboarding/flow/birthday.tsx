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
        <View className="flex-1">
            <View className="mt-6 mb-12 items-center">
                <Text className="text-2xl font-bold text-center text-neutral-900">
                    When's your birthday?
                </Text>
            </View>

            <View className="flex-1 items-center justify-center -mt-20">
                <View className="items-center justify-center w-full">
                    <DateTimePicker
                        value={date}
                        mode="date"
                        display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                        onChange={onChange}
                        maximumDate={new Date()}
                        textColor="black"
                        style={{ height: 200, width: '100%' }}
                    />
                </View>
            </View>

            <View className="mb-2">
                <ContinueButton onPress={() => router.push('/onboarding/flow/units')} />
            </View>
        </View>
    );
}