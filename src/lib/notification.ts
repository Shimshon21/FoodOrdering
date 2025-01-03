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
    expoPushToken: Notifications.ExpoPushToken
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
  let token;

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

// TODO: Implement better notification message
export const notifiyUserAboutOrderUpdate = async ({order}: OrderProps, status: string) => { 
  const token = await getUserToken(order.user_id || "");
    console.log('Token:', token);

    if(token) {
        await sendPushNotification({ data: token } as Notifications.ExpoPushToken, 
          `Order status ${status}`,
           `Your order ${order.id} has been updated`);
    }
  }