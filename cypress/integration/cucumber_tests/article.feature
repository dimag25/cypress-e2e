@UI
Feature: Articles E2E flow - Create & Delete

    As a logged in user
    I can create new article

    As a logged in user
    I can delete existing article

    @Smoke
    Scenario: Create new Article
        Given I can create new article
        Then Article created succefully

    @Smoke
     Scenario: Delete existing Article
        Given I can delete existing article
        Then Article deleted succefully
