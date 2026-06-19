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
        <View className="flex-1 bg-[#090D16]">
            {/* Header */}
            <View className="flex-row items-center justify-between px-5 py-4 ">
                <TouchableOpacity
                    onPress={() => router.back()}
                    className="w-10 h-10 bg-[#151E33] border border-slate-800/80 rounded-xl items-center justify-center"
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                    <Ionicons name="chevron-back" size={20} color="#94A3B8" />
                </TouchableOpacity>
                <Text className="text-[17px] font-bold text-slate-100">Account profile</Text>
                <TouchableOpacity className="px-3 py-1.5 bg-indigo-600/20 border border-indigo-500/30 rounded-xl">
                    <Text className="text-[13px] font-semibold text-indigo-400">Save</Text>
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} className="flex-1 px-5 pt-6">

                {/* Avatar with customized modern hexagon/squircle layout */}
                <View className="items-center mb-8 bg-[#151E33] border border-slate-800 rounded-2xl p-6">
                    <View className="w-20 h-20 rounded-2xl bg-[#38BDF8]/20 border border-[#38BDF8]/40 items-center justify-center mb-3">
                        <Text className="text-[28px] font-bold text-[#38BDF8]">A</Text>
                    </View>
                    <Text className="text-[20px] font-bold text-slate-100 mb-1">Alex Smith</Text>
                    <TouchableOpacity className="mt-1 bg-slate-800/60 border border-slate-700/30 px-3 py-1.5 rounded-lg">
                        <Text className="text-[11px] text-slate-400 font-medium">Update profile photo</Text>
                    </TouchableOpacity>
                </View>

                {/* Form Group - Grid / Asymmetrical card structure */}
                <View className="flex-row items-center gap-2 mb-4 ml-1">
                    <Text className="text-[13px] font-bold text-slate-400">Personal information</Text>
                    <View className="flex-1 h-[1px] bg-slate-800/80" />
                </View>

                <View className="gap-3.5 mb-8">
                    {/* Grid for First/Last names */}
                    <View className="flex-row gap-3">
                        <View className="flex-1 bg-[#151E33] border border-slate-800 rounded-2xl p-4">
                            <Text className="text-[11px] font-semibold text-slate-500 mb-1">First Name</Text>
                            <Text className="text-[15px] font-bold text-slate-100">Alex</Text>
                        </View>
                        <View className="flex-1 bg-[#151E33] border border-slate-800 rounded-2xl p-4">
                            <Text className="text-[11px] font-semibold text-slate-500 mb-1">Last Name</Text>
                            <Text className="text-[15px] font-bold text-slate-300">Smith</Text>
                        </View>
                    </View>

                    <TouchableOpacity className="bg-[#151E33] border border-slate-800 rounded-2xl p-4 flex-row items-center justify-between">
                        <View>
                            <Text className="text-[11px] font-semibold text-slate-500 mb-1">Birthday</Text>
                            <Text className="text-[15px] font-bold text-slate-100">January 1, 1981</Text>
                        </View>
                        <Ionicons name="calendar-outline" size={18} color="#94A3B8" />
                    </TouchableOpacity>

                    <View className="bg-[#151E33] border border-slate-800 rounded-2xl p-4">
                        <Text className="text-[11px] font-semibold text-slate-500 mb-1">Age</Text>
                        <Text className="text-[15px] font-bold text-slate-300">44 years old</Text>
                    </View>
                </View>

                {/* Actions */}
                <View className="gap-3 mb-12">
                    <TouchableOpacity className="bg-slate-800/40 border border-slate-800 h-14 rounded-2xl items-center justify-center">
                        <Text className="font-bold text-[15px] text-slate-200">Log out</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={handleDeleteAccount}
                        className="bg-red-950/20 border border-red-900/40 h-14 rounded-2xl items-center justify-center"
                    >
                        <Text className="font-bold text-[15px] text-red-400">Delete account</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </View>
    );
}