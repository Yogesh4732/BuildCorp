pipeline {
    agent any

    environment {
        IMAGE_NAME = "yogesh32/contruction-app"
    }

    stages {
        stage('1. Checkout Code') {
            steps {
                echo 'Checking out code from repository...'
                checkout scm
            }
        }

        stage('2. Build Docker Image') {
            steps {
                script {
                    echo "Building Docker image for backend: ${env.IMAGE_NAME}-backend:${env.BUILD_NUMBER}"
                    // Build backend Docker image
                    docker.build("${env.IMAGE_NAME}-backend:${env.BUILD_NUMBER}", "-f backend/Dockerfile.backend ./backend")

                    echo "Building Docker image for frontend: ${env.IMAGE_NAME}-frontend:${env.BUILD_NUMBER}"
                    // Build frontend Docker image
                    docker.build("${env.IMAGE_NAME}-frontend:${env.BUILD_NUMBER}", "-f docker.frontend .")
                }
            }
        }

        stage('4. Deploy (Simple Example)') {
            steps {
                script {
                    echo "Deploying backend container..."
                    def backendContainerName = "construction-backend"
                    def backendPort = 5000

                    sh "docker stop ${backendContainerName} || true"
                    sh "docker rm ${backendContainerName} || true"
                    sh "docker run -d --name ${backendContainerName} -p ${backendPort}:5000 ${env.IMAGE_NAME}-backend:${env.BUILD_NUMBER}"

                    echo "Deploying frontend container..."
                    def frontendContainerName = "construction-frontend"
                    def frontendPort = 8081

                    sh "docker stop ${frontendContainerName} || true"
                    sh "docker rm ${frontendContainerName} || true"
                    sh "docker run -d --name ${frontendContainerName} -p ${frontendPort}:80 ${env.IMAGE_NAME}-frontend:${env.BUILD_NUMBER}"

                    echo "Backend deployed at http://<jenkins-agent-ip>:${backendPort}"
                    echo "Frontend deployed at http://<jenkins-agent-ip>:${frontendPort}"
                }
            }
        }
    }

    post {
        always {
            echo 'Pipeline finished.'
        }
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed.'
        }
    }
}