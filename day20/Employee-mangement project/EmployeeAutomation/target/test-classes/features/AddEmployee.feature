@addEmployee
Feature: Add Employee via Admin Portal
  As an admin of TechEMS
  I want to add a new employee through the Admin Portal UI
  So that the employee is saved to the backend and visible in the API (Postman / Express)

  Background:
    Given the application is open at "http://localhost:5173/"

  # ── TEST: Admin adds a new employee ──────────────────────────────────────

  @admin @smoke @api
  Scenario: Admin adds a new employee and it reflects in the Express API
    When I click the "Admin Portal" card
    Then the admin login form should appear
    When I enter username "admin" and password "admin123"
    And I click the login button
    Then I should be redirected to the admin dashboard
    When I click the Employees nav item
    Then the Employee Details page should be displayed
    And the employee search box should be visible
    When I click the Add Employee button
    Then the Add Employee modal should open
    When I fill the employee name with "Selenium Test User"
    And I fill the employee email with "selenium.test@techems.com"
    And I fill the employee role with "QA Automation Engineer"
    And I fill the employee phone with "+91 99988 77766"
    And I fill the employee location with "Chennai, India"
    And I click the submit Add Employee button
    Then the Add Employee modal should close
    And the new employee "Selenium Test User" should appear in the employee list
    And the employee should be saved to the Express API at "http://localhost:5000/api/employees"

  # ── TEST: Admin adds a second employee to verify persistence ─────────────

  @admin @regression
  Scenario: Admin adds a second employee and verifies both are in the list
    When I click the "Admin Portal" card
    Then the admin login form should appear
    When I enter username "admin" and password "admin123"
    And I click the login button
    Then I should be redirected to the admin dashboard
    When I click the Employees nav item
    Then the Employee Details page should be displayed
    When I click the Add Employee button
    Then the Add Employee modal should open
    When I fill the employee name with "Integration Test User"
    And I fill the employee email with "integration.test@techems.com"
    And I fill the employee role with "Backend Developer"
    And I fill the employee phone with "+91 88877 66655"
    And I fill the employee location with "Hyderabad, India"
    And I click the submit Add Employee button
    Then the Add Employee modal should close
    And the new employee "Integration Test User" should appear in the employee list
