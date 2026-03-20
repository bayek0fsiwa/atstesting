# pnpm run test:functional -- --headed
# Run all tests
# docker compose -f docker/compose.yaml up --build
# docker compose -f docker/compose.yaml down
# Run functional tests
docker compose -f docker/compose.yaml run --rm playwright pnpm run test:functional