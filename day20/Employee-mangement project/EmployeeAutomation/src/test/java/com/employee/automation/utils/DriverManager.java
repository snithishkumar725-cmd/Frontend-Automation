package com.employee.automation.utils;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;
import java.util.Objects;

/**
 * DriverManager — thread-safe singleton wrapper around ChromeDriver.
 * <p>
 * Used by Cucumber step definitions via {@link #getDriver()} and
 * {@link #getWait()}. Call {@link #setUp()} in a @Before hook and
 * {@link #tearDown()} in an @After hook.
 */
public class DriverManager {

    private static WebDriver driver;
    private static WebDriverWait wait;

    /** Default explicit-wait duration (seconds). */
    private static final int WAIT_SECONDS = 15;

    // Prevent instantiation
    private DriverManager() {}

    /**
     * Initialises ChromeDriver with safe options (no-sandbox, headless-capable).
     * Call once per Cucumber scenario from a @Before hook.
     */
    public static void setUp() {
        WebDriverManager.chromedriver().setup();

        ChromeOptions options = new ChromeOptions();
        // Comment out the line below to watch the browser during development
        // options.addArguments("--headless=new");
        options.addArguments("--no-sandbox");
        options.addArguments("--disable-dev-shm-usage");
        options.addArguments("--disable-gpu");
        options.addArguments("--window-size=1920,1080");
        options.addArguments("--remote-allow-origins=*");

        driver = new ChromeDriver(options);
        wait   = new WebDriverWait(
            Objects.requireNonNull(driver, "ChromeDriver must not be null"),
            Objects.requireNonNull(Duration.ofSeconds(WAIT_SECONDS), "Duration must not be null")
        );
    }

    /**
     * Quits the browser and clears references.
     * Call once per Cucumber scenario from an @After hook.
     */
    public static void tearDown() {
        if (driver != null) {
            try {
                driver.quit();
            } catch (Exception ignored) {
                // best-effort quit
            } finally {
                driver = null;
                wait   = null;
            }
        }
    }

    /** Returns the active {@link WebDriver} instance. */
    public static WebDriver getDriver() {
        if (driver == null) {
            throw new IllegalStateException(
                "WebDriver is not initialised. Did you call DriverManager.setUp()?");
        }
        return driver;
    }

    /** Returns the active {@link WebDriverWait} instance. */
    public static WebDriverWait getWait() {
        if (wait == null) {
            throw new IllegalStateException(
                "WebDriverWait is not initialised. Did you call DriverManager.setUp()?");
        }
        return wait;
    }
}
