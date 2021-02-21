import i18n from "i18next";

export const saleOptions = {
  sell: { label: 'Sell', value: 'sell' },
  buy: { label: 'Buy', value: 'buy' },
  all: { label: 'All', value: 'all' },
};

export const saleOptionsT = {
  sell: { label: 'Sell', value: 'sell' },
  buy: { label: 'Buy', value: 'buy' },
  all: { label: 'All', value: 'all' },
};

export function translateOptions(object, objectT) {
  for (var attr in object) {
    //if (object.hasOwnProperty(attr)) result[attr] = object[attr];
    for (var attr2 in object[attr]) {
      if (attr2 === 'label') {
        var label = object[attr].label;
        objectT[attr].label = i18n.t(label);
      }
    }
  }
}

export const MIN_PRICE = 0;
export const MAX_PRICE = 10000;
