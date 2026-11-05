# Porter Dispatch API

A REST API for dispatching hospital porter jobs. Staff request a job (move a patient, equipment or a sample), jobs queue by priority, porters take the most urgent job, and every job moves through a validated lifecycle.

Built with **Java 17, Spring Boot 3, Spring Data JPA, PostgreSQL, JUnit 5 and Docker**.

## Features

- Priority dispatch queue: `URGENT` before `HIGH` before `ROUTINE`, oldest first within each priority.
- Job lifecycle enforced as a state machine: `PENDING → ASSIGNED → IN_PROGRESS → COMPLETED`, with cancellation at any unfinished stage. Invalid steps return `409 Conflict`.
- Porter availability tracked automatically: a porter becomes `BUSY` on taking a job and `AVAILABLE` when it is completed or cancelled.
- Row locking (`SELECT ... FOR UPDATE`) so two porters can never be handed the same job.
- Live stats: queue size by priority, active jobs, jobs completed today and average wait time.
- Request validation and consistent JSON error responses (RFC 7807 problem details).
- Unit tests for the state machine and integration tests for the HTTP API.

## Run it

**With Docker (easiest):**

```bash
docker compose up --build
```

The API starts on `http://localhost:8080` with PostgreSQL, and three demo porters are created.

**Without Docker:** start a local PostgreSQL with a database `porterdispatch` (user and password `porter`), then:

```bash
mvn spring-boot:run
```

**Run the tests** (uses an in-memory H2 database, no PostgreSQL needed):

```bash
mvn test
```

## Endpoints

| Method | Path | What it does |
| --- | --- | --- |
| POST | `/api/jobs` | Request a new job |
| GET | `/api/jobs` | All jobs, newest first |
| GET | `/api/jobs?status=PENDING` | The queue for one status, most urgent first |
| GET | `/api/jobs/{id}` | One job |
| POST | `/api/jobs/{id}/assign` | Dispatcher assigns a job to a porter (`{"porterId": 1}`) |
| POST | `/api/jobs/{id}/start` | Porter starts the job |
| POST | `/api/jobs/{id}/complete` | Porter completes the job |
| POST | `/api/jobs/{id}/cancel` | Cancel an unfinished job |
| POST | `/api/porters` | Add a porter (`{"name": "..."}`) |
| GET | `/api/porters` | All porters and their status |
| PATCH | `/api/porters/{id}/status` | Set `AVAILABLE` or `OFF_DUTY` |
| POST | `/api/porters/{id}/take-next` | Porter takes the most urgent pending job |
| GET | `/api/stats` | Queue and performance stats |

## Example

```bash
# Request an urgent patient transfer
curl -X POST localhost:8080/api/jobs -H "Content-Type: application/json" \
  -d '{"type":"PATIENT","priority":"URGENT","fromLocation":"Emergency Dept","toLocation":"Radiology"}'

# Porter 1 takes the next job, starts it, then completes it
curl -X POST localhost:8080/api/porters/1/take-next
curl -X POST localhost:8080/api/jobs/1/start
curl -X POST localhost:8080/api/jobs/1/complete

curl localhost:8080/api/stats
```

## Project structure

```
controller/   HTTP endpoints only
service/      business logic and transactions
model/        JPA entities; the job state machine lives in Job.java
repository/   database access (Spring Data JPA)
dto/          request and response objects, with validation
exception/    custom exceptions and the global error handler
config/       demo data seeding
```

## Design decisions

- **State machine in the entity.** `Job` itself refuses invalid transitions, so no caller can put a job into a broken state.
- **Numeric priority rank.** Sorting enum names as text would order HIGH, ROUTINE, URGENT; a stored rank sorts correctly and is indexed with status and creation time.
- **Pessimistic locking on take-next.** Prevents two porters being given the same job under concurrent requests.
- **DTOs instead of entities in responses.** The database model can change without breaking API clients.

## Roadmap

- Authentication and roles (staff, dispatcher, porter) with Spring Security and JWT
- Live job updates for porters over WebSockets
- Database migrations with Flyway
- A simple front end for requesting and tracking jobs
