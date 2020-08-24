const data = {
    username: 'iskra19',
    password: 'bubamarica3',
    email: 'iskra@gmail.com',
};

const getMockFactory = (validData) => {
    return  (invalidData={}) => {
        return {...validData, ...invalidData }
    };
};

module.exports = getMockFactory(data);