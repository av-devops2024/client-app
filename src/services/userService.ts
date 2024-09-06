import { UpdateUserRequest } from "../requests/user/UpdateUserRequest";
import { UpdatePasswordRequest } from "../requests/user/UpdatePasswordRequest";
import { NotificationRequest } from "../requests/user/NotificationRequest";

export const updateUser = async (request: UpdateUserRequest) => {
    const token = sessionStorage.getItem('token');
    const response = await fetch('http://localhost:8080/users/edit-profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token,
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
    const token = sessionStorage.getItem('token');
    const response = await fetch('http://localhost:8080/users/edit-password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token,
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

export const deleteAccount = async () => {
    const token = sessionStorage.getItem('token');
    const response = await fetch('http://localhost:8080/users/delete-account', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token,
        }
      });
    if(response.ok) {
      return "";
    } else {
        
        const errorMessage = await response.text();
        return errorMessage;
    }
}

export const saveNotifications = async (request: NotificationRequest) => {
  const token = sessionStorage.getItem('token');
  const response = await fetch('http://localhost:8080/users/notifications', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
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

export const getNotifications = async () => {
  const token = sessionStorage.getItem('token');
  const response = await fetch('http://localhost:8080/users/notifications', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      }
  });
  if(response.ok) {
    return await response.json();
  } else {
      const errorMessage = await response.text();
      return errorMessage;
  }
}