package com.employee.automation;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.ElementClickInterceptedException;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.annotations.AfterTest;
import org.testng.annotations.BeforeTest;
import org.testng.annotations.Test;

import io.github.bonigarcia.wdm.WebDriverManager;

import java.time.Duration;
import java.util.Objects;

public class TestNG_Report {
     WebDriver driver;
     WebDriverWait wait;

@BeforeTest
public void beforetest(){
        WebDriverManager.chromedriver().setup();
    // Launch a new Chrome browser with safer options for CI
    ChromeOptions options = new ChromeOptions();
    options.addArguments("--headless=new");
    options.addArguments("--no-sandbox");
    options.addArguments("--disable-dev-shm-usage");
    options.addArguments("--disable-gpu");
    options.addArguments("--window-size=1920,1080");
    options.addArguments("--remote-allow-origins=*");
    driver = new ChromeDriver(options);
        wait = new WebDriverWait(Objects.requireNonNull(driver), Objects.requireNonNull(Duration.ofSeconds(15)));
        // Open your application
        String url = "http://localhost:5173/";
        driver.get(url);
}

@Test
public void test() throws InterruptedException{

        // Step 1: Click Admin Portal button (id="admin-portal-btn")
        WebElement adminPortalBtn = wait.until(
            ExpectedConditions.elementToBeClickable(By.id("admin-portal-btn"))
        );
        ((JavascriptExecutor) driver).executeScript("arguments[0].scrollIntoView(true);", adminPortalBtn);
        try {
            adminPortalBtn.click();
        } catch (ElementClickInterceptedException e) {
            ((JavascriptExecutor) driver).executeScript("arguments[0].click();", adminPortalBtn);
        }
        Thread.sleep(500);

        // Step 2: Enter username (id="lp-username")
        WebElement usernameField = wait.until(
            ExpectedConditions.visibilityOfElementLocated(By.id("lp-username"))
        );
        usernameField.sendKeys("admin");

        // Step 3: Enter password (id="lp-password")
        driver.findElement(By.id("lp-password")).sendKeys("admin123");

        // Step 4: Click Login submit button (id="login-submit-btn")
        driver.findElement(By.id("login-submit-btn")).click();
        Thread.sleep(1000);

        // Step 5: Click Employees nav item in sidebar (id="admin-nav-employees")
        WebElement employeesTab = wait.until(
            ExpectedConditions.elementToBeClickable(By.id("admin-nav-employees"))
        );
        employeesTab.click();
        Thread.sleep(500);

        // Step 6: Click Add Employee button (id="add-emp-btn")
        WebElement addEmpBtn = wait.until(
            ExpectedConditions.elementToBeClickable(By.id("add-emp-btn"))
        );
        ((JavascriptExecutor) driver).executeScript("arguments[0].scrollIntoView(true);", addEmpBtn);
        try {
            addEmpBtn.click();
        } catch (ElementClickInterceptedException e) {
            ((JavascriptExecutor) driver).executeScript("arguments[0].click();", addEmpBtn);
        }
        Thread.sleep(500);

        // Step 7: Fill in Full Name field (placeholder="John Doe")
        WebElement nameField = wait.until(
            ExpectedConditions.visibilityOfElementLocated(By.xpath("//form[@id='add-emp-form']//input[@placeholder='John Doe']"))
        );
        nameField.sendKeys("Megala");
        Thread.sleep(3000);
        }


@AfterTest
public void aftertest(){

    if (driver != null) {
        try {
            driver.quit();
        } catch (Exception ignored) {
        }
    }

}
}