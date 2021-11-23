@UI
Feature: Login to application

    As a valid user
    I can login to application

    As a invalid user
    I cannot login to application

    @E2E
    @epic("Epic-LoginToApplication")
    @feature("feature-LoginToApplication")
    @owner("dima.g")
    @issue("jira","https://jira-gi.sapiens.com/browse/AUTO-916")
    Scenario: Valid Login
        Given I open login page
        When I fill username with "dimag@test.com" and password with "Test1234" and click submit
        Then I should see homepage and User logged in

    @E2E
    @issue("jira","https://jira-gi.sapiens.com/browse/AUTO-916")
    @link("link","https://jira-gi.sapiens.com/browse/AUTO-916")
     Scenario: Invalid Login
        Given I open login page
        When I fill username with "error_email" and password with "***" and click submit
        Then I should seee error message