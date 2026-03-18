import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native';

export default function AccountScreen() {
    const router = useRouter();

    const handleDeleteAccount = () => {
        Alert.alert(
            "Are you sure?",
            "All data pertaining to your account will be deleted. This action cannot be undone.",
            [
                { text: "Cancel", style: "cancel" },
                { text: "Confirm", style: "destructive", onPress: () => console.log('Account Deleted') }
            ]
        );
    };

    return (
        <View className="flex-1 bg-[#F9FAFB]">
            {/* Header */}
            <View className="flex-row items-center justify-between px-5 py-4 border-b border-gray-100 bg-white">
                <TouchableOpacity onPress={() => router.back()} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                    <Ionicons name="chevron-back" size={24} color="#111827" />
                </TouchableOpacity>
                <Text className="text-[16px] font-bold text-gray-900">Account details</Text>
                <TouchableOpacity><Text className="text-[15px] font-bold text-blue-400 opacity-50">Save</Text></TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} className="flex-1 px-5 pt-8">

                {/* Avatar */}
                <View className="items-center mb-8">
                    <View className="w-24 h-24 rounded-full bg-[#BBD9E5] items-center justify-center mb-3">
                        <Text className="text-[32px] text-gray-700">A</Text>
                    </View>
                    <Text className="text-[24px] font-bold text-gray-900 mb-1">Alex</Text>
                    <TouchableOpacity><Text className="text-[14px] text-gray-500 font-medium">Edit photo</Text></TouchableOpacity>
                </View>

                {/* Form Group */}
                <View className="bg-white rounded-[24px] shadow-sm shadow-black/5 border border-gray-100 overflow-hidden mb-8">
                    <View className="flex-row items-center justify-between p-4 border-b border-gray-50">
                        <Text className="text-[15px] font-bold text-gray-900">First Name</Text>
                        <Text className="text-[15px] font-medium text-gray-900">Alex</Text>
                    </View>
                    <View className="flex-row items-center justify-between p-4 border-b border-gray-50">
                        <Text className="text-[15px] font-bold text-gray-900">Last Name</Text>
                        <Text className="text-[15px] font-medium text-gray-400">Smith</Text>
                    </View>
                    <TouchableOpacity className="flex-row items-center justify-between p-4 border-b border-gray-50">
                        <Text className="text-[15px] font-bold text-gray-900">Birthday</Text>
                        <View className="flex-row items-center gap-2">
                            <Text className="text-[15px] font-medium text-gray-900">January 1, 1981</Text>
                            <Ionicons name="chevron-forward" size={16} color="#D1D5DB" />
                        </View>
                    </TouchableOpacity>
                    <View className="flex-row items-center justify-between p-4">
                        <Text className="text-[15px] font-bold text-gray-900">Age</Text>
                        <Text className="text-[15px] font-medium text-gray-400">44 years old</Text>
                    </View>
                </View>

                {/* Actions */}
                <View className="gap-3 mb-10">
                    <TouchableOpacity className="bg-white h-[56px] rounded-[16px] items-center justify-center shadow-sm border border-gray-100">
                        <Text className="font-bold text-[16px] text-gray-900">Log out</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={handleDeleteAccount}
                        className="bg-red-50 h-[56px] rounded-[16px] items-center justify-center border border-red-100"
                    >
                        <Text className="font-bold text-[16px] text-red-500">Delete account</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </View>
    );
}