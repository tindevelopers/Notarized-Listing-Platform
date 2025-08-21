// Test script to simulate sign-up flow
async function testSignUpFlow() {
  console.log('Testing sign-up flow from browser...');
  
  // Find and click the Sign Up button
  const signUpButton = document.querySelector('button:contains("Sign Up")') || 
                       Array.from(document.querySelectorAll('button')).find(btn => btn.textContent.includes('Sign Up'));
  
  if (signUpButton) {
    console.log('Found Sign Up button, clicking...');
    signUpButton.click();
    
    // Wait for modal to appear
    setTimeout(() => {
      console.log('Looking for sign-up form...');
      const emailInput = document.querySelector('input[type="email"]');
      const passwordInputs = document.querySelectorAll('input[type="password"]');
      
      if (emailInput && passwordInputs.length >= 2) {
        console.log('Found sign-up form, filling out...');
        emailInput.value = 'test@example.com';
        passwordInputs[0].value = 'password123';
        passwordInputs[1].value = 'password123';
        
        // Find name input if exists
        const nameInput = document.querySelector('input[placeholder*="name"]') || 
                         document.querySelector('input[id*="name"]');
        if (nameInput) {
          nameInput.value = 'Test User';
        }
        
        // Find and click submit button
        setTimeout(() => {
          const submitButton = Array.from(document.querySelectorAll('button')).find(btn => 
            btn.textContent.includes('Sign Up') && btn.type === 'submit'
          );
          
          if (submitButton) {
            console.log('Submitting sign-up form...');
            submitButton.click();
          } else {
            console.log('Could not find submit button');
          }
        }, 1000);
      } else {
        console.log('Could not find sign-up form inputs');
      }
    }, 2000);
  } else {
    console.log('Could not find Sign Up button');
  }
}

// Run the test
testSignUpFlow();
