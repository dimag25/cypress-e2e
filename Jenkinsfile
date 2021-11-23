pipeline {
    agent any
    stages {
         stage('build') {
                    steps {
                        bat 'npm install'
                    }
        }

        stage('cypress parallel tests') {
            parallel {
                stage('tester A') {
                    steps {
                        bat 'npm run cy:run:dashboard'
                    }
                }

                stage('tester B') {
                    steps {
                        bat 'npm run cy:run:dashboard'
                    }
                }
                  stage('tester C') {
                    steps {
                        bat 'npm run cy:run:dashboard'
                    }
                }
            }
        }

        stage('allure-reports') {
                        steps {
                    script {
                            allure([
                                                includeProperties: false,
                                                jdk: '',
                                                properties: [],
                                                reportBuildPolicy: 'ALWAYS',
                                                results: [[path: './allure-results']]
                                        ])
                    }
                        }
                }
        }
    }
