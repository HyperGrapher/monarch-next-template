import * as migration_20261125_111345_initial from './20261125_111345_initial';

export const migrations = [
  {
    up: migration_20261125_111345_initial.up,
    down: migration_20261125_111345_initial.down,
    name: '20261125_111345_initial'
  },
];
