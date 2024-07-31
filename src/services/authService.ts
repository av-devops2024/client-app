import { RegistrationRequest } from "../requests/auth/RegistrationRequest";
import { VerifyRequest } from "../requests/auth/VerifyRequest";

// authService.ts
export const signUp = async (request: RegistrationRequest) => {
    const response = await fetch('http://localhost:8080/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });
  
    if (!response.ok) {
      throw new Error('Sign-Up failed');
    }
  
    const userData = await response.json();
    return userData;
  
};

export const verify = async (request: VerifyRequest) => {
    const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });
    
      if (!response.ok) {
        throw new Error('Sign-Up failed');
      }
    
      const userData = await response.json();
      return userData;
}
  