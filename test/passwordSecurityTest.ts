/**
 * End-to-end test for secure login functionality
 * This test verifies that passwords are properly hashed before transmission
 */

import { PasswordSecurity } from '../src/utils/passwordSecurity';

// Test the password security utility
const testPasswordSecurity = () => {
    console.log('🧪 Testing Password Security Implementation...');
    console.log('');
    
    const testCases = [
        {
            email: 'admin@skyinspections.com',
            password: 'AdminPassword123!',
            description: 'Admin user test'
        },
        {
            email: 'customer@example.com', 
            password: 'CustomerPass456!',
            description: 'Customer user test'
        },
        {
            email: 'staff@skyinspections.com',
            password: 'StaffPassword789!',
            description: 'Staff user test'
        }
    ];

    testCases.forEach((testCase, index) => {
        console.log(`Test ${index + 1}: ${testCase.description}`);
        console.log(`Email: ${testCase.email}`);
        console.log(`Password: ${'*'.repeat(testCase.password.length)} (${testCase.password.length} chars)`);
        
        const securePayload = PasswordSecurity.createSecureLoginPayload(testCase.email, testCase.password);
        
        console.log(`Hashed Password: ${securePayload.passwordHash.substring(0, 20)}...`);
        console.log(`Nonce: ${securePayload.nonce.substring(0, 10)}...`);
        console.log(`Timestamp: ${securePayload.timestamp}`);
        console.log(`Timestamp Date: ${new Date(securePayload.timestamp).toISOString()}`);
        
        // Test consistency
        const secondHash = PasswordSecurity.hashPasswordForTransmission(testCase.password, testCase.email);
        const isConsistent = securePayload.passwordHash === secondHash;
        console.log(`Hash Consistency: ${isConsistent ? '✅ PASS' : '❌ FAIL'}`);
        
        console.log('');
    });
    
    // Test password strength validation
    console.log('🔒 Testing Password Strength Validation...');
    const weakPasswords = ['123', 'password', 'abc'];
    const strongPasswords = ['SecurePass123!', 'MyVeryStr0ng@Password', 'C0mpl3x!P@ssw0rd'];
    
    console.log('Weak passwords:');
    weakPasswords.forEach(pwd => {
        const validation = PasswordSecurity.validatePasswordStrength(pwd);
        console.log(`"${pwd}": ${validation.isValid ? '✅ PASS' : '❌ FAIL'} (Score: ${validation.score})`);
    });
    
    console.log('Strong passwords:');
    strongPasswords.forEach(pwd => {
        const validation = PasswordSecurity.validatePasswordStrength(pwd);
        console.log(`"${pwd}": ${validation.isValid ? '✅ PASS' : '❌ FAIL'} (Score: ${validation.score})`);
    });
    
    console.log('');
    console.log('✅ Password Security Test Complete!');
    console.log('');
    console.log('🚀 Next Steps:');
    console.log('1. Try logging in with any user account');
    console.log('2. Check the Network tab in DevTools');
    console.log('3. Verify that passwords are no longer visible in plain text');
    console.log('4. Look for the /api/auth/secure-login endpoint being called');
    console.log('5. Confirm passwordHash field contains encrypted data');
};

// Export for use in browser console
if (typeof window !== 'undefined') {
    (window as any).testPasswordSecurity = testPasswordSecurity;
}

export { testPasswordSecurity };
