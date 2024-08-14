import { db } from '@/db/db'
import { InsertIssues, SelectIssues, issues, users } from '@/db/schema'
import { GQLContext } from '@/types'
import { getUserFromToken, signin, signup } from '@/utils/auth'
import { and, asc, desc, eq, or, sql } from 'drizzle-orm'
import { GraphQLError } from 'graphql'

export const resolvers = {
  IssueStatus: {
    BACKLOG: 'backlog',
    TODO: 'todo',
    INPROGRESS: 'inprogress',
    DONE: 'done',
  },
  User: {
    issues: (user: any, _: any, ctx: GQLContext) => {
      return db.query.issues.findMany({ where: eq(issues.userId, user.id) })
    },
  },
  Issue: {
    user: (issue: any, _: any, ctx: GQLContext) => {
      if (!ctx.user) {
        throw new GraphQLError('UNAUTHORIZED', {
          extensions: { code: 'AUTH_ERROR' },
        })
      }

      return db.query.users.findFirst({
        where: eq(users.id, issue.userId),
      })
    },
  },
  Query: {
    me: (_: any, __: any, ctx: GQLContext) => {
      return ctx.user
    },
    issues: async (_: any, { input }: any, ctx: GQLContext) => {
      if (!ctx.user) {
        throw new GraphQLError('UNAUTHORIZED', {
          extensions: { code: 'AUTH_ERROR' },
        })
      }

      const andFilters = [eq(issues.userId, ctx.user.id)]
      if (input && Array.isArray(input.statuses)) {
        const statusFilters = input.statuses.map((status: any) =>
          eq(issues.status, status)
        )
        andFilters.push(or(...statusFilters)!)
      }

      const data = await db.query.issues.findMany({
        where: and(...andFilters),
        orderBy: [
          asc(sql`case ${issues.status}
        when "backlog" then 1
        when "inprogress" then 2
        when "done" then 3
      end`),
          desc(issues.createdAt),
        ],
      })

      return data
    },
  },
  Mutation: {
    signin: async (_: any, { input }: any) => {
      const data = await signin(input)

      if (!data || !data.user || !data.token) {
        throw new GraphQLError('UNAUTHORIZED', {
          extensions: { code: 'AUTH_ERROR' },
        })
      }

      return { ...data.user, token: data.token }
    },

    createIssue: async (_: any, { input }: any, ctx: GQLContext) => {
      if (!ctx.user) {
        throw new GraphQLError('UNAUTHORIZED', {
          extensions: { code: 'AUTH_ERROR' },
        })
      }

      const data = await db
        .insert(issues)
        .values({ ...input, userId: ctx.user.id })
        .returning()

      return data[0]
    },
    editIssue: async (_: any, { input }: any, ctx: GQLContext) => {
      if (!ctx.user) {
        throw new GraphQLError('UNAUTHORIZED', {
          extensions: { code: 'AUTH_ERROR' },
        })
      }

      const result = await db
        .update(issues)
        .set(input)
        .where(and(eq(issues.userId, ctx.user.id), eq(issues.id, input.id)))
        .returning()

      return result[0]
    },

    createUser: async (_: any, args: any) => {
      const data = await signup(args.input)

      if (!data || !data.user || !data.token) {
        throw new GraphQLError('could not create user', {
          extensions: { code: 'AUTH_ERROR' },
        })
      }

      return { ...data.user, token: data.token }
    },
  },
}
