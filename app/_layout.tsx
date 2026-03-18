import { AuthProvider, JournalProvider } from '@/context';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { MenuProvider } from 'react-native-popup-menu';
import "./global.css";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <MenuProvider>
          <AuthProvider>
            <JournalProvider>
              <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="index" />
                {/* <Stack.Screen name="(auth)" />
        <Stack.Screen name="(tabs)" /> */}
                <Stack.Screen name="onboarding" />
                <Stack.Screen
                  name="describe-food"
                  options={{
                    presentation: 'modal',
                    sheetGrabberVisible: true,
                  }}
                />

                <Stack.Screen
                  name="processing-food"
                  options={{
                    presentation: 'transparentModal',
                    headerShown: false,
                    animation: 'fade',
                  }}
                />

                <Stack.Screen
                  name="import-food"
                  options={{
                    presentation: 'modal',
                    headerShown: false,
                  }}
                />
 
                <Stack.Screen
                  name="log-food"
                  options={{
                    presentation: 'modal',
                    headerShown: false,
                  }}
                />

                <Stack.Screen name="edit-food" options={{ presentation: 'modal', headerShown: false }} />
                <Stack.Screen name="edit-ingredient" options={{ presentation: 'modal', headerShown: false }} />
                <Stack.Screen
                  name="capture-food"
                  options={{
                    presentation: 'modal',
                  }}
                />

                <Stack.Screen
                  name="scan-barcode"
                  options={{ presentation: 'fullScreenModal' }}
                />
                <Stack.Screen
                  name="ask-bevel"
                  options={{ presentation: 'transparentModal', animation: 'fade' }}
                />
                <Stack.Screen
                  name="chat-history"
                  options={{ presentation: 'modal' }}
                />

                <Stack.Screen
                  name="search-food"
                  options={{
                    presentation: 'modal',
                  }}
                />

                <Stack.Screen
                  name="generate-template"
                  options={{
                    presentation: 'modal',
                    headerShown: false
                  }}
                />
                <Stack.Screen
                  name="log-activity"
                  options={{
                    presentation: 'modal',

                  }}
                />
                {/* <Stack.Screen name="sleep/[id]" options={{ presentation: 'modal' }} /> */}
                <Stack.Screen name="sleep" />
                <Stack.Screen name="nutrition" options={{ headerShown: false }} />
                <Stack.Screen
                  name="journal/alcohol"
                  options={{ presentation: 'modal', animation: 'slide_from_bottom' }}
                />
                <Stack.Screen
                  name="journal/caffeine"
                  options={{ presentation: 'modal', animation: 'slide_from_bottom' }}
                />

                <Stack.Screen name="journal/mood" options={{ presentation: 'modal', animation: 'slide_from_bottom' }} />
                <Stack.Screen name="journal/hydration" options={{ presentation: 'modal', animation: 'slide_from_bottom' }} />
                <Stack.Screen name="journal/insights" options={{ presentation: 'modal', animation: 'slide_from_bottom' }} />
                <Stack.Screen name="journal/customize" options={{ presentation: 'modal', animation: 'slide_from_bottom' }} />
                <Stack.Screen name="journal/default-entries" options={{ presentation: 'modal', animation: 'slide_from_bottom' }} />
                <Stack.Screen name="journal/pinned-tags" options={{ presentation: 'modal', animation: 'slide_from_bottom' }} />
                <Stack.Screen name="fitness/activity-summary" options={{ presentation: 'modal', animation: 'slide_from_bottom' }} />
                <Stack.Screen name="fitness/cardio-focus" options={{ presentation: 'modal', animation: 'slide_from_bottom' }} />
                <Stack.Screen name="fitness/strength-progression" options={{ presentation: 'modal', animation: 'slide_from_bottom' }} />
                <Stack.Screen name="fitness/edit-pins" options={{ presentation: 'modal', animation: 'slide_from_bottom' }} />

                <Stack.Screen name="cgm" options={{ presentation: 'modal' }} />
                <Stack.Screen name="log-details" options={{ presentation: 'modal' }} />
                <Stack.Screen name="biology/vo2-max" options={{ presentation: 'modal', animation: 'slide_from_bottom' }} />
                <Stack.Screen name="biology/weight" options={{ presentation: 'modal', animation: 'slide_from_bottom' }} />
                <Stack.Screen name="settings" options={{ presentation: 'modal', headerShown: false }} />

              </Stack>
            </JournalProvider>
          </AuthProvider>
        </MenuProvider>

      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}