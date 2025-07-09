import { Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import * as Device from 'expo-device';
import { supabase } from './supabase';
import { OrderProps } from '@/types';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });

  // Can use this function below or use Expo's Push Notification Tool from: https://expo.dev/notifications
async function sendPushNotification(
    expoPushToken: string
    , title: string
    , body: string
  ) {
    const message = {
      to: expoPushToken,
      sound: 'default',
      title: title,
      body: body,
      data: { someData: 'goes here' },
    };
  
    console.log('Sending push notification:', message);
    await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });
  }

export async function registerForPushNotificationsAsync() {
  let token: string | undefined;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (
      await Notifications.getExpoPushTokenAsync({
        projectId: Constants.expoConfig?.extra?.eas.projectId,
      })
    ).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  return token;
}

export const getUserToken = async (userId: string) => {
    const {data, error} = await supabase
    .from('profiles')
    .select('expo_push_token')
    .eq('id', userId)
    .single();
    return data?.expo_push_token;
}

export const notifiyUserAboutOrderUpdate = async ({order}: OrderProps) => { 
  const token = await getUserToken(order.user_id || "");
  console.log('Token:', token);

  if(token) {
    const title = `Order ${order.status}`;
    const body = getStatusMessage(order.status, order.id);

    console.log('Title:', title);
    console.log('Body:', body);
    await sendPushNotification(token, title, body);
  }
}

const getStatusMessage = (status: string, orderId: number) => {
  switch (status.toLowerCase()) {
    case 'confirmed':
      return `Your order with ID ${orderId} has been confirmed.`;
    case 'preparing':
      return `Your order with ID ${orderId} is being prepared.`;
    case 'ready':
      return `Your order with ID ${orderId} is ready for pickup.`;
    case 'delivered':
      return `Your order with ID ${orderId} has been delivered.`;
    case 'cancelled':
      return `Your order with ID ${orderId} has been cancelled.`;
    default:
      return `Your order with ID ${orderId} has been updated.`;
  }
};