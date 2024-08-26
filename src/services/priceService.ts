import { Price } from "../model/price";

export const addPrice = async (accommodationId: number, priceRequest: Price) => {
    const token = sessionStorage.getItem('token');
    const response = await fetch(`http://localhost:8081/price/add/${accommodationId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      },
      body: JSON.stringify(priceRequest)
    });
    if(response.ok) {
      return await response.json();
    } else {
      const errorMessage = await response.text();
      throw errorMessage;
    }
}

export const getPrices = async (accommodationId: number) => {
    const token = sessionStorage.getItem('token');
    const response = await fetch(`http://localhost:8081/price/${accommodationId}`, {
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