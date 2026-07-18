package com.employee.cucumber.utils;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;

/**
 * DriverFactory — thread-safe ChromeDriver lifecycle manager.
 *
 * Call setUp()    → inside a Cucumber @Before hook
 * Call tearDown() → inside a Cucumber @After hook
 */
public class DriverFactory {

    private static WebDriver  driver;
    private static WebDriverWait wait;
    private static final int WAIT_TIMEOUT = 15;  // seconds

    private DriverFactory() { /* no instances */ }

    /** Initialise a fresh ChromeDriver for a scenario. */
    public static void setUp() {
        WebDriverManager.chromedriver().setup();

        ChromeOptions opts = new ChromeOptions();
        /*
         *  ─ Remove / comment the headless line below to
         *    watch the browser live during development ─
         */
        // opts.addArguments("--headless=new");
        opts.addArguments("--no-sandbox");
        opts.addArguments("--disable-dev-shm-usage");
        opts.addArguments("--disable-gpu");
        opts.addArguments("--window-size=1920,1080");
        opts.addArguments("--remote-allow-origins=*");
        opts.addArguments("--start-maximized");

        driver = new ChromeDriver(opts);
        wait   = new WebDriverWait(driver, Duration.ofSeconds(WAIT_TIMEOUT));
    }

    /** Quit the browser and release references. */
    public static void tearDown() {
        if (driver != null) {
            try { driver.quit(); } catch (Exception ignored) {}
            driver = null;
            wait   = null;
        }
    }

    public static WebDriver getDriver() {
        if (driver == null) throw new IllegalStateException(
            "Driver not initialised — call DriverFactory.setUp() first.");
        return driver;
    }

    public static WebDriverWait getWait() {
        if (wait == null) throw new IllegalStateException(
            "Wait not initialised — call DriverFactory.setUp() first.");
        return wait;
    }
}
