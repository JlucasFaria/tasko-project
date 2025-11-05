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
  pgm.createTable("transactions", {
    id: {
      type: "uuid",
      primaryKey: true,
      default: pgm.func("gen_random_uuid()"),
      notNull: true,
    },
    job_post_id: {
      type: "uuid",
      notNull: true,
      unique: true, // Uma transação por vaga
      references: "job_posts",
      onDelete: "RESTRICT",
    },
    company_id: {
      type: "uuid",
      notNull: true,
      references: "companies", // Empresa que pagou
      onDelete: "RESTRICT",
    },
    freelancer_id: {
      type: "uuid",
      notNull: true,
      references: "freelancers", // Freelancer que irá receber
      onDelete: "RESTRICT",
    },
    amount: {
      type: "decimal", // Valor total pago pela empresa (incluindo taxa)
      notNull: true,
    },
    platform_fee: {
      type: "decimal", // Valor da taxa da plataforma
      notNull: true,
    },
    status: {
      type: "varchar(30)",
      notNull: true,
      default: "PENDING_DEPOSIT",
    },
    created_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
    completed_at: {
      type: "timestamp",
      // Esta coluna será preenchida quando o pagamento for liberado (status COMPLETED ou REFUNDED)
    },
  });

  // Garante que o status é um dos valores permitidos.
  pgm.addConstraint("transactions", "transactions_status_check", {
    check:
      "status IN ('PENDING_DEPOSIT', 'DEPOSITED', 'ESCROW', 'RELEASED', 'REFUNDED', 'FAILED')",
  });

  pgm.createIndex("transactions", "company_id");
  pgm.createIndex("transactions", "freelancer_id");
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
  pgm.dropTable("transactions");
};
