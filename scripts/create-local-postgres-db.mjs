#!/usr/bin/env node

import { spawnSync } from 'node:child_process'
import { isIP } from 'node:net'

function usage() {
  return `Create or delete a local PostgreSQL database.

Usage:
  node scripts/create-local-postgres-db.mjs --name <database> [options]

Options:
  --name <database>   Required database name
  --delete            Delete the named database instead of creating it
  --env <variable>    Output variable name (default: TEST_DATABASE_URL)
  --host <host>       PostgreSQL host (default: PGHOST or localhost)
  --port <port>       PostgreSQL port (default: PGPORT or 5432)
  --user <role>       PostgreSQL role (default: PGUSER or postgres)
  --help              Show this help

The host must be localhost or a loopback IP. If PGPASSWORD is not set, the script
asks for the password without displaying it. Deletion does not terminate active
connections. The system databases postgres, template0, and template1 cannot be deleted.
`
}

function parseArgs(argv) {
  const options = {
    name: null,
    delete: false,
    env: 'TEST_DATABASE_URL',
    host: process.env.PGHOST || 'localhost',
    port: process.env.PGPORT || '5432',
    user: process.env.PGUSER || 'postgres',
    help: false,
  }
  const valueOptions = new Set(['name', 'env', 'host', 'port', 'user'])

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i]
    if (arg === '--help' || arg === '-?') {
      options.help = true
      continue
    }
    if (arg === '--delete') {
      options.delete = true
      continue
    }

    const [rawKey, inlineValue] = arg.startsWith('--') ? arg.slice(2).split(/=(.*)/s, 2) : ['', undefined]
    if (!valueOptions.has(rawKey)) throw new Error(`Unknown option: ${arg}\n\n${usage()}`)
    const value = inlineValue ?? argv[++i]
    if (!value || value.startsWith('--')) throw new Error(`Missing value for --${rawKey}`)
    options[rawKey] = value
  }

  return options
}

function isLoopbackHost(input) {
  const host = input.replace(/^\[|\]$/g, '').toLowerCase()
  const ipVersion = isIP(host)
  return host === 'localhost' || (ipVersion === 4 && host.startsWith('127.')) || (ipVersion === 6 && host === '::1')
}

function readHidden(prompt) {
  if (!process.stdin.isTTY || typeof process.stdin.setRawMode !== 'function') {
    throw new Error('No PGPASSWORD is set and this is not an interactive terminal. Set PGPASSWORD locally, then run the script again.')
  }

  process.stdout.write(prompt)
  process.stdin.setEncoding('utf8')
  process.stdin.setRawMode(true)
  process.stdin.resume()

  return new Promise((resolve, reject) => {
    let value = ''
    const cleanup = () => {
      process.stdin.off('data', onData)
      process.stdin.setRawMode(false)
      process.stdin.pause()
      process.stdout.write('\n')
    }
    const onData = (chunk) => {
      for (const char of chunk) {
        if (char === '\u0003') {
          cleanup()
          reject(new Error('Canceled.'))
          return
        }
        if (char === '\r' || char === '\n') {
          cleanup()
          resolve(value)
          return
        }
        if (char === '\u0008' || char === '\u007f') value = value.slice(0, -1)
        else if (char >= ' ') value += char
      }
    }
    process.stdin.on('data', onData)
  })
}

function validate(options) {
  if (!options.name) throw new Error('--name is required. Supply the exact database name to create or delete.')
  if (!/^[a-z_][a-z0-9_]{0,62}$/i.test(options.name)) {
    throw new Error('Database names must be 1–63 characters and contain only letters, numbers, and underscores; the first character must be a letter or underscore.')
  }
  if (options.delete && ['postgres', 'template0', 'template1'].includes(options.name.toLowerCase())) {
    throw new Error(`Refusing to delete PostgreSQL system database "${options.name}".`)
  }
  if (!/^[A-Za-z_][A-Za-z0-9_]*$/.test(options.env)) {
    throw new Error(`Invalid environment variable name: ${options.env}`)
  }
  if (!isLoopbackHost(options.host)) {
    throw new Error('This helper only creates databases on localhost or a loopback IP address.')
  }
  const port = Number(options.port)
  if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error(`Invalid PostgreSQL port: ${options.port}`)
  if (!options.user.trim()) throw new Error('PostgreSQL username cannot be empty.')
  options.host = options.host.replace(/^\[|\]$/g, '')
  options.port = String(port)
}

async function main() {
  const options = parseArgs(process.argv.slice(2))
  if (options.help) {
    process.stdout.write(usage())
    return
  }
  validate(options)

  const password = Object.hasOwn(process.env, 'PGPASSWORD') ? process.env.PGPASSWORD : await readHidden('PostgreSQL password (input hidden; press Enter if local auth needs no password): ')
  const env = {
    ...process.env,
    PGHOST: options.host,
    PGPORT: options.port,
    PGUSER: options.user,
    PGPASSWORD: password,
  }
  const command = options.delete
    ? (process.platform === 'win32' ? 'dropdb.exe' : 'dropdb')
    : (process.platform === 'win32' ? 'createdb.exe' : 'createdb')
  const args = options.delete
    ? ['--maintenance-db', 'postgres', '--no-password', options.name]
    : ['--maintenance-db', 'postgres', '--template', 'template0', '--no-password', options.name]
  const result = spawnSync(
    command,
    args,
    { env, stdio: 'inherit' },
  )

  if (result.error) {
    if (result.error.code === 'ENOENT') throw new Error(`Could not find ${command}. Install the PostgreSQL command-line tools or add their bin directory to PATH.`)
    throw result.error
  }
  if (result.status !== 0) {
    const message = options.delete
      ? 'Database deletion failed. It may not exist or may have active connections; no connections are force-terminated.'
      : 'Database creation failed. Existing databases are left untouched.'
    throw new Error(message)
  }

  if (options.delete) {
    process.stdout.write(`Deleted database "${options.name}" on ${options.host}:${options.port}.\n`)
    return
  }

  const url = new URL('postgresql://localhost/postgres')
  url.hostname = options.host
  url.port = options.port
  url.username = options.user
  url.password = password
  url.pathname = `/${options.name}`

  process.stdout.write(`Created database "${options.name}" on ${options.host}:${options.port}.\n`)
  process.stdout.write(`Copy this line into your env file:\n${options.env}=${url.toString()}\n`)
}

main().catch((error) => {
  process.stderr.write(`${error.message}\n`)
  process.exitCode = 1
})
