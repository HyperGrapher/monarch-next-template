import * as migration_20260918_151419_initial from './20260918_151419_initial';
import * as migration_20261122_205320_content_model from './20261122_205320_content_model';

export const migrations = [
  {
    up: migration_20260918_151419_initial.up,
    down: migration_20260918_151419_initial.down,
    name: '20260918_151419_initial',
  },
  {
    up: migration_20261122_205320_content_model.up,
    down: migration_20261122_205320_content_model.down,
    name: '20261122_205320_content_model'
  },
];
