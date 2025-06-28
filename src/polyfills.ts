// Polyfills for browser compatibility
import { Buffer } from 'buffer';

// Make Buffer available globally for @react-pdf/renderer
(globalThis as any).Buffer = Buffer;

export {};
