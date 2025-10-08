import * as Notifications from 'expo-notifications';
import { router } from 'expo-router';

// Configure notification handler
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
    priority: Notifications.AndroidNotificationPriority.MAX,
  }),
});

// Handle notification response (user taps notification)
export function setupNotificationHandler() {
  Notifications.addNotificationResponseReceivedListener((response) => {
    const { data } = response.notification.request.content;

    console.log('Notification pressed:', data);

    // Navigate to report details if reportId is provided
    if (data?.reportId) {
      router.replace(`/report/${data.reportId}`);
    }
  });
}

// Handle deep linking when app is opened from notification (app was closed)
export function handleNotificationDeepLink(url: string) {
  try {
    // Parse URL like: bullyproof://report/report-123
    const parsedUrl = new URL(url);
    const pathParts = parsedUrl.pathname.split('/');

    if (pathParts[1] === 'report' && pathParts[2]) {
      const reportId = pathParts[2];
      console.log('Deep link to report:', reportId);
      router.replace(`/report/${reportId}`);
    }
  } catch (error) {
    console.error('Error parsing deep link:', error);
  }
}

// Get initial notification from app launch (when app was closed)
export async function getInitialNotification() {
  try {
    const notification = await Notifications.getLastNotificationResponseAsync();
    if (notification) {
      const { data } = notification.notification.request.content;
      console.log('Initial notification:', data);

      if (data?.reportId) {
        // Add a small delay to ensure app is properly initialized
        setTimeout(() => {
          router.replace(`/report/${data.reportId}`);
        }, 500);
      }
    }
  } catch (error) {
    console.error('Error getting initial notification:', error);
  }
}

// Request notification permissions
export async function requestNotificationPermissions() {
  const { status } = await Notifications.requestPermissionsAsync();
  return status === 'granted';
}

// Get push token
export async function getPushToken() {
  try {
    const token = await Notifications.getExpoPushTokenAsync({
      projectId: 'ec49644a-19c8-461c-9ab6-5127aecf8534',
    });
    return token.data;
  } catch (error) {
    console.error('Error getting push token:', error);
    return null;
  }
}

// Register for push notifications
export async function registerForPushNotifications() {
  const hasPermission = await requestNotificationPermissions();

  if (!hasPermission) {
    console.log('Notification permissions not granted');
    return null;
  }

  const token = await getPushToken();
  if (token) {
    console.log('Push token registered:', token);
    return token;
  }

  return null;
}

// Send test notification (for development)
export async function sendTestNotification(reportId: string, status: string) {
  const statusMessages = {
    Pending: 'Your report has been received and is under review',
    InProgress: 'Your report is being actively investigated',
    Resolved: 'Your report has been resolved. View the details',
  };

  const message =
    statusMessages[status as keyof typeof statusMessages] ||
    'Report status updated';

  // Import the grouped notification function
  const { sendGroupedNotification, sendSummaryNotification } = await import(
    './NotificationService'
  );

  await sendGroupedNotification(
    'Report Status Update',
    message,
    { reportId, type: 'report_status_update', status },
    'report-updates',
  );

  // Send summary notification if there are multiple notifications
  await sendSummaryNotification('report-updates');
}
