import * as migration_20261123_210116_initial from './20261123_210116_initial';

export const migrations = [
  {
    up: migration_20261123_210116_initial.up,
    down: migration_20261123_210116_initial.down,
    name: '20261123_210116_initial'
  },
];
