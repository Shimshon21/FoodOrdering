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
    Alert.alert('Error fetrching payment sheet params');
    return {};
}

export const initializePaymentSheet = async ( amount: number) => {
    console.log('Initialising payment sheet, for: ', amount);
    const { paymentIntent, publishableKey } = await fetchPaymentSheetParams(amount);

    if(!paymentIntent || !publishableKey) {
        Alert.alert('Error fetching payment sheet params');
        return;
    }

    await initPaymentSheet({
        merchantDisplayName: "Shimshon",
        paymentIntentClientSecret: paymentIntent,
        defaultBillingDetails: {
            name: "Shimshon",
        }
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