package com.employee.automation.stepdefs;

import com.employee.automation.utils.DriverManager;
import io.cucumber.java.en.And;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import org.openqa.selenium.*;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

import static org.junit.Assert.*;

/**
 * AddEmployeeStepDefs — step definitions for AddEmployee.feature.
 *
 * NOTE: No @Before / @After hooks here.
 *       DriverManager lifecycle is managed ONLY by LoginStepDefs @Before / @After.
 *       Both step-def classes share the same static DriverManager singleton.
 *
 * Flow:
 *  1. Admin logs in            (LoginStepDefs steps reused)
 *  2. Click Employees nav      (LoginStepDefs step reused)
 *  3. Verify Employees page    (LoginStepDefs step reused)
 *  4-8. Add Employee form      (this class)
 *  9. Verify UI table          (this class)
 *  10. Verify Express API      (this class → same data Postman sees)
 *
 * Element IDs from AdminEmployees.jsx:
 *   add-emp-btn    → page-header "Add Employee" button
 *   add-emp-modal  → modal wrapper
 *   ae-name        → wrapper div  (input.form-input inside)
 *   ae-email       → wrapper div  (input.form-input inside)
 *   ae-role        → wrapper div  (input.form-input inside)
 *   ae-phone       → wrapper div  (input.form-input inside)
 *   ae-location    → wrapper div  (input.form-input inside)
 *   ae-submit      → submit button
 *   emp-search     → search input for verifying new row in table
 */
public class AddEmployeeStepDefs {

    // Accessors — NOTE: must NOT be named "wait()" as that conflicts with Object.wait()
    private WebDriver         getDriver() { return DriverManager.getDriver(); }
    private WebDriverWait     getWait()   { return DriverManager.getWait();   }

    /** Name typed in the form — stored so we can verify it via API later */
    private String lastEnteredName = "";

    // ─── Add Employee Button ──────────────────────────────────────────────────

    @When("I click the Add Employee button")
    public void iClickTheAddEmployeeButton() {
        WebElement addBtn = getWait().until(
            ExpectedConditions.elementToBeClickable(By.id("add-emp-btn"))
        );
        scrollAndClick(addBtn);
        pause(600);
    }

    // ─── Modal Assertions ─────────────────────────────────────────────────────

    @Then("the Add Employee modal should open")
    public void theAddEmployeeModalShouldOpen() {
        WebElement modal = getWait().until(
            ExpectedConditions.visibilityOfElementLocated(By.id("add-emp-modal"))
        );
        assertTrue("Add Employee modal did not open", modal.isDisplayed());
        System.out.println("   ✔ Add Employee modal is open");
    }

    @Then("the Add Employee modal should close")
    public void theAddEmployeeModalShouldClose() {
        getWait().until(
            ExpectedConditions.invisibilityOfElementLocated(By.id("add-emp-modal"))
        );
        System.out.println("   ✔ Add Employee modal closed — form submitted successfully");
    }

    // ─── Form Fill Steps ──────────────────────────────────────────────────────
    //
    // AdminEmployees.jsx structure:
    //   <div id="ae-name">
    //     <label>Full Name *</label>
    //     <input class="form-input" type="text" ... />
    //   </div>

    private WebElement inputInWrapper(String wrapperId) {
        WebElement wrapper = getWait().until(
            ExpectedConditions.visibilityOfElementLocated(By.id(wrapperId))
        );
        return wrapper.findElement(By.cssSelector("input.form-input"));
    }

    @When("I fill the employee name with {string}")
    public void iFillTheEmployeeNameWith(String name) {
        lastEnteredName = name;
        WebElement input = inputInWrapper("ae-name");
        input.clear();
        input.sendKeys(name);
        System.out.println("   ✔ Name: " + name);
    }

    @And("I fill the employee email with {string}")
    public void iFillTheEmployeeEmailWith(String email) {
        WebElement input = inputInWrapper("ae-email");
        input.clear();
        input.sendKeys(email);
        System.out.println("   ✔ Email: " + email);
    }

    @And("I fill the employee role with {string}")
    public void iFillTheEmployeeRoleWith(String role) {
        WebElement input = inputInWrapper("ae-role");
        input.clear();
        input.sendKeys(role);
        System.out.println("   ✔ Role: " + role);
    }

    @And("I fill the employee phone with {string}")
    public void iFillTheEmployeePhoneWith(String phone) {
        WebElement input = inputInWrapper("ae-phone");
        input.clear();
        input.sendKeys(phone);
        System.out.println("   ✔ Phone: " + phone);
    }

    @And("I fill the employee location with {string}")
    public void iFillTheEmployeeLocationWith(String location) {
        WebElement input = inputInWrapper("ae-location");
        input.clear();
        input.sendKeys(location);
        System.out.println("   ✔ Location: " + location);
    }

    // ─── Submit ───────────────────────────────────────────────────────────────

    @And("I click the submit Add Employee button")
    public void iClickTheSubmitAddEmployeeButton() {
        WebElement submitBtn = getWait().until(
            ExpectedConditions.elementToBeClickable(By.id("ae-submit"))
        );
        scrollAndClick(submitBtn);
        // Give React time to: close modal → axios.post → update table state
        pause(2500);
        System.out.println("   ✔ Add Employee form submitted");
    }

    // ─── Verify: UI Table ─────────────────────────────────────────────────────

    @And("the new employee {string} should appear in the employee list")
    public void theNewEmployeeShouldAppearInTheEmployeeList(String name) {
        // Search in the emp-search box to filter and confirm the new row
        WebElement search = getWait().until(
            ExpectedConditions.visibilityOfElementLocated(By.id("emp-search"))
        );
        search.clear();
        search.sendKeys(name);
        pause(700);

        boolean found = getDriver()
            .findElements(By.cssSelector(".data-table tbody tr"))
            .stream()
            .anyMatch(row -> row.getText().contains(name));

        assertTrue(
            "❌ Employee '" + name + "' NOT found in the UI table after adding!\n" +
            "   Check: AdminEmployees.jsx → addEmployee() → axios.post to /api/employees",
            found
        );

        System.out.println("   ✔ '" + name + "' appears in the employee table");

        // Clear the search so subsequent steps see all rows
        search.clear();
        pause(300);
    }

    // ─── Verify: Express API (same as Postman GET) ────────────────────────────

    @And("the employee should be saved to the Express API at {string}")
    public void theEmployeeShouldBeSavedToTheExpressAPIAt(String apiUrl) {
        // Small buffer for fs.writeFileSync in server.cjs to finish writing db.json
        pause(500);

        String name = lastEnteredName.isEmpty() ? "Selenium Test User" : lastEnteredName;

        try {
            HttpURLConnection conn = (HttpURLConnection) new URL(apiUrl).openConnection();
            conn.setRequestMethod("GET");
            conn.setRequestProperty("Accept", "application/json");
            conn.setConnectTimeout(5000);
            conn.setReadTimeout(5000);

            int httpStatus = conn.getResponseCode();
            assertEquals(
                "Express API returned HTTP " + httpStatus + " (expected 200). " +
                "Is 'node server.cjs' running on port 5000?",
                200, httpStatus
            );

            StringBuilder sb = new StringBuilder();
            try (BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()))) {
                String line;
                while ((line = br.readLine()) != null) sb.append(line);
            }
            conn.disconnect();

            String json = sb.toString();

            assertTrue(
                "❌ Employee '" + name + "' NOT found in Express API response!\n" +
                "   Postman: GET " + apiUrl + " does NOT contain this employee.\n" +
                "   The UI may not have called axios.post, or db.json was not written.\n" +
                "   API snippet: " + json.substring(0, Math.min(300, json.length())),
                json.contains(name)
            );

            System.out.println("   ✔ '" + name + "' confirmed in Express API (db.json)");
            System.out.println("   ✔ Postman → GET " + apiUrl + " → returns this employee ✅");

        } catch (AssertionError ae) {
            throw ae;
        } catch (Exception e) {
            fail("❌ Cannot reach Express API at '" + apiUrl + "': " + e.getMessage() +
                 "\n   Make sure 'node server.cjs' is running on port 5000.");
        }
    }

    // ─── Helpers ─────────────────────────────────────────────────────────────

    private void scrollAndClick(WebElement el) {
        ((JavascriptExecutor) getDriver()).executeScript(
            "arguments[0].scrollIntoView({behavior:'smooth', block:'center'});", el
        );
        try {
            el.click();
        } catch (ElementClickInterceptedException e) {
            ((JavascriptExecutor) getDriver()).executeScript("arguments[0].click();", el);
        }
    }

    /** Named 'pause' instead of 'sleep' or 'wait' to avoid Java built-in conflicts */
    private void pause(long ms) {
        try { Thread.sleep(ms); } catch (InterruptedException ignored) {}
    }
}
