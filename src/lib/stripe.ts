import { Alert } from "react-native";
import { supabase } from "./supabase";
import { initPaymentSheet, presentPaymentSheet } from "@stripe/stripe-react-native";

const fetchPaymentSheetParams = async (amount: number) => {
console.log('fetching payment sheet');
   const { data, error } = await supabase.functions.invoke('payment-sheet', {
        body: {
            amount
        }
    });
    if (data) {
        return data;
    }
    console.log("Failed to fetch payment sheet:", error);

    Alert.alert('Error fetrching payment sheet params');
    return {};
}

export const initializePaymentSheet = async (amount: number) => {
    console.log('Initialising payment sheet, for: ', amount);
    const { paymentIntent, publishableKey, customer, ephemeralKey } = await fetchPaymentSheetParams(amount);

    console.log('Payment Intent:', paymentIntent);
    console.log('Publishable key:', publishableKey);
    if(!paymentIntent || !publishableKey) {
        Alert.alert('Error fetching payment sheet params');
        return;
    }

    await initPaymentSheet({
        merchantDisplayName: "Shimshon",
        paymentIntentClientSecret: paymentIntent,
        customerId: customer,
        customerEphemeralKeySecret: ephemeralKey,
        defaultBillingDetails: {
            name: "Shimshon",
        },
    })
};

export const openPaymentSheet = async () => {
    console.log("open payment sheet")
    const {error} = await presentPaymentSheet();

    if(error) {
        Alert.alert(error.message)
        return false;
    }

    return true
}