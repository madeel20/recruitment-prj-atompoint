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