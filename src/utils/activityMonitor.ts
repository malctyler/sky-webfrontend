export class ActivityMonitor {
  private timeout: NodeJS.Timeout | null = null;
  private readonly inactivityTime: number;
  private onInactivity: () => void;
  private eventListeners: Array<() => void> = [];

  constructor(inactivityTimeMinutes: number = 30, onInactivity: () => void) {
    this.inactivityTime = inactivityTimeMinutes * 60 * 1000; // Convert to milliseconds
    this.onInactivity = onInactivity;
    this.setupEventListeners();
  }

  private setupEventListeners(): void {
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
    
    const resetTimer = () => {
      this.resetTimer();
    };

    events.forEach(event => {
      document.addEventListener(event, resetTimer, true);
      this.eventListeners.push(() => document.removeEventListener(event, resetTimer, true));
    });

    // Start the timer initially
    this.resetTimer();
  }

  private resetTimer(): void {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }

    this.timeout = setTimeout(() => {
      console.log('[ActivityMonitor] User inactive for', this.inactivityTime / 60000, 'minutes');
      this.onInactivity();
    }, this.inactivityTime);
  }

  public updateInactivityCallback(callback: () => void): void {
    this.onInactivity = callback;
  }

  public destroy(): void {
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = null;
    }

    // Remove all event listeners
    this.eventListeners.forEach(removeListener => removeListener());
    this.eventListeners = [];
  }

  public extendSession(): void {
    this.resetTimer();
  }
}
