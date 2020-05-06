import { app, BrowserWindow } from 'electron'

import { createDatabaseConnection } from './database'

import './core/events'

export const windowWidth = 1152
export const windowHeight = 720
export const pathTemplate = './dist/index.html'

let mainWindow: BrowserWindow | null

app.allowRendererProcessReuse = true

app.on('ready', async () => {
  await setupDatabase()
  await createWindow()
  await setupWindow()
  setEventHooks()
})

async function setupDatabase(): Promise<void> {
  await createDatabaseConnection()
}

async function createWindow(): Promise<void> {
  mainWindow = new BrowserWindow({
    width: windowWidth,
    height: windowHeight,
    frame: false,
    maximizable: false,
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
      devTools: DEVELOPMENT
    }
  })
}

async function setupWindow(): Promise<void> {
  if (DEVELOPMENT) {
    await mainWindow!.loadURL('http://localhost:4040/')
    mainWindow!.webContents.openDevTools()
  } else {
    await mainWindow!.loadFile(pathTemplate)
  }
}

function setEventHooks(): void {
  mainWindow!.on('closed', () => {
    mainWindow = null
  })
}
