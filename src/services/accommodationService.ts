import axios from "axios";

export const createAccommodation = async (request: FormData) => {
    const token = sessionStorage.getItem('token');
    try {
        const response = await axios.post('http://localhost:8081/accommodation', request, {
            headers: {
                'Authorization': 'Bearer ' + token,
            }
        });
        
        return ""; 
    } catch (error) {
        return "An error occured";
    }
};

export const getAccommodations = async () => {
    const token = sessionStorage.getItem('token');
    console.log(token)
    const response = await fetch('http://localhost:8081/accommodation', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      }
    });
    console.log(response);
    if(response.ok) {
        console.log('laa');
      return await response.json();
    } else {
        console.log('laa');
      const errorMessage = await response.text();
      return errorMessage;
    }
};

export const getReservations = async (accommodationId: number) => {
    const token = sessionStorage.getItem('token');
    const response = await fetch(`http://localhost:8081/reservation/futureReservations/${accommodationId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      }
    });
    if(response.ok) {
      return await response.json();
    } else {
        console.log('laa');
      const errorMessage = await response.text();
      return errorMessage;
    }
};