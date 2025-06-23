/**
 * Test the secure login endpoint directly
 * This can be used to verify the backend is working correctly
 */

// Test data
const testEmail = "admin@example.com";
const testPassword = "TestPassword123!";

console.log("🧪 Testing Secure Login Implementation");
console.log(`Frontend URL: http://localhost:3001`);
console.log(`Backend URL: http://localhost:5207`);
console.log("");

// Step 1: Test if we can reach the backend
fetch('http://localhost:5207/api/status')
  .then(response => {
    if (response.ok) {
      console.log("✅ Backend is reachable");
      return response.json();
    } else {
      console.log("❌ Backend status check failed:", response.status);
    }
  })
  .then(data => {
    if (data) {
      console.log("Backend status:", data);
    }
  })
  .catch(error => {
    console.log("❌ Cannot reach backend:", error.message);
  });

// Step 2: Test CORS preflight
fetch('http://localhost:5207/api/auth/secure-login', {
  method: 'OPTIONS',
  headers: {
    'Origin': 'http://localhost:3001',
    'Access-Control-Request-Method': 'POST',
    'Access-Control-Request-Headers': 'Content-Type,Authorization'
  }
})
.then(response => {
  console.log("✅ CORS Preflight Response Status:", response.status);
  console.log("CORS Headers:", {
    'Access-Control-Allow-Origin': response.headers.get('Access-Control-Allow-Origin'),
    'Access-Control-Allow-Methods': response.headers.get('Access-Control-Allow-Methods'),
    'Access-Control-Allow-Headers': response.headers.get('Access-Control-Allow-Headers'),
    'Access-Control-Allow-Credentials': response.headers.get('Access-Control-Allow-Credentials')
  });
})
.catch(error => {
  console.log("❌ CORS Preflight failed:", error.message);
});

console.log("");
console.log("🔍 Next steps:");
console.log("1. Check browser console for CORS results");
console.log("2. Try logging in through the UI");
console.log("3. Check Network tab to see if requests go to localhost:5207");
console.log("4. Verify passwordHash field instead of password field");
