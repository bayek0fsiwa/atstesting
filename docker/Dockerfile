# Use official Microsoft Playwright image
FROM mcr.microsoft.com/playwright:v1.48.2-focal

# Install pnpm
RUN npm install -g pnpm@10.32.1

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy project files
COPY . .

# Expose port for reports
EXPOSE 9323

# Default command
CMD ["pnpm", "test"]
