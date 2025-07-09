import { registerForPushNotificationsAsync } from "@/lib/notification";
import React, { PropsWithChildren, useEffect, useRef, useState } from "react";
import * as Notifications from "expo-notifications";
import { supabase } from "@/lib/supabase";
import { useAuth } from "./AuthProvider";

const NotificationProvider = ({ children }: PropsWithChildren) => {
  const notificationListener = useRef<any>();
  const responseListener = useRef<any>();
  const [expoPushToken, setExpoPushToken] = useState<string>();
  const [notification, setNotification] =
    useState<Notifications.Notification>();
  const { profile } = useAuth();

  const savePushToken = async (newToken: string | undefined) => {
    setExpoPushToken(newToken);
    console.log("save push token", newToken);
    if (!newToken) {
      return;
    }

    console.log("update profile with push token", profile.id);
    await supabase
      .from("profiles")
      .update({
        expo_push_token: newToken,
      })
      .eq("id", profile.id);
  };

  useEffect(() => {
    console.log("register for push notifications");
    registerForPushNotificationsAsync().then((token) => savePushToken(token));

    notificationListener.current =
      Notifications.addNotificationReceivedListener(
        (notification: Notifications.Notification) => {
          console.log(notification);
          setNotification(notification);
        }
      );

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });
    return () => {
      if (notificationListener.current) {
        Notifications.removeNotificationSubscription(
          notificationListener.current
        );
      } else {
        console.log("no notification listener");
      }

      if (responseListener.current) {
        Notifications.removeNotificationSubscription(responseListener.current);
      } else {
        console.log("no response listener");
      }
    };
  }, []);
  console.log("initialize push notifications");
  return <>{children}</>;
};

export default NotificationProvider;
