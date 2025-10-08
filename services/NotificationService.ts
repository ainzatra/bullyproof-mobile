import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

// Configure notification handler
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

// Notification channel for Android
export async function createNotificationChannel() {
  if (Platform.OS === 'android') {
    // Create a group channel for report updates
    await Notifications.setNotificationChannelGroupAsync('report-group', {
      name: 'Report Updates',
      description: 'All notifications related to your reports',
    });

    // Create the main channel within the group
    await Notifications.setNotificationChannelAsync('report-updates', {
      name: 'Report Status Updates',
      description: 'Notifications about your report status updates',
      groupId: 'report-group',
      sound: 'default',
      importance: Notifications.AndroidImportance.HIGH,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
      enableLights: true,
      enableVibrate: true,
    });

    // Create a summary channel for grouped notifications
    await Notifications.setNotificationChannelAsync('report-summary', {
      name: 'Report Summary',
      description: 'Summary of multiple report notifications',
      groupId: 'report-group',
      sound: 'default',
      importance: Notifications.AndroidImportance.HIGH,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
      enableLights: true,
      enableVibrate: true,
    });
  }
}

// Request notification permissions
export async function requestNotificationPermissions() {
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'Default',
      importance: Notifications.AndroidImportance.HIGH,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    return finalStatus === 'granted';
  } else {
    console.log('Must use physical device for push notifications');
    return false;
  }
}

// Get push token
export async function getPushToken() {
  try {
    const permissionsGranted = await requestNotificationPermissions();

    if (!permissionsGranted) {
      console.log('Notification permissions not granted');
      return null;
    }

    const token = await Notifications.getExpoPushTokenAsync({
      projectId: 'ec49644a-19c8-461c-9ab6-5127aecf8534', // From your app.json
    });

    return token.data;
  } catch (error) {
    console.error('Error getting push token:', error);
    return null;
  }
}

// Store push token locally
export async function storePushToken(token: string) {
  try {
    await AsyncStorage.setItem('pushToken', token);
    console.log('Push token stored successfully');
  } catch (error) {
    console.error('Error storing push token:', error);
  }
}

// Get stored push token
export async function getStoredPushToken() {
  try {
    return await AsyncStorage.getItem('pushToken');
  } catch (error) {
    console.error('Error getting stored push token:', error);
    return null;
  }
}

// Remove stored push token
export async function removeStoredPushToken() {
  try {
    await AsyncStorage.removeItem('pushToken');
    console.log('Push token removed successfully');
  } catch (error) {
    console.error('Error removing push token:', error);
  }
}

// Register device for push notifications
export async function registerForPushNotifications() {
  try {
    await createNotificationChannel();

    const token = await getPushToken();

    if (token) {
      await storePushToken(token);
      return token;
    }

    return null;
  } catch (error) {
    console.error('Error registering for push notifications:', error);
    return null;
  }
}

// Handle notification response
export function handleNotificationResponse(
  response: Notifications.NotificationResponse,
) {
  const data = response.notification.request.content.data;

  console.log('Notification pressed:', data);

  // Handle navigation based on notification data
  if (data.type === 'report_status_update' && data.reportId) {
    // Navigate to report details
    // This will be handled by the navigation logic in your app
    console.log('Navigate to report:', data.reportId);
  }
}

// Add notification response listener
export function addNotificationResponseListener() {
  return Notifications.addNotificationResponseReceivedListener(
    handleNotificationResponse,
  );
}

// Send local notification (for testing)
export async function sendLocalNotification(
  title: string,
  body: string,
  data?: any,
) {
  try {
    await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
        data: data || {},
        sound: 'default',
      },
      trigger: null, // Show immediately
    });
  } catch (error) {
    console.error('Error sending local notification:', error);
  }
}

// Send grouped notification for report updates
export async function sendGroupedNotification(
  title: string,
  body: string,
  data?: any,
  groupId: string = 'report-updates',
) {
  try {
    const notificationId = await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
        data: data || {},
        sound: 'default',
        // Android specific grouping
        ...(Platform.OS === 'android' && {
          channelId: groupId,
          groupId: 'report-group',
          summaryText: 'Report updates',
          // Set thread ID for grouping
          threadId: 'report-updates-thread',
        }),
        // iOS specific grouping
        ...(Platform.OS === 'ios' && {
          summaryArgument: 'report updates',
          summaryArgumentCount: 1,
          threadId: 'report-updates-thread',
        }),
      },
      trigger: null, // Show immediately
    });

    // Store notification info for grouping management
    await storeNotificationInfo(notificationId, groupId, data);

    return notificationId;
  } catch (error) {
    console.error('Error sending grouped notification:', error);
    return null;
  }
}

// Store notification information for grouping
async function storeNotificationInfo(
  notificationId: string,
  groupId: string,
  data?: any,
) {
  try {
    const key = `notification_${notificationId}`;
    const notificationInfo = {
      id: notificationId,
      groupId,
      data: data || {},
      timestamp: new Date().toISOString(),
    };
    await AsyncStorage.setItem(key, JSON.stringify(notificationInfo));
  } catch (error) {
    console.error('Error storing notification info:', error);
  }
}

// Get all notifications in a group
async function getGroupNotifications(groupId: string) {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const notificationKeys = keys.filter((key) =>
      key.startsWith('notification_'),
    );

    const notifications = [];
    for (const key of notificationKeys) {
      const info = await AsyncStorage.getItem(key);
      if (info) {
        const notificationInfo = JSON.parse(info);
        if (notificationInfo.groupId === groupId) {
          notifications.push(notificationInfo);
        }
      }
    }

    return notifications;
  } catch (error) {
    console.error('Error getting group notifications:', error);
    return [];
  }
}

// Send summary notification for grouped notifications
export async function sendSummaryNotification(
  groupId: string = 'report-updates',
  count: number = 1,
) {
  try {
    const notifications = await getGroupNotifications(groupId);

    if (notifications.length <= 1) {
      return; // No need for summary if only one notification
    }

    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Report Updates',
        body: `You have ${notifications.length} report updates`,
        data: {
          type: 'report_summary',
          groupId,
          count: notifications.length,
        },
        sound: 'default',
        // Android specific
        ...(Platform.OS === 'android' && {
          channelId: 'report-summary',
          groupId: 'report-group',
          summaryText: `${notifications.length} report updates`,
          threadId: 'report-updates-thread',
        }),
        // iOS specific
        ...(Platform.OS === 'ios' && {
          summaryArgument: 'report updates',
          summaryArgumentCount: notifications.length,
          threadId: 'report-updates-thread',
        }),
      },
      trigger: null, // Show immediately
    });
  } catch (error) {
    console.error('Error sending summary notification:', error);
  }
}

// Clear old notification data
export async function clearOldNotificationData() {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const notificationKeys = keys.filter((key) =>
      key.startsWith('notification_'),
    );

    // Clear notifications older than 24 hours
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

    for (const key of notificationKeys) {
      const info = await AsyncStorage.getItem(key);
      if (info) {
        const notificationInfo = JSON.parse(info);
        const notificationDate = new Date(notificationInfo.timestamp);

        if (notificationDate < twentyFourHoursAgo) {
          await AsyncStorage.removeItem(key);
        }
      }
    }
  } catch (error) {
    console.error('Error clearing old notification data:', error);
  }
}

// Get notification settings
export async function getNotificationSettings() {
  try {
    const settings = await Notifications.getPermissionsAsync();
    return {
      granted: settings.status === 'granted',
      canAskAgain: settings.canAskAgain,
    };
  } catch (error) {
    console.error('Error getting notification settings:', error);
    return {
      granted: false,
      canAskAgain: true,
    };
  }
}

// Clear all notifications
export async function clearAllNotifications() {
  try {
    await Notifications.dismissAllNotificationsAsync();
  } catch (error) {
    console.error('Error clearing notifications:', error);
  }
}
