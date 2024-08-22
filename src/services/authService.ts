import { RegistrationRequest } from "../requests/auth/RegistrationRequest";
import { VerifyRequest } from "../requests/auth/VerifyRequest";

// authService.ts
export const signUp = async (request: RegistrationRequest) => {
    const response = await fetch('http://localhost:8080/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request)
    });
    if(response.ok) {
      return "";
    } else {
      const errorMessage = await response.text();
      return errorMessage;
    }
};

export const verify = async (request: VerifyRequest) => {
  const response = await fetch('http://localhost:8080/users/verify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });
  if(response.ok) {
    return true;
  } else {
    return false;
  }
  
}
  