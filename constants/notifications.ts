// Report status enum (redefined here to avoid circular dependencies)
export type ReportStatus = 'Pending' | 'InProgress' | 'Resolved';

// Notification channels for Android
export const NOTIFICATION_CHANNELS = {
  REPORT_UPDATES: 'report-updates',
  GENERAL: 'general',
  URGENT: 'urgent',
};

// Notification categories for iOS
export const NOTIFICATION_CATEGORIES = {
  REPORT_STATUS_UPDATE: 'REPORT_STATUS_UPDATE',
  NEW_MESSAGE: 'NEW_MESSAGE',
  SYSTEM: 'SYSTEM',
};

// Notification types
export const NOTIFICATION_TYPES = {
  REPORT_STATUS_UPDATE: 'report_status_update',
  NEW_MESSAGE: 'new_message',
  SYSTEM: 'system',
  TEST: 'test',
};

// Notification templates
export const NOTIFICATION_TEMPLATES = {
  [NOTIFICATION_TYPES.REPORT_STATUS_UPDATE]: {
    Pending: {
      title: 'Report Received',
      body: 'Your report has been received and is under review',
      priority: 'high',
      channel: NOTIFICATION_CHANNELS.REPORT_UPDATES,
      category: NOTIFICATION_CATEGORIES.REPORT_STATUS_UPDATE,
    },
    InProgress: {
      title: 'Report Update',
      body: 'Your report is being actively investigated',
      priority: 'high',
      channel: NOTIFICATION_CHANNELS.REPORT_UPDATES,
      category: NOTIFICATION_CATEGORIES.REPORT_STATUS_UPDATE,
    },
    Resolved: {
      title: 'Report Resolved',
      body: 'Your report has been resolved. View the details',
      priority: 'high',
      channel: NOTIFICATION_CHANNELS.REPORT_UPDATES,
      category: NOTIFICATION_CATEGORIES.REPORT_STATUS_UPDATE,
    },
  },
  [NOTIFICATION_TYPES.NEW_MESSAGE]: {
    title: 'New Message',
    body: 'You have a new message from the guidance counselor',
    priority: 'normal',
    channel: NOTIFICATION_CHANNELS.GENERAL,
    category: NOTIFICATION_CATEGORIES.NEW_MESSAGE,
  },
  [NOTIFICATION_TYPES.SYSTEM]: {
    title: 'BullyProof Update',
    body: 'Important updates from BullyProof',
    priority: 'normal',
    channel: NOTIFICATION_CHANNELS.GENERAL,
    category: NOTIFICATION_CATEGORIES.SYSTEM,
  },
  [NOTIFICATION_TYPES.TEST]: {
    title: 'Test Notification',
    body: 'This is a test notification from BullyProof',
    priority: 'low',
    channel: NOTIFICATION_CHANNELS.GENERAL,
    category: NOTIFICATION_CATEGORIES.SYSTEM,
  },
};

// Default notification settings
export const DEFAULT_NOTIFICATION_SETTINGS = {
  enabled: true,
  reportUpdates: true,
  messages: true,
  system: true,
  sound: true,
  vibration: true,
  badge: true,
};

// Notification priorities
export const NOTIFICATION_PRIORITIES = {
  LOW: 'low',
  NORMAL: 'normal',
  HIGH: 'high',
  MAX: 'max',
} as const;

// Notification sound options
export const NOTIFICATION_SOUNDS = {
  DEFAULT: 'default',
  SILENT: 'silent',
  CUSTOM: 'custom',
} as const;

// Notification actions for iOS
export const NOTIFICATION_ACTIONS = {
  VIEW_REPORT: {
    identifier: 'VIEW_REPORT',
    title: 'View Report',
    options: {
      foreground: true,
    },
  },
  DISMISS: {
    identifier: 'DISMISS',
    title: 'Dismiss',
    options: {
      destructive: true,
    },
  },
  REPLY: {
    identifier: 'REPLY',
    title: 'Reply',
    options: {
      foreground: true,
      input: true,
      inputButtonTitle: 'Send',
      inputPlaceholder: 'Type your message...',
    },
  },
};

// Error messages
export const NOTIFICATION_ERRORS = {
  PERMISSION_DENIED: 'Notification permissions were denied',
  TOKEN_FAILED: 'Failed to get push token',
  NETWORK_ERROR: 'Network error while registering for notifications',
  INVALID_TOKEN: 'Invalid push token',
  DEVICE_NOT_SUPPORTED: 'Push notifications are not supported on this device',
  REGISTRATION_FAILED: 'Failed to register for push notifications',
};

// Success messages
export const NOTIFICATION_SUCCESS = {
  PERMISSIONS_GRANTED: 'Notification permissions granted',
  TOKEN_REGISTERED: 'Push token registered successfully',
  NOTIFICATION_SENT: 'Notification sent successfully',
  SETTINGS_UPDATED: 'Notification settings updated',
};

// Local storage keys
export const NOTIFICATION_STORAGE_KEYS = {
  PUSH_TOKEN: 'pushToken',
  NOTIFICATION_SETTINGS: 'notificationSettings',
  LAST_NOTIFICATION_ID: 'lastNotificationId',
  NOTIFICATION_HISTORY: 'notificationHistory',
};

// API endpoints (for future backend integration)
export const NOTIFICATION_API_ENDPOINTS = {
  REGISTER_TOKEN: '/notifications/register-token',
  UNREGISTER_TOKEN: '/notifications/unregister-token',
  UPDATE_SETTINGS: '/notifications/settings',
  GET_HISTORY: '/notifications/history',
  MARK_READ: '/notifications/mark-read',
};

// Notification limits
export const NOTIFICATION_LIMITS = {
  MAX_HISTORY_ITEMS: 50,
  MAX_RETRY_ATTEMPTS: 3,
  TOKEN_REFRESH_INTERVAL: 24 * 60 * 60 * 1000, // 24 hours
};

// Notification colors (for Android)
export const NOTIFICATION_COLORS = {
  PRIMARY: '#3B82F6',
  SUCCESS: '#10B981',
  WARNING: '#F59E0B',
  ERROR: '#EF4444',
  INFO: '#6B7280',
};

// Vibration patterns (for Android)
export const VIBRATION_PATTERNS = {
  SHORT: [0, 100],
  LONG: [0, 500],
  DOUBLE: [0, 100, 100, 100],
  TRIPLE: [0, 100, 100, 100, 100, 100],
  PULSE: [0, 100, 50, 100],
};
