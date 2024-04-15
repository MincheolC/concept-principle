# Container

컨테이너는 소프트웨어 서비스를 실행하는 데 필요한 특정 버전의 프로그래밍 언어 런타임 및 라이브러리와 같은 종속 항목과 애플리케이션 코드를 함께 포함하는 **경량 패캐지**입니다.

### 왜 컨테이너가 탄생했을까?

> VM (Virtual Machine)의 한계를 개선하기 위해 만들어진 개념

### 컨테이너는 대표적으로 VM의 어떤 점들을 개선했을까?

|               | 가상 머신                                                                                              | 컨테이너                                                                                                                                                                                                       |
| ------------- | ------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 리소스 소모   | \- **하드웨어 수준에서의 가상화**.<br>\- 완전한 OS를 로드하여, 상당한 양의 CPU, 메모리 등을 소모함<br> | \- **OS 수준에서의 가상화**를 제공하여 **OS를 공유**하기 때문에 훨씬 가벼워 짐                                                                                                                                 |
| 부팅 시간     | \- 완전한 OS를 부팅하기 때문에 시작 시간이 김                                                          | \- **OS의 커널을 공유**하면서 실행되기 때문에, 별도의 OS를 부팅할 필요 없이 필요한 애플리케이션과 라이브러리만 로드하면 되서, 훨씬 빠르게 시작될 수 있음.                                                      |
| 관리의 복잡성 | \- 각각의 VM에 대한 OS, 네트워크 설정, 보안 등을 관리해야 함                                           | \- **호스트 OS를 공유**하기 때문에, 호스트 OS만 업데이트하면 됨.<br>\- **컨테이너 오케스트레이션 (kubernetes)와 같은 도구**를 사용하면, 컨테이너 배포, 스케일링, 네트워크 설정 및 보완 관리를 자동화할 수 있음 |

## 실습

실습을 통해 Docker와 Kubernetes를 실습하며 그 강점을 이해해봅시다.

### 1. Docker 실습

1. 간단한 Node.js 어플리케이션 생성
2. Dockerfile 작성
   1. **Dockerfile은 단일 이미지를 정의하고 빌드하는 데 사용**됩니다. 기본적으로 하나의 애플리케이션 또는 서비스의 설정을 포함합니다.
3. Docker 이미지 빌드 및 컨테이너 실행 (docker-compose 활용)
   1. **Docker Compose 파일은 여러 컨테이너를 정의하고 관리하는 데 사용**됩니다. 서비스 간의 관계, 네트워크, 볼륨 등 복잡한 애플리케이션을 쉽게 관리할 수 있게 해줍니다.
4. 결과 확인

### 2. Kubernetes 실습 (minikube)

1. minikube 설치 및 시작
   ```sh
   brew install minikube
   minikube start
   minikube status
   ```
2. `eval $(minikube docker-env)`
   1. Minikube 내부에 docker 이미지를 직접 빌드하고 관리하기 위해 사용
   2. 빌드된 이미지들이 Minikube Docker 데몬의 이미지 저장소에 저장되어, Kubernetes 클러스터에서 직접 접근 및 사용이 가능해짐. 이는 이미지를 외부 레지스트리로 푸시,풀하는 과정이 없어 훨씬 빠르게 개발 및 테스트를 할 수 있음.
   3. **환경 복원**: `eval $(minikube docker-env -u)`
3. 도커 이미지 로컬에 생성
   1. `docker build -t node-app:1.0 .`
4. Kubernetes Deployment 파일 생성 (`deployment.yaml`)
   1. **목적**: Deployment는 애플리케이션의 상태를 선언적으로 업데이트하면서 애플리케이션의 인스턴스(파드)를 관리하는 데 사용됩니다. Deployment는 하나 이상의 파드의 상태를 유지하고, 자동으로 파드를 교체하며, 애플리케이션을 스케일링하고 버전을 롤백하는 등의 기능을 제공합니다.
   2. **기능**:
      1. **파드 관리**: Deployment는 ReplicaSet을 통해 지정된 수의 파드 복제본을 유지합니다. 파드가 실패하거나 삭제되면 Deployment가 자동으로 파드를 재생성하여 설정된 복제본 수를 유지합니다.
      2. **업데이트 및 롤백**: Deployment는 애플리케이션의 새 버전을 점진적으로 롤아웃하고, 필요한 경우 이전 버전으로 롤백할 수 있는 기능을 제공합니다.
      3. **자동 스케일링**: 파드의 수를 수동 또는 자동으로 조정할 수 있습니다.
5. Deployment 적용 및 확인

   ```sh
   kubectl delete deployment node-app
   kubectl apply -f deployment.yaml
   kubectl get deployments
   kubectl describe deployment <deployment-name>
   kubectl get pods

   # pull image error 발생 시 Docker hub에 image 푸쉬해서 사용
   ```

6. Service 파일 생성하여 외부에 노출 (`service.yaml`)
   1. **목적**: Service는 파드 집합에 대한 안정적인 네트워킹 인터페이스를 제공합니다. Service는 파드가 네트워크 상에서 서로 다른 노드로 이동하거나 새로 생성될 때 발생할 수 있는 IP 주소의 변경을 추상화합니다. Service는 내부적으로 클러스터의 파드에 접근하기 위한 내부 IP 주소와 포트를 유지 관리하며, 필요에 따라 클러스터 외부로 트래픽을 노출시킬 수도 있습니다.
   2. **기능**:
      1. **네트워크 추상화**: 파드의 실제 IP 주소와 상관없이 일정한 주소(서비스의 클러스터 IP)를 통해 파드 그룹에 접근할 수 있습니다.
      2. **로드 밸런싱**: 서비스는 요청을 받아 연결된 파드들 사이에 요청을 분산시켜 로드 밸런싱 역할을 합니다.
      3. **서비스 디스커버리**: Kubernetes 내에서는 서비스 이름을 사용하여 다른 서비스나 파드가 서비스를 쉽게 찾고 통신할 수 있도록 합니다.
7. Service 적용
   1. `kubectl apply -f service.yaml`
8. 트러블 슈팅
   ```sh
   kubectl get pods -l app=node-app
   kubectl logs <pod-name>
   ```
9. 애플리케이션에 접속
   1. `minikube service node-app-service --url`
   2. 반 환된 URL을 웹브라우저에서 열기
10. 정리
    ```sh
    kubectl delete service node-app-service
    kubectl delete deployment node-app
    minikube stop
    minikube delete
    ```
