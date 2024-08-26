import { AvailabilitySlot } from "../model/availability-slot";

export const addAvailabilitySlot = async (request: AvailabilitySlot) => {
    console.log(request);
    const token = sessionStorage.getItem('token');
    const response = await fetch(`http://localhost:8081/availabilitySlot`, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(request)
    });
        
    if(response.ok) {
        return await response.json();
    } else {
        const errorMessage = await response.text();
        throw errorMessage;
    }
};

export const getAvailabilitySlots = async (accommodationId: number) => {
    const token = sessionStorage.getItem('token');
    const response = await fetch(`http://localhost:8081/availabilitySlot/active/${accommodationId}`, {
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

export const removeAvailabilitySlot = async (accommodationId: number, slotId: number) => {
    const token = sessionStorage.getItem('token');
    const response = await fetch(`http://localhost:8081/availabilitySlot/${accommodationId}/${slotId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + token,
        }
    });
        
    if(response.ok) {
        return await response.json();
    } else {
        const errorMessage = await response.text();
        throw errorMessage;
    }
};



