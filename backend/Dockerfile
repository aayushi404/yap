FROM node:20-alpine

# Enable pnpm via corepack
RUN corepack enable

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

COPY . .

# Prisma + build
RUN npx prisma generate
RUN pnpm run build

CMD ["pnpm", "run", "dev"]