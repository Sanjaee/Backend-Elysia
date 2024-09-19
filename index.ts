import { Elysia } from 'elysia'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const app = new Elysia()

interface ItemBody {
    name: string
  }
  

app
  // Create Item
  .post('/items', async (ctx) => {
    const { name } = await ctx.body as ItemBody
    const newItem = await prisma.item.create({
      data: { name },
    })
    return newItem
  })

  // Read all Items
  .get('/items', async () => {
    const items = await prisma.item.findMany()
    return items
  })

  // Read single Item by ID
  .get('/items/:id', async (ctx) => {
    const { id } = ctx.params
    const item = await prisma.item.findUnique({
      where: { id },
    })
    return item
  })

  // Update Item by ID
  .put('/items/:id', async (ctx) => {
    const { id } = ctx.params
    const { name } = await ctx.body as ItemBody
    const updatedItem = await prisma.item.update({
      where: { id },
      data: { name },
    })
    return updatedItem
  })

  // Delete Item by ID
  .delete('/items/:id', async (ctx) => {
    const { id } = ctx.params
    const deletedItem = await prisma.item.delete({
      where: { id },
    })
    return deletedItem
  })

// Start the server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})
