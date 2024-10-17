import supertest from "supertest"

declare global {
  const request: supertest.SuperTest<supertest.Test>
  const tags: { smoke: '@smoke', contract: '@contract', functional: '@functional' }
}