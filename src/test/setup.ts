import '@testing-library/jest-dom'
import { expect, afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'
import * as matchers from '@testing-library/jest-dom/matchers'
import React from 'react'

declare global {
  var React: typeof React
}

// Configuração global do React para testes
global.React = React

expect.extend(matchers)

afterEach(() => {
  cleanup()
})