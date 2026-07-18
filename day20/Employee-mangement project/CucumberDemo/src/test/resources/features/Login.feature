@LoginFeature
Feature: TechEMS Employee Management - Full Navigation Flow
  As a user of TechEMS
  I want to log in and navigate through the portal
  So that I can access all key pages

  Background:
    Given I open the TechEMS application

  # ── TEST 1: Admin → Employee Details page ──────────────────────────────

  @Test1 @Admin
  Scenario: Admin logs in and navigates to Employee Details
    When I select the Admin Portal
    And  I enter admin username "admin" and password "admin123"
    And  I click Sign In
    Then I should land on the Admin Dashboard
    When I navigate to the Employees page
    Then the Employee Details page should load
    And  the employee search bar should be visible
    When I open the first employee details
    Then the employee detail modal should appear

  # ── TEST 2: Employee → Dashboard + Profile ─────────────────────────────

  @Test2 @Employee
  Scenario: Employee logs in and browses their Dashboard and Profile
    When I select the Employee Portal
    And  I enter employee username "asbar" and password "emp123"
    And  I click Sign In
    Then I should land on the Employee Dashboard
    And  the attendance summary card should be visible
    And  the salary info card should be visible
    When I navigate to My Profile
    Then the profile details page should load
