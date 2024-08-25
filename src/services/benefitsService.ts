export const getBenefits = async () => {
    const response = await fetch('http://localhost:8081/benefits', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    if(response.ok) {
      return await response.json();
    } else {
      const errorMessage = await response.text();
      return errorMessage;
    }
};