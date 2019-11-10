import Sequelize, { Model } from 'sequelize';

class File extends Model {
  static init(sequelize) {
    super.init(
      {
        // Table columns (Avoid primary keys, foreing keys or even created_at and updated_at)
        name: Sequelize.STRING,
        path: Sequelize.STRING,
      },
      {
        // Sequelize connection
        sequelize,
      }
    );

    return this;
  }
}

export default File;
