import { getBaseUrl } from '@/api/axios';
import { useCallback, useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { useUser } from '../../stores/useUserStore';

export type ChatMessage = {
  id?: string;
  conversationId?: string;
  senderType: 'student' | 'guidance' | 'admin' | string;
  senderId?: string;
  senderName?: string | null;
  content: string;
  metadata?: any;
  createdAt?: string | number;
};

type UseSocketReturn = {
  messages: ChatMessage[];
  connected: boolean;
  sendMessage: (content: string) => void;
  clearMessages: () => void;
};

/**
 * Lightweight socket hook for the Seek Help chat.
 *
 * Behavior:
 * - connects to namespace "/chat" and sends auth token in auth payload
 * - automatically joins the student's room on the server since the backend
 *   attaches user info from the token
 * - exposes messages and sendMessage(content)
 *
 * Notes:
 * - this hook keeps everything local to the single conversation for the mobile user
 * - it relies on `useUser()` from [`stores/useUserStore.ts`](../../stores/useUserStore.ts:1)
 */
export default function useSocket(): UseSocketReturn {
  const user = useUser();
  const socketRef = useRef<Socket | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    // Only connect when we have an authenticated user with a token
    if (!user?.token) return;

    // Keep a ref to the latest user so callbacks (like sendMessage) can access it
    // without causing unnecessary effect re-runs.
    const userRef = { current: user };
    // Create socket connection to /chat namespace
    const socket = io(`${getBaseUrl()}/chat`, {
      autoConnect: true,
      auth: { token: user.token },
      transports: ['websocket'],
      // enable reconnection behavior and sensible defaults
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    socketRef.current = socket;

    socket.on('connect', () => {
      console.log('[useSocket] connect', socket.id);
      setConnected(true);
    });

    socket.on('connect_error', (err: any) => {
      console.warn('[useSocket] connect_error', err);
    });

    socket.on('reconnect_attempt', (attempt: number) => {
      console.log('[useSocket] reconnect attempt', attempt);
    });

    socket.on('disconnect', (reason: any) => {
      console.warn('[useSocket] disconnected', reason);
      setConnected(false);
    });

    socket.on('message', (msg: ChatMessage) => {
      console.log('[useSocket] received message', msg);
      setMessages((prev) => {
        // Simple dedupe by id if provided
        if (msg.id && prev.some((m) => m.id === msg.id)) return prev;
        return [...prev, msg];
      });
    });

    // Server ack when our message is saved (optional)
    socket.on('sent', (ack: { id?: string; conversationId?: string }) => {
      console.log('[useSocket] sent ack', ack);
      // We could update local message with id if we stored a temporary one
      // For now we rely on the 'message' event from server to deliver the persisted message
    });

    socket.on('error', (err: any) => {
      console.warn('[useSocket] Socket error', err);
    });

    return () => {
      console.log('[useSocket] cleaning up socket');
      socket.disconnect();
      socketRef.current = null;
      setConnected(false);
    };
  }, [user?.token]);

  const sendMessage = useCallback(
    (content: string) => {
      if (!socketRef.current || !user) {
        console.warn('[useSocket] cannot send, no socket or user', {
          socket: !!socketRef.current,
          user: !!user,
        });
        return;
      }
      const payload = {
        studentId: user.id,
        content,
      };

      // Use acknowledgement callback to detect server acceptance / errors.
      try {
        socketRef.current.emit('message', payload, (ack: any) => {
          console.log('[useSocket] emit ack', ack);
          // If server returns an error in ack, log for debugging
          if (ack && ack.error) {
            console.warn('[useSocket] server ack error', ack.error);
          }
        });
      } catch (err) {
        console.warn('[useSocket] emit failed', err);
      }

      // Optimistic local echo (optional): push a temporary message so UI feels snappy
      // setMessages((prev) => [
      //   ...prev,
      //   {
      //     id: `tmp-${Date.now()}`,
      //     senderType: 'student',
      //     senderId: user.id,
      //     senderName: user.name,
      //     content,
      //     createdAt: Date.now(),
      //   },
      // ]);
    },
    [user],
  );

  const clearMessages = useCallback(() => setMessages([]), []);

  return {
    messages,
    connected,
    sendMessage,
    clearMessages,
  };
}
