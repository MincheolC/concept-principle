# Table Based Multi Tenancy

테이블 기반의 멀티 테넌시 샘플입니다.

### 요구사항

1. team:user = 1:n
   1. team은 tenant 입니다.
2. team:project = 1:n
   1. 하나의 team에는 1개의 project가, 또 다른 team에는 2개의 project가 있습니다.
3. team에는 ADMIN, TEAM role이 있습니다.
4. user에는 AMDIN, USER role이 있습니다.
5. user는 본인이 속한 team의 project만 생성,수정,조회할 수 있습니다.
   1. 단, admin role의 team 유저들은 모든 team의 프로젝트를 조회할 수 있습니다.
6. team 정보는 public schema에서 관리되며, 나머지 team에 속한 정보들은 각 팀의 schema에서 관리됩니다.

### 사용할 기술 스택

- node.js
- express
- prisma
- postgreSQL
- jest
- supertest
- docker (테스트가 동작할 때 컨테이너를 잠시 생성하고 테스트가 끝나면 삭제합니다.)
