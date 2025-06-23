import CryptoJS from 'crypto-js';

/**
 * Secure password hashing utility for client-side encryption before transmission
 * Uses PBKDF2 with salt for secure password hashing
 */
export class PasswordSecurity {
  private static readonly SALT_PREFIX = 'sky_auth_2025_';
  private static readonly ITERATIONS = 10000; // PBKDF2 iterations
  private static readonly KEY_SIZE = 256 / 32; // 256 bits

  /**
   * Hash password with email-based salt before sending to server
   * @param password Plain text password
   * @param email User email (used as part of salt)
   * @returns Hashed password for transmission
   */
  static hashPasswordForTransmission(password: string, email: string): string {
    try {
      // Create a salt based on email and static prefix
      const salt = CryptoJS.SHA256(this.SALT_PREFIX + email.toLowerCase()).toString();
      
      // Use PBKDF2 to hash the password
      const hash = CryptoJS.PBKDF2(password, salt, {
        keySize: this.KEY_SIZE,
        iterations: this.ITERATIONS,
        hasher: CryptoJS.algo.SHA256
      });
      
      return hash.toString(CryptoJS.enc.Base64);
    } catch (error) {
      console.error('[PasswordSecurity] Error hashing password:', error);
      throw new Error('Failed to process password securely');
    }
  }

  /**
   * Generate a secure random nonce for additional security
   * @returns Base64 encoded random nonce
   */
  static generateNonce(): string {
    const nonce = CryptoJS.lib.WordArray.random(16); // 128 bits
    return nonce.toString(CryptoJS.enc.Base64);
  }

  /**
   * Create a secure login payload with hashed password and nonce
   * @param email User email
   * @param password Plain text password
   * @returns Secure login payload
   */
  static createSecureLoginPayload(email: string, password: string): {
    email: string;
    passwordHash: string;
    nonce: string;
    timestamp: number;
  } {
    const hashedPassword = this.hashPasswordForTransmission(password, email);
    const nonce = this.generateNonce();
    const timestamp = Date.now();

    return {
      email: email.toLowerCase(),
      passwordHash: hashedPassword,
      nonce: nonce,
      timestamp: timestamp
    };
  }

  /**
   * Validate password strength
   * @param password Plain text password
   * @returns Object with validation result and requirements
   */
  static validatePasswordStrength(password: string): {
    isValid: boolean;
    score: number;
    requirements: {
      minLength: boolean;
      hasUppercase: boolean;
      hasLowercase: boolean;
      hasNumbers: boolean;
      hasSpecialChars: boolean;
    };
    feedback: string[];
  } {
    const requirements = {
      minLength: password.length >= 8,
      hasUppercase: /[A-Z]/.test(password),
      hasLowercase: /[a-z]/.test(password),
      hasNumbers: /\d/.test(password),
      hasSpecialChars: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>?]/.test(password)
    };

    const score = Object.values(requirements).filter(Boolean).length;
    const isValid = score >= 4 && requirements.minLength;

    const feedback: string[] = [];
    if (!requirements.minLength) feedback.push('Password must be at least 8 characters long');
    if (!requirements.hasUppercase) feedback.push('Include at least one uppercase letter');
    if (!requirements.hasLowercase) feedback.push('Include at least one lowercase letter');
    if (!requirements.hasNumbers) feedback.push('Include at least one number');
    if (!requirements.hasSpecialChars) feedback.push('Include at least one special character');

    return {
      isValid,
      score,
      requirements,
      feedback
    };
  }
}

export default PasswordSecurity;
