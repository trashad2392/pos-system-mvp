exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('products', {
    id: {
      type: 'serial', // This will be an auto-incrementing number
      primaryKey: true,
    },
    name: {
      type: 'varchar(255)',
      notNull: true,
    },
    sku: {
      type: 'varchar(100)',
      notNull: true,
      unique: true, // No two products can have the same SKU
    },
    price: {
      type: 'decimal(10, 2)', // Can store prices like 12345678.99
      notNull: true,
    },
    stock_quantity: {
      type: 'integer',
      notNull: true,
      default: 0,
    },
    created_at: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'), // Automatically sets the creation time
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('products');
};