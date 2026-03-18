import { ActivityStatus } from '@/constants';
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import React, { forwardRef, useCallback, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CustomDateView } from './CustomDateView';
import { DurationView } from './DurationView';
import { IntroView } from './IntroView'; // <--- NEW IMPORT
import { StatusMainView } from './StatusMainView';

export type ActivityStatusSheetRef = BottomSheetModal;

interface Props {
    initialStatus: ActivityStatus;
    initialDuration: string;
    onUpdate: (status: ActivityStatus, duration: string) => void;
}

// Added 'intro' to the view steps
type ViewStep = 'intro' | 'main' | 'duration' | 'custom_date';

export const ActivityStatusSheet = forwardRef<ActivityStatusSheetRef, Props>(({ initialStatus, initialDuration, onUpdate }, ref) => {
    const insets = useSafeAreaInsets();

    // Start on the intro screen by default
    const [step, setStep] = useState<ViewStep>('intro');

    const [status, setStatus] = useState<ActivityStatus>(initialStatus);
    const [duration, setDuration] = useState<string>(initialDuration);

    const renderBackdrop = useCallback(
        (props: any) => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} opacity={0.4} />,
        []
    );

    const handleDismiss = () => {
        if (ref && 'current' in ref && ref.current) {
            ref.current.dismiss();
            // Reset to intro for the next time it opens
            setTimeout(() => setStep('intro'), 300);
        }
    };

    const handleUpdate = () => {
        onUpdate(status, duration);
        handleDismiss();
    };

    return (
        <BottomSheetModal
            ref={ref}
            index={0}
            enableDynamicSizing={true}
            backdropComponent={renderBackdrop}
            handleIndicatorStyle={step === 'intro' ? { display: 'none' } : { backgroundColor: '#D1D5DB', width: 36, height: 4, marginTop: 8 }}
            backgroundStyle={{ backgroundColor: '#FDFDFD', borderRadius: 24 }}
        >
            <BottomSheetView style={{ paddingBottom: insets.bottom }}>

                {/* 1. Intro Step */}
                {step === 'intro' && (
                    <IntroView
                        onClose={handleDismiss}
                        onContinue={() => setStep('main')}
                    />
                )}

                {/* 2. Main Step */}
                {step === 'main' && (
                    <StatusMainView
                        selectedStatus={status}
                        setSelectedStatus={setStatus}
                        currentDuration={duration}
                        onOpenDuration={() => setStep('duration')}
                        onUpdate={handleUpdate}
                        onBack={() => setStep('intro')}
                    />
                )}

                {/* 3. Duration Step */}
                {step === 'duration' && (
                    <DurationView
                        selectedDuration={duration}
                        setSelectedDuration={setDuration}
                        onOpenCustom={() => setStep('custom_date')}
                        onBack={() => setStep('main')}
                        onSave={() => setStep('main')}
                    />
                )}

                {/* 4. Custom Date Step */}
                {step === 'custom_date' && (
                    <CustomDateView
                        onBack={() => setStep('duration')}
                        onDone={(dateStr) => {
                            setDuration(dateStr);
                            setStep('duration');
                        }}
                    />
                )}
            </BottomSheetView>
        </BottomSheetModal>
    );
});