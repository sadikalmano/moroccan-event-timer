
// This file contains type definitions for the custom request extensions

import { IncomingMessage } from 'http';

declare module 'http' {
  interface IncomingMessage {
    body?: any;
    user?: {
      userId: string;
      role: string;
    };
  }
}

export {};
