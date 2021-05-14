'use strict'

import { VersionModel } from '../../api/models'

describe('Version Module Testing', () => {
  test('Get Server Version', async () => {
    const expectedResult = {
      name: 'node-api-es7-starter',
      version: '1.0.0',
      description: 'NodeJS API Server Boilerplate'
    }

    const result = await VersionModel.get()
    expect(result).toMatchObject(expectedResult)
  })
})
