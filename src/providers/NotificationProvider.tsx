import { registerForPushNotificationsAsync } from "@/lib/notification";
import React, { PropsWithChildren, useEffect, useRef, useState } from "react";
import * as Notifications from "expo-notifications";

const NotificationProvider = ({ children }: PropsWithChildren) => {
  const notificationListener = useRef<any>();
  const responseListener = useRef<any>();
  const [expoPushToken, setExpoPushToken] = useState<string>();
  const [notification, setNotification] =
    useState<Notifications.Notification>();

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

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
      }

      if (responseListener.current) {
        Notifications.removeNotificationSubscription(responseListener.current);
      }
    };
  }, []);
  console.log("initialize push notifications");
  return <>{children}</>;
};

export default NotificationProvider;
