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
  pgm.createTable("reviews", {
    id: {
      type: "uuid",
      primaryKey: true,
      default: pgm.func("gen_random_uuid()"),
      notNull: true,
    },
    reviewer_id: {
      type: "uuid",
      notNull: true,
      references: "users", // O usuário que fez a avaliação (pode ser company ou freelancer)
      onDelete: "RESTRICT",
    },
    reviewed_id: {
      type: "uuid",
      notNull: true,
      references: "users", // O usuário que foi avaliado
      onDelete: "RESTRICT",
    },
    reviewer_type: {
      type: "varchar(50)",
      notNull: true,
    },
    rating: {
      type: "integer", // Nota de 1 a 5 (ou 1 a 10), INTEGER é suficiente.
      notNull: true,
    },
    comment: {
      type: "text",
    },
    job_id: {
      type: "uuid",
      notNull: true,
      references: "job_posts", // A vaga relacionada à avaliação
      onDelete: "RESTRICT",
    },
    created_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
  });

  // Garante que a nota esteja entre 1 e 5 (exemplo).
  pgm.addConstraint("reviews", "reviews_rating_check", {
    check: "rating BETWEEN 1 AND 5",
  });

  // Garante que o tipo de avaliador é válido.
  pgm.addConstraint("reviews", "reviews_reviewer_type_check", {
    check: "reviewer_type IN ('company', 'freelancer')",
  });

  // Garante que há apenas uma avaliação por job (a lógica de mútuo será feita no código).
  pgm.addConstraint("reviews", "unique_review_per_job_and_reviewer", {
    unique: ["job_id", "reviewer_id"],
  });

  // Índice para listar rapidamente as avaliações recebidas por um usuário.
  pgm.createIndex("reviews", "reviewed_id");
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
  pgm.dropTable("reviews");
};
