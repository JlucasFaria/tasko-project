/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
export const shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const up = (pgm) => {
  pgm.createTable("freelancers", {
    id: {
      type: "uuid",
      primaryKey: true,
      default: pgm.func("gen_random_uuid()"),
      notNull: true,
    },
    user_id: {
      type: "uuid",
      notNull: true,
      unique: true,
      references: "users",
      onDelete: "CASCADE",
    },
    name: {
      type: "varchar(255)",
      notNull: true,
    },
    cpf: {
      type: "varchar(14)", // 999.999.999-99
      notNull: true,
      unique: true,
    },
    phone: {
      type: "varchar(20)",
      notNull: true,
    },
    address: {
      type: "varchar(255)",
      notNull: true,
    },
    city: {
      type: "varchar(100)",
      notNull: true,
    },
    state: {
      type: "varchar(2)",
      notNull: true,
    },
    zip_code: {
      type: "varchar(10)",
      notNull: true,
    },
    latitude: {
      type: "decimal",
      notNull: true,
    },
    longitude: {
      type: "decimal",
      notNull: true,
    },
    specialties: {
      type: "text[]",
      notNull: true,
      default: "{}",
    },
    rating_avg: {
      type: "decimal",
      notNull: true,
      default: 0.0,
    },
    created_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
    updated_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
  });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
  pgm.dropTable("freelancers");
};
