module.exports = (sequelize, Sequelize) => {
    const Tutorial = sequelize.define("movies", {
        name: {
            type: Sequelize.STRING
        },
        duration: {
            type: Sequelize.STRING
        },
        rating: {
            type: Sequelize.STRING
        }
    });

    return Tutorial;
};