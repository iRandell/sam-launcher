import { DeleteResult, UpdateResult } from 'typeorm'

import { Group as EntityGroup } from '@app/database/entities'

import { Database } from '@app/core/database'

export namespace Group {
  export function getAll(): Promise<EntityGroup[]> {
    return Database.Group.getAll()
  }

  export function getById(id: number): Promise<EntityGroup | undefined> {
    return Database.Group.getById(id)
  }

  export async function add(groupName: string): Promise<EntityGroup> {
    const group = Database.Group.create(groupName)

    await Database.Group.insert(group)

    return group
  }

  export function deleteById(id: number): Promise<DeleteResult> {
    return Database.Group.deleteById(id)
  }

  export function rename(id: number, name: string): Promise<UpdateResult> {
    return Database.Group.rename(id, name)
  }

  export function unsetSelected(): Promise<UpdateResult> {
    return Database.Group.unsetSelected()
  }

  export function setSelected(id: number): Promise<UpdateResult> {
    return Database.Group.setSelected(id)
  }

  export async function switchSelected(id: number): Promise<void> {
    await Database.Group.unsetSelected()
    await Database.Group.setSelected(id)
  }
}
