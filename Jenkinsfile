pipeline {
    agent {
        kubernetes {
            yaml '''
            apiVersion: v1
            kind: Pod
            spec:
              containers:
              - name: node
                image: node:22-alpine
                command: ['cat']
                tty: true
              - name: kaniko
                image: gcr.io/kaniko-project/executor:debug
                command: ['cat']
                tty: true
                volumeMounts:
                - name: docker-config
                  mountPath: /kaniko/.docker/
              volumes:
              - name: docker-config
                secret:
                  secretName: dockerhub-config
                  items:
                    - key: .dockerconfigjson
                      path: config.json
            '''
        }
    }

    environment {
        // Замени на свое имя пользователя DockerHub
        IMAGE_NAME = "akarv/online-store-frontend" 
        IMAGE_TAG = "v${env.BUILD_NUMBER}"
    }

    stages {
        stage('1. Checkout') {
            steps {
                checkout scm
            }
        }

        stage('2. Quality Gate: Linting') {
            steps {
                container('node') {
                    sh """
                    npm ci
                    npm run lint
                    """
                }
            }
        }

        stage('3. Build & Push Image') {
            steps {
                container('kaniko') {
                    sh """
                    /kaniko/executor --context `pwd` \
                    --dockerfile `pwd`/Dockerfile \
                    --destination ${IMAGE_NAME}:${IMAGE_TAG}
                    """
                }
            }
        }

        stage('4. Update GitOps Repo') {
            steps {
                container('node') {
                    script {
                        // Используем твои креденшелы GitHub PAT
                        withCredentials([usernamePassword(credentialsId: 'github-pat', usernameVariable: 'GIT_USER', passwordVariable: 'GIT_PASS')]) {
                            sh """
                            apk add git curl
                            curl -s "https://raw.githubusercontent.com/kubernetes-sigs/kustomize/master/hack/install_kustomize.sh" | sh
                            mv kustomize /usr/local/bin/

                            git config --global user.email "jenkins@devops.local"
                            git config --global user.name "Jenkins CI"

                            git clone https://${GIT_USER}:${GIT_PASS}@github.com/denismironiuk/online-store-gitops.git gitops-repo
                            
                            cd gitops-repo/apps/frontend/overlays/prod

                            # Обновляем тег образа в kustomization.yaml
                            kustomize edit set image ${IMAGE_NAME}=${IMAGE_NAME}:${IMAGE_TAG}

                            git add kustomization.yaml
                            git commit -m "cd: update frontend to ${IMAGE_TAG}"
                            git push origin main
                            """
                        }
                    }
                }
            }
        }
    }
}