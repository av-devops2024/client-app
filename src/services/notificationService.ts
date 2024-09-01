export const getNotifications = async () => {
    const token = sessionStorage.getItem('token');
    const response = await fetch('http://localhost:8082/notification', {
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
      console.log(errorMessage);
      return errorMessage;
    }
}