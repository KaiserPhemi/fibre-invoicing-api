/**
 * Adds property to array of object
 * @param arr 
 * @param commonItem 
 * @returns 
 */
const formatArray = (arr, commonItem) => {
  return arr.map(obj => ({ item_name: obj.itemName, item_price: obj.itemPrice, invoice_id: commonItem }));
}

export default formatArray;
