pipeline {
    agent any    
    environment {

        EMAIL_BODY = 

        """

            <p>EXECUTED: Job <b>\'${env.JOB_NAME}:${env.BUILD_NUMBER})\'</b></p>

            <p>

            View console output at 

            "<a href="${env.BUILD_URL}">${env.JOB_NAME}:${env.BUILD_NUMBER}</a>"

            </p> 

            <p><i>(Build log is attached.)</i></p>

        """

        EMAIL_SUBJECT_SUCCESS = "Status: 'SUCCESS' -Job \'${env.JOB_NAME}:${env.BUILD_NUMBER}\'" 

        EMAIL_SUBJECT_FAILURE = "Status: 'FAILURE' -Job \'${env.JOB_NAME}:${env.BUILD_NUMBER}\'" 

        EMAIL_RECEPIENT = 'felixmutua75@gmail.com'


    }

    tools {
           nodejs "nodejs"
    }

       stages {
      stage('clone repository') {
          steps {
              git 'https://github.com/fkmutua/gallery'
            }
        }
        stage('Build the project') {
            steps {
                sh 'npm install'
            }
        }
        stage('Tests') {
            steps {
                sh 'npm test'
            }
        }
        stage('Deploy to Heroku') {
  steps {
    withCredentials([usernameColonPassword(credentialsId: 'fkmutua', variable: 'HEROKU_CREDENTIALS' )]){
      sh 'git push https://${HEROKU_CREDENTIALS}@git.heroku.com/mighty-anchorage-02270.git master'
            }
        }
    }
    }

    post {
        success {
            emailext attachLog: true, 
                body: EMAIL_BODY, 

                subject: EMAIL_SUBJECT_SUCCESS,

                to: EMAIL_RECEPIENT
        }

        failure {
            emailext attachLog: true, 
                body: EMAIL_BODY, 

                subject: EMAIL_SUBJECT_FAILURE, 

                to: EMAIL_RECEPIENT
        }
    }



    try {
        stage 'Checkout'
            checkout scm

            sh 'git log HEAD^..HEAD --pretty="%h %an - %s" > GIT_CHANGES'
            def lastChanges = readFile('GIT_CHANGES')
            slackSend color: "warning", message: "Started `${env.JOB_NAME}#${env.BUILD_NUMBER}`\n\n_The changes:_\n${lastChanges}"


        stage 'Clone repository'
            echo 'Repository exists'
        stage 'Test'
            echo 'testing'
        stage 'Deploy'
            echo "Testing deploy."

        stage 'Publish results'
            slackSend color: "good", message: "Build successful :charmander_dancing: \n `${env.JOB_NAME}#${env.BUILD_NUMBER}` <${env.BUILD_URL}|Open in Jenkins> \n successfully deployed Live site \n https://young-waters-07809.herokuapp.com/"
    }

    catch (err) {
        slackSend color: "danger", message: "Build failed :thumps_down: \n`${env.JOB_NAME}#${env.BUILD_NUMBER}` <${env.BUILD_URL}|Open in Jenkins>"

        throw err
    }
}