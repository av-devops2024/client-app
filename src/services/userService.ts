import { UpdateUserRequest } from "../requests/user/UpdateUserRequest";
import { UpdatePasswordRequest } from "../requests/user/UpdatePasswordRequest";

export const updateUser = async (request: UpdateUserRequest) => {
    const response = await fetch('http://localhost:8080/users/edit-profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });
    if(response.ok) {
      return "";
    } else {
        const errorMessage = await response.text();
        return errorMessage;
    }
}

export const updatePassword = async (request: UpdatePasswordRequest) => {
    const response = await fetch('http://localhost:8080/users/edit-password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });
    if(response.ok) {
      return "";
    } else {
        const errorMessage = await response.text();
        return errorMessage;
    }
}