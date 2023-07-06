// Function to handle the rotor select based on input to rearrange
function rearrangeArray(initialArray, orderArray) {
    if (orderArray.length !== new Set(orderArray).size) {
        throw new Error("Rotor configuration must contain unique positions!");
    }
    
    const rearrangedArray = Array(initialArray.length);
  
    for (let i = 0; i < orderArray.length; i++) {
        const index = orderArray[i] - 1;
        
        if (index > initialArray.length || index < 0) {
            throw new Error("Index out of bounds.");
        }
        
        rearrangedArray[index] = initialArray[i];
    }
    
    return rearrangedArray;
}

export default rearrangeArray;