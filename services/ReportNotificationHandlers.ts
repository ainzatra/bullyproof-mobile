import { ReportStatus } from '@/constants/notifications';
import {
  sendGroupedNotification,
  sendSummaryNotification,
} from './NotificationService';

export interface ReportNotificationData {
  reportId: string;
  status: ReportStatus;
  reportTitle?: string;
  message?: string;
}

// Notification templates for different report statuses
const NOTIFICATION_TEMPLATES = {
  Pending: {
    title: 'Report Received',
    body: 'Your report has been received and is under review',
    androidChannel: 'report-updates',
    priority: 'high',
  },
  InProgress: {
    title: 'Report Update',
    body: 'Your report is being actively investigated',
    androidChannel: 'report-updates',
    priority: 'high',
  },
  Resolved: {
    title: 'Report Resolved',
    body: 'Your report has been resolved. View the details',
    androidChannel: 'report-updates',
    priority: 'high',
  },
};

// Handle incoming push notification for report status update
export function handleReportStatusNotification(data: ReportNotificationData) {
  const { status, reportId, reportTitle, message } = data;

  const template = NOTIFICATION_TEMPLATES[status];
  if (!template) {
    console.warn('Unknown report status:', status);
    return;
  }

  // Customize notification based on status
  let title = template.title;
  let body = template.body;

  // Override with custom message if provided
  if (message) {
    body = message;
  }

  // Add report title to notification if available
  if (reportTitle) {
    body = `${reportTitle}: ${body}`;
  }

  // Send grouped notification
  sendGroupedNotification(
    title,
    body,
    {
      type: 'report_status_update',
      reportId,
      status,
      timestamp: new Date().toISOString(),
    },
    'report-updates',
  );

  // Send summary notification if there are multiple notifications
  sendSummaryNotification('report-updates');
}

// Handle notification press - navigate to appropriate screen
export function handleReportNotificationPress(data: any) {
  const { type, reportId, status } = data;

  if (type === 'report_status_update' && reportId) {
    // Navigate to report details screen
    // This will be handled by the navigation system
    console.log('Navigate to report details:', { reportId, status });

    // Import router dynamically to avoid circular dependencies
    import('expo-router')
      .then(({ router }) => {
        router.push(`/report/${reportId}`);
      })
      .catch((error) => {
        console.error('Error navigating to report:', error);
      });
  }
}

// Create notification content for report status update
export function createReportNotificationContent(data: ReportNotificationData) {
  const { status, reportId, reportTitle, message } = data;

  const template = NOTIFICATION_TEMPLATES[status];
  if (!template) {
    return null;
  }

  let title = template.title;
  let body = template.body;

  if (message) {
    body = message;
  }

  if (reportTitle) {
    body = `${reportTitle}: ${body}`;
  }

  return {
    title,
    body,
    data: {
      type: 'report_status_update',
      reportId,
      status,
      timestamp: new Date().toISOString(),
    },
    sound: 'default',
    categoryId: 'REPORT_STATUS_UPDATE', // For iOS notification categories
  };
}

// Schedule local notification for testing
export async function scheduleTestReportNotification(
  reportId: string,
  status: ReportStatus,
) {
  const notificationData: ReportNotificationData = {
    reportId,
    status,
    reportTitle: `Test Report #${reportId}`,
  };

  const content = createReportNotificationContent(notificationData);
  if (!content) return;

  try {
    const { scheduleNotificationAsync } = await import('expo-notifications');

    // Use grouped notification instead
    const { sendGroupedNotification } = await import('./NotificationService');

    await sendGroupedNotification(
      content.title,
      content.body,
      content.data,
      'report-updates',
    );

    // Send summary notification if there are multiple notifications
    await sendSummaryNotification('report-updates');

    console.log('Test notification scheduled for report:', reportId, status);
  } catch (error) {
    console.error('Error scheduling test notification:', error);
  }
}

// Get notification summary for display in notification center
export function getNotificationSummary(data: ReportNotificationData) {
  const { status, reportTitle } = data;

  const template = NOTIFICATION_TEMPLATES[status];
  if (!template) return null;

  return {
    id: `report-${data.reportId}-${status}`,
    title: template.title,
    body: reportTitle ? `${reportTitle}: ${template.body}` : template.body,
    timestamp: new Date().toISOString(),
    read: false,
    type: 'report_status_update',
    data,
  };
}

// Check if notification should be shown based on user preferences
export function shouldShowNotification(
  data: ReportNotificationData,
  userPreferences: any,
) {
  // Default to showing all notifications
  // This can be extended based on user preferences
  if (!userPreferences) return true;

  const { notificationsEnabled, reportUpdatesEnabled } = userPreferences;

  if (!notificationsEnabled) return false;
  if (!reportUpdatesEnabled) return false;

  return true;
}

// Format notification time for display
export function formatNotificationTime(timestamp: string) {
  const date = new Date(timestamp);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;

  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h ago`;

  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 7) return `${diffDays}d ago`;

  return date.toLocaleDateString();
}
