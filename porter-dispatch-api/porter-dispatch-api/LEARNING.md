# Learning guide: own this project before you put it on your CV

Interviewers will ask you to explain this code and why it is built this way. Work through this guide until you can answer every question at the bottom without looking.

## 1. Read the code in this order

1. `model/JobPriority.java`, `JobStatus.java`, `JobType.java`, `PorterStatus.java` — the vocabulary of the system.
2. `model/Porter.java` and `model/Job.java` — the heart of it. Trace every path through `assignTo`, `start`, `complete` and `cancel`.
3. `JobTest.java` — run it (`mvn test -Dtest=JobTest`) and read each test next to the method it checks.
4. `repository/JobRepository.java` — how method names become SQL, and the `@Lock` on the queue query.
5. `dto/` — what comes in and goes out, and the validation annotations.
6. `service/JobService.java` — transactions, and how a request flows from controller to entity.
7. `controller/` — the HTTP layer.
8. `exception/GlobalExceptionHandler.java` — how exceptions become 400, 404 and 409 responses.
9. `DispatchApiIntegrationTest.java` — the whole system tested through HTTP.

## 2. Trace one request by hand

Follow `POST /api/porters/1/take-next` from start to finish:

`PorterController.takeNext` → `JobService.takeNext` opens a transaction → loads the porter → `JobRepository.findFirstBy...` runs `SELECT ... ORDER BY priorityRank, createdAt ... FOR UPDATE` → `job.assignTo(porter)` checks the job is `PENDING`, calls `porter.markBusy()`, sets the fields → the transaction commits and Hibernate writes both changes → `JobResponse.from(job)` becomes JSON.

Then do the same for a request that fails, such as completing a job that was never started.

## 3. Break things on purpose

Each of these teaches you something. Predict what happens, then try it.

- Remove `@Valid` from `JobController.create` and send an empty body.
- Change the queue query to order by `priority` instead of `priorityRank`. Which test fails, and why?
- Remove `porter.markAvailable()` from `Job.complete()`.
- Remove `@Transactional` from `JobService.start`. Does the change still save?
- Delete the `@Lock` annotation. What could go wrong with 20 porters?

## 4. Make it yours (do at least the first two yourself)

1. **Push it to your own GitHub** with regular, meaningful commits as you work through it.
2. **Add authentication with Spring Security**: staff can create jobs, porters can only take and update jobs. This is the part to build yourself; it is the best interview story in the project.
3. **Add a feature from your own work experience**, e.g. a `notes` update endpoint, an "equipment needed" field, or jobs per department.
4. **Deploy it** to a free hosting platform that supports Docker and PostgreSQL, and put the live link on your CV.

## 5. Interview questions you should be able to answer

**Why did you build this?** I work as a porter at a hospital and saw how jobs are requested and prioritised; I wanted to model that properly as a backend system.

**Why is the state machine in the entity, not the service?** So the rules are enforced in one place and no caller can skip them.

**How do you stop two porters getting the same job?** A pessimistic write lock (`SELECT ... FOR UPDATE`) on the queue query. The second transaction waits until the first commits, then sees the job is no longer pending.

**Why store `priorityRank` as a number?** Enums stored as text sort alphabetically, which would put HIGH before URGENT.

**What does `@Transactional` do?** Wraps the method in a database transaction: all changes commit together or roll back together. Loaded entities are tracked, so changes are saved on commit without calling `save()`.

**Why return DTOs instead of entities?** It decouples the API from the database model, avoids exposing internal fields and avoids lazy-loading problems during JSON serialisation.

**Why 409 for an invalid transition and not 400?** The request is well-formed, but it conflicts with the current state of the resource.

**What's the difference between your unit and integration tests?** Unit tests check the entity logic alone in milliseconds; integration tests start Spring with a real (in-memory) database and call the HTTP endpoints.

**What would you improve?** Authentication and roles, WebSocket updates so porters don't poll, Flyway migrations instead of `ddl-auto`, and a front end.

**How would it scale?** The queue query uses an index on status, rank and creation time. For many hospitals you'd add a hospital or site ID and partition the queue by it.
