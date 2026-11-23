import { resetDatabase } from '../helpers/db'

// Runs once before all integration tests: clean database + real migrations.
export default function setup() {
  resetDatabase()
}
