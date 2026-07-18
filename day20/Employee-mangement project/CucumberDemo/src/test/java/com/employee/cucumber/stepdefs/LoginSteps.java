package com.employee.cucumber.stepdefs;

import com.employee.cucumber.utils.DriverFactory;
import io.cucumber.java.After;
import io.cucumber.java.Before;
import io.cucumber.java.Scenario;
import io.cucumber.java.en.*;
import org.openqa.selenium.*;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import static org.junit.Assert.*;

/**
 * LoginSteps — CucumberDemo step definitions for extended navigation flows.
 *
 * Element IDs sourced from:
 *   LoginPage.jsx    → admin-portal-btn, employee-portal-btn, lp-username,
 *                      lp-password, login-submit-btn, back-btn
 *   AdminSidebar.jsx → admin-nav-employees
 *   AdminEmployees   → add-emp-btn, emp-search, view-emp-1, view-emp-modal
 *   EmployeeSidebar  → emp-nav-dashboard, emp-nav-profile
 *   EmployeeDashboard→ emp-att-card, emp-salary-card
 *   MyProfile        → profile-hero
 */
public class LoginSteps {

    private WebDriver     driver;
    private WebDriverWait wait;

    // ─── Lifecycle ────────────────────────────────────────────────────────────

    @Before
    public void setUp(Scenario scenario) {
        System.out.println("\n▶  Starting: " + scenario.getName());
        DriverFactory.setUp();
        driver = DriverFactory.getDriver();
        wait   = DriverFactory.getWait();
    }

    @After
    public void tearDown(Scenario scenario) {
        System.out.println(scenario.isFailed() ? "✗  FAILED" : "✓  PASSED");
        DriverFactory.tearDown();
    }

    // ─── Given ───────────────────────────────────────────────────────────────

    @Given("I open the TechEMS application")
    public void iOpenTheApplication() {
        driver.get("http://localhost:5173/");
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("admin-portal-btn")));
        // Allow React to load employee data from API before any login attempt
        pause(1500);
    }

    // ─── Login steps ──────────────────────────────────────────────────────────

    @When("I select the Admin Portal")
    public void selectAdminPortal() {
        clickById("admin-portal-btn");
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("lp-username")));
    }

    @When("I select the Employee Portal")
    public void selectEmployeePortal() {
        clickById("employee-portal-btn");
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("lp-username")));
    }

    @And("I enter admin username {string} and password {string}")
    public void enterAdminCredentials(String username, String password) {
        fillCredentials(username, password);
    }

    @And("I enter employee username {string} and password {string}")
    public void enterEmployeeCredentials(String username, String password) {
        fillCredentials(username, password);
    }

    @And("I click Sign In")
    public void clickSignIn() {
        clickById("login-submit-btn");
        pause(1200);
    }

    @And("I click the Back button")
    public void clickBack() {
        clickById("back-btn");
        pause(400);
    }

    @And("I click the eye toggle button")
    public void clickEyeToggle() {
        wait.until(ExpectedConditions.elementToBeClickable(By.cssSelector(".lp-eye"))).click();
        pause(300);
    }

    // ─── Admin assertions ─────────────────────────────────────────────────────

    @Then("I should land on the Admin Dashboard")
    public void landOnAdminDashboard() {
        WebElement nav = wait.until(ExpectedConditions.visibilityOfElementLocated(
            By.id("admin-nav-employees")));
        assertTrue("Admin dashboard not loaded", nav.isDisplayed());
        System.out.println("   ✔ Admin Dashboard loaded");
    }

    @When("I navigate to the Employees page")
    public void navigateToEmployeesPage() {
        clickById("admin-nav-employees");
        pause(700);
    }

    @Then("the Employee Details page should load")
    public void employeeDetailsPageLoads() {
        WebElement addBtn = wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("add-emp-btn")));
        assertTrue("Add Employee button not visible", addBtn.isDisplayed());
        System.out.println("   ✔ Admin Employees page loaded");
    }

    @And("the employee search bar should be visible")
    public void employeeSearchBarVisible() {
        assertTrue("Search bar not visible",
            wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("emp-search"))).isDisplayed());
    }

    @When("I open the first employee details")
    public void openFirstEmployeeDetails() {
        WebElement viewBtn = wait.until(ExpectedConditions.elementToBeClickable(By.id("view-emp-1")));
        scrollAndClick(viewBtn);
        pause(500);
    }

    @Then("the employee detail modal should appear")
    public void employeeDetailModalAppears() {
        WebElement modal = wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("view-emp-modal")));
        assertTrue("Employee detail modal not visible", modal.isDisplayed());
        System.out.println("   ✔ Employee detail modal opened");
    }

    // ─── Employee assertions ──────────────────────────────────────────────────

    @Then("I should land on the Employee Dashboard")
    public void landOnEmployeeDashboard() {
        // React SPA — URL never changes. Check for sidebar nav element.
        WebElement empNav = wait.until(ExpectedConditions.visibilityOfElementLocated(
            By.id("emp-nav-dashboard")));
        assertTrue("Employee dashboard sidebar not visible", empNav.isDisplayed());
        System.out.println("   ✔ Employee Dashboard loaded");
    }

    @And("the attendance summary card should be visible")
    public void attendanceSummaryCardVisible() {
        WebElement card = wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("emp-att-card")));
        assertTrue("Attendance card not visible", card.isDisplayed());
        System.out.println("   ✔ Attendance card visible");
    }

    @And("the salary info card should be visible")
    public void salaryInfoCardVisible() {
        WebElement card = wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("emp-salary-card")));
        assertTrue("Salary card not visible", card.isDisplayed());
        System.out.println("   ✔ Salary card visible");
    }

    @When("I navigate to My Profile")
    public void navigateToMyProfile() {
        clickById("emp-nav-profile");
        pause(600);
    }

    @Then("the profile details page should load")
    public void profileDetailsPageLoads() {
        WebElement profileHero = wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("profile-hero")));
        assertTrue("Profile hero not visible", profileHero.isDisplayed());
        System.out.println("   ✔ My Profile page loaded");
    }

    // ─── Shared assertions ────────────────────────────────────────────────────

    @Then("the Admin Portal card should be displayed")
    public void adminCardVisible() {
        assertTrue("Admin Portal card not visible",
            wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("admin-portal-btn"))).isDisplayed());
    }

    @Then("the Employee Portal card should be displayed")
    public void employeeCardVisible() {
        assertTrue("Employee Portal card not visible",
            wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("employee-portal-btn"))).isDisplayed());
    }

    @Then("a login error message should appear")
    public void errorMessageAppears() {
        WebElement error = wait.until(ExpectedConditions.visibilityOfElementLocated(By.className("lp-error")));
        assertTrue("Error not displayed", error.isDisplayed());
    }

    @Then("the form should block submission with required-field validation")
    public void formBlocksSubmission() {
        assertTrue("Form unexpectedly submitted",
            driver.findElement(By.id("login-form")).isDisplayed());
    }

    @Then("the portal selector should be visible again")
    public void portalSelectorVisible() {
        assertTrue("Portal selector not visible",
            wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("admin-portal-btn"))).isDisplayed());
    }

    @Then("the password field type should be {string}")
    public void passwordFieldType(String expectedType) {
        assertEquals("Password field type mismatch", expectedType,
            wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("lp-password")))
                .getAttribute("type"));
    }

    // ─── Helpers ─────────────────────────────────────────────────────────────

    private void fillCredentials(String username, String password) {
        WebElement userField = wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("lp-username")));
        userField.clear();
        userField.sendKeys(username);
        WebElement passField = driver.findElement(By.id("lp-password"));
        passField.clear();
        passField.sendKeys(password);
    }

    private void clickById(String id) {
        WebElement el = wait.until(ExpectedConditions.elementToBeClickable(By.id(id)));
        scrollAndClick(el);
    }

    private void scrollAndClick(WebElement element) {
        ((JavascriptExecutor) driver).executeScript(
            "arguments[0].scrollIntoView({block:'center'});", element);
        try {
            element.click();
        } catch (ElementClickInterceptedException e) {
            ((JavascriptExecutor) driver).executeScript("arguments[0].click();", element);
        }
    }

    private void pause(long ms) {
        try { Thread.sleep(ms); } catch (InterruptedException ignored) {}
    }
}
