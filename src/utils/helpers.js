import React ,{ useState, useEffect } from 'react';

export const MappedElement = ({ data, renderElement, count }) => {
    if (data && data.length) {
        return data.map((obj, index, array) => {
            if (count) {
                return (index <= count) ? renderElement(obj, index, array) : null
            } else {
                return renderElement(obj, index, array)
            }
        });
    }
    return null;
};

export const usePersistedState = (key, defaultValue) => {
    const [state, setState] = React.useState(
      () => JSON.parse(localStorage.getItem(key)) || defaultValue
    );
    useEffect(() => {
      localStorage.setItem(key, JSON.stringify(state));
    }, [key, state]);
    
    return [state, setState];
}


export function uniq(a) {
    return a.sort().filter(function(item, pos, ary) {
        return !pos || item != ary[pos - 1];
    });
}

export const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/