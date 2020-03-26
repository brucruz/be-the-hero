// UP: Criação da tabela
exports.up = function(knex) {
    return knex.schema.createTable('incidents', function (table) {
        // ID incremental
        table.increments('id');

        // Campos da Tabela
        table.string('title').notNullable();
        table.string('description').notNullable();
        table.decimal('value').notNullable();

        // Coluna para Relacionamento com Tabela ONG
        table.string('ong_id').notNullable();

        // Chave estrangeira
        table.foreign('ong_id').references('id').inTable('ongs');
    });
  };
  
  // Down: Se der problema e precisar voltar atrás (Destruição da tabela)
  exports.down = function(knex) {
    return knex.schema.dropTable('incidents');
  };
