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
  pgm.createTable("applications", {
    id: {
      type: "uuid",
      primaryKey: true,
      default: pgm.func("gen_random_uuid()"),
      notNull: true,
    },
    job_post_id: {
      type: "uuid",
      notNull: true,
      references: "job_posts", // Vaga para a qual o freelancer se candidata
      onDelete: "CASCADE",
    },
    freelancer_id: {
      type: "uuid",
      notNull: true,
      references: "freelancers", // Freelancer que fez a candidatura
      onDelete: "CASCADE",
    },
    status: {
      type: "varchar(20)",
      notNull: true,
      default: "PENDING", // PENDING, ACCEPTED, REJECTED
    },
    applied_at: {
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

  // Garante que um freelancer só pode se candidatar uma vez a uma vaga.
  pgm.addConstraint("applications", "unique_job_freelancer", {
    unique: ["job_post_id", "freelancer_id"],
  });

  // Garante que o status da aplicação é um dos valores permitidos.
  pgm.addConstraint("applications", "applications_status_check", {
    check: "status IN ('PENDING', 'ACCEPTED', 'REJECTED')",
  });

  // Índices para buscas rápidas.
  pgm.createIndex("applications", "job_post_id");
  pgm.createIndex("applications", "freelancer_id");
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
  pgm.dropTable("applications");
};
