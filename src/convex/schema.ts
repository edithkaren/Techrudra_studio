import { authTables } from "@convex-dev/auth/server";
import { defineSchema, defineTable } from "convex/server";
import { Infer, v } from "convex/values";

export const ROLES = {
  ADMIN: "admin",
  USER: "user",
  ORGANIZER: "organizer",
  COMPANY_ORGANIZER: "companyOrganizer",
} as const;

export const roleValidator = v.union(
  v.literal(ROLES.ADMIN),
  v.literal(ROLES.USER),
  v.literal(ROLES.ORGANIZER),
  v.literal(ROLES.COMPANY_ORGANIZER),
);
export type Role = Infer<typeof roleValidator>;

export const competitionStatus = {
  UPCOMING: "upcoming",
  REGISTRATION_OPEN: "registrationOpen",
  LIVE: "live",
  JUDGING: "judging",
  COMPLETED: "completed",
  CANCELLED: "cancelled",
} as const;

export type CompetitionStatus = (typeof competitionStatus)[keyof typeof competitionStatus];

export const hackathonParticipation = {
  INDIVIDUAL: "individual",
  TEAM: "team",
  HYBRID: "hybrid",
} as const;

export type HackathonParticipation = (typeof hackathonParticipation)[keyof typeof hackathonParticipation];

export const hackathonStatus = {
  UPCOMING: "upcoming",
  REGISTRATION_OPEN: "registrationOpen",
  ACTIVE: "active",
  JUDGING: "judging",
  COMPLETED: "completed",
  CANCELLED: "cancelled",
} as const;

export type HackathonStatus = (typeof hackathonStatus)[keyof typeof hackathonStatus];

export const organizationType = {
  RELEVANT_COMPANY: "relevantCompany",
  RECRUITER: "recruiter",
} as const;

export type OrganizationType = (typeof organizationType)[keyof typeof organizationType];

export const visibility = {
  PUBLIC: "public",
  REGISTERED_ONLY: "registeredOnly",
  INVITE_ONLY: "inviteOnly",
} as const;

export type Visibility = (typeof visibility)[keyof typeof visibility];

const schema = defineSchema(
  {
    ...authTables,

    users: defineTable({
      name: v.optional(v.string()),
      handle: v.optional(v.string()),
      username: v.optional(v.string()),
      avatar: v.optional(v.string()),
      banner: v.optional(v.string()),
      bio: v.optional(v.string()),
      location: v.optional(v.string()),
      links: v.optional(v.record(v.string(), v.string())),
      avatarColor: v.optional(v.string()),
      reputationScore: v.optional(v.number()),
      marketingOptIn: v.optional(v.boolean()),
      lastActiveAt: v.optional(v.number()),
      email: v.optional(v.string()),
      role: v.optional(roleValidator),
    })
      .index("email", ["email"])
      .index("handle", ["handle"])
      .index("username", ["username"]),

    problems: defineTable({
      title: v.string(),
      slug: v.string(),
      description: v.string(),
      content: v.string(),
      difficulty: v.union(
        v.literal("easy"),
        v.literal("medium"),
        v.literal("hard"),
        v.literal("veryHard")
      ),
      topics: v.array(v.string()),
      tags: v.array(v.string()),
      suggestedLanguages: v.array(v.string()),
      constraints: v.string(),
      examples: v.optional(v.string()),
      editorial: v.optional(v.string()),
      hints: v.optional(v.array(v.string())),
      status: v.union(
        v.literal("published"),
        v.literal("draft"),
        v.literal("archived")
      ),
      creatorId: v.id("users"),
      createdAt: v.number(),
      updatedAt: v.number(),
    })
      .index("bySlug", ["slug"])
      .index("byCreator", ["creatorId"])
      .index("byDifficulty", ["difficulty"]),

    testCases: defineTable({
      id: v.string(),
      problemId: v.id("problems"),
      input: v.string(),
      output: v.string(),
      hidden: v.boolean(),
      timeLimitMs: v.optional(v.number()),
      memoryLimitKb: v.optional(v.number()),
      createdAt: v.number(),
    }).index("byProblem", ["problemId"]),

    submissions: defineTable({
      userId: v.id("users"),
      problemId: v.id("problems"),
      competitionId: v.optional(v.id("competitions")),
      teamId: v.optional(v.id("hackathonTeams")),
      hackathonId: v.optional(v.id("hackathons")),
      code: v.string(),
      language: v.string(),
      status: v.union(
        v.literal("compiling"),
        v.literal("accepted"),
        v.literal("wrongAnswer"),
        v.literal("timeLimitExceeded"),
        v.literal("memoryLimitExceeded"),
        v.literal("runtimeError"),
        v.literal("compileError"),
        v.literal("judgePending"),
        v.literal("judgeError"),
        v.literal("submissionError")
      ),
      verdict: v.optional(v.string()),
      score: v.optional(v.number()),
      executionMs: v.optional(v.number()),
      memoryKb: v.optional(v.number()),
      testCaseResults: v.optional(v.array(v.object({
        testCaseId: v.string(),
        passed: v.boolean(),
        timeMs: v.optional(v.number()),
        memoryKb: v.optional(v.number()),
        verdict: v.optional(v.string()),
      }))),
      penalty: v.optional(v.number()),
      createdAt: v.number(),
      updatedAt: v.number(),
    })
      .index("byUser", ["userId"])
      .index("byProblem", ["problemId"])
      .index("byUserProblem", ["userId", "problemId"])
      .index("byCompetition", ["competitionId"])
      .index("byHackathon", ["hackathonId"])
      .index("byStatus", ["status"]),

    competitions: defineTable({
      organizerId: v.id("users"),
      title: v.string(),
      slug: v.string(),
      description: v.string(),
      category: v.string(),
      tags: v.array(v.string()),
      level: v.union(
        v.literal("beginner"),
        v.literal("intermediate"),
        v.literal("advanced")
      ),
      type: v.union(
        v.literal("algorithmic"),
        v.literal("icpc"),
        v.literal("live"),
        v.literal("challenge"),
        v.literal("warmup")
      ),
      container: v.union(
        v.literal("private"),
        v.literal("public"),
        v.literal("inviteOnly")
      ),
      problemIds: v.array(v.id("problems")),
      rules: v.string(),
      scoring: v.string(),
      registration: v.object({
        enabled: v.boolean(),
        opensAt: v.optional(v.number()),
        closesAt: v.optional(v.number()),
        limit: v.optional(v.number()),
        current: v.optional(v.number()),
      }),
      startsAt: v.optional(v.number()),
      endsAt: v.optional(v.number()),
      judgingEndsAt: v.optional(v.number()),
      prizePool: v.optional(v.number()),
      prizes: v.optional(v.array(v.string())),
      organization: v.optional(v.string()),
      createdAt: v.number(),
      updatedAt: v.number(),
    })
      .index("byOrganizer", ["organizerId"])
      .index("bySlug", ["slug"])
      .index("byStatus", ["endsAt", "startsAt"])
      .index("byRegOpensAt", ["registration.opensAt"]),

    competitionRegistrations: defineTable({
      userId: v.id("users"),
      competitionId: v.id("competitions"),
      status: v.union(
        v.literal("registered"),
        v.literal("waitlisted"),
        v.literal("cancelled")
      ),
      joinedAt: v.number(),
      teamId: v.optional(v.id("hackathonTeams")),
      banned: v.boolean(),
    }).index("byUser", ["userId"]).index("byCompetition", ["competitionId"]),

    competitionLeaderboards: defineTable({
      competitionId: v.id("competitions"),
      problemId: v.id("problems"),
      userId: v.id("users"),
      score: v.number(),
      penalty: v.optional(v.number()),
      solved: v.boolean(),
      submissionsCount: v.number(),
      solvedAt: v.optional(v.number()),
      rank: v.optional(v.number()),
      createdAt: v.number(),
    }).index("byCompetition", ["competitionId"]).index("byCompetitionProblem", ["competitionId", "problemId"]).index("byRank", ["competitionId", "rank"]),

    competitionAnnouncements: defineTable({
      competitionId: v.id("competitions"),
      authorId: v.id("users"),
      title: v.string(),
      body: v.string(),
      pinned: v.boolean(),
      createdAt: v.number(),
    }).index("byCompetition", ["competitionId"]),

    hackathons: defineTable({
      organizerId: v.id("users"),
      title: v.string(),
      slug: v.string(),
      description: v.string(),
      category: v.string(),
      tags: v.array(v.string()),
      level: v.union(v.literal("beginner"), v.literal("intermediate"), v.literal("advanced")),
      difficulty: v.optional(v.string()),
      participation: v.union(
        v.literal("individual"),
        v.literal("team"),
        v.literal("hybrid")
      ),
      teamsAllowed: v.boolean(),
      problemIds: v.array(v.id("problems")),
      registration: v.object({
        enabled: v.boolean(),
        opensAt: v.optional(v.number()),
        closesAt: v.optional(v.number()),
        limit: v.optional(v.number()),
        current: v.optional(v.number()),
      }),
      startsAt: v.optional(v.number()),
      endsAt: v.optional(v.number()),
      judgingEndsAt: v.optional(v.number()),
      published: v.boolean(),
      prizePool: v.optional(v.number()),
      prizes: v.optional(v.array(v.string())),
      createdAt: v.number(),
      updatedAt: v.number(),
    })
      .index("byOrganizer", ["organizerId"])
      .index("bySlug", ["slug"])
      .index("byPublished", ["published"])
      .index("byStatus", ["endsAt", "startsAt"])
      .index("byRegOpensAt", ["registration.opensAt"]),

    hackathonRegisters: defineTable({
      userId: v.id("users"),
      hackathonId: v.id("hackathons"),
      status: v.union(
        v.literal("registered"),
        v.literal("waitlisted"),
        v.literal("cancelled")
      ),
      joinedAt: v.number(),
    }).index("byUser", ["userId"]).index("byHackathon", ["hackathonId"]),

    hackathonTeams: defineTable({
      hackathonId: v.id("hackathons"),
      name: v.string(),
      description: v.optional(v.string()),
      password: v.optional(v.string()),
      ownerId: v.id("users"),
      memberIds: v.array(v.id("users")),
      projectId: v.optional(v.id("projectSubmissions")),
      createdAt: v.number(),
    }).index("byHackathon", ["hackathonId"]).index("byOwner", ["ownerId"]),

    teamInvitations: defineTable({
      hackathonId: v.id("hackathons"),
      teamId: v.id("hackathonTeams"),
      inviterId: v.id("users"),
      email: v.string(),
      status: v.union(
        v.literal("pending"),
        v.literal("accepted"),
        v.literal("declined"),
        v.literal("expired")
      ),
      token: v.string(),
      createdAt: v.number(),
      expiresAt: v.number(),
    }).index("byTeam", ["teamId"]).index("byToken", ["token"]),

    hackathonTeamMembers: defineTable({
      teamId: v.id("hackathonTeams"),
      userId: v.id("users"),
      role: v.union(
        v.literal("owner"),
        v.literal("developer"),
        v.literal("designer"),
        v.literal("reviewer")
      ),
      joinedAt: v.number(),
    }).index("byTeam", ["teamId"]).index("byUser", ["userId"]),

    projectSubmissions: defineTable({
      userId: v.id("users"),
      hackathonId: v.id("hackathons"),
      teamId: v.optional(v.id("hackathonTeams")),
      title: v.string(),
      description: v.string(),
      demoVideoUrl: v.optional(v.string()),
      githubUrl: v.optional(v.string()),
      liveUrl: v.optional(v.string()),
      screenshots: v.optional(v.array(v.string())),
      status: v.union(
        v.literal("draft"),
        v.literal("submitted"),
        v.literal("underReview"),
        v.literal("accepted"),
        v.literal("rejected")
      ),
      rubricScores: v.optional(v.record(v.string(), v.number())),
      createdAt: v.number(),
      updatedAt: v.number(),
    }).index("byUser", ["userId"]).index("byHackathon", ["hackathonId"]).index("byStatus", ["status"]),

    companies: defineTable({
      name: v.string(),
      slug: v.string(),
      industry: v.string(),
      logo: v.optional(v.string()),
      description: v.string(),
      verified: v.boolean(),
      website: v.optional(v.string()),
      linkedin: v.optional(v.string()),
      careersUrl: v.optional(v.string()),
      createdAt: v.number(),
      updatedAt: v.number(),
    }).index("bySlug", ["slug"]),

    userCompanyRelation: defineTable({
      userId: v.id("users"),
      companyId: v.id("companies"),
      role: v.string(),
      isAlumni: v.boolean(),
      consentToContact: v.boolean(),
      reachOutAt: v.optional(v.number()),
      createdAt: v.number(),
    }).index("byUser", ["userId"]).index("byCompany", ["companyId"]),

    companyChallenges: defineTable({
      companyId: v.id("companies"),
      organizerId: v.id("users"),
      title: v.string(),
      slug: v.string(),
      description: v.string(),
      difficulty: v.union(v.literal("easy"), v.literal("medium"), v.literal("hard")),
      eligibility: v.string(),
      problemIds: v.array(v.id("problems")),
      rules: v.string(),
      evaluationCriteria: v.string(),
      container: v.union(
        v.literal("public"),
        v.literal("inviteOnly")
      ),
      registration: v.object({
        enabled: v.boolean(),
        opensAt: v.optional(v.number()),
        closesAt: v.optional(v.number()),
        limit: v.optional(v.number()),
        current: v.optional(v.number()),
      }),
      startsAt: v.optional(v.number()),
      endsAt: v.optional(v.number()),
      judgingEndsAt: v.optional(v.number()),
      prizePool: v.optional(v.number()),
      prizes: v.optional(v.array(v.string())),
      interviewEnabled: v.boolean(),
      status: v.union(
        v.literal("draft"),
        v.literal("published"),
        v.literal("live"),
        v.literal("completed"),
        v.literal("cancelled")
      ),
      createdAt: v.number(),
      updatedAt: v.number(),
    })
      .index("byCompany", ["companyId"])
      .index("byOrganizer", ["organizerId"])
      .index("bySlug", ["slug"])
      .index("byStatus", ["status"]),

    submissionEvaluations: defineTable({
      challengeId: v.id("companyChallenges"),
      userId: v.id("users"),
      problemId: v.id("problems"),
      status: v.union(
        v.literal("pending"),
        v.literal("scored"),
        v.literal("accepted"),
        v.literal("rejected"),
        v.literal("error")
      ),
      score: v.optional(v.number()),
      verdict: v.optional(v.string()),
      reason: v.optional(v.string()),
      executedBy: v.optional(v.id("users")),
      executedAt: v.optional(v.number()),
      notes: v.optional(v.string()),
      createdAt: v.number(),
    }).index("byChallenge", ["challengeId"]).index("byUserProblem", ["challengeId", "userId", "problemId"]),

    organizations: defineTable({
      name: v.string(),
      slug: v.string(),
      type: v.union(
        v.literal("company"),
        v.literal("recruiter"),
        v.literal("agency")
      ),
      logo: v.optional(v.string()),
      description: v.string(),
      website: v.optional(v.string()),
      featured: v.boolean(),
      verified: v.boolean(),
      createdAt: v.number(),
      updatedAt: v.number(),
    }).index("bySlug", ["slug"]),

    organizerVerificationRequests: defineTable({
      organizationId: v.id("organizations"),
      requesterId: v.id("users"),
      service: v.string(),
      status: v.union(
        v.literal("pending"),
        v.literal("approved"),
        v.literal("rejected")
      ),
      evidence: v.optional(v.string()),
      reviewedById: v.optional(v.id("users")),
      reviewedAt: v.optional(v.number()),
      reviewedNote: v.optional(v.string()),
      createdAt: v.number(),
      updatedAt: v.number(),
    }).index("byOrganization", ["organizationId"])
      .index("byStatus", ["status"]),

    organizerVerification: defineTable({
      organizationId: v.id("organizations"),
      reviewedById: v.id("users"),
      reviewedAt: v.number(),
      scopes: v.array(v.string()),
      note: v.optional(v.string()),
    }).index("byOrganization", ["organizationId"]),

    badges: defineTable({
      name: v.string(),
      icon: v.string(),
      description: v.string(),
      emoji: v.string(),
      category: v.string(),
      image: v.optional(v.string()),
      earnedAt: v.optional(v.number()),
      unlocked: v.boolean(),
      createdAt: v.number(),
    }).index("byCategory", ["category"]),

    userBadges: defineTable({
      userId: v.id("users"),
      badgeId: v.id("badges"),
      unlockedAt: v.optional(v.number()),
      iconColor: v.optional(v.string()),
    }).index("byUser", ["userId"]).index("byBadge", ["badgeId"]),

    projects: defineTable({
      userId: v.id("users"),
      title: v.string(),
      slug: v.string(),
      description: v.string(),
      longDescription: v.string(),
      image: v.optional(v.string()),
      category: v.string(),
      technologies: v.array(v.string()),
      githubUrl: v.optional(v.string()),
      liveUrl: v.optional(v.string()),
      demoVideoUrl: v.optional(v.string()),
      live: v.boolean(),
      featured: v.boolean(),
      createdAt: v.number(),
      updatedAt: v.number(),
    }).index("byUser", ["userId"]).index("bySlug", ["slug"]),

    notifications: defineTable({
      userId: v.id("users"),
      type: v.string(),
      title: v.string(),
      body: v.string(),
      data: v.optional(v.string()),
      readAt: v.optional(v.number()),
      createdAt: v.number(),
    }).index("byUser", ["userId"]).index("byRead", ["readAt"]),

    auditLogs: defineTable({
      actorId: v.optional(v.id("users")),
      actorType: v.optional(v.string()),
      action: v.string(),
      targetType: v.string(),
      targetId: v.optional(v.string()),
      data: v.optional(v.string()),
      ip: v.optional(v.string()),
      userAgent: v.optional(v.string()),
      createdAt: v.number(),
    }).index("byActor", ["actorId"]).index("byAction", ["action"]).index("byCreatedAt", ["createdAt"]),
  },
  { schemaValidation: false }
);

export default schema;
