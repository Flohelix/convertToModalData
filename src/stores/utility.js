import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useUtilityStore = defineStore('utility', () => {
  let convertedData = [];
  let prevChildArray = [];

  const convertToModalData = (data) => {
    convertData(data, false);
    convertedData = addKeys(convertedData, null);

    return convertedData;
  };

  const convertData = (obj, IsChildren) => {

    const childArray = [];

    for (let [key, value] of Object.entries(obj)) {

      childArray.push({
        data: {
          name: key,
          value
        }
      });

      if (typeof value === 'object' && value !== null) {
        prevChildArray.push(childArray);
        convertData(value, true);
      }
    }

    if (IsChildren) {
      let lastChildArray = prevChildArray[prevChildArray.length - 1];
      lastChildArray[lastChildArray.length - 1] = {
        data: {
          name: lastChildArray[lastChildArray.length - 1].data.name,
          value: ''
        }, children: childArray
      };
      prevChildArray.pop();
    } else {
      convertedData.push(...childArray);
    }
  }

  const addKeys = (modalData, parentIndex) => {
    return modalData.map((obj, index) => {

      let idx = parentIndex === null ? `${index}` : `${parentIndex}-${index}`;
      if (obj.children) {
        return { key: idx, ...obj, children: addKeys(obj.children, idx) };
      }
      return { key: idx, ...obj };
    });
  };

  return { convertToModalData }
})
