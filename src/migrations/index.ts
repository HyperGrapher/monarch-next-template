import * as migration_20261123_210116_initial from './20261123_210116_initial';
import * as migration_20261123_223908_blob_object_key from './20261123_223908_blob_object_key';
import * as migration_20261124_202626_live_preview_autosave from './20261124_202626_live_preview_autosave';

export const migrations = [
  {
    up: migration_20261123_210116_initial.up,
    down: migration_20261123_210116_initial.down,
    name: '20261123_210116_initial',
  },
  {
    up: migration_20261123_223908_blob_object_key.up,
    down: migration_20261123_223908_blob_object_key.down,
    name: '20261123_223908_blob_object_key',
  },
  {
    up: migration_20261124_202626_live_preview_autosave.up,
    down: migration_20261124_202626_live_preview_autosave.down,
    name: '20261124_202626_live_preview_autosave'
  },
];
