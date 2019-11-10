import Sequelize, { Model } from 'sequelize';

class Appointment extends Model {
  static init(sequelize) {
    super.init(
      {
        // Table columns (Avoid primary keys, foreing keys or even created_at and updated_at)
        date: Sequelize.DATE,
        canceled_at: Sequelize.STRING,
      },
      {
        // Sequelize connection
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    this.belongsTo(models.User, { foreignKey: 'provider_id', as: 'provider' });
  }
}

export default Appointment;
