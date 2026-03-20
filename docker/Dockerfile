FROM mcr.microsoft.com/playwright:v1.58.2-noble

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN npm install -g pnpm && pnpm install

COPY . .

RUN npx playwright install --with-deps

CMD ["pnpm", "exec", "playwright", "test"]