import { RatingResponse } from "../reponses/RatingResponse";
import { RatingRequest } from "../requests/ratings/RatingRequest";

export const getRatings = async (accommodationId: number) => {
    const path = `http://localhost:8081/rating/accommodation/${accommodationId}`;
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

export const getResRatings = async (resType: string) => {
    const path = `http://localhost:8081/rating/${resType}`;
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

export const addRating = async (request: RatingRequest) => {
    const token = sessionStorage.getItem('token');
    const response = await fetch(`http://localhost:8081/rating`, {
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

export const updateRating = async (request: RatingRequest, id: number) => {
    const token = sessionStorage.getItem('token');
    const response = await fetch(`http://localhost:8081/rating`, {
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            ...request,
            id: id
        })
    });
        
    if(response.ok) {
        return '';
    } else {
        const errorMessage = await response.text();
        throw errorMessage;
    }
};

export const deleteRating = async (id: number) => {
    const token = sessionStorage.getItem('token');
    const response = await fetch(`http://localhost:8081/rating/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        }
    });
        
    if(response.ok) {
        return '';
    } else {
        const errorMessage = await response.text();
        throw errorMessage;
    }
};