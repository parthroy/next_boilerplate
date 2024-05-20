import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('voicebot', 'remoteuser', 'XEg52YVerPX1otzE', {
    host: '122.176.155.244',
    port: 4406,
    dialect: 'mysql',
});

export default sequelize;