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
  pgm.createTable("job_posts", {
    id: {
      type: "uuid",
      primaryKey: true,
      default: pgm.func("gen_random_uuid()"),
      notNull: true,
    },
    company_id: {
      type: "uuid",
      notNull: true,
      references: "companies", // Chave Estrangeira: A empresa que postou a vaga
      onDelete: "CASCADE",
    },
    title: {
      type: "varchar(255)",
      notNull: true,
    },
    description: {
      type: "text",
      notNull: true,
    },
    function: {
      type: "varchar(100)", // Ex: Garçom, Programador, Fotógrafo
      notNull: true,
    },
    date: {
      type: "date", // Data da execução do serviço
      notNull: true,
    },
    start_time: {
      type: "time",
      notNull: true,
    },
    end_time: {
      type: "time",
      notNull: true,
    },
    value: {
      type: "decimal", // Valor total do serviço. DECIMAL é preferível para moedas.
      notNull: true,
    },
    status: {
      type: "varchar(20)",
      notNull: true,
      default: "OPEN",
    },
    latitude: {
      type: "decimal", // Geolocalização do local de trabalho
      notNull: true,
    },
    longitude: {
      type: "decimal", // Geolocalização do local de trabalho
      notNull: true,
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

  // Adiciona um índice na coluna company_id para consultas rápidas de vagas por empresa.
  pgm.createIndex("job_posts", "company_id");

  // Adiciona um índice nas colunas de geolocalização.
  // Futuramente, você pode usar a extensão PostGIS para índices espaciais mais complexos.
  pgm.createIndex("job_posts", ["latitude", "longitude"]);

  // Garante que o status da vaga é um dos valores permitidos.
  pgm.addConstraint("job_posts", "job_posts_status_check", {
    check: "status IN ('OPEN', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED')",
  });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
  pgm.dropTable("job_posts");
};
