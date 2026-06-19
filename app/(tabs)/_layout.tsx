// // import { ActionMenu } from "@/components/ActionMenu";
// // import { AddWorkoutTemplateSheet, AddWorkoutTemplateSheetRef } from "@/components/WorkTempComp/AddWorkoutTemplateSheet";
// // import { WorkoutTemplatesSheet } from "@/components/WorkTempComp/WorkoutTemplatesSheet";
// // import { Ionicons } from "@expo/vector-icons";
// // import { BottomSheetModal } from "@gorhom/bottom-sheet";
// // import { Tabs } from "expo-router";
// // import React, { useRef, useState } from "react";
// // import { Platform, View } from "react-native";

// // export default function TabsLayout() {
// //     const [isMenuVisible, setMenuVisible] = useState(false);

// //     const workoutSheetRef = useRef<BottomSheetModal>(null);
// //     const addWorkoutSheetRef = useRef<AddWorkoutTemplateSheetRef>(null);

// //     const handleOpenTemplates = () => {
// //         setMenuVisible(false);
// //         setTimeout(() => {
// //             workoutSheetRef.current?.present();
// //         }, 150);
// //     };

// //     const handleOpenAddWorkout = () => {
// //         addWorkoutSheetRef.current?.present();
// //     };



// //     return (
// //         <>
// //             <Tabs
// //                 screenOptions={{
// //                     headerShown: false,
// //                     tabBarStyle: {
// //                         backgroundColor: '#FFFFFF',
// //                         borderTopWidth: 0,
// //                         elevation: isMenuVisible ? 0 : 10,
// //                         shadowOpacity: isMenuVisible ? 0 : 0.05,
// //                         height: Platform.OS === 'ios' ? 90 : 70,
// //                         paddingTop: 10,
// //                         paddingBottom: Platform.OS === 'ios' ? 30 : 10,
// //                         zIndex: 100
// //                     },
// //                     tabBarShowLabel: true,
// //                     tabBarLabelStyle: {
// //                         fontSize: 10,
// //                         fontWeight: '500',
// //                         marginTop: 4,
// //                     },
// //                     tabBarActiveTintColor: '#1F2937',
// //                     tabBarInactiveTintColor: '#9CA3AF',
// //                 }}
// //             >
// //                 <Tabs.Screen
// //                     name="index"
// //                     options={{
// //                         title: "Home",
// //                         tabBarIcon: ({ color, focused }) => (
// //                             <Ionicons name={focused ? "home" : "home-outline"} size={24} color={color} />
// //                         ),
// //                     }}
// //                 />

// //                 <Tabs.Screen
// //                     name="journal"
// //                     options={{
// //                         title: "Journal",
// //                         tabBarIcon: ({ color, focused }) => (
// //                             <Ionicons name={focused ? "book" : "book-outline"} size={24} color={color} />
// //                         ),
// //                     }}
// //                 />



// //                 <Tabs.Screen
// //                     name="add"
// //                     listeners={() => ({
// //                         tabPress: (e) => {
// //                             e.preventDefault();
// //                             setMenuVisible(!isMenuVisible); // Toggle state
// //                         },
// //                     })}
// //                     options={{
// //                         title: "",
// //                         tabBarIcon: () => (
// //                             <View className={`items-center justify-center rounded-full h-14 w-14 -mt-8 shadow-lg elevation-5 ${isMenuVisible ? 'bg-gray-100' : 'bg-white'}`}>
// //                                 {/* Visual Toggle: Plus vs Close */}
// //                                 <Ionicons
// //                                     name={isMenuVisible ? "close" : "add"}
// //                                     size={32}
// //                                     color="#4B5563"
// //                                 />
// //                             </View>
// //                         ),
// //                     }}
// //                 />


// //                 <Tabs.Screen
// //                     name="fitness"
// //                     options={{
// //                         title: "Fitness",
// //                         tabBarIcon: ({ color, focused }) => (
// //                             <Ionicons name={focused ? "walk" : "walk-outline"} size={24} color={color} />
// //                         ),
// //                     }}
// //                 />

// //                 <Tabs.Screen
// //                     name="biology"
// //                     options={{
// //                         title: "Biology",
// //                         tabBarIcon: ({ color, focused }) => (
// //                             <Ionicons name={focused ? "heart" : "heart-outline"} size={24} color={color} />
// //                         ),
// //                     }}
// //                 />
// //             </Tabs>

// //             {/* Render the Menu Conditionally */}
// //             {isMenuVisible && (
// //                 <ActionMenu onClose={() => setMenuVisible(false)} onOpenTemplates={handleOpenTemplates} />
// //             )}
// //             <WorkoutTemplatesSheet ref={workoutSheetRef} onAddNewWorkout={handleOpenAddWorkout}
// //             />
// //             <AddWorkoutTemplateSheet ref={addWorkoutSheetRef} />

// //         </>
// //     );
// // }



import { ActionMenu } from "@/components/ActionMenu";
import { AddWorkoutTemplateSheet, AddWorkoutTemplateSheetRef } from "@/components/WorkTempComp/AddWorkoutTemplateSheet";
import { WorkoutTemplatesSheet } from "@/components/WorkTempComp/WorkoutTemplatesSheet";
import { Ionicons } from "@expo/vector-icons";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { Tabs } from "expo-router";
import React, { useRef, useState } from "react";
import { Platform, TouchableOpacity, View } from "react-native";

export default function TabsLayout() {
    const [isMenuVisible, setMenuVisible] = useState(false);

    const workoutSheetRef = useRef<BottomSheetModal>(null);
    const addWorkoutSheetRef = useRef<AddWorkoutTemplateSheetRef>(null);

    const handleOpenTemplates = () => {
        setMenuVisible(false);
        setTimeout(() => {
            workoutSheetRef.current?.present();
        }, 150);
    };

    const handleOpenAddWorkout = () => {
        addWorkoutSheetRef.current?.present();
    };

    return (
        <View className="flex-1">
            <Tabs
                screenOptions={{
                    headerShown: false,
                    tabBarStyle: {
                        backgroundColor: '#090D16',
                        borderTopWidth: 0,
                        // borderTopColor: '#1E293B',
                        height: Platform.OS === 'ios' ? 90 : 70,
                        paddingTop: 10,
                        paddingBottom: Platform.OS === 'ios' ? 30 : 10,
                        elevation: 0,
                        shadowOpacity: 0,
                        zIndex: 10
                    },
                    tabBarShowLabel: true,
                    tabBarLabelStyle: {
                        fontSize: 10,
                        fontWeight: '600',
                        marginTop: 4,
                    },
                    tabBarActiveTintColor: '#4DB9F2',
                    tabBarInactiveTintColor: '#64748B',
                }}
            >
                <Tabs.Screen
                    name="index"
                    options={{
                        title: "Home",
                        tabBarIcon: ({ color, focused }) => (
                            <Ionicons name={focused ? "home" : "home-outline"} size={22} color={color} />
                        ),
                    }}
                />

                <Tabs.Screen
                    name="journal"
                    options={{
                        title: "Journal",
                        tabBarIcon: ({ color, focused }) => (
                            <Ionicons name={focused ? "book" : "book-outline"} size={22} color={color} />
                        ),
                    }}
                />

                {/* Hide the 'add' route from the tab bar if the file exists */}
                <Tabs.Screen
                    name="add"
                    options={{
                        href: null,
                    }}
                />

                <Tabs.Screen
                    name="fitness"
                    options={{
                        title: "Fitness",
                        tabBarIcon: ({ color, focused }) => (
                            <Ionicons name={focused ? "barbell" : "barbell-outline"} size={22} color={color} />
                        ),
                    }}
                />

                <Tabs.Screen
                    name="biology"
                    options={{
                        title: "Biology",
                        tabBarIcon: ({ color, focused }) => (
                            <Ionicons name={focused ? "pulse" : "pulse-outline"} size={22} color={color} />
                        ),
                    }}
                />
            </Tabs>

            {/* Floating Action Button (FAB) */}
            <TouchableOpacity
                onPress={() => setMenuVisible(!isMenuVisible)}
                activeOpacity={0.8}
                className={`absolute items-center justify-center rounded-2xl h-14 w-14 border ${isMenuVisible
                    ? 'bg-[#1E293B] border-[#2D3748]'
                    : 'bg-[#4DB9F2] border-[#4DB9F2]'
                    }`}
                style={{
                    bottom: Platform.OS === 'ios' ? 110 : 90,
                    right: 20,
                    zIndex: 50,
                }}
            >
                <Ionicons
                    name={isMenuVisible ? "close" : "add"}
                    size={28}
                    color={isMenuVisible ? "#4DB9F2" : "#090D16"}
                />
            </TouchableOpacity>

            <ActionMenu
                visible={isMenuVisible}
                onClose={() => setMenuVisible(false)}
                onOpenTemplates={handleOpenTemplates}
            />

            <WorkoutTemplatesSheet
                ref={workoutSheetRef}
                onAddNewWorkout={handleOpenAddWorkout}
            />

            <AddWorkoutTemplateSheet ref={addWorkoutSheetRef} />
        </View>
    );
}