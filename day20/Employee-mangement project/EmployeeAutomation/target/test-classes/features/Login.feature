@login
Feature: Employee Management System - Full Navigation Flow
  As a user of TechEMS
  I want to log in and navigate through the portal
  So that I can access all key pages

  Background:
    Given the application is open at "http://localhost:5173/"

  # ── TEST 1: Admin → Employee Details page ────────────────────────────────

  @admin @smoke
  Scenario: Admin logs in and views Employee Details
    When I click the "Admin Portal" card
    Then the admin login form should appear
    When I enter username "admin" and password "admin123"
    And I click the login button
    Then I should be redirected to the admin dashboard
    When I click the Employees nav item
    Then the Employee Details page should be displayed
    And the employee search box should be visible
    When I click view on the first employee
    Then the employee detail modal should open

  # ── TEST 2: Employee → Employee Dashboard ────────────────────────────────

  @employee @smoke
  Scenario: Employee logs in and views their Dashboard
    When I click the "Employee Portal" card
    Then the employee login form should appear
    When I enter username "asbar" and password "emp123"
    And I click the login button
    Then I should be redirected to the employee dashboard
    And the employee attendance card should be visible
    And the employee salary card should be visible
    When I click the My Profile nav item
    Then the profile page should be displayed
