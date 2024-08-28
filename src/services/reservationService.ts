import { ReservationRequest } from "../requests/reservation/ReservationRequest";

export const addReservation = async (request: ReservationRequest) => {
    console.log(request);
    const token = sessionStorage.getItem('token');
    const response = await fetch(`http://localhost:8081/reservationRequest`, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(request)
    });
        
    if(response.ok) {
        return '';
    } else {
        const errorMessage = await response.text();
        throw errorMessage;
    }
};

export const getReservationRequests = async (showForAccommodation: boolean) => {
    const path = `http://localhost:8081/reservationRequest${showForAccommodation ? '/host': ''}`;
    const token = sessionStorage.getItem('token');
    const response = await fetch(path, {
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
      throw errorMessage;
    }
}

export const getReservations = async (showForAccommodation: boolean) => {
    const path = `http://localhost:8081/reservation${showForAccommodation ? '/host': ''}`;
    const token = sessionStorage.getItem('token');
    const response = await fetch(path, {
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
      throw errorMessage;
    }
}

export const acceptReservationRequest = async (id: number) => {
    const token = sessionStorage.getItem('token');
    const response = await fetch(`http://localhost:8081/reservationRequest/accept/${id}`, {
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
      throw errorMessage;
    }
}

export const declineReservationRequest = async (id: number) => {
    const token = sessionStorage.getItem('token');
    const response = await fetch(`http://localhost:8081/reservationRequest/delete/${id}`, {
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
      throw errorMessage;
    }
}

export const cancelResOrReq = async (id: number) => {
    const token = sessionStorage.getItem('token');
    const response = await fetch(`http://localhost:8081/reservation/cancel/${id}`, {
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
      throw errorMessage;
    }
}

