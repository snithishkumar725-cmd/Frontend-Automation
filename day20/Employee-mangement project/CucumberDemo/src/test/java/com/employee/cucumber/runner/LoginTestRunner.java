package com.employee.cucumber.runner;

import io.cucumber.junit.Cucumber;
import io.cucumber.junit.CucumberOptions;
import org.junit.runner.RunWith;

/**
 * LoginTestRunner — JUnit 4 entry point for the CucumberDemo test suite.
 *
 * ┌─────────────────────────────────────────────────────────────┐
 * │  HOW TO RUN                                                  │
 * │                                                              │
 * │  1. Start the React app:                                     │
 * │       cd d:\Employee-mangement && npm run dev                │
 * │                                                              │
 * │  2. Run all tests:                                           │
 * │       cd d:\Employee-mangement\CucumberDemo                  │
 * │       mvn test                                               │
 * │                                                              │
 * │  3. Run only smoke tests:                                    │
 * │       mvn test -Dcucumber.filter.tags="@Smoke"               │
 * │                                                              │
 * │  4. HTML report:                                             │
 * │       target/cucumber-reports/report.html                    │
 * └─────────────────────────────────────────────────────────────┘
 */
@RunWith(Cucumber.class)
@CucumberOptions(
    // ── Feature files location ────────────────────────────────
    features = "src/test/resources/features",

    // ── Step definitions package ──────────────────────────────
    glue = "com.employee.cucumber.stepdefs",

    // ── Plugins / reporters ───────────────────────────────────
    plugin = {
        "pretty",                                               // coloured console output
        "html:target/cucumber-reports/report.html",            // HTML report
        "json:target/cucumber-reports/report.json",            // JSON (for CI dashboards)
        "junit:target/cucumber-reports/report-junit.xml"       // JUnit XML (for Jenkins)
    },

    monochrome = true,   // clean console output (no ANSI colour codes in log)
    dryRun     = false,  // set true to validate step bindings without running browser

    // ── Tag filter: empty = run all; "@Smoke" for smoke only ──
    tags = ""
)
public class LoginTestRunner {
    // Intentionally empty — @RunWith(Cucumber.class) drives execution
}
