package com.employee.automation.stepdefs;

import com.employee.automation.utils.DriverManager;
import io.cucumber.java.After;
import io.cucumber.java.Before;
import io.cucumber.java.en.And;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import org.openqa.selenium.*;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import static org.junit.Assert.*;

import java.util.Objects;

/**
 * LoginStepDefs — step definitions for EmployeeAutomation Login.feature.
 *
 * Element IDs sourced from the React components:
 *   LoginPage.jsx    → admin-portal-btn, employee-portal-btn, lp-username,
 *                      lp-password, login-submit-btn, login-form, back-btn
 *   AdminSidebar.jsx → admin-nav-employees, admin-nav-dashboard
 *   AdminEmployees   → emp-search, emp-row-{id}, view-emp-{id}, view-emp-modal
 *   EmployeeSidebar  → emp-nav-dashboard, emp-nav-profile
 *   EmployeeDashboard→ emp-att-card, emp-salary-card
 *   MyProfile        → profile-hero
 */
public class LoginStepDefs {

    private WebDriver driver;
    private WebDriverWait wait;

    // ─── Lifecycle ────────────────────────────────────────────────────────────

    @Before
    public void setUp() {
        DriverManager.setUp();
        driver = DriverManager.getDriver();
        wait   = DriverManager.getWait();
    }

    @After
    public void tearDown() {
        DriverManager.tearDown();
    }

    // ─── Given ───────────────────────────────────────────────────────────────

    @Given("the application is open at {string}")
    public void theApplicationIsOpenAt(String url) {
        driver.get(Objects.requireNonNull(url, "URL must not be null"));
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("admin-portal-btn")));
        // Allow React to finish fetching employees from API (localhost:5000)
        sleep(1500);
    }

    // ─── Portal / Login steps ─────────────────────────────────────────────────

    @Then("the {string} card should be visible")
    public void theCardShouldBeVisible(String cardName) {
        String id = cardName.equalsIgnoreCase("Admin Portal") ? "admin-portal-btn" : "employee-portal-btn";
        assertTrue(cardName + " card not visible",
            wait.until(ExpectedConditions.visibilityOfElementLocated(By.id(id))).isDisplayed());
    }

    @Then("the admin login form should appear")
    public void theAdminLoginFormShouldAppear() {
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("lp-username")));
        assertTrue("Admin login form not displayed",
            driver.findElement(By.id("login-form")).isDisplayed());
    }

    @Then("the employee login form should appear")
    public void theEmployeeLoginFormShouldAppear() {
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("lp-username")));
        assertTrue("Employee login form not displayed",
            driver.findElement(By.id("login-form")).isDisplayed());
    }

    @Then("I should be redirected to the admin dashboard")
    public void iShouldBeRedirectedToTheAdminDashboard() {
        WebElement nav = wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("admin-nav-employees")));
        assertTrue("Admin dashboard sidebar not visible", nav.isDisplayed());
        System.out.println("   ✔ Admin dashboard loaded");
    }

    @Then("I should be redirected to the employee dashboard")
    public void iShouldBeRedirectedToTheEmployeeDashboard() {
        // React SPA — URL never changes. Wait for EmployeeSidebar nav element.
        WebElement empNav = wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("emp-nav-dashboard")));
        assertTrue("Employee dashboard sidebar not visible", empNav.isDisplayed());
        System.out.println("   ✔ Employee dashboard loaded");
    }

    @Then("an error message should be displayed")
    public void anErrorMessageShouldBeDisplayed() {
        WebElement err = wait.until(ExpectedConditions.visibilityOfElementLocated(By.className("lp-error")));
        assertTrue("Error message not displayed", err.isDisplayed());
        assertFalse("Error message is empty", err.getText().trim().isEmpty());
    }

    @Then("the form should not submit due to required fields")
    public void theFormShouldNotSubmitDueToRequiredFields() {
        assertTrue("Form disappeared unexpectedly",
            driver.findElement(By.id("login-form")).isDisplayed());
    }

    @Then("the portal selector screen should be shown")
    public void thePortalSelectorScreenShouldBeShown() {
        assertTrue("Portal selector not shown",
            wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("admin-portal-btn"))).isDisplayed());
    }

    @Then("the password input type should be {string}")
    public void thePasswordInputTypeShouldBe(String expectedType) {
        String actual = wait.until(ExpectedConditions.visibilityOfElementLocated(
            By.id("lp-password"))).getAttribute("type");
        assertEquals("Password field type mismatch", expectedType, actual);
    }

    // ─── Admin navigation steps ───────────────────────────────────────────────

    @When("I click the Employees nav item")
    public void iClickTheEmployeesNavItem() {
        WebElement navBtn = wait.until(ExpectedConditions.elementToBeClickable(By.id("admin-nav-employees")));
        scrollAndClick(navBtn);
        sleep(600);
    }

    @Then("the Employee Details page should be displayed")
    public void theEmployeeDetailsPageShouldBeDisplayed() {
        WebElement addBtn = wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("add-emp-btn")));
        assertTrue("Add Employee button not visible on Employees page", addBtn.isDisplayed());
        System.out.println("   ✔ Admin Employees page loaded");
    }

    @And("the employee search box should be visible")
    public void theEmployeeSearchBoxShouldBeVisible() {
        WebElement search = wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("emp-search")));
        assertTrue("Employee search box not visible", search.isDisplayed());
    }

    @When("I click view on the first employee")
    public void iClickViewOnTheFirstEmployee() {
        // First employee in db.json has id "1"
        WebElement viewBtn = wait.until(ExpectedConditions.elementToBeClickable(By.id("view-emp-1")));
        scrollAndClick(viewBtn);
        sleep(400);
    }

    @Then("the employee detail modal should open")
    public void theEmployeeDetailModalShouldOpen() {
        WebElement modal = wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("view-emp-modal")));
        assertTrue("Employee detail modal did not open", modal.isDisplayed());
        System.out.println("   ✔ Employee detail modal opened");
    }

    // ─── Employee navigation steps ────────────────────────────────────────────

    @And("the employee attendance card should be visible")
    public void theEmployeeAttendanceCardShouldBeVisible() {
        WebElement card = wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("emp-att-card")));
        assertTrue("Attendance card not visible on employee dashboard", card.isDisplayed());
        System.out.println("   ✔ Attendance card visible");
    }

    @And("the employee salary card should be visible")
    public void theEmployeeSalaryCardShouldBeVisible() {
        WebElement card = wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("emp-salary-card")));
        assertTrue("Salary card not visible on employee dashboard", card.isDisplayed());
        System.out.println("   ✔ Salary card visible");
    }

    @When("I click the My Profile nav item")
    public void iClickTheMyProfileNavItem() {
        WebElement profileNav = wait.until(ExpectedConditions.elementToBeClickable(By.id("emp-nav-profile")));
        scrollAndClick(profileNav);
        sleep(600);
    }

    @Then("the profile page should be displayed")
    public void theProfilePageShouldBeDisplayed() {
        WebElement profileHero = wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("profile-hero")));
        assertTrue("Profile hero card not visible", profileHero.isDisplayed());
        System.out.println("   ✔ My Profile page loaded");
    }

    // ─── Shared action steps ──────────────────────────────────────────────────

    @When("I click the {string} card")
    public void iClickTheCard(String cardName) {
        String btnId = cardName.equalsIgnoreCase("Admin Portal") ? "admin-portal-btn" : "employee-portal-btn";
        scrollAndClick(wait.until(ExpectedConditions.elementToBeClickable(By.id(btnId))));
    }

    @When("I enter username {string} and password {string}")
    public void iEnterUsernameAndPassword(String username, String password) {
        WebElement user = wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("lp-username")));
        user.clear();
        user.sendKeys(username);
        WebElement pass = driver.findElement(By.id("lp-password"));
        pass.clear();
        pass.sendKeys(password);
    }

    @And("I click the login button")
    public void iClickTheLoginButton() {
        scrollAndClick(wait.until(ExpectedConditions.elementToBeClickable(By.id("login-submit-btn"))));
        sleep(1200);
    }

    @When("I click the back button")
    public void iClickTheBackButton() {
        scrollAndClick(wait.until(ExpectedConditions.elementToBeClickable(By.id("back-btn"))));
    }

    @And("I click the password toggle eye button")
    public void iClickThePasswordToggleEyeButton() {
        wait.until(ExpectedConditions.elementToBeClickable(By.cssSelector(".lp-eye"))).click();
        sleep(300);
    }

    // ─── Helpers ─────────────────────────────────────────────────────────────

    private void scrollAndClick(WebElement element) {
        ((JavascriptExecutor) driver).executeScript(
            "arguments[0].scrollIntoView({behavior:'smooth',block:'center'});", element);
        try {
            element.click();
        } catch (ElementClickInterceptedException e) {
            ((JavascriptExecutor) driver).executeScript("arguments[0].click();", element);
        }
    }

    private void sleep(long ms) {
        try { Thread.sleep(ms); } catch (InterruptedException ignored) {}
    }
}
