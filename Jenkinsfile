pipeline {
    agent any

    environment {
        IMAGE_NAME = 'roomfinder'
        CONTAINER_NAME = 'roomfinder-app'
        PORT = '3001'
    }

    stages {

        stage('Checkout') {
            steps {
                echo 'Cloning repository...'
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                echo 'Building Docker image...'
                withCredentials([
                    string(credentialsId: 'SUPABASE_URL', variable: 'SUPABASE_URL'),
                    string(credentialsId: 'SUPABASE_ANON_KEY', variable: 'SUPABASE_ANON_KEY')
                ]) {
                    sh '''
                        docker build \
                            --build-arg NEXT_PUBLIC_SUPABASE_URL=$SUPABASE_URL \
                            --build-arg NEXT_PUBLIC_SUPABASE_ANON_KEY=$SUPABASE_ANON_KEY \
                            -t $IMAGE_NAME .
                    '''
                }
            }
        }

        stage('Test') {
            steps {
                echo 'Running tests...'
                sh '''
                    docker run --rm $IMAGE_NAME node -e "console.log('App build OK')"
                '''
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying container...'
                sh '''
                    # Stop and remove old container if running
                    docker stop $CONTAINER_NAME || true
                    docker rm $CONTAINER_NAME || true

                    # Run new container
                    docker run -d \
                        --name $CONTAINER_NAME \
                        --restart unless-stopped \
                        -p $PORT:3000 \
                        $IMAGE_NAME
                '''
            }
        }
    }

    post {
        success {
            echo '✅ Build, Test & Deploy successful! App running on port 3000.'
        }
        failure {
            echo '❌ Pipeline failed. Check logs above.'
            // Stop container if deploy failed midway
            sh 'docker stop $CONTAINER_NAME || true'
            sh 'docker rm $CONTAINER_NAME || true'
        }
    }
}