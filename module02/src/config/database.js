module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  port: 5433,
  username: 'postgres',
  password: 'docker',
  database: 'gobarber',
  define: {
    timestamps: true, // columns created_at and updated_at
    underscored: true, // tables and columns naming
    underscoredAll: true,
  },
};
